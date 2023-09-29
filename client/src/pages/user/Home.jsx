import React, { useEffect, useState } from "react";
import Picture from "../../img/blog.jpeg";
import { Link } from "react-router-dom";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import Single from "./Single";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [writes, setWrites] = useState();
  const [single, setSingle] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getWrites = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/writes/get");
        const data = await res.json();
        setWrites(data);
      } catch (error) {
        console.log(error);
      }
    };
    getWrites();
  }, []);

  const posts = [
    {
      id: 1,
      title: "başlık",
      desc: "açıklama",
      img: "Picture",
    },
    {
      id: 2,
      title: "başlık",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptates porro ipsam asperiores at? Tempora eum aperiam vel itaque, facilis soluta nesciunt, autem deserunt blanditiis repellat, asperiores maiores nostrum molestias!",
      img: "Picture",
    },
    {
      id: 3,
      title: "başlık",
      desc: "açıklama",
      img: { Picture },
    },
    {
      id: 4,
      title: "başlık",
      desc: "açıklama",
      img: "../img/lama.jpeg",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="posts">
          {writes?.map((item) => (
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
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
