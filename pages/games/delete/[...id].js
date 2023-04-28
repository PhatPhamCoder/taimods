import Layout from "@/components/Layout";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteGamePage() {
  const router = useRouter();
  const { id } = router.query;
  const [gameInfo, setGameInfo] = useState();
  useEffect(() => {
    if (!id) {
      reuturn;
    }
    axios.get("/api/games?id=" + id).then((res) => {
      setGameInfo(res.data);
    });
  }, []);

  function goBack() {
    router.push("/games");
  }

  async function handleDelete() {
    await axios.delete("/api/games/?id=" + id);
    goBack();
  }
  return (
    <>
      <Head>
        <title>Xóa sản phẩm</title>
        <meta property="og:title" content="Xóa sản phẩm" key="title" />
      </Head>

      <Layout>
        <div className="w-full h-full items-center justify-center flex flex-col">
          <h1 className="font-bold text-2xl text-center">
            Bạn có muốn xóa sản phẩm <br /> {gameInfo?.title}
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
    </>
  );
}
