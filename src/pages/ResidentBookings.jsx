import React, { useState } from "react";
import {
  Layout,
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
  Tag,
} from "antd";
import Navbar from "../components/Navbar";
import "../styles/ResidentBookings.css";

const { Content } = Layout;

const ResidentBookings = () => {
  const [open, setOpen] = useState(false);

  // Dummy data (bookings made by residents)
  const [bookings, setBookings] = useState([
    {
      key: 1,
      residentName: "Sujatha Kumar",
      eventName: "Birthday Party",
      date: "2025-11-10",
      status: "Approved",
      tokenCount: 25,
    },
    {
      key: 2,
      residentName: "Ramesh",
      eventName: "Wedding Reception",
      date: "2025-11-15",
      status: "Pending",
      tokenCount: 100,
    },
  ]);

  // Approve event
  const handleApprove = (key) => {
    const updated = bookings.map((b) =>
      b.key === key ? { ...b, status: "Approved" } : b
    );
    setBookings(updated);
    message.success("Booking approved successfully!");
  };

  // Reject event
  const handleReject = (key) => {
    const updated = bookings.map((b) =>
      b.key === key ? { ...b, status: "Rejected" } : b
    );
    setBookings(updated);
    message.error("Booking rejected!");
  };

  const columns = [
    { title: "Resident Name", dataIndex: "residentName", key: "residentName" },
    { title: "Event Name", dataIndex: "eventName", key: "eventName" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Food Tokens",
      dataIndex: "tokenCount",
      key: "tokenCount",
      align: "center",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        const color =
          record.status === "Approved"
            ? "green"
            : record.status === "Pending"
            ? "orange"
            : "red";
        return <Tag color={color}>{record.status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        record.status === "Pending" ? (
          <>
            <Button
              type="primary"
              size="small"
              onClick={() => handleApprove(record.key)}
            >
              Approve
            </Button>{" "}
            <Button
              danger
              size="small"
              onClick={() => handleReject(record.key)}
            >
              Reject
            </Button>
          </>
        ) : (
          <Tag color="blue">Processed</Tag>
        ),
    },
  ];

  // Add booking manually
  const handleAddBooking = (values) => {
    const newBooking = {
      key: bookings.length + 1,
      residentName: values.residentName,
      eventName: values.eventName,
      date: values.date.format("YYYY-MM-DD"),
      status: "Pending",
      tokenCount: values.tokenCount || 0,
    };
    setBookings([...bookings, newBooking]);
    message.success("New booking added!");
    setOpen(false);
  };

  return (
    <div className="events-page">
      <Layout className="events-layout">
        <Navbar />
        <Content className="events-content">
          {/* Header with Button */}
          <div className="events-header">
            <Button className="book-btn" onClick={() => setOpen(true)}>
              + Add Booking
            </Button>
          </div>

          {/* Table */}
          <Table
            dataSource={bookings}
            columns={columns}
            pagination={{ pageSize: 5 }}
            bordered
            className="events-table"
          />

          {/* Modal for Adding Booking */}
          <Modal
            title="Add New Booking"
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
          >
            <Form layout="vertical" onFinish={handleAddBooking}>
              <Form.Item
                label="Resident Name"
                name="residentName"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter resident name" />
              </Form.Item>

              <Form.Item
                label="Event Name"
                name="eventName"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter event name" />
              </Form.Item>

              <Form.Item
                label="Event Date"
                name="date"
                rules={[{ required: true }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="Food Tokens" name="tokenCount">
                <Input type="number" placeholder="Enter number of tokens" />
              </Form.Item>

              <Button type="primary" htmlType="submit" block>
                Add Booking
              </Button>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </div>
  );
};

export default ResidentBookings;
