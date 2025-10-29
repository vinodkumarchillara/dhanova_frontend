import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Upload,
  Button,
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

const Register = () => {
  const [form] = Form.useForm();
  const [ownershipType, setOwnershipType] = useState("");

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
      alert(data.message || "Resident registered successfully!");
      form.resetFields();
    } else {
      alert(data.message || "Registration failed!");
    }
  } catch (err) {
    console.error("❌ Error:", err);
    alert("Server not reachable. Try again later.");
  }
};


  return (
<div
  style={{
    position: "fixed",       // fill entire viewport
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#ffffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start", // or "center" if you want vertical centering
    overflowY: "auto",
    padding: "40px 0",
  }}
>

      <div
        style={{
          width: "95%",
          maxWidth: "1000px",
          backgroundColor: "#fffef5",
          padding: "30px 40px",
          borderRadius: "16px",
          border: "2px solid #ffdf98",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#1f2453",
            marginBottom: "25px",
            fontWeight: "700",
            fontSize: "1.8rem",
          }}
        >
        Resident Registration
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddResident}
          style={{ backgroundColor: "#fffef5" }}
        >
          {/* ================= Resident Info ================= */}
          <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
            <Input placeholder="As per Aadhar" />
          </Form.Item>
<Form.Item
  label="Gender"
  name="gender"
  rules={[{ required: true, message: "Please select gender" }]}
>
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
            <Input placeholder="Please Enter Phone Number" type="number" />
          </Form.Item>

          <Form.Item label="Alternate Number" name="alternateNumber">
            <Input placeholder="Please Enter Alternate Phone Number" type="number" />
          </Form.Item>

          <Form.Item label="Email ID" name="email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Please Enter Email Id" />
          </Form.Item>

          <Form.Item label="Aadhar Number" name="aadhar" rules={[{ required: true }]}>
            <Input placeholder="Please Enter Aadhar Card Number" maxLength={12} />
          </Form.Item>

          <Form.Item label="Address (Permanent)" name="address" rules={[{ required: true }]}>
            <TextArea placeholder="Please Enter Your Address" rows={3} />
          </Form.Item>

          <Form.Item label="Occupation" name="occupation">
            <Input placeholder="Please Enter Your Occupation" />
          </Form.Item>

<Form.Item
  label="Ownership Type"
  name="ownershipType"
  rules={[{ required: true, message: "Please select ownership type" }]}
>
  <Select
    placeholder="Select Ownership Type"
    onChange={(value) => setOwnershipType(value)}
  >
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

          <Form.Item label="ID Proof Upload" name="idProof">
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload ID Proof</Button>
            </Upload>
          </Form.Item>

<Form.Item
  label="Ownership Status"
  name="ownershipStatus"
  rules={[{ required: true, message: "Please select ownership status" }]}
>
  <Select placeholder="Select Status">
    <Option value="Self">Self</Option>
    <Option value="Rented">Rented</Option>
  </Select>
</Form.Item>



          <Form.Item label="Flat Number" name="flatNumber" rules={[{ required: true }]}>
            <Input placeholder="Please Enter Flat Number" />
          </Form.Item>

          <Form.Item label="Floor" name="floor" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} placeholder="Please Enter Your Floor" />
          </Form.Item>

          <Form.Item label="Parking Slots" name="parkingSlots">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Vehicle Details" name="vehicles">
            <TextArea placeholder="Please Enter Vehicle Details" rows={2} />
          </Form.Item>

<Form.Item
  label="Ownership Status"
  name="ownershipStatus"
  rules={[{ required: true, message: "Please select ownership status" }]}
>
  <Select placeholder="Select Status">
    <Option value="Self">Self</Option>
    <Option value="Rented">Rented</Option>
  </Select>
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

                    <Form.Item {...restField} label="Name" name={[name, "name"]} rules={[{ required: true }]}>
                      <Input placeholder="Please Enter Name" />
                    </Form.Item>

<Form.Item
  {...restField}
  label="Relation"
  name={[name, "relation"]}
  rules={[{ required: true, message: "Please select relation" }]}
>
  <Select placeholder="Select Relation">
    <Option value="Spouse">Spouse</Option>
    <Option value="Son">Son</Option>
    <Option value="Daughter">Daughter</Option>
    <Option value="Parent">Parent</Option>
    <Option value="Other">Other</Option>
  </Select>
</Form.Item>

<Form.Item
  {...restField}
  label="Gender"
  name={[name, "gender"]}
  rules={[{ required: true, message: "Please select gender" }]}
>
  <Select placeholder="Select Gender">
    <Option value="Male">Male</Option>
    <Option value="Female">Female</Option>
    <Option value="Other">Other</Option>
  </Select>
</Form.Item>


                    <Form.Item {...restField} label="Age" name={[name, "age"]}>
                      <InputNumber min={0} style={{ width: "100%" }} placeholder="Please Enter Age" />
                    </Form.Item>

                    <Form.Item {...restField} label="Mobile Number" name={[name, "mobile"]}>
                      <Input placeholder="Please Enter Phone Number" type="number" />
                    </Form.Item>

                    <Form.Item {...restField} label="Aadhar Number" name={[name, "aadhar"]}>
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

          <Form.Item label="Emergency Contact Name" name="emergencyName" rules={[{ required: true }]}>
            <Input placeholder="Please Enter Name" />
          </Form.Item>

          <Form.Item label="Emergency Contact Number" name="emergencyNumber" rules={[{ required: true }]}>
            <Input placeholder="Please Enter Phone Number" type="number" />
          </Form.Item>

<Form.Item
  label="Emergency Relation"
  name="emergencyRelation"
  rules={[{ required: true, message: "Please select emergency relation" }]}
>
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
      </div>
    </div>
  );
};

export default Register;
