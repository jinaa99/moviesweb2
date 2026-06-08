"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PaginationCard } from "./PaginationCard";
import { useSearchParams } from "next/navigation";
import { Movie } from "./MovieSection";
import FilteredMoviesSkeleton from "./FilteredMoviesSkeleton";
import { useQueryState } from "nuqs";
import { Star } from "lucide-react";

export const FilteredMovies = () => {
  const [filtermovies, setFiltermovies] = useState<Movie[]>([]);
  const [totalmovie, setTotalmovie] = useState(0);
  const [totalpage, setTotalpage] = useState(1);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const genreIds = searchParams.get("genreIds")?.split(",") || [];
  console.log(genreIds.join(), "agdag");
  const [currentpage, setCurrentPage] = useQueryState("page", {
    defaultValue: "1",
  });
  const filtermovieurl = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds
    .filter((item) => item)
    .join()}&page=${currentpage}`;

  useEffect(() => {
    const getGenre = async () => {
      setLoading(true);

      const res = await fetch(filtermovieurl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGEzNzg5MTlmNDZjZjgwYmNhNDZkMThiYTY2NzQ0MiIsIm5iZiI6MTc2MzUyMzY0Mi43NTEwMDAyLCJzdWIiOiI2OTFkM2MzYTYyYTA5ZGE0NmQ3YWQ2ZDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HZMwjz4_eYyA0XA28jMAQt2UFvsMXnmYm0DFdEFLGMk",
        },
      });
      const data = (await res.json()) as {
        results: Movie[];
        total_results: number;
        total_pages: number;
      };
      console.log("gg", data);
      setTotalmovie(data.total_results);
      setTotalpage(data.total_pages);
      setFiltermovies(data.results);

      setLoading(false);
    };
    getGenre();
  }, [currentpage, genreIds.join()]);
  return (
    <div className="flex flex-col gap-8 pl-4 border-l">
      <p className="text-xl font-semibold">
        {totalmovie} titles in “{genreIds}”
      </p>
      {loading && (
        <div className="grid grid-cols-4 gap-8">
          {Array.from({ length: 20 }).map((_, index) => (
            <FilteredMoviesSkeleton key={index} />
          ))}
        </div>
      )}
      {!loading && (
        <div className="grid grid-cols-4 gap-8">
          {filtermovies?.map((filtermovie) => {
            return (
              <Link key={filtermovie.id} href={`/movie/${filtermovie.id}`}>
                <div
                  key={filtermovie.id}
                  className=" w-[165px] h-[331px] bg-[#F4F4F5] dark:bg-[#27272A] flex flex-col rounded-lg pb-10"
                >
                  <img
                    className="h-[244px]  w-full rounded-t-lg"
                    src={
                      filtermovie.poster_path
                        ? "https://image.tmdb.org/t/p/w500/" +
                          filtermovie.poster_path
                        : "/placeholder.png"
                    }
                  ></img>
                  <div className="flex gap-2 py-2 px-2 items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <p className="">
                      {Math.round(filtermovie.vote_average * 10) / 10}/10
                    </p>
                  </div>
                  <p className="px-2">{filtermovie.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      <div className=" flex justify-end h-10">
        <PaginationCard totalPages={totalpage} />
      </div>
    </div>
  );
};