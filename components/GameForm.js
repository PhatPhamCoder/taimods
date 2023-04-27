/* eslint-disable @next/next/no-img-element */
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { trusted } from "mongoose";
import Spinner from "./Spinner";
export default function GameForm({
  _id,
  title: existingTitle,
  desciption: existingDesciption,
  price: existingPrice,
  requirement: existingRequirement,
  contruction: existingContruction,
  images: existingImages,
}) {
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || "");
  const [desciption, setDescription] = useState(existingDesciption || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [requirement, setRequirment] = useState(existingRequirement || "");
  const [contruction, setContruction] = useState(existingContruction || "");
  const [images, setImages] = useState(existingImages || []);
  const [isUpLoading, setIsUpLoading] = useState(false);
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, desciption, price, requirement, contruction, images };
    if (_id) {
      // Update
      await axios.put("/api/games", { ...data, _id });
      toast.success("Cập nhật sản phẩm thành công");
    } else {
      // Create
      await axios.post("/api/games", data);
      toast.success("Thêm sản phẩm thành công");
    }
    router.push("/games");
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
        <label>Tên game</label>
        <input
          type="text"
          placeholder="Tên game"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Hình ảnh</label>
        <div className="flex gap-3">
          <label
            htmlFor="upload"
            className="flex bg-blue-400 p-3 cursor-pointer w-32 h-32 items-center gap-2 text-xl rounded-md text-white"
          >
            <AiOutlineCloudUpload size={30} /> Upload
          </label>
          <div className="flex gap-3 items-center">
            {images &&
              images.map((link) => (
                <div key={link}>
                  <img
                    src={link}
                    alt="img review"
                    width="300px"
                    className="rounded-md"
                  />
                </div>
              ))}
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
        <label>Giá bán (VND)</label>
        <input
          type="number"
          placeholder="Giá bán"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
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
