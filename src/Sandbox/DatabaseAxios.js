import axios from "axios";
import React from "react";

// const baseURL = "https://jsonplaceholder.typicode.com/posts/1";
const baseURL = "http://localhost:3001/idk";

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return (
    <div>
        post is null
    </div>
  );;

  return (
    <div>
      <h1>{post.idk}</h1>
      {/* <p>{post.body}</p> */}
    </div>
  );
}