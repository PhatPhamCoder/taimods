import GameForm from "@/components/GameForm";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function NewGame() {
  return (
    <>
      <Head>
        <title>Thêm sản phẩm</title>
        <meta property="og:title" content="Thêm sản phẩm" key="title" />
      </Head>
      <Layout>
        <h1 className="my-2 text-xl font-bold">Thêm game mới</h1>
        <GameForm />
      </Layout>
    </>
  );
}
