/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <Head>
        <title>Admin Dashboard</title>
        <meta property="og:title" content="Admin Dashboard" key="title" />
      </Head>
      <div className="text-black flex justify-end items-end gap-2 top-0">
        <div>
          <img
            src={session?.user?.image}
            alt="Avatar"
            width="50px"
            height="50px"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          Hello, {session?.user?.name || "Admin"}
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
