import React, { useEffect, useState } from "react";
import "./style.css";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Switch,
  message,
} from "antd";
import WriteAdd from "./WriteAdd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
const { Meta } = Card;

const WriteList = ({ categories, setCategories, writes, setWrites }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [users, setUsers] = useState();
  const [editingWrite, setEditingWrite] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isEditModalOpen) {
      setEditingWrite({});
      form.resetFields();
    }
  }, [isEditModalOpen, form]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/get-all");
        const data = await res.json();
        data &&
          setUsers(
            data.map((item) => {
              return {
                ...item,
                value: item.username,
              };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const openEditModal = (write) => {
    setIsEditModalOpen(true);
    setEditingWrite(write);
    form.setFieldsValue(write);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingWrite({});
    form.resetFields();
  };

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/writes/update-write", {
        method: "PUT",
        body: JSON.stringify({ ...values, writeId: editingItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Yazı Başarıyla Güncellendi.");
      setWrites(
        writes.map((item) => {
          if (item._id === editingItem._id) {
            return values;
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Yazı Güncellenmedi.");
      console.log(error);
    }
  };

  const deleteWrite = (id) => {
    if (window.confirm("Silmek istediğinize emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL + "/api/writes/delete-write", {
          method: "DELETE",
          body: JSON.stringify({ writeId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Yazı Başarıyla Silindi.");
        setWrites(writes.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Yazı Silinmedi.");
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-4">Yazılar</h1>
      <div className="columns-3 gap-6 flex flex-wrap">
        {writes?.map((item) => (
          <Card
            hoverable
            style={{
              width: 500,
            }}
            cover={
              <img
                alt="example"
                style={{
                  width: 500,
                  height: 300,
                }}
                src={item.img}
              />
            }
            actions={[
              <EditOutlined
                key="edit"
                onClick={() => {
                  openEditModal(item);
                  setEditingItem(item);
                }}
              />,
              <DeleteOutlined
                key="delete"
                onClick={() => deleteWrite(item._id)}
              />,
            ]}
          >
            <Meta title={item.writeTitle} description={item.content} />
            <Meta className="float-right" description={item.author} />
          </Card>
        ))}

        <Card
          hoverable
          style={{
            width: 400,
            height: 200,
          }}
          onClick={() => setIsAddModalOpen(true)}
          className="product-item border hover:shadow-lg cursor-pointer transition-all "
        >
          <Meta title="Yeni Yazı Ekle" />
          <PlusOutlined className="flex justify-center items-center mt-12" />
        </Card>
        <WriteAdd
          isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
          categories={categories}
          setCategories={setCategories}
          users={users}
          setUsers={setUsers}
        />
      </div>
      <Modal
        title="Yeni Yazı Ekle"
        open={isEditModalOpen}
        onCancel={closeEditModal}
        footer={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={editingWrite}
        >
          <Form.Item
            name="writeTitle"
            label="Yazı Başlığı"
            rules={[
              { required: true, message: "Yazı Başlığı Alanı Boş Geçilemez!" },
            ]}
          >
            <Input placeholder="Yazı Başlığı Giriniz." />
          </Form.Item>
          <Form.Item
            name="img"
            label="Yazı Görseli"
            rules={[
              {
                required: true,
                message: "Yazı Görseli Alanı Boş Geçilemez!",
              },
            ]}
          >
            <Input placeholder="Yazı Görseli Giriniz." />
          </Form.Item>
          <Form.Item
            name="content"
            label="Yazı"
            rules={[{ required: true, message: "Yazı Alanı Boş Geçilemez!" }]}
          >
            <TextArea rows={4} placeholder="Yazı Giriniz." />
          </Form.Item>
          <Form.Item
            name="author"
            label="Yazar"
            rules={[{ required: true, message: "Yazar Alanı Boş Geçilemez!" }]}
          >
            <Select
              showSearch
              placeholder="Yazar Seçiniz."
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={users}
            />
          </Form.Item>
          <Form.Item
            name="category"
            label="Kategori"
            rules={[
              { required: true, message: "Kategori Alanı Boş Geçilemez!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Kategori Seçiniz."
              defaultValue={editingItem.write}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={categories}
            />
          </Form.Item>
          <Form.Item name="status" label="Ana Ekranda Gösterilsin Mi?">
            <Switch className="bg-slate-700" />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default WriteList;
