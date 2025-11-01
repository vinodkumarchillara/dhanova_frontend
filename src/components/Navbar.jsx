import React from "react";
import { Menu, Dropdown, Avatar, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  TeamOutlined,
  BellOutlined,
  ApartmentOutlined,
  IdcardOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import dhanovaLogo from "../assets/dhanova_logo.png"; // ✅ adjust path if needed

const Navbar = () => {
  const navigate = useNavigate();

  // ✅ Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const fullname = user.fullname || "User";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleMenuClick = (e) => {
    if (e.key === "residents") navigate("/residents");
    if (e.key === "security") navigate("/security");
    if (e.key === "amenities") navigate("/amenities");
    if (e.key === "employees") navigate("/employees");
    if (e.key === "adminEvents") navigate("/events/admin");
    if (e.key === "residentBookings") navigate("/events/residents");
  };

  const userMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span>Profile</span>,
          icon: <UserOutlined />,
        },
        { key: "2", type: "divider" },
        {
          key: "3",
          label: <span style={{ color: "red" }}>Logout</span>,
          icon: <LogoutOutlined style={{ color: "red" }} />,
          onClick: handleLogout,
        },
      ]}
    />
  );

  // ✅ Events submenu
  const eventSubMenu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          key: "adminEvents",
          label: "Admin Events",
          icon: <CalendarOutlined />,
        },
        {
          key: "residentBookings",
          label: "Resident Bookings",
          icon: <BellOutlined />,
        },
      ]}
    />
  );

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <header
        style={{
          width: "100%",
          maxWidth: "1200px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          height: "70px",
          borderRadius: "12px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* === Left Section (Logo + Dhanova) === */}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <img
            src={dhanovaLogo}
            alt="Dhanova Logo"
            style={{ width: "40px", height: "40px", borderRadius: "8px" }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#1f2453",
              letterSpacing: "0.5px",
            }}
          >
            Dhanova
          </span>
        </button>

        {/* === Center Menu === */}
        <Menu
          mode="horizontal"
          style={{
            border: "none",
            background: "transparent",
            flex: 1,
            justifyContent: "center",
            display: "flex",
            gap: "30px",
          }}
          onClick={handleMenuClick}
          items={[
            { key: "residents", icon: <TeamOutlined />, label: "Residents" },
            { key: "security", icon: <IdcardOutlined />, label: "Security" },
            {
              key: "events",
              icon: <BellOutlined />,
              label: (
                <Dropdown overlay={eventSubMenu} trigger={["click"]}>
                  <span>
                    Events <DownOutlined style={{ fontSize: 12 }} />
                  </span>
                </Dropdown>
              ),
            },
            { key: "amenities", icon: <ApartmentOutlined />, label: "Amenities" },
            { key: "employees", icon: <UserOutlined />, label: "Employees" },
          ]}
        />

        {/* === Right User Dropdown === */}
        <Dropdown overlay={userMenu} placement="bottomRight" trigger={["click"]}>
          <Space
            style={{
              cursor: "pointer",
              color: "#1f2453",
              fontWeight: 500,
              fontSize: "15px",
            }}
          >
            <Avatar
              style={{
                backgroundColor: "#ffdf98",
                color: "#1f2453",
                fontWeight: 600,
              }}
            >
              {fullname.charAt(0).toUpperCase()}
            </Avatar>
            <span>{fullname}</span>
            <DownOutlined style={{ fontSize: 12 }} />
          </Space>
        </Dropdown>
      </header>
    </div>
  );
};

export default Navbar;
