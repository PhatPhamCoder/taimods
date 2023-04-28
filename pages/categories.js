/* eslint-disable react/jsx-key */
import Layout from "@/components/Layout";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { withSwal } from "react-sweetalert2";

export default function Categories() {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

  function fecthCategories() {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }

  useEffect(() => {
    fecthCategories();
  }, []);

  async function SaveCategories(ev) {
    ev.preventDefault();
    const data = { name, parentCategory };
    if (editedCategory) {
      await axios.put("/api/categories", { ...data, _id: editedCategory?._id });
      toast.success("Cập nhật thành công");
    } else {
      await axios.post("/api/categories", data);
      toast.success("Thêm danh mục thành công");
    }
    setName("");
    fecthCategories();
  }

  function editCategory(category) {
    setOpen(true);
    setEditedCategory(category);
    setName(category?.name);
    setParentCategory(category?.parent?._id);
  }

  // function deleteCategory(category) {
  //   swal
  //     .fire({
  //       title: `Bạn có chắc?`,
  //       text: `Muốn xóa danh mục ${category.name} không !!`,
  //       showCancelButton: true,
  //       cancelButtontext: "Hủy",
  //       confirmButtontext: "Đồng ý",
  //       confirmButtonColor: "#d55",
  //       reverseButtons: true,
  //     })
  //     .then(async (result) => {
  //       if (result.isConfirmed) {
  //         const { _id } = category;
  //         await axios.delete("/api/categories/?_id=" + _id);
  //         fecthCategories();
  //       }
  //     });
  // }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Head>
        <title>Danh mục</title>
        <meta property="og:title" content="Danh mục" key="title" />
      </Head>
      <Layout>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {editedCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
          <AiFillPlusCircle
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </h1>
        <hr className="mb-3" />
        {open === true && (
          <form onSubmit={SaveCategories}>
            <label>Tên danh mục</label>
            <div className="flex gap-2 mt-2 h-10 items-center justify-between">
              <select
                className="p-2 mb-0"
                onChange={(ev) => setParentCategory(ev.target.value)}
                value={parentCategory}
              >
                <option value="">Chọn danh mục cha</option>
                {categories.length &&
                  categories.map((item) => (
                    <option value={item?._id}>{item?.name}</option>
                  ))}
              </select>
              <input
                type="text"
                onChange={(ev) => setName(ev.target.value)}
                placeholder="Nhập tên danh mục ở đây ....."
                className="h-10 mb-0"
                value={name}
              />
              <button className="btn-red w-[fit-content] h-10">
                <p className="flex-nowrap flex">
                  {editedCategory ? "Update" : "Thêm"}
                </p>
              </button>
              <button
                className="btn-cancel h-10"
                onClick={() => setOpen(false)}
              >
                Hủy
              </button>
            </div>
          </form>
        )}
        <table className="basic mt-2">
          <thead className="basic text-center">
            <tr>
              <td>Tên danh mục</td>
              <td>Danh mục cha</td>
              <td>Chức năng</td>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr>
                <td>{category?.name}</td>
                <td>
                  {category?.parent ? category?.parent.name : "Danh mục cha"}
                </td>
                <td className="flex gap-2 items-center justify-center">
                  <button
                    onClick={() => editCategory(category)}
                    className="items-center flex gap-2 bg-blue-600 text-white px-3 py-2 font-bold rounded-lg"
                  >
                    <FiEdit size={20} /> Edit
                  </button>
                  {/* <button
                    onClick={() => deleteCategory(category)}
                    className="items-center flex gap-2 px-3 py-2 font-bold rounded-lg bg-yellow-300 text-red-600"
                  >
                    <AiFillDelete size={20} /> Xóa
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </>
  );
}

// export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
