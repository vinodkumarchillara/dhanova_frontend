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
import { toast } from "react-toastify";
import { validationRules } from "../utils/validationRules"; 

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

const handleAddResident = async (values) => {
  try {
    console.log("✅ Submitted Resident Data:", values);

    // ✅ Create FormData to send both text + file fields
    const formData = new FormData();

    // Loop through all values and append to FormData
    Object.keys(values).forEach((key) => {
      // For normal fields
      if (
        key !== "photo" &&
        key !== "idProof" &&
        key !== "familyMembers" // handle separately below
      ) {
        if (values[key]) formData.append(key, values[key]);
      }
    });

    // ✅ Handle uploads (photo and ID proof)
    if (values.photo && values.photo.fileList && values.photo.fileList[0]) {
      formData.append("photo", values.photo.fileList[0].originFileObj);
    }

    if (values.idProof && values.idProof.fileList && values.idProof.fileList[0]) {
      formData.append("idProof", values.idProof.fileList[0].originFileObj);
    }

    // ✅ Handle family members — convert to JSON string
    if (values.familyMembers && values.familyMembers.length > 0) {
      formData.append("familyMembers", JSON.stringify(values.familyMembers));
    }

    // ✅ Send form data to backend
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: formData, // ✅ no headers, browser sets boundary automatically
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message || "Resident registered successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      form.resetFields();
      setIsModalOpen(false);
    } else {
      toast.error(data.message || "Registration failed!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  } catch (err) {
    console.error("❌ Error:", err);
    toast.error("Server not reachable. Try again later.", {
      position: "top-right",
      autoClose: 3000,
    });
  }
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
              style={{ backgroundColor: "#fffef5" }}
            >
              {/* ================= Resident Info ================= */}
              <Form.Item label="Full Name" name="fullName" rules={validationRules.fullName}>
                <Input placeholder="As per Aadhar" />
              </Form.Item>

              <Form.Item label="Gender" name="gender" rules={validationRules.gender}>
                <Select placeholder="Select Gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Date of Birth" name="dob" rules={validationRules.dob}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="Phone Number" name="phone" rules={validationRules.phone}>
                <Input placeholder="Please Enter Phone Number" type="number" />
              </Form.Item>

              <Form.Item label="Alternate Number" name="alternateNumber" rules={validationRules.alternateNumber}>
                <Input placeholder="Please Enter Alternate Phone Number" type="number" />
              </Form.Item>

              <Form.Item label="Email ID" name="email" rules={validationRules.email}>
                <Input placeholder="Please Enter Email Id" />
              </Form.Item>

              <Form.Item label="Aadhar Number" name="aadhar" rules={validationRules.aadhar}>
                <Input placeholder="Please Enter Aadhar Card Number" maxLength={12} />
              </Form.Item>

              <Form.Item label="Address (Permanent)" name="address" rules={validationRules.address}>
                <TextArea placeholder="Please Enter Your Address" rows={3} />
              </Form.Item>

              <Form.Item label="Occupation" name="occupation" rules={validationRules.occupation}>
                <Input placeholder="Please Enter Your Occupation" />
              </Form.Item>

              <Form.Item label="Ownership Type" name="ownershipType" rules={validationRules.ownershipType}>
                <Select placeholder="Select Ownership Type" onChange={(value) => setOwnershipType(value)}>
                  <Option value="Owner">Owner</Option>
                  <Option value="Tenant">Tenant</Option>
                </Select>
              </Form.Item>

              {ownershipType === "Tenant" && (
                <>
                  <Form.Item label="Tenant Start Date" name="tenantStartDate" rules={validationRules.tenantStartDate}>
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item label="Tenant End Date" name="tenantEndDate" rules={validationRules.tenantEndDate}>
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </>
              )}

              <Form.Item label="Photo Upload" name="photo" rules={validationRules.photoUpload}>
                <Upload beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload Photo</Button>
                </Upload>
              </Form.Item>

              <Form.Item label="ID Proof Upload" name="idProof" rules={validationRules.idProofUpload}>
                <Upload beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload ID Proof</Button>
                </Upload>
              </Form.Item>

              <Form.Item label="Ownership Status" name="ownershipStatus" rules={validationRules.ownershipStatus}>
                <Select placeholder="Select Status">
                  <Option value="Self">Self</Option>
                  <Option value="Rented">Rented</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Flat Number" name="flatNumber" rules={validationRules.flatNumber}>
                <Input placeholder="Please Enter Flat Number" />
              </Form.Item>

              <Form.Item label="Floor" name="floor" rules={validationRules.floor}>
                <InputNumber min={0} style={{ width: "100%" }} placeholder="Please Enter Your Floor" />
              </Form.Item>

              <Form.Item label="Parking Slots" name="parkingSlots" rules={validationRules.parkingSlots}>
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="Vehicle Details" name="vehicles" rules={validationRules.vehicleDetails}>
                <TextArea placeholder="Please Enter Vehicle Details" rows={2} />
              </Form.Item>

              {/* ================= Family Info ================= */}
              <h3
                style={{
                  color: "#1f2453",
                  borderBottom: "2px solid #ffdf98",
                  paddingBottom: 5,
                  marginTop: 30,
                }}
              >
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
                        <h4 style={{ color: "#1f2453", marginBottom: 10 }}>
                          Family Member {index + 1}
                        </h4>

                        <Form.Item {...restField} label="Name" name={[name, "name"]} rules={validationRules.familyMemberName}>
                          <Input placeholder="Please Enter Name" />
                        </Form.Item>

                        <Form.Item {...restField} label="Relation" name={[name, "relation"]} rules={validationRules.familyRelation}>
                          <Select placeholder="Select Relation">
                            <Option value="Spouse">Spouse</Option>
                            <Option value="Son">Son</Option>
                            <Option value="Daughter">Daughter</Option>
                            <Option value="Parent">Parent</Option>
                            <Option value="Other">Other</Option>
                          </Select>
                        </Form.Item>

                        <Form.Item {...restField} label="Gender" name={[name, "gender"]} rules={validationRules.familyGender}>
                          <Select placeholder="Select Gender">
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                            <Option value="Other">Other</Option>
                          </Select>
                        </Form.Item>

                        <Form.Item {...restField} label="Age" name={[name, "age"]} rules={validationRules.familyAge}>
                          <InputNumber min={0} style={{ width: "100%" }} placeholder="Please Enter Age" />
                        </Form.Item>

                        <Form.Item {...restField} label="Mobile Number" name={[name, "mobile"]} rules={validationRules.familyMobile}>
                          <Input placeholder="Please Enter Phone Number" type="number" />
                        </Form.Item>

                        <Form.Item {...restField} label="Aadhar Number" name={[name, "aadhar"]} rules={validationRules.familyAadhar}>
                          <Input placeholder="Please Enter Aadhar Number" maxLength={12} />
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

              {/* ================= Emergency Info ================= */}
              <h3
                style={{
                  color: "#1f2453",
                  borderBottom: "2px solid #ffdf98",
                  paddingBottom: 5,
                  marginTop: 30,
                }}
              >
                Emergency Contact Information
              </h3>

              <Form.Item label="Emergency Contact Name" name="emergencyName" rules={validationRules.emergencyName}>
                <Input placeholder="Please Enter Name" />
              </Form.Item>

              <Form.Item label="Emergency Contact Number" name="emergencyNumber" rules={validationRules.emergencyNumber}>
                <Input placeholder="Please Enter Phone Number" type="number" />
              </Form.Item>

              <Form.Item label="Emergency Relation" name="emergencyRelation" rules={validationRules.emergencyRelation}>
                <Select placeholder="Select Relation">
                  <Option value="Brother">Brother</Option>
                  <Option value="Friend">Friend</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              {/* ================= Submit ================= */}
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
                    marginTop: "25px",
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
