"use client";
import { useEffect, useState } from "react";
import React from "react";
import ReactPlayer from "react-player";
import { Genres } from "./Genres";
import { TrailerVideo } from "./TrailerVideo";
import { Skeleton } from "@/components/ui/skeleton";

type MovieDetail = {
  release_date: string;
  original_title: string;
  bigtitle: string;
  info: string;
  score: number;
  mname: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  genres: { id: number; name: string }[];
  overview: string;
  popularity: number;
  poster_path: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: number;
  min: number;
};
type Video = {
  release_date: string;
  original_title: string;
  bigtitle: string;
  info: string;
  score: number;
  mname: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;

  overview: string;
  popularity: number;
  poster_path: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
export const MovieDetailB = ({ movieId }: { movieId: string }) => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<MovieDetail>();
  const [video, setVideo] = useState<Video>();
  const popularity = movie?.popularity ? Math.floor(movie?.popularity) : "";
  const min = movie?.runtime || 0;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
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

        console.log("adgadg", data);

        setMovie(data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(movie, "movie");
  if (loading) {
    return (
      <div className="px-[180px]">
        <div className=" flex justify-between py-[52px]">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-[211px] h-10" />
            <Skeleton className="w-[237px] h-7" />
          </div>
          <div className="">
            <div className="text-xs font-medium pl-3">Rating</div>
            <div className=" flex flex-col gap-2">
              <div className=" text-center items-center">
                <Skeleton className="h-5 w-[83px] mt-2 " />
                <Skeleton className="h-5 w-[83px] mt-2" />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden flex justify-between">
          <Skeleton className="w-[290px] h-[428px] mr-8" />
          <Skeleton className="w-full h-[428px] mr-8" />
        </div>
        <div className="pt-8 flex gap-3">
          {movie?.genres.map((genre) => {
            return (
              <div
                key={genre.id}
                className="flex flex-row justify-center items-center text-center  rounded-lg border shadow-md  border-gray-500 text-black text-xs py-0.5 px-2.5 "
              >
                <div className=" font-semibold">{genre.name}</div>
              </div>
            );
          })}
        </div>
        <Skeleton className="w-full h-12 mt-5" />
      </div>
    );
  }
  return (
    <div className="px-[180px]">
      <div className=" flex justify-between py-[52px]">
        <div>
          <h3 className="text-4xl font-extrabold">{movie?.original_title}</h3>
          <div className="">
            {movie?.release_date} · PG · {Math.floor(min / 60)}h {min % 60}m
          </div>
        </div>
        <div className="">
          <div className="text-xs font-medium pl-3">Rating</div>
          <div className=" py-2 px-2">
            <div className=" gap-1 text-center items-center flex">
              <img alt="icon" src="/Star.png" className="h-7 w-6" />
              <div className=" font-semibold">
                {Math.round((movie?.vote_average ?? 0) * 10) / 10}/10
              </div>{" "}
            </div>
            <div className="flex text-xs pl-7 text-gray-500">{popularity}k</div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden flex justify-between">
        <img
          src={
            movie?.poster_path
              ? "https://image.tmdb.org/t/p/w500/" + movie.poster_path
              : "/placeholder.png"
          }
          alt=""
          className="w-[290px] h-[428px] mr-8"
        />
        <TrailerVideo movieId={movieId} />
      </div>
      <div className="pt-8 flex gap-3">
        {movie?.genres.map((genre) => {
          return (
            <div
              key={genre.id}
              className="flex flex-row justify-center items-center text-center  rounded-lg border shadow-md  border-gray-500 text-black text-xs py-0.5 px-2.5 "
            >
              <div className=" font-semibold">{genre.name}</div>
            </div>
          );
        })}
      </div>
      <div className="text-base mt-5">{movie?.overview}</div>
    </div>
  );
};