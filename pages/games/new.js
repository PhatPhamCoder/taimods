import GameForm from "@/components/GameForm";
import Layout from "@/components/Layout";

export default function NewGame() {
  return (
    <Layout>
      <h1 className="my-2 text-xl font-bold">Thêm game mới</h1>
      <GameForm />
    </Layout>
  );
}
