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

  const onFinish = (values) => {
    console.log("Login values:", values);

    // ✅ Dummy login validation
    if (values.username === "admin" && values.password === "1234") {
      message.success("Login successful!");
      navigate("/dashboard");
    } else {
      message.error("Invalid username or password!");
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
          padding: "40px 30px",
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.7)", // translucent white
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

        <Form name="login" layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name="username"
            label={<span style={{ color: "#1f2453" }}>Username</span>}
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input placeholder="Enter your username" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ color: "#1f2453" }}>Password</span>}
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" size="large" />
          </Form.Item>

          <Form.Item style={{ marginTop: 28 }}>
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
        </Form>
      </Card>

      {/* === Background Image at Bottom === */}
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
