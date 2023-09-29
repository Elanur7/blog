import React, { useEffect, useState } from "react";
import Logo from "../../img/blog.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [categories, setCategories] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/get");
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

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="links">
          <span>
            <Link className="link" to="/">
              Ana Sayfa
            </Link>
          </span>
          {categories?.map((category) => (
            <Link
              className="link"
              to={`/category/${category._id}`}
              onClick={() => {
                navigate.push(`/write/${category.id}`);
              }}
              key={category._id}
            >
              <h6>{category.title}</h6>
            </Link>
          ))}
          <span className="write">
            <Link className="link" to="/login">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
