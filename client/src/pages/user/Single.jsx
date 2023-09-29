import React, { useEffect, useState } from "react";
import Logo from "../../img/blog.png";
import Menu from "../../components/user/Menu";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import { useParams } from "react-router-dom";

const Single = () => {
  const [writes, setWrites] = useState();
  const { id } = useParams();

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
    <>
      <Navbar />
      {writes?.map((item) =>
        id === item._id ? (
          <div className="single">
            <div className="content">
              <img src={item.img} alt="" />
              <div className="user">
                <img src={Logo} alt="" />
                <div className="info">
                  <span>{item.author}</span>
                  <p>Posted 2 days ago</p>
                </div>
              </div>
              <h1>{item.writeTitle}</h1>
              <p>{item.content}</p>
            </div>
            <div className="menu">
              <Menu id={id} writes={writes}></Menu>
            </div>
          </div>
        ) : null
      )}
      <Footer />
    </>
  );
};

export default Single;
