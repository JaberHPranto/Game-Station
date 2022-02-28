import axios from "axios";

const client = axios.create({
  baseURL: "https://rawg-video-games-database.p.rapidapi.com",
  headers: {
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    "x-rapidapi-key": "b39424c555msh6f00f802d8e6d77p132f3djsnf24f0f931bad",
  },
  params: { key: process.env.REACT_APP_API_KEY },
});

export const request = ({ ...options }) => {
  const onSuccess = (response) => response;
  const onError = (error) => {
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
