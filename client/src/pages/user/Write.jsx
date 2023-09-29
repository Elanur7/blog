import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";

const Write = () => {
  const [categories, setCategories] = useState();
  const [writes, setWrites] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/get-id", {
          method: "POST",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        const data = await res.json();
        setCategories(data);
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
  console.log(categories, writes);
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="posts">
          {categories && categories.length > 0 && writes && writes.length > 0
            ? writes.map((item) =>
                item.category === categories[0].title ? (
                  <div className="post" key={item.id}>
                    <div className="img">
                      <img src={item.img} alt="" />
                    </div>
                    <div className="content">
                      <Link
                        className="link"
                        to={`/write/${item._id}`}
                        onClick={() => {
                          navigate.push(`/single/${item.id}`);
                        }}
                      >
                        <h1>{item.writeTitle}</h1>
                      </Link>
                      <p>{item.content}</p>
                      <Link
                        className="link"
                        to={`/write/${item._id}`}
                        onClick={() => {
                          navigate.push(`/single/${item.id}`);
                        }}
                      >
                        <button>Read more</button>
                      </Link>
                    </div>
                  </div>
                ) : null
              )
            : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Write;
