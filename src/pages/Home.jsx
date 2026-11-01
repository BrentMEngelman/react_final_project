import React, { useEffect, useState } from "react";
import { Link,  useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/users";

const Home = () => {
  let navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();

  async function fetchPosts() {
    setLoading(true);
    const { data } = await axios.get(url);
    console.log(data);
    setPosts(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="user-list">
          {loading
            ? new Array(10).fill(0).map((element, index) => (
                <div className="user-card__container" key={index}>
                  <div className="user-card__title">
                    <div className="user-card__title--skeleton"></div>
                  </div>
                  <div className="user-card__body">
                    <p className="user-card___body--skeleton">
                      <b>Email:</b>
                    </p>
                    <p className="user-card___body--skeleton">
                      <b>Phone:</b>
                    </p>
                    <p className="user-card___body--skeleton">
                      <b>Website:</b>
                    </p>
                  </div>
                </div>
              ))
            : posts.map((user) => (
                <div key={user.id} className="user" onClick={() => navigate(`${user.id}`)} >
                    <div className="user-card">
                      <div className="user-card__container">
                        <h3>{user.name}</h3>
                        <p>
                          <b>Email:</b> {user.email}
                        </p>
                        <p>
                          <b>Phone:</b> {user.phone}
                        </p>
                        <p>
                          <b>Website:</b>
                          {user.website}
                        </p>
                      </div>
                    </div>

                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
