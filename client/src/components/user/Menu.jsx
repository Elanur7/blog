import React, { useEffect, useState } from "react";
import Logo from "../../img/blog.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Menu = ({ id, writes }) => {
  const [menu, setMenu] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getWrites = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/writes/get-id", {
          method: "POST",
          body: JSON.stringify({ writeId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        const data = await res.json();
        setMenu(data);
      } catch (error) {
        console.log(error);
      }
    };
    getWrites();
  }, []);
  console.log("menu" + menu);
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
      img: "Picture",
    },
    {
      id: 4,
      title: "başlık",
      desc: "açıklama",
      img: "../img/lama.jpeg",
    },
  ];
  return (
    <div className="menu">
      <h1>Benzer yazılar</h1>
      {menu && menu.length > 0 && writes && writes.length > 0
        ? writes.map((post) =>
            post.category === menu[0].category ? (
              post._id !== id ? (
                <div className="post" key={post.id}>
                  <img src={post.img} alt="" />
                  <h2>{post.writeTitle}</h2>
                  <Link
                    className="link"
                    to={`/write/${post._id}`}
                    onClick={() => {
                      navigate.push(`/single/${post.id}`);
                    }}
                  >
                    <button>Read more</button>
                  </Link>
                </div>
              ) : null
            ) : null
          )
        : null}
    </div>
  );
};

export default Menu;
