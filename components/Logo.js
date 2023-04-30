/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <img
        src="https://shop.taimods.com/files/assets/logomini.png"
        alt="Logo-header"
        width="100px"
      />
    </Link>
  );
}
