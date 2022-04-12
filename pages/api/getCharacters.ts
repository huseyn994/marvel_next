// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import md5 from "md5";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { hash, publicKey, ts } = generateHash();

    const searchParams = new URLSearchParams({
      limit: req.query?.limit.toString(),
      offset: req.query?.offset.toString(),
      nameStartsWith: (req.query?.name || "").toString(),
      apikey: publicKey,
      ts: ts.toString(),
      hash,
    });

    
    const response = await fetch(
      `http://gateway.marvel.com/v1/public/characters?${removeEmptyKeys(searchParams)}`
    );
    const result = await response.json();

    const data = result?.data;
    res.status(200).json(data);
    res.end();
  }
}

export const generateHash = () => {
  const timestamp = new Date().getTime();

  const publicKey = process.env.PUBLIC_KEY as string;
  const privateKey = process.env.PRIVATE_KEY as string;

  return {
    hash: md5(timestamp + privateKey + publicKey),
    ts: timestamp,
    publicKey,
  };
};

export const removeEmptyKeys = (searchParams: URLSearchParams) => {
  const newSearchParams = new URLSearchParams(searchParams);

  newSearchParams.forEach((value, key) => {
    if (value === "" || value === undefined) {
      newSearchParams.delete(key);
    }
  });

  return newSearchParams;
};
