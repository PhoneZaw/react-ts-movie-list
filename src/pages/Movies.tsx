import {ReturnType} from '../data/ReturnType'
import axios from "axios";
import { LoaderFunctionArgs, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import Navigator from "../components/Navigator";
import MovieComponent from "../components/MovieComponent";
import { ACCESS_TOKEN, MOVIE_LIST_URL, MOVIE_SEARCH_URL } from "../data/Constants";

export default function Movies() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams({p: "1", search: ""})
    const moviesResult = useLoaderData() as ReturnType;

    const currentPageNo = parseInt(searchParams.get("p") || "1")

    const searchTerm = searchParams.get("search") || ""

    const navigateBackwardPage = () => {

        if(currentPageNo > 1){
            navigate(`/movies?search=${searchTerm}&p=${currentPageNo-1}`)
        }
    }

    const navigateForwardPage = () => {
        
        if(currentPageNo < moviesResult.total_pages){
            navigate(`/movies?search=${searchTerm}&p=${currentPageNo+1}`)
        }
    }

    const navigateToPage = (pageNo : Number) => {
        
        if(currentPageNo < moviesResult.total_pages){
            navigate(`/movies?search=${searchTerm}&p=${pageNo}`)
        }
    }

  return (
    <div className='max-w-6xl mx-auto'>
        <Navigator 
            navigateBackwardPage={navigateBackwardPage} 
            navigateForwardPage={navigateForwardPage} 
            navigateToPage={navigateToPage}
            currentPageNo={currentPageNo} 
            totalPageNo={moviesResult.total_pages} />
        
        {searchTerm.trim().length > 0 &&
        (
            <p className='text-xl font-semibold mb-5'>Search result for - {searchTerm}</p>
        )}
        
        {currentPageNo > 1 &&
        (
            <p className='text-xl font-semibold mb-5'>Current Page - {currentPageNo}</p>
        )}

        { moviesResult.results.length > 0
        ? (
            <div className='grid grid-cols-3 gap-4 mx-auto max-w-6xl'>
                { moviesResult.results.map(movie => <MovieComponent key={movie.id} movie={movie} />) }
            </div>
        ) : (
            <div>No Data</div>
        )
        }
    </div>
  )
}

export const Loader = async ({ request } : LoaderFunctionArgs) => {

    const url = new URL(request.url);

    const pageNoResult = url.searchParams.get("p");
    const p = pageNoResult ? parseInt(pageNoResult) : 1;

    const search = url.searchParams.get("search");

    const moviesResult = await getMoviesResult(p, search);

    return moviesResult;
}

const getMoviesResult = async (pageNo : number, search : string | null) : Promise<ReturnType> => {

    var url : string = "";

    if(search?.trim().length){
        url = `${MOVIE_SEARCH_URL}?include_adult=false&&sort_by=popularity.desc&query=${search}&page=${pageNo}`;
    }else{
        url = `${MOVIE_LIST_URL}?include_adult=false&&sort_by=popularity.desc&page=${pageNo}`;
    }

    const config = {
        headers:{
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          accept: "application/json"
        }
      };
      
    const response = await axios.get<ReturnType>(url, config);

    console.log(response);

    return response.data;
}