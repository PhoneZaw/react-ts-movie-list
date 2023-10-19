import { IMAGE_URL } from "../data/Constants"
import { MovieType } from "../data/MovieType"

interface MovieComponentProp {
    movie : MovieType
}

export default function MovieComponent({movie} : MovieComponentProp) {
  return (
    <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href={`/movies/${movie.id}`}>
          <img className="rounded-t-lg" src={`${IMAGE_URL}/w500/${movie.backdrop_path}`} alt={movie.title} />
      </a>
      <div className="p-5">
          <a href={`/movies/${movie.id}`}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
      </div>
    </div>
    // <div key={movie.id} onClick={() => HandleMovieOnClick(movie.id)}>{movie.title}</div>
  )
}


