/* eslint-disable react/jsx-key */
import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get("/api/games").then((res) => {
      setGames(res.data);
    });
  }, []);

  return (
    <Layout>
      <Link
        href={"/games/new"}
        className="bg-blue-900 py-2 px-3 gap-2 text-white rounded-lg font-bold flex items-center w-[fit-content]"
      >
        <AiOutlinePlus /> Add new
      </Link>
      <table className="mt-2">
        <thead className="text-center">
          <tr>
            <td>Mã sản phẩm</td>
            <td>Tên sản phẩm</td>
            <td>Chức năng</td>
          </tr>
        </thead>
        <tbody>
          {games?.map((item) => (
            <tr>
              <td className="text-center">
                {item?._id.slice(-8).toUpperCase()}
              </td>
              <td>{item.title}</td>
              <td className="flex gap-2 items-center justify-center">
                <Link
                  href={"/games/edit/" + item?._id}
                  className="items-center bg-blue-600 text-white"
                >
                  <FiEdit size={20} /> Edit
                </Link>
                <Link
                  href={"/games/delete/" + item?._id}
                  className="items-center bg-yellow-300 text-red-600"
                >
                  <AiFillDelete size={20} /> Xóa
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
