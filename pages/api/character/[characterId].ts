import type { NextApiRequest, NextApiResponse } from "next";
import { generateHash, removeEmptyKeys } from "../getCharacters";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { hash, publicKey, ts } = generateHash();

    const { characterId } = req.query;
    const searchParams = new URLSearchParams({
      apikey: publicKey,
      ts: ts.toString(),
      hash,
    });

    const response = await fetch(
      `http://gateway.marvel.com/v1/public/characters/${characterId}?${removeEmptyKeys(searchParams)}`
    );
    const result = await response.json();

    const data = result?.data;
    res.status(200).json(data);
    res.end();
  }
}
