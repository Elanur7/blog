import React, { useEffect, useState } from "react";
import { Card, Switch } from "antd";
import { Button, Form, Input, Modal, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;
const { Meta } = Card;

const WriteAdd = ({ isAddModalOpen, setIsAddModalOpen, categories, users }) => {
  const [write, setWrite] = useState();
  const [checked, setChecked] = useState();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/writes/add-write", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Yazı Başarıyla Eklendi.");
      form.resetFields();
      setWrite([
        ...write,
        {
          ...values,
          _id: Math.random(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        title="Yeni Yazı Ekle"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
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
            <Switch checked={checked} className="bg-slate-700" />
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

export default WriteAdd;
