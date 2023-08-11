import { gql, useQuery, useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Posts = gql`
  query Posts {
    getPosts {
      text
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
  const [createPost, { data: postdata }] = useMutation(Create_Post, {
    refetchQueries: [Posts],
  });

  //getting create post text
  const [text, setText] = useState("");
  const handleTextChange = (event: any) => {
    setText(event.target.value);
  };

  //opening and closing popup
  const [open, setOpen] = useState(false);

  //waiting to get posts
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error : {error.message}</div>;

  return (
    <main style={{ height: "100vh", width: "100vw", display: "flex", alignItems: "center" }}>
      {/* container of map */}
      <div style={{ width: "70%", height: "100%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", padding: "20px" }}>
        {/* mapping the posts */}
        {data?.getPosts.map((el: any) => {
          return (
            <div style={{ width: "400px", height: "400px", backgroundColor: "black", borderRadius: "10px", display: "flex", justifyContent: "center", paddingTop: "20px", position: "relative" }}>
              <BiDotsVerticalRounded style={{ position: "absolute", color: "grey", right: "5px", top: "25px", fontSize: "30px" }} onClick={() => setOpen(!open)} />
              <div style={{ color: "white", fontSize: "25px", fontWeight: "500" }}>{el.text}</div>
            </div>
          );
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
          }}>
          Upload
        </button>
        <input type="text" placeholder="Title" className="input input-bordered input-accent w-full max-w-xs" onChange={handleTextChange} />
      </div>
    </main>
  );
}
