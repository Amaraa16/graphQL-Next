import fetch from "node-fetch";

export default async function mondoDataApiReq(action: any, options: any) {
  const result = await fetch(
    `https://ap-southeast-1.aws.data.mongodb-api.com/app/data-qemzs/endpoint/data/v1/action/${action}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key":
          "DKFYIlMuJixVSoyAlIRLPMprSKmHDj6kHuMbq55xSDjOqLKSsCiyMbtbxdu69dF1",
      },
      body: JSON.stringify({
        dataSource: "Cluster0",
        database: "Post",
        collection: "Posts",
        ...options,
      }),
    }
  ).then((res) => res.json());

  return result;
}