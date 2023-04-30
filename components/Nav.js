/* eslint-disable @next/next/no-img-element */
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineSetting, AiOutlineShop } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";

export default function Nav({ show }) {
  const inactiveLink = "flex gap-1 p-1 text-white";
  const activeLink =
    inactiveLink +
    "flex items-center gap-2 text-large rounded-md hover:text-red-500 uppercase font-bold bg-white text-red-500 rounded-l-lg p-2";
  const router = useRouter();
  const pathname = router?.route?.split("/")[1];
  async function logout() {
    await router.push("/");
    await signOut();
  }

  return (
    <aside
      className={
        (show ? "-left-0" : "-left-full") +
        "text-white p-4 800px:fixed 800px:w-full 800px:h-full md:static md:w-auto"
      }
    >
      <Link href="/" className="flex gap-1 mb-4 mr-4">
        <img
          src="https://shop.taimods.com/files/assets/logomini.png"
          alt="Logo-header"
          width="200px"
        />
      </Link>
      <nav className="flex flex-col gap-3">
        <Link
          href={"/"}
          className={pathname === "" ? activeLink : inactiveLink}
        >
          <AiOutlineHome size={20} />
          Dashboard
        </Link>
        <Link
          href={"/games"}
          className={pathname === "games" ? activeLink : inactiveLink}
        >
          <AiOutlineShop size={20} />
          Sản phẩm
        </Link>
        <Link
          href={"/categories"}
          className={pathname === "categories" ? activeLink : inactiveLink}
        >
          <AiOutlineShop size={20} />
          Danh mục
        </Link>
        <Link
          href={"/orders"}
          className={pathname === "orders" ? activeLink : inactiveLink}
        >
          <BsFillCartCheckFill size={20} />
          Đơn hàng
        </Link>
        <Link
          href={"/settings"}
          className={pathname === "settings" ? activeLink : inactiveLink}
        >
          <AiOutlineSetting size={20} />
          Cài đặt
        </Link>
        <button
          onClick={logout}
          className={pathname === "logout" ? activeLink : inactiveLink}
        >
          <HiOutlineLogout size={20} />
          Đăng xuất
        </button>
      </nav>
    </aside>
  );
}
