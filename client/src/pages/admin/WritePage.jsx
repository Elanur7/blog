import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";
import WriteList from "../../components/admin/write/WriteList";
import { Form, message } from "antd";
import WriteAdd from "../../components/admin/write/WriteAdd";

const WritePage = () => {
  const [categories, setCategories] = useState();
  const [writes, setWrites] = useState();
  const [form] = Form.useForm();

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

  useEffect(() => {
    const getWrites = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/writes/get-all");
        const data = await res.json();
        setWrites(data);
      } catch (error) {
        console.log(error);
      }
    };
    getWrites();
  }, []);
  return (
    <div className="flex justify-center items-center">
      <HomePage />
      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        <WriteList
          categories={categories}
          setCategories={setCategories}
          writes={writes}
          setWrites={setWrites}
        />
      </div>
    </div>
  );
};

export default WritePage;
