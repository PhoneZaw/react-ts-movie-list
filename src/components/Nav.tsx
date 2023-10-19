import { ChangeEvent, FormEvent, useState } from "react";
import SearchInput from "./SearchInput";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const handleSearchInput = (e : ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
}

const handleSearchSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`/movies?search=${searchTerm}&p=1`)
}

  return (
    <div className="w-full bg-slate-900 z-50">
      <div className="max-w-6xl mx-auto h-auto px-2 py-4 shadow-md flex justify-between items-center">
        <a href="/movies" className="text-2xl uppercase font-bold">Movie List</a>
        <SearchInput 
              searchTerm={searchTerm} 
              onSearchInput={handleSearchInput} 
              onSearchSubmit={handleSearchSubmit} />
      </div>
    </div>
  )
}
