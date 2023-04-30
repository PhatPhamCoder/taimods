/* eslint-disable react/jsx-key */
import Layout from "@/components/Layout";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Categories() {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fecthCategories();
  }, []);

  function fecthCategories() {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }

  async function SaveCategories(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
      setOpen(false);
      toast.success("Cập nhật thành công");
    } else {
      await axios.post("/api/categories", data);
      toast.success("Thêm danh mục thành công");
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fecthCategories();
  }

  function editCategory(category) {
    setOpen(true);
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      })),
    );
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNamehange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuehange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setCategories((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  function handleCancel() {
    setOpen(false);
    setProperties([]);
    setEditedCategory(null);
    setParentCategory("");
  }

  return (
    <>
      <Layout>
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
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {editedCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
          {!editedCategory ? (
            <AiFillPlusCircle
              className="cursor-pointer"
              onClick={() => setOpen(true)}
            />
          ) : (
            ""
          )}
        </h1>
        <hr className="mb-3" />
        {open === true && (
          <form onSubmit={SaveCategories}>
            <label>Tên danh mục</label>
            <div className="">
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
              </div>
              <div className="mb-4 mt-2">
                <label className="block">Thuộc tính</label>
                <button
                  onClick={addProperty}
                  type="button"
                  className="btn-default text-sm mb-2"
                >
                  Thêm thuộc tính
                </button>
                {properties.length > 0 &&
                  properties.map((property, index) => (
                    <div className="flex gap-1" key={index}>
                      <input
                        type="text"
                        onChange={(ev) =>
                          handlePropertyNamehange(
                            index,
                            property,
                            ev.target.value,
                          )
                        }
                        value={property?.name}
                        placeholder="Tên thuộc tính (Ví dụ: Mod Map, Mod xe khách)"
                      />
                      <input
                        type="text"
                        onChange={(ev) =>
                          handlePropertyValuehange(
                            index,
                            property,
                            ev.target.value,
                          )
                        }
                        value={property?.values}
                        placeholder="Giá trị, dấu phẩy tách biệt"
                      />
                      <button
                        onClick={() => removeProperty(index)}
                        type="button"
                        className="btn-red h-9"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
              </div>
              <div className="flex gap-2 mt-2">
                <button type="submit" className="btn-red w-[fit-content] h-10">
                  <p className="flex-nowrap flex">
                    {editedCategory ? "Cập nhật" : "Thêm"}
                  </p>
                </button>
                <button className="btn-cancel h-10" onClick={handleCancel}>
                  Hủy
                </button>
              </div>
            </div>
          </form>
        )}

        <table className="basic mt-2">
          <thead className="basic text-center">
            <tr>
              <td>Tên danh mục</td>
              <td>Danh mục cha</td>
              <td className="w-[200px]">Chức năng</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr>
                  <td>{category?.name}</td>
                  <td>
                    {category?.parent
                      ? category?.parent.name
                      : "Không có danh mục cha"}
                  </td>
                  <td className="flex gap-2 items-center w-[200px] justify-center">
                    <button
                      onClick={() => editCategory(category)}
                      type="button"
                      className="items-center flex gap-2 bg-blue-600 text-white px-3 py-2 font-bold rounded-lg"
                    >
                      <FiEdit size={20} />
                    </button>
                    <Link
                      href={"/categories/delete/" + category?._id}
                      className="bg-red-200 text-red-600"
                    >
                      <AiFillDelete size={20} />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Layout>
    </>
  );
}
