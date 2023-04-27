/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (!session) return;
  return (
    <Layout>
      <div className="text-black flex justify-end items-end gap-2">
        <div>
          <img
            src={session.user.image}
            alt="Avatar"
            width="50px"
            height="50px"
          />
        </div>
        <div className="flex flex-col">
          Hello, {session.user.name || "Admin"}
          <button
            className="bg-red-500 p-2 rounded-lg text-white"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    </Layout>
  );
}
