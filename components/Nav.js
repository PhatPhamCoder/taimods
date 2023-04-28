/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineSetting, AiOutlineShop } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
export default function Nav() {
  const inactiveLink = "flex gap-1 p-1";
  const activeLink =
    inactiveLink +
    "flex items-center gap-2 text-large hover:text-red-500 uppercase font-bold bg-white text-black rounded-l-lg p-2";
  const router = useRouter();
  const pathname = router?.route?.split("/")[1];

  return (
    <aside className="text-white p-4 pr-0">
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
      </nav>
    </aside>
  );
}
