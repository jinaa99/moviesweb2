"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Cardbox } from "./Cardbox";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { parseAsBoolean, useQueryState } from "nuqs";
import { PaginationCard } from "./PaginationCard";
export type Movie = {
  adult: boolean;
  backdrop_patch: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  onSeeMore?: () => void;
};
type MoreLikeThisProps = {
  onSeeMore?: () => void;
  movieId: string;
  movieCount: number;
  pagination: boolean;
};
type Response = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_result: number;
};

export const MoreLikeThis = ({
  movieId,
  onSeeMore,
  movieCount,
  pagination,
}: MoreLikeThisProps) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [more, setMore] = useQueryState(
    "more",
    parseAsBoolean.withDefault(false)
  );
  const handleClick = () => {
    setMore(true);
  };
  const [currentPage] = useQueryState("page", {
    defaultValue: "1",
  });
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=${currentPage}`,
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGEzNzg5MTlmNDZjZjgwYmNhNDZkMThiYTY2NzQ0MiIsIm5iZiI6MTc2MzUyMzY0Mi43NTEwMDAyLCJzdWIiOiI2OTFkM2MzYTYyYTA5ZGE0NmQ3YWQ2ZDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HZMwjz4_eYyA0XA28jMAQt2UFvsMXnmYm0DFdEFLGMk",
              accept: "application/json",
            },
          }
        );

        const data = (await res.json()) as Response;
        console.log(data.results, "bbbbbbbhbbbb");
        setMovies(data.results);
        setTotalPage(data.total_pages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId, currentPage]);
  if (loading) {
    return (
      <div className="px-20 pt-[52px]">
        <div className="flex justify-between">
          <Skeleton className="w-[250px] h-8" />
          <Skeleton className="w-[250px] h-8" />
        </div>
        <div className=" gap-8 w-full grid grid-cols-1 sm:grid-cols-5 justify-center items-center pt-8 ">
          {movies.slice(0, 5).map((movie) => (
            <Skeleton
              key={movie?.id}
              className=" h-[439px] flex flex-col rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="px-20 pt-[52px]">
      <div className="flex justify-between">
        <h3 className="font-semibold">More like this</h3>

        <Button
          variant="ghost"
          onClick={onSeeMore}
          className={`${more ? "hidden" : ""}`}
        >
          See more <ArrowRight />
        </Button>
      </div>
      <div className=" gap-8  w-full grid grid-cols-1 sm:grid-cols-5 justify-center items-center pt-8 ">
        {movies.slice(0, movieCount)?.map((movie) => (
          <Cardbox
            key={movie?.id}
            id={movie?.id}
            image={"https://image.tmdb.org/t/p/w500/" + movie?.poster_path}
            score={movie?.vote_average}
            mname={movie?.title}
          />
        ))}
      </div>
      {pagination && <PaginationCard totalPages={totalPage} />}
    </div>
  );
};