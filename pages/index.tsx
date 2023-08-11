import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import Post from "../components/post";

const Posts = gql`
  query Posts {
    getPosts {
      text
      _id
    }
  }
`;

const Create_Post = gql`
  mutation CreatePost($postCreateInput: PostInput!) {
    createPost(PostCreateInput: $postCreateInput) {
      text
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(Posts);
  const [createPost] = useMutation(Create_Post, {
    refetchQueries: [Posts],
  });

  //getting create post text
  const [text, setText] = useState("");
  const handleTextChange = (event: any) => {
    setText(event.target.value);
  };

  //waiting to get posts
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error : {error.message}</div>;

  return (
    <main style={{ height: "100vh", width: "100vw", display: "flex", alignItems: "center" }}>
      {/* container of map */}
      <div style={{ width: "70%", height: "100%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", padding: "20px" }}>
        {/* mapping the posts */}
        {data?.getPosts.map((el: any) => {
          return <Post text={el.text} id={el._id} />;
        })}
      </div>

      {/* right side */}
      <div style={{ width: "30%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", position: "fixed", right: "0px" }}>
        <button
          className="btn btn-success"
          onClick={() => {
            createPost({
              variables: {
                postCreateInput: {
                  text: text,
                },
              },
            });
          }}
        >
          Upload
        </button>
        <input type="text" placeholder="Title" className="input input-bordered input-accent w-full max-w-xs" onChange={handleTextChange} />
      </div>
    </main>
  );
}
