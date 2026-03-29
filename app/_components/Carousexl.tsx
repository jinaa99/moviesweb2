"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { WatchTrailerButton } from "./WatchTrailerButton";

import { Skeleton } from "@/components/ui/skeleton";
import { Movie } from "./MovieSection";

type Response = {
  results: Movie[];
};
export const Carouselx = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
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
        console.log(data.results);

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
      <div className="w-full h-[600px] pt-6">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <Carousel className="w-full h-[600px] pt-6">
      <CarouselContent>
        {movies.map((el, index) => (
          <CarouselItem key={index}>
            <div className="p-1 relative">
              <img
                alt="photo"
                src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`}
                className="w-full h-[600px] bg-cover"
              />
              {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
              <div className="absolute left-35 top-1/2 -translate-y-1/2 w-[404px]">
                <div className="">
                  <div className="text-white text-base">Now Playing:</div>
                  <h1 className="text-white font-extrabold text-4xl">
                    {el.title}
                  </h1>
                  <div className="flex gap-1 text-center items-center pb-4">
                    <img alt="" src="/Star.png" className="h-7 w-7" />
                    <div className="text-white">
                      {Math.round(el.vote_average * 10) / 10} / 10
                    </div>
                  </div>
                  <div className="text-white text-xs h-20 w-[302px] pb-4">
                    {el.overview}
                  </div>
                  {/* <Button className="bg-white text-black mt-4">
                    <Play /> Watch Trailer
                  </Button> */}
                  <WatchTrailerButton id={el.id} />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 p-2 size-10 rounded-full" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 p-2 size-10 rounded-full" />
    </Carousel>
  );
};