import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between py-10">
      <Link href="/">
        <a className="text-xl font-semibold">Next JWT Auth</a>
      </Link>

      <nav>
        <Link href="/api/auth/signin">
          <a className="capitalize">Login</a>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
