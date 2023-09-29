import React, { useState } from "react";
import {
  AppstoreOutlined,
  LogoutOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış İşlemi Başarılı.");
    }
  };

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } duration-300 h-screen p-5 pt-8 bg-dark-purple relative`}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbwcxk6VZBWB8UfcV-CKMI45ly-a_DZ0kXqQ&usqp=CAU"
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple
          ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="data:image/png;base64,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"
            className={`cursor-pointer duration-500 w-14 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-300 
            ${!open && "scale-0"}`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          <ul class="">
            <li
              className={`text-gray-300 text-xl flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-950 rounded-md`}
            >
              <Link
                to={"/admin/categories"}
                className="flex justify-center items-center"
              >
                <AppstoreOutlined />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 bt-2 ml-3`}
                >
                  Kategori Listele
                </span>
              </Link>
            </li>
          </ul>
          <ul class="">
            <li
              className={`text-gray-300 text-xl flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-950 rounded-md`}
            >
              <Link
                to={"/admin/write"}
                className="flex justify-center items-center"
              >
                <AppstoreOutlined />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 bt-2 ml-3`}
                >
                  Yazı Listele
                </span>
              </Link>
            </li>
          </ul>
          <ul className="">
            <li
              className={`text-gray-300 text-xl flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-950 rounded-md`}
            >
              <Link
                to={"/admin/user"}
                className="flex justify-center items-center"
              >
                <AppstoreOutlined />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 bt-2 ml-3`}
                >
                  Yazar Listele
                </span>
              </Link>
            </li>
          </ul>
          <ul class="">
            <li
              onClick={logOut}
              className={`text-gray-300 text-xl flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-950 rounded-md mt-6`}
            >
              <Link className="flex justify-center items-center">
                <LogoutOutlined />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 bt-2 ml-3`}
                >
                  Çıkış Yap
                </span>
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
