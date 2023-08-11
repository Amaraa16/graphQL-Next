import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import db from "./utils/db";

const typeDefs = `#graphql
  type Post {
    text: String
    userId: String
    createdAt: String
    _id: ID
  }

  type Query {
    getPosts: [Post],
    getPostDetail(code: String): Post
  }

  input PostInput {
    text: String
  }

  type Mutation {
    createPost(PostCreateInput: PostInput!): Post,
    updatePost(id: ID!, PostUpdateInput: PostInput!): Post,
    deletePost(id: ID!): String
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      const GetPosts = await db("find", {});
      return GetPosts.documents;
    },
    // getPostDetail: (_, args) => {
    //   const GetPost = await db("findOne", {});
    //   return GetPost.document;
    // },
  },
  Mutation: {
    createPost: async (_: any, args: any) => {
      const CreatePost = await db("insertOne", {
        document: {
          text: args.PostCreateInput.text,
        },
      });
      return CreatePost;
    },
    updatePost: async (_: any, args: any) => {
      const UpdatePost = await db("updateOne", {
        filter: { _id: { $oid: args.id } },
        update: {
          $set: {
            text: args.PostUpdateInput.text,
          },
        },
      });
      return UpdatePost;
    },
    deletePost: async (_: any, args: any) => {
      const deletePost = await db("deleteOne", {
        filter: { _id: { $oid: args.id } },
      });

      return "deleted";
    },
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);
