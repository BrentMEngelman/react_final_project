import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/posts/?userId=";

const Posts = () => {
  let navigate =useNavigate();
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();
  const [searchId, setSearchId] = useState(id);

  function onSearch(searchUserId) {
    fetchPosts(searchUserId);
  }
  function onSearchKeyPress(event) {
    if (event.key === "Enter") {
      fetchPosts(event.target.value);
    }
  }

  async function fetchPosts(userId) {
    setLoading(true)
    const { data } = await axios.get(url + userId);
    setPosts(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchPosts(id);
  }, [id]); 

  return (
    <>
      <div className="post__search">

        <button onClick={()=>navigate('/')}>← Back</button>

        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input
            type="number"
            value={searchId}
            onKeyDown={(event) => onSearchKeyPress(event)}
            onChange={(event) => setSearchId(event.target.value)}
          />
          <button onClick={() => onSearch(searchId)}>Enter</button>
        </div>
      </div>

      {loading
        ? new Array(10).fill(0).map((element, index) => (
            <div className="post" key={index}>
              <div className="post__title">
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>
          ))
        : posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post__title">{post.title}</div>
              <p className="post__body">{post.body}</p>
            </div>
          ))}
    </>
  );
};

export default Posts;
