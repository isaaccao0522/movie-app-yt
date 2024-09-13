interface IMovie {
  id: string;
  poster_path: string;
  title: string;
  name: string;
  vote_average: number
  release_date: Date;
  first_air_date: Date
  oster_path: string;
  media_type: string;
  backdrop_path: string;
  tagline: string;
  overview: string;
  genres: [
    {
      id: string;
      name: string;
    }
  ];
}

interface ICast {
  id: number;
  cast_id: number;
  adult: boolean;
  gender: number;
  character: string;
  credit_id: string;
  known_for_department: string;
  name: string;
  title: string;
  order: number;
  original_name: string
  popularity: number
  profile_path: string
}

interface IVideo {
  id: string
  name: string;
  title: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: string;
  published_at: string;
}

interface ITVShows {
  id: number;
  backdrop_path: string;
  first_air_date: string;
  release_date: Date;
  genre_ids: number[];
  name: string;
  title: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}



export { IMovie, ICast, IVideo, ITVShows }