import React from "react";
import Footer from "../defaultLayout/footer/Footer";
import "../defaultLayout/style.scss";
import HeaderAdmin from "./Header";
function PrivateLayout({ children }) {
  return (
    <div className="leader">
      <HeaderAdmin />
      <marquee direction="left" className="text_header">
        Các bạn có thể ủng hộ tôi bằng cách xem phim thôi chỉ cần vậy là đủ rồi
        ! (Sign : Dinh Hoan FPT)
      </marquee>
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default PrivateLayout;
