import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Navbar({ active }: { active: string }) {
  return (
    <div className="text-lg p-4 px-16 fixed top-0 left-0 w-screen h-1/6 bg-white shadow-md flex justify-between overflow-hidden">
      <div className="flex w-full justify-center align-middle">
        <div className="w-3/5 align-middle font-bold bg-blue-900  rounded-2xl text-white flex items-center justify-center ">
          <h2 className="align-middle">Blox Logo</h2>
        </div>
        <div className="w-full flex align-middle justify-center my-auto">
          <Link href="/" className="w-fit text-blue-900">
            Products
          </Link>
        </div>
      </div>
      <div className="w-full flex justify-end px-6 align-middle">
        <Link
          href="/basket"
          className="text-blue-900 text-nowrap w-fit my-auto"
        >
          <p>
            Basket <FontAwesomeIcon icon={faCartShopping} className="px-2" />
          </p>
        </Link>
      </div>
    </div>
  );
}
