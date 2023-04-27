import GameForm from "@/components/GameForm";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditGamePage() {
  const [gameInfo, setGameInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/games?id=" + id).then((res) => {
      setGameInfo(res.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1 className="my-2 text-xl font-bold">Chỉnh thông tin sản phẩm</h1>
      {gameInfo && <GameForm {...gameInfo} />}
    </Layout>
  );
}
