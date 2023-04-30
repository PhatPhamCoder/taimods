import Layout from "@/components/Layout";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteCategoryPage() {
  const router = useRouter();
  const { id } = router.query;
  const [categoryInfo, setCategoryInfo] = useState("");
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/categories?id=" + id).then((res) => {
      setCategoryInfo(res.data);
    });
  }, []);

  function goBack() {
    router.push("/categories");
  }

  async function handleDelete() {
    await axios.delete("/api/categories/?_id=" + id);
    goBack();
  }
  return (
    <Layout>
      <Head>
        <title>Xóa Danh Mục</title>
        <meta property="og:title" content="Xóa Danh Mục" key="title" />
      </Head>
      <div className="w-full h-full items-center justify-center flex flex-col">
        <h1 className="font-bold text-2xl text-center">
          Bạn có muốn xóa danh mục <br /> {categoryInfo?.name}
        </h1>
        <div className="flex items-center gap-3 justify-center text-white font-bold mt-2">
          <button className="btn-red" onClick={handleDelete}>
            Có, hãy xóa
          </button>
          <button className="btn-cancel" onClick={goBack}>
            Không xóa nữa
          </button>
        </div>
      </div>
    </Layout>
  );
}
