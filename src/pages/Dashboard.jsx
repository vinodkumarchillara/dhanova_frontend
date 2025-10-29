import React from "react";
import { Layout } from "antd";
import Navbar from "../components/Navbar";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

const { Content } = Layout;

const Dashboard = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
        margin: 0,
        padding: 0,
        backgroundColor: "#f7f7f7",
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: "#f7f7f7",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* ✅ Floating Navbar */}
        <Navbar />

        {/* ✅ Page Content */}
        <Content
          style={{
            marginTop: "120px", // leave space for floating navbar
            padding: "40px",
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              color: "#1f2453",
              fontWeight: 600,
              fontSize: "28px",
              marginBottom: "12px",
            }}
          >
            🎉 Welcome to Your Dashboard
          </h1>
          <p
            style={{
              color: "#555",
              fontSize: "16px",
              maxWidth: "600px",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Here you can manage your account, view reports, and explore insights.
          </p>
        </Content>
      </Layout>
    </div>
  );
};

export default Dashboard;
