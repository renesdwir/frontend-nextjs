import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-14 px-12 flex justify-between items-center bg-blue-500 text-white">
      <Link href={"/"} className="font-bold  uppercase">
        Datasintesa_Test
      </Link>
      <div className="flex  items-center gap-5">
        <Link href={"/"}>Home</Link>
        <Link href={"/showgraph"}>Graph</Link>
      </div>
    </div>
  );
};

export default Navbar;
