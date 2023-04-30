import { useSession, signIn } from "next-auth/react";
import Nav from "@/components/Nav";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  console.log(showNav);
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-yellow-200 h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="text-white text-2xl p-2 rounded-lg bg-sky-500 font-bold flex items-center justify-center gap-2 mx-auto"
          >
            <FcGoogle size={40} />
            Login With Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-blue-900 min-h-screen flex relative">
      {showNav === true ? (
        <Nav show={showNav} />
      ) : (
        <div className="hidden md:block">
          <Nav show={showNav} />
        </div>
      )}

      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <AiOutlineMenuUnfold
            onClick={() => setShowNav(true)}
            className="top-0 mb-0 cursor-pointer md:hidden block"
            size={30}
          />
          <div className="h-[fit-content] md:hidden block px-2 py-1 mr-2 bg-blue-600 w-[fit-content] rounded-lg text-center">
            <Logo className="mx-auto" />
          </div>
        </div>
        {children}
      </div>
      <p
        className="flex items-end justify-start absolute md:text-white text-black left-[20px]"
        style={{ bottom: "10px" }}
      >
        &copy; {new Date().getFullYear()} Powered By Ptech
      </p>
    </div>
  );
}
