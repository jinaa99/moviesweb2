"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Movie } from "./MovieSection";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MovieSearchCard } from "./MovieSearchCard";
import { Search, SearchCheckIcon } from "lucide-react";

export const SearchSection = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGEzNzg5MTlmNDZjZjgwYmNhNDZkMThiYTY2NzQ0MiIsIm5iZiI6MTc2MzUyMzY0Mi43NTEwMDAyLCJzdWIiOiI2OTFkM2MzYTYyYTA5ZGE0NmQ3YWQ2ZDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HZMwjz4_eYyA0XA28jMAQt2UFvsMXnmYm0DFdEFLGMk",
            accept: "application/json",
          },
        },
      );
      const data = await res.json();
      console.log(data.results, "kkkkkkkk");
      setMovies(data.results);
      setLoading(false);
    };
    fetchMovies();
  }, [query]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div
          className={cn(
            "px-3 mr-3 w-100 rounded-lg border shadow-md md:min-w-[379px] ml-4 h-9 flex flex-row gap-2 text-center justify-center items-center",
            open && "opacity-0 ",
          )}
        >
          <Search strokeWidth={2} color="#5c6466" size={20} />
          <input
            value={query}
            className={cn(" w-100")}
            placeholder="Search..."
            readOnly
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-120 p-3 flex flex-col items-center "
        autoFocus={false}
      >
        <input
          value={query}
          onChange={handleChange}
          className="w-100! absolute -top-8"
          placeholder="   Search..."
        />
        <div className="w-full max-h-150 rounded-md overflow-scroll">
          {loading && <p className="p-4 text-center">Loading...</p>}
          {!loading && movies.length === 0 && (
            <p className="p-4 text-center">No result found.</p>
          )}
          {!loading &&
            movies.map((movie) => (
              <MovieSearchCard
                key={movie.id}
                id={movie.id}
                image={
                  movie.poster_path
                    ? "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                    : "/placeholder.png"
                }
                score={movie.vote_average}
                mname={movie.title}
                release_date={movie.release_date}
              />
            ))}
          <div className="flex py-3  border-t border-gray-500 table-auto md:table-fixed">
            <button className=""> See all results for {query}</button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};