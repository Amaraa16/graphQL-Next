import { BiDotsVerticalRounded } from "react-icons/bi";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const Posts = gql`
  query Posts {
    getPosts {
      text
      _id
    }
  }
`;

const Delete_Post = gql`
  mutation DeletePost($deletePostId: ID!) {
    deletePost(id: $deletePostId)
  }
`;

const Update_Post = gql`
  mutation UpdatePost($updatePostId: ID!, $postUpdateInput: PostInput!) {
    updatePost(id: $updatePostId, PostUpdateInput: $postUpdateInput) {
      text
    }
  }
`;

export default function post({ text, id }: any) {
  //getting all the posts
  const { loading, error, data } = useQuery(Posts);

  //deletePost
  const [deletePost] = useMutation(Delete_Post, { refetchQueries: [Posts] });

  //updatePost
  const [updatePost] = useMutation(Update_Post, { refetchQueries: [Posts] });

  const [updateText, setupdateText] = useState("");
  const handleTextChange = (event: any) => {
    setupdateText(event.target.value);
  };

  //opening and closing popup
  const [open, setOpen] = useState(false);

  //single post
  return (
    <div style={{ width: "400px", height: "400px", backgroundColor: "black", borderRadius: "10px", display: "flex", justifyContent: "center", paddingTop: "20px", position: "relative" }}>
      <BiDotsVerticalRounded style={{ position: "absolute", color: "grey", right: "5px", top: "25px", fontSize: "30px" }} onClick={() => setOpen(!open)} />
      <div style={{ opacity: open ? "1" : "0", width: "150px", height: "150px", backgroundColor: "white", position: "absolute", right: "18px", top: "65px", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
        <div
          style={{ fontSize: "30px", color: "grey", fontWeight: "500" }}
          onClick={() => {
            updatePost({
              variables: {
                updatePostId: id,
                postUpdateInput: {
                  text: updateText,
                },
              },
            });
          }}
        >
          Update
        </div>
        <input type="text" placeholder="Title" className="input input-bordered input-accent w-full max-w-xs" onChange={handleTextChange} />
        <div style={{ width: "150px", height: "2px", backgroundColor: "grey" }}></div>
        <div
          style={{ fontSize: "30px", color: "grey", fontWeight: "500" }}
          onClick={() => {
            deletePost({
              variables: {
                deletePostId: id,
              },
            });
          }}
        >
          Delete
        </div>
      </div>
      <div style={{ color: "white", fontSize: "25px", fontWeight: "500" }}>{text}</div>
    </div>
  );
}
