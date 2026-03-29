"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Cardbox } from "./Cardbox";
import { Skeleton } from "@/components/ui/skeleton";

type MovieSectionProps = {
  categoryName: string;
  title: string;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
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
};

type Response = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_result: number;
};

export const MovieSection = (props: MovieSectionProps) => {
  const { categoryName, title } = props;
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${categoryName}?language=en-US&page=1`,
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGEzNzg5MTlmNDZjZjgwYmNhNDZkMThiYTY2NzQ0MiIsIm5iZiI6MTc2MzUyMzY0Mi43NTEwMDAyLCJzdWIiOiI2OTFkM2MzYTYyYTA5ZGE0NmQ3YWQ2ZDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HZMwjz4_eYyA0XA28jMAQt2UFvsMXnmYm0DFdEFLGMk",
              accept: "application/json",
            },
          },
        );

        const data = (await res.json()) as Response;
        console.log(data, "ADGADGADGAGD");
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="px-20 pt-[52px]">
        <Skeleton className="w-full h-full" />
        <div className="flex justify-between">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-8 w-[250px]" />
        </div>
        <div className=" gap-8 w-full grid grid-cols-1 sm:grid-cols-5 justify-center items-center pt-8 ">
          {movies.slice(0, 10).map((movie) => (
            <Skeleton className=" h-[439px] flex flex-col rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-20 pt-[52px]">
      <div className="flex justify-between">
        <h3 className="font-semibold">{title} </h3>

        <Link href={`/category/${categoryName}`}>
          <Button variant="ghost">
            See more <ArrowRight />
          </Button>
        </Link>
      </div>
      <div className=" gap-8 w-full grid grid-cols-1 sm:grid-cols-5 justify-center items-center pt-8 ">
        {movies?.slice(0, 10)?.map((movie) => (
          <Cardbox
            key={movie.id}
            id={movie.id}
            image={
              movie.poster_path
                ? "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                : "/placeholder.png"
            }
            score={movie.vote_average}
            mname={movie.title}
          />
        ))}
      </div>
    </div>
  );
};