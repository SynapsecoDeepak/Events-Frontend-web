import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
    const rowsDetails = useSelector(
    (state) => state.event?.eventPublicData?.data
  );

  return (
    <nav
      className="head_nav"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding:"0px 30px"
      }}
    >
      <div className="logo">
        <img src={rowsDetails?.event_banner} alt="logo" />
      </div>
      <div className="link">
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            gap:"30px",
            justifyContent: "space-between",
            alignItems: "center",
            listStyleType: "none",
            color:"#033333",
            fontSize:"20px",
          }}
        >
          <li>Home</li>
          <li>Schedule</li>
          <li>Sponsors</li>
          <li>Speakers</li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
