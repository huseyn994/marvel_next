import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CharacterDataContainer, Character } from "./types/characterType";

// As additionally typing can be automaticated.

export const marvelApi = createApi({
  reducerPath: "marvelAPi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      CharacterDataContainer,
      { limit: number; offset: number; name?: string }
    >({
      query: (arg) => {
        const { limit, offset, name } = arg;
        return {
          url: "getCharacters",
          params: { limit, offset, name },
        };
      },
    }),
    getCharacter: builder.query<CharacterDataContainer, { character: string }>({
      query: (arg) => {
        const { character } = arg;
        return {
          url: `character/${character}`,
        };
      },
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useLazyGetCharactersQuery,
  useGetCharacterQuery,
} = marvelApi;
