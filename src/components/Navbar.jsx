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
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleMenuClick = (e) => {
    if (e.key === "residents") navigate("/residents");
    if (e.key === "security") navigate("/security");
    if (e.key === "events") navigate("/events");
    if (e.key === "amenities") navigate("/amenities");
    if (e.key === "employees") navigate("/employees");
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
        {/* === Left Section (Clickable Dhanova) === */}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#1f2453",
            letterSpacing: "0.5px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Dhanova
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
            { key: "events", icon: <BellOutlined />, label: "Events" },
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
              VK
            </Avatar>
            <span>Vinod Kumar</span>
            <DownOutlined style={{ fontSize: 12 }} />
          </Space>
        </Dropdown>
      </header>
    </div>
  );
};

export default Navbar;
