import * as React from "react";

const MenuIcon: React.FC<React.SVGProps<SVGElement>> = ({
  width = 800,
  height = 800,
  color = "#000"
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16M4 18h16"
    ></path>
  </svg>
);

export default React.memo(MenuIcon);
