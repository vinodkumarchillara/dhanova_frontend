import React, { useState } from "react";
import {
  Layout,
  Table,
  Button,
  Dropdown,
  Menu,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
} from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Navbar from "../components/Navbar";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "../styles/Residents.css";
import { toast } from "react-toastify";

const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const Residents = () => {
  const [residents, setResidents] = useState([
    { key: "1", name: "Ravi Kumar", flat: "A-101", phone: "9876543210", email: "ravi.k@example.com" },
    { key: "2", name: "Priya Sharma", flat: "B-202", phone: "9876543220", email: "priya.s@example.com" },
    { key: "3", name: "Anil Reddy", flat: "C-303", phone: "9876543230", email: "anil.r@example.com" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ownershipType, setOwnershipType] = useState("");
  const [form] = Form.useForm();

  const handleMenuClick = (key, action) => {
    if (action === "edit") alert(`Edit resident: ${key}`);
    else if (action === "update") alert(`View resident: ${key}`);
    else if (action === "delete") setResidents(residents.filter((r) => r.key !== key));
  };

  const handleAddResident = async (values) => {
    console.log("✅ Submitted Resident Data:", values);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Resident registered successfully!");
        form.resetFields();
        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Registration failed!");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("Server not reachable. Try again later.");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name", align: "center" },
    { title: "Flat No", dataIndex: "flat", key: "flat", align: "center" },
    { title: "Phone", dataIndex: "phone", key: "phone", align: "center" },
    { title: "Email", dataIndex: "email", key: "email", align: "center" },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => handleMenuClick(record.key, "edit")}>
              Edit
            </Menu.Item>
            <Menu.Item key="update" icon={<EyeOutlined />} onClick={() => handleMenuClick(record.key, "update")}>
              View
            </Menu.Item>
            <Menu.Item
              key="delete"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleMenuClick(record.key, "delete")}
            >
              Delete
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
            <Button type="text" icon={<MoreOutlined style={{ fontSize: "18px" }} />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="residents-page">
      <Layout className="residents-layout">
        <Navbar />
        <Content className="residents-content">
          {/* ✅ Button at Top-Left */}
          <div
            className="residents-header"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "16px",
            }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="add-resident-btn"
              onClick={() => setIsModalOpen(true)}
              style={{
                backgroundColor: "#ffdf98",
                color: "#1f2453",
                fontWeight: 600,
                border: "none",
              }}
            >
              New Resident
            </Button>
          </div>

          {/* ✅ Residents Table */}
          <Table
            columns={columns}
            dataSource={residents}
            pagination={{ pageSize: 6 }}
            bordered
            className="residents-table"
          />

          {/* ✅ Add Resident Modal */}
          <Modal
            title="Add New Resident"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            centered
            width={750}
            bodyStyle={{ maxHeight: "70vh", overflowY: "auto", backgroundColor: "#fffef5" }}
          >
            <Form form={form} layout="vertical" onFinish={handleAddResident}>
              {/* Resident Info */}
              <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
                <Input placeholder="As per Aadhar" />
              </Form.Item>

              <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                <Select placeholder="Select Gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Date of Birth" name="dob" rules={[{ required: true }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="Phone Number" name="phone" rules={[{ required: true }]}>
                <Input placeholder="Enter Phone Number" type="number" />
              </Form.Item>

              <Form.Item label="Email ID" name="email" rules={[{ required: true, type: "email" }]}>
                <Input placeholder="Enter Email ID" />
              </Form.Item>

              <Form.Item label="Aadhar Number" name="aadhar" rules={[{ required: true }]}>
                <Input placeholder="Enter Aadhar Number" maxLength={12} />
              </Form.Item>

              <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                <TextArea placeholder="Enter Permanent Address" rows={3} />
              </Form.Item>

              <Form.Item label="Ownership Type" name="ownershipType" rules={[{ required: true }]}>
                <Select onChange={(value) => setOwnershipType(value)} placeholder="Select Ownership Type">
                  <Option value="Owner">Owner</Option>
                  <Option value="Tenant">Tenant</Option>
                </Select>
              </Form.Item>

              {ownershipType === "Tenant" && (
                <>
                  <Form.Item label="Tenant Start Date" name="tenantStartDate" rules={[{ required: true }]}>
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item label="Tenant End Date" name="tenantEndDate" rules={[{ required: true }]}>
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </>
              )}

              <Form.Item label="Photo Upload" name="photo">
                <Upload beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload Photo</Button>
                </Upload>
              </Form.Item>

              {/* ✅ Submit */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    backgroundColor: "#ffdf98",
                    color: "#1f2453",
                    fontWeight: 600,
                    border: "none",
                    height: "45px",
                    marginTop: "15px",
                  }}
                >
                  Submit Resident
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </div>
  );
};

export default Residents;
