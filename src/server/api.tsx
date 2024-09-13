import Axios from "axios";

const TMDB_API: string = import.meta.env.VITE_TMDB_API;

const TMDB_API_AUTHENTICATION: string = import.meta.env
  .VITE_TMDB_API_AUTHENTICATION;

const Base_Url: string = import.meta.env.VITE_BASE_URL;

const Image_Path: string = import.meta.env.VITE_IMAGE_PATH_URL;

const Image_Path_Original: string = import.meta.env
  .VITE_IMAGE_PATCH_ORIGINAL_URL;

//// All - Trending
const fetchTrending = async (time_window: string = "day") => {
  const res = await Axios.get(
    `${Base_Url}/trending/all/${time_window}?api_key=${TMDB_API}`
  );
  console.log(res);
  return res;
};

//// MOVIES & SERIES - Details
const fetchDetails = async (type: string, id: string) => {
  const res = await Axios.get(`${Base_Url}/${type}/${id}?api_key=${TMDB_API}`);
  return res?.data;
};

//// MOVIES & SERIES - Credits
const fetchCredits = async (type: string, id: string) => {
  const res = await Axios.get(
    `${Base_Url}/${type}/${id}/credits?api_key=${TMDB_API}`
  );
  return res?.data;
};

//// MOVIES & SERIES - Videos
const fetchVideos = async (type: string, id: string) => {
  const res = await Axios.get(
    `${Base_Url}/${type}/${id}/videos?api_key=${TMDB_API}`
  );
  return res?.data;
};

//// Discover
const fetchMovies = async (page: number, sortBy: string) => {
  const res = await Axios.get(
    `${Base_Url}/discover/movie?api_key=${TMDB_API}&page=${page}&sort_by=${sortBy}`
  );
  return res?.data;
};

const fetchTvSeries = async (page: number, sortBy: string) => {
  const res = await Axios.get(
    `${Base_Url}/discover/tv?api_key=${TMDB_API}&page=${page}&sort_by=${sortBy}`
  );
  return res?.data;
};

//// Search
const searchData = async (query: string, page: number) => {
  console.log(query);
  const res = await Axios.get(
    `${Base_Url}/search/multi?api_key=${TMDB_API}&query=${query}&page=${page}`
  );

  return res?.data;
};

export {
  TMDB_API,
  Base_Url,
  Image_Path,
  Image_Path_Original,
  fetchTrending,
  fetchDetails,
  fetchCredits,
  fetchVideos,
  fetchMovies,
  fetchTvSeries,
  searchData,
};
