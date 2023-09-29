import React, { useEffect, useState } from "react";
import { Form, message, Card, Modal, Button, Input, Switch } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import CategoryAdd from "./CategoryAdd";
const { Meta } = Card;

const CategoryList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categories, setCategories] = useState();
  const [editingItem, setEditingItem] = useState({});
  const [checked, setChecked] = useState();
  const [editingCategory, setEditingCategory] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isEditModalOpen) {
      setEditingCategory({});
      form.resetFields();
    }
  }, [isEditModalOpen, form]);

  const openEditModal = (category) => {
    setIsEditModalOpen(true);
    setEditingCategory(category);
    form.setFieldsValue({ title: category.title });
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingCategory({});
    form.resetFields();
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/get-all");
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return {
                ...item,
                value: item.title,
              };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const onFinish = (values) => {
    try {
      fetch(
        process.env.REACT_APP_SERVER_URL + "/api/categories/update-category",
        {
          method: "PUT",
          body: JSON.stringify({ ...values, categoryId: editingItem._id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      message.success("Kategori Başarıyla Güncellendi.");
      setCategories(
        categories.map((item) => {
          if (item._id === editingItem._id) {
            return values;
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Kategori Güncellenmedi.");
      console.log(error);
    }
    closeEditModal();
  };

  const deleteCategory = (id) => {
    if (window.confirm("Silmek istediğinize emin misiniz?")) {
      try {
        fetch(
          process.env.REACT_APP_SERVER_URL + "/api/categories/delete-category",
          {
            method: "DELETE",
            body: JSON.stringify({ categoryId: id }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        message.success("Kategori Başarıyla Silindi.");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Kategori Silinmedi.");
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-4">Kategoriler</h1>
      <div className="columns-5 gap-6 flex flex-wrap">
        {categories?.map((item) => (
          <Card
            hoverable
            style={{
              width: 300,
            }}
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
                onClick={() => deleteCategory(item._id)}
              />,
            ]}
          >
            <Meta title={item.title} />
          </Card>
        ))}

        <Card
          hoverable
          style={{
            width: 300,
          }}
          onClick={() => setIsAddModalOpen(true)}
          className="product-item border hover:shadow-lg cursor-pointer transition-all "
        >
          <Meta title="Yeni Kategori Ekle" />
          <PlusOutlined className="flex justify-center items-center mt-8" />
        </Card>
        <CategoryAdd
          isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
          categories={categories}
          setCategories={setCategories}
        />
        <Modal
          open={isEditModalOpen}
          title="Kategori Düzenle"
          footer={false}
          onCancel={closeEditModal}
        >
          <Form form={form} onFinish={onFinish} initialValues={editingCategory}>
            <Form.Item className="mb-0" name="title">
              <Input />
            </Form.Item>
            <Form.Item
              name="status"
              label="Ana Ekranda Gösterilsin Mi?"
              className="mt-3"
            >
              <Switch checked={checked} className="bg-slate-700" />
            </Form.Item>
            <Form.Item className="flex justify-end mb-0">
              <Button type="primary" htmlType="submit">
                Güncelle
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
