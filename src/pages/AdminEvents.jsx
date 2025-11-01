import React, { useState } from "react";
import {
  Layout,
  Table,
  Button,
  Tag,
  Modal,
  message,
  Form,
  Input,
  DatePicker,
  TimePicker,
} from "antd";
import Navbar from "../components/Navbar";
import "../styles/AdminEvents.css";

const { Content } = Layout;

const dummyEvents = [
  {
    id: 1,
    title: "Diwali Celebration",
    description: "Festival gathering and lighting ceremony in the main hall.",
    date: "2025-11-05",
    startTime: "06:00 PM",
    endTime: "09:00 PM",
    organizer: { name: "Admin" },
    status: "Approved",
  },
  {
    id: 2,
    title: "Community Meeting",
    description: "Monthly association meeting with all residents.",
    date: "2025-11-10",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    organizer: { name: "Admin" },
    status: "Pending",
  },
];

const AdminEventsPage = () => {
  const [events, setEvents] = useState(dummyEvents);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleCreateEvent = (values) => {
    const newEvent = {
      id: events.length + 1,
      title: values.title,
      description: values.description,
      date: values.date.format("YYYY-MM-DD"),
      startTime: values.time[0].format("hh:mm A"),
      endTime: values.time[1].format("hh:mm A"),
      organizer: { name: "Admin" },
      status: "Pending",
    };
    setEvents([...events, newEvent]);
    message.success("New event created!");
    setOpen(false);
  };

  const handleApprove = (id) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, status: "Approved" } : e)));
    message.success("Event approved successfully!");
  };

  const handleReject = (id) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, status: "Rejected" } : e)));
    message.error("Event rejected.");
  };

  const columns = [
    { title: "Event", dataIndex: "title", key: "title" },
    { title: "Organizer", dataIndex: ["organizer", "name"], key: "organizer" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Time", render: (_, r) => `${r.startTime} - ${r.endTime}` },
    {
      title: "Status",
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
      render: (_, record) => (
        <>
          <Button size="small" onClick={() => setSelected(record)}>
            View
          </Button>{" "}
          {record.status === "Pending" && (
            <>
              <Button
                size="small"
                type="primary"
                onClick={() => handleApprove(record.id)}
              >
                Approve
              </Button>{" "}
              <Button
                size="small"
                danger
                onClick={() => handleReject(record.id)}
              >
                Reject
              </Button>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="admin-events-page">
      <Layout className="admin-events-layout">
        <Navbar />
        <Content className="admin-events-content">
          {/* Header with Button */}
          <div className="admin-events-header">
            <Button className="add-event-btn" onClick={() => setOpen(true)}>
              + Create Event
            </Button>
          </div>

          {/* Table without card or heading */}
          <Table
            rowKey="id"
            columns={columns}
            dataSource={events}
            pagination={{ pageSize: 5 }}
            bordered
            className="admin-events-table"
          />

          {/* View Details Modal */}
          <Modal
            open={!!selected}
            title={selected?.title}
            onCancel={() => setSelected(null)}
            footer={null}
          >
            <p>
              <b>Description:</b> {selected?.description}
            </p>
            <p>
              <b>Date:</b> {selected?.date}
            </p>
            <p>
              <b>Time:</b> {selected?.startTime} - {selected?.endTime}
            </p>
            <p>
              <b>Status:</b> {selected?.status}
            </p>
          </Modal>

          {/* Create Event Modal */}
          <Modal
            title="Create New Event"
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
          >
            <Form layout="vertical" onFinish={handleCreateEvent}>
              <Form.Item label="Event Title" name="title" rules={[{ required: true }]}>
                <Input placeholder="Enter event title" />
              </Form.Item>

              <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                <Input.TextArea rows={3} placeholder="Enter event description" />
              </Form.Item>

              <Form.Item label="Event Date" name="date" rules={[{ required: true }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="Event Time" name="time" rules={[{ required: true }]}>
                <TimePicker.RangePicker
                  use12Hours
                  format="hh:mm A"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Button type="primary" htmlType="submit" block>
                Create Event
              </Button>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </div>
  );
};

export default AdminEventsPage;
