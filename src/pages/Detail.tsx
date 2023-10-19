import axios from "axios";
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import { ACCESS_TOKEN, IMAGE_URL, MOVIE_DETAIL_URL } from "../data/Constants";

export default function Detail () {
  const movie = useLoaderData() as MovieDetailType;

  return (
    <>
      <div className="mx-auto mt-32 flex flex-col items-center border rounded-lg px-6 py-4 shadow md:flex-row md:max-w-3xl border-gray-700 bg-gray-800/80">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={`${IMAGE_URL}/w500/${movie.poster_path}`} alt={movie.title} />
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.overview}</p>
        </div>
      </div>
      <img className="w-screen h-screen absolute inset-0 -z-10 opacity-60" src={`${IMAGE_URL}/original/${movie.backdrop_path}`} />
    </>
  )
}

export const Loader = async ({ params } : LoaderFunctionArgs) => {

  const moviesResult = await getMovieDetail(params.movieId!);

  return moviesResult;
}

const getMovieDetail = async (id : string) : Promise<MovieDetailType> => {

  const url = `${MOVIE_DETAIL_URL}/${id}`;

  const config = {
      headers:{
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        accept: "application/json"
      }
    };
    
  const response = await axios.get<MovieDetailType>(url, config);

  console.log(response);

  return response.data;
}