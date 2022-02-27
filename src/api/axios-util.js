import axios from "axios";

const client = axios.create({
  baseURL: "https://rawg-video-games-database.p.rapidapi.com",
  headers: {
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    "x-rapidapi-key": "b39424c555msh6f00f802d8e6d77p132f3djsnf24f0f931bad",
  },
  params: { key: "33656693d93946ccb3ad4a32307a19d7" },
});

export const request = ({ ...options }) => {
  const onSuccess = (response) => response;
  const onError = (error) => {
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
