/* eslint-disable @next/next/no-img-element */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function GameForm({
  _id,
  title: existingTitle,
  desciption: existingDesciption,
  price: existingPrice,
  discount: existingDiscount,
  requirement: existingRequirement,
  contruction: existingContruction,
  images: existingImages,
  category: existingCategory,
}) {
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || "");
  const [desciption, setDescription] = useState(existingDesciption || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [discount, setDiscount] = useState(existingDiscount || "");
  const [requirement, setRequirment] = useState(existingRequirement || "");
  const [contruction, setContruction] = useState(existingContruction || "");
  const [images, setImages] = useState(existingImages || []);
  const [isUpLoading, setIsUpLoading] = useState(false);
  const [category, setCategory] = useState(existingCategory || "");
  const [categories, setCategories] = useState([]);

  async function saveProduct(e) {
    e.preventDefault();
    const data = {
      title,
      desciption,
      price,
      discount,
      requirement,
      contruction,
      images,
      category,
    };
    if (_id) {
      // Update
      await axios.put("/api/games", { ...data, _id });
      toast.success("Cập nhật sản phẩm thành công");
    } else {
      // Create
      await axios.post("/api/games", data);
      toast.success("Thêm sản phẩm thành công");
    }
    goBack();
  }

  function goBack() {
    router.push("/games");
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUpLoading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data];
      });
      setIsUpLoading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form onSubmit={saveProduct}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Tên game</label>
            <input
              type="text"
              placeholder="Tên game"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Chọn danh mục sản phẩm</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="py-1.5 mb-0"
            >
              <option value="">Không có danh mục</option>
              {categories?.length > 0 &&
                categories?.map((category) => (
                  <option key={category} value={category?._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <label>Hình ảnh</label>
        <div className="flex gap-3">
          <label
            htmlFor="upload"
            className="flex bg-blue-400 p-3 cursor-pointer w-32 h-32 items-center gap-2 text-xl rounded-md text-white"
          >
            <AiOutlineCloudUpload size={30} /> Upload
          </label>
          <div className="flex gap-3 items-center">
            <ReactSortable
              list={images}
              className="flex gap-2 flex-wrap"
              setList={updateImagesOrder}
            >
              {!!images?.length &&
                images.map((image) => (
                  <div key={image}>
                    <img
                      src={image}
                      alt="img review"
                      width="300px"
                      className="rounded-lg"
                    />
                  </div>
                ))}
            </ReactSortable>
            {isUpLoading && (
              <div className="h-24">
                <Spinner />
              </div>
            )}
          </div>
        </div>
        <div className="mb-2">
          {!images?.length && <div>Không có hình ảnh sản phẩm này</div>}
          <input
            type="file"
            onChange={uploadImages}
            id="upload"
            className="hidden"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Giá bán (VND)</label>
            <input
              type="number"
              placeholder="Nhập giá bán"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Giá giảm (VND)</label>
            <input
              type="number"
              placeholder="Nhập giá khuyến mãi"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
        </div>
        <label>Mô tả game</label>
        <textarea
          type="text"
          placeholder="Mô tả game"
          value={desciption}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Yều cầu cấu hình</label>
        <textarea
          type="text"
          placeholder="Yều cầu cấu hình"
          value={requirement}
          onChange={(e) => setRequirment(e.target.value)}
        />
        <label>Hướng dẫn cài đặt</label>
        <textarea
          type="text"
          placeholder="Hướng dẫn cài đặt"
          value={contruction}
          onChange={(e) => setContruction(e.target.value)}
        />
        <button className="btn-primary" type="submit">
          Lưu sản phẩm
        </button>
        <button
          className="btn-cancel text-white font-bold ml-2"
          onClick={goBack}
        >
          Hủy
        </button>
      </form>
    </>
  );
}
