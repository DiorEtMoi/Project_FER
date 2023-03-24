import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import "./style.scss";
function Layout({ children }) {
  return (
    <div className="leader">
      <Header />
      <marquee direction="left" className="text_header">
        Các bạn có thể ủng hộ tôi bằng cách xem phim thôi chỉ cần vậy là đủ rồi
        ! (Sign : Dinh Hoan FPT)
      </marquee>
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
