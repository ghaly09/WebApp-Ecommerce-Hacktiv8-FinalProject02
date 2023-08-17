import Link from "next/link";
import React from "react";

export default function Navlink({ link, href, item, isMobile }) {
  console.log(link);
  if (isMobile) {
    return (
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        {link.map((value, index) => (
          <li>
            <Link href={value.href} key={index}>
              {value.item}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="menu menu-horizontal px-1">
      <li>
        <Link href={href}>{item}</Link>
      </li>
    </ul>
  );
}
