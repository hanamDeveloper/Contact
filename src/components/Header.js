import React from "react";
import imgPath from "../css/Img/logo.png";

function Header() {
  return (
    <>
      <section>
        <div className="header">
          <img src={imgPath} alt="" />
        </div>
      </section>
    </>
  );
}

export default Header;
