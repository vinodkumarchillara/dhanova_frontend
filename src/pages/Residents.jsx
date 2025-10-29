import React, { useState } from "react";
import {
  Layout,
  Table,
  Button,
  Dropdown,
  Menu,
  Typography,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  InputNumber,
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

const { Title } = Typography;
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
    else if (action === "update") alert(`Update resident: ${key}`);
    else if (action === "delete") setResidents(residents.filter((r) => r.key !== key));
  };

  const handleAddResident = (values) => {
    const newResident = {
      key: String(residents.length + 1),
      name: values.fullName,
      flat: values.flatNumber,
      phone: values.mobile,
      email: values.email,
    };
    setResidents([...residents, newResident]);
    form.resetFields();
    setIsModalOpen(false);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Flat No", dataIndex: "flat", key: "flat" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
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
              Update
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
          {/* Header Section */}
          <div className="residents-header">
            <Title level={3} className="residents-title">
              Residents
            </Title>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="add-resident-btn"
              onClick={() => setIsModalOpen(true)}
            >
              New Resident
            </Button>
          </div>

          {/* Residents Table */}
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
            bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAddResident}
              style={{
                backgroundColor: "#fffbea",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #ffdf98",
              }}
            >
              {/* 🏠 Resident Info */}
              <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
                <Input placeholder="As per Aadhar" />
              </Form.Item>

              <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                <Select placeholder="Select Gender">
                  <Option>Male</Option>
                  <Option>Female</Option>
                  <Option>Other</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Date of Birth" name="dob" rules={[{ required: true }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="Mobile Number" name="mobile" rules={[{ required: true }]}>
                <Input placeholder="9876543210" type="number" />
              </Form.Item>

              <Form.Item label="Alternate Number" name="alternateNumber">
                <Input placeholder="Optional" type="number" />
              </Form.Item>

              <Form.Item label="Email ID" name="email" rules={[{ required: true, type: "email" }]}>
                <Input placeholder="example@gmail.com" />
              </Form.Item>

              <Form.Item label="Aadhar Number" name="aadhar" rules={[{ required: true }]}>
                <Input placeholder="1234 5678 9012" maxLength={12} />
              </Form.Item>

              <Form.Item label="Address (Permanent)" name="address" rules={[{ required: true }]}>
                <TextArea placeholder="Flat No. 102, Block A, Dhanova Enclave" rows={3} />
              </Form.Item>

              <Form.Item label="Occupation" name="occupation">
                <Input placeholder="Software Engineer" />
              </Form.Item>

              <Form.Item label="Ownership Type" name="ownershipType" rules={[{ required: true }]}>
                <Select
                  placeholder="Select Ownership Type"
                  onChange={(value) => setOwnershipType(value)}
                >
                  <Option>Owner</Option>
                  <Option>Tenant</Option>
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

              <Form.Item label="ID Proof Upload" name="idProof">
                <Upload beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload ID Proof</Button>
                </Upload>
              </Form.Item>

              <Form.Item label="Block / Tower" name="block" rules={[{ required: true }]}>
                <Select placeholder="Select Block">
                  <Option>A</Option>
                  <Option>B</Option>
                  <Option>C</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Flat Number" name="flatNumber" rules={[{ required: true }]}>
                <Input placeholder="102" />
              </Form.Item>

              <Form.Item label="Floor" name="floor" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: "100%" }} placeholder="1" />
              </Form.Item>

              <Form.Item label="Parking Slots" name="parkingSlots">
                <InputNumber min={0} style={{ width: "100%" }} placeholder="2" />
              </Form.Item>

              <Form.Item label="Vehicle Details" name="vehicles">
                <TextArea placeholder="TS09AB1234 (Add multiple if needed)" rows={2} />
              </Form.Item>

              <Form.Item label="Ownership Status" name="ownershipStatus" rules={[{ required: true }]}>
                <Select placeholder="Select Status">
                  <Option>Self</Option>
                  <Option>Rented</Option>
                </Select>
              </Form.Item>

              {/* 👨‍👩‍👧 Family Info */}
{/* 👨‍👩‍👧 Family Info */}
<h3 style={{ color: "#1f2453", borderBottom: "2px solid #ffdf98", paddingBottom: 5 }}>
  Family Member Information
</h3>

<Form.List name="familyMembers">
  {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, ...restField }, index) => (
        <div
          key={key}
          style={{
            border: "1px solid #ffdf98",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
            background: "#fffef5",
          }}
        >
          <h4 style={{ color: "#1f2453", marginBottom: 10 }}>Family Member {index + 1}</h4>

          <Form.Item
            {...restField}
            label="Name"
            name={[name, "name"]}
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Sujatha Kumar" />
          </Form.Item>

          <Form.Item
            {...restField}
            label="Relation"
            name={[name, "relation"]}
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Relation">
              <Option>Spouse</Option>
              <Option>Son</Option>
              <Option>Daughter</Option>
              <Option>Parent</Option>
              <Option>Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            {...restField}
            label="Gender"
            name={[name, "gender"]}
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Gender">
              <Option>Male</Option>
              <Option>Female</Option>
              <Option>Other</Option>
            </Select>
          </Form.Item>

          <Form.Item {...restField} label="Age" name={[name, "age"]}>
            <InputNumber min={0} style={{ width: "100%" }} placeholder="35" />
          </Form.Item>

          <Form.Item {...restField} label="Mobile Number" name={[name, "mobile"]}>
            <Input placeholder="9876504321" type="number" />
          </Form.Item>

          <Form.Item {...restField} label="Aadhar Number" name={[name, "aadhar"]}>
            <Input placeholder="1234 5678 9013" maxLength={12} />
          </Form.Item>

          <Form.Item {...restField} label="Photo Upload" name={[name, "photo"]}>
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>

          <Form.Item {...restField} label="Remarks" name={[name, "remarks"]}>
            <TextArea placeholder="Elderly / Special Notes" rows={2} />
          </Form.Item>

          <Button
            type="dashed"
            danger
            onClick={() => remove(name)}
            block
            style={{
              marginTop: "10px",
              color: "#b30000",
              borderColor: "#b30000",
            }}
          >
            Remove Family Member
          </Button>
        </div>
      ))}

      <Form.Item>
        <Button
          type="dashed"
          onClick={() => add()}
          block
          icon={<PlusOutlined />}
          style={{
            borderColor: "#ffdf98",
            color: "#1f2453",
            fontWeight: 500,
          }}
        >
          Add Family Member
        </Button>
      </Form.Item>
    </>
  )}
</Form.List>

              {/* 🚨 Emergency Info */}
              <h3 style={{ color: "#1f2453", borderBottom: "2px solid #ffdf98", paddingBottom: 5 }}>
                Emergency Contact Information
              </h3>

              <Form.Item label="Emergency Contact Name" name="emergencyName" rules={[{ required: true }]}>
                <Input placeholder="Rajesh Kumar" />
              </Form.Item>

              <Form.Item
                label="Emergency Contact Number"
                name="emergencyNumber"
                rules={[{ required: true }]}
              >
                <Input placeholder="9876549876" type="number" />
              </Form.Item>

              <Form.Item label="Emergency Relation" name="emergencyRelation" rules={[{ required: true }]}>
                <Select placeholder="Select Relation">
                  <Option>Brother</Option>
                  <Option>Friend</Option>
                  <Option>Other</Option>
                </Select>
              </Form.Item>

              {/* 🔐 System Info */}
              <h3 style={{ color: "#1f2453", borderBottom: "2px solid #ffdf98", paddingBottom: 5 }}>
                System Information
              </h3>

              <Form.Item label="Access Card Number" name="accessCard">
                <Input placeholder="GC-102-A" />
              </Form.Item>

              <Form.Item label="QR Code" name="qrCode">
                <Input placeholder="Auto-generated" disabled />
              </Form.Item>

              <Form.Item label="RFID Tag" name="rfidTag">
                <Input placeholder="Auto-generated" disabled />
              </Form.Item>

              <Form.Item label="Remarks" name="remarks">
                <TextArea placeholder="Vegetarian family / Other notes" rows={2} />
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
