import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import peopleImage from "../assets/people.png";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: values.identifier,
          password: values.password,
        }),
      });

      console.log("🔹 Raw response object:", response);

      let data = {};
      try {
        data = await response.json();
        console.log("🔹 Parsed JSON data:", data);
      } catch (err) {
        console.warn("⚠️ Response is not valid JSON:", err);
      }

      console.log("🔹 Response status:", response.status);
      console.log("🔹 Response OK:", response.ok);

      if (response.ok) {
        message.success(data.message || "Login successful!");
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        message.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("🔥 Login error:", error);
      message.error("Server not reachable. Please try again later.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#ffffff",
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* === Login Card === */}
      <Card
        style={{
          width: "90%",
          maxWidth: 420,
          padding: "20px 10px",
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(8px)",
          zIndex: 2,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Title
            level={3}
            style={{
              color: "#1f2453",
              marginBottom: 0,
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Welcome Back
          </Title>
          <p style={{ color: "#555", marginTop: 6 }}>Login to your account</p>
        </div>

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="identifier"
            label={<span style={{ color: "#000000ff" }}>Email or Phone</span>}
            rules={[
              { required: true, message: "Please enter your email or phone!" },
            ]}
          >
            <Input placeholder="Enter your email or phone" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ color: "#000000ff" }}>Password</span>}
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" size="large" />
          </Form.Item>

          {/* 🔹 Forgot Password Link */}
          <div
            style={{
              textAlign: "right",
              marginBottom: 2,
            }}
          >
            <Button
              type="link"
              style={{
                padding: 0,
                color: "#1f2453",
                fontWeight: 500,
              }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </Button>
          </div>

          {/* 🔹 Login Button */}
          <Form.Item style={{ marginTop: 3 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{
                backgroundColor: "#ffdf98",
                color: "#1f2453",
                fontWeight: 600,
                border: "none",
                borderRadius: "8px",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Login
            </Button>
          </Form.Item>

          {/* 🔹 Resident Registration Button
          <Form.Item style={{ textAlign: "center", marginTop: 0 }}>
            <span style={{ color: "#555" }}>New resident?</span>{" "}
            <Button
              type="link"
              style={{
                padding: 0,
                color: "#1f2453",
                fontWeight: 500,
              }}
              onClick={() => navigate("/register")}
            >
              Register Here
            </Button> */}
          {/* </Form.Item> */}
        </Form>
      </Card>

      {/* === Background Image === */}
      <img
        src={peopleImage}
        alt="People"
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "auto",
          objectFit: "cover",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default Login;
