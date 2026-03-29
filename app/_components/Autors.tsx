"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Cast } from "lucide-react";
import { useEffect, useState } from "react";

export type Cast = {
  cast: {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
  }[];
  crew: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: [];
    id: number;
    origin_country: string;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;

    vote_count: number;
    credit_id: string;
    department: string;
    episode_count: number;
    job: string;
  }[];
};
export type crew = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  origin_country: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;

  vote_count: number;
  credit_id: string;
  department: string;
  episode_count: number;
  job: string;
};
type Response = {
  results: Cast[];
};
type Res = {
  results: crew[];
};
export const Autors = ({ movieId }: { movieId: string }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Cast>();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGEzNzg5MTlmNDZjZjgwYmNhNDZkMThiYTY2NzQ0MiIsIm5iZiI6MTc2MzUyMzY0Mi43NTEwMDAyLCJzdWIiOiI2OTFkM2MzYTYyYTA5ZGE0NmQ3YWQ2ZDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HZMwjz4_eYyA0XA28jMAQt2UFvsMXnmYm0DFdEFLGMk",
              accept: "application/json",
            },
          }
        );

        const data = await res.json();

        console.log("adgadg", data);

        setData(data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(data, "movie");
  if (loading) {
    return (
      <div className="flex flex-col px-[180px] py-5 gap-8 ">
        <div className="flex pb-2 border-b border-gray-200 gap-[53px]">
          <Skeleton className=" w-16 h-7 " />
          <Skeleton className="w-[137px] h-7" />
        </div>
        <div className="flex pb-2 border-b border-gray-200 gap-[53px]">
          <Skeleton className=" w-16 h-7 " />
          <Skeleton className="w-[360px] h-7" />
        </div>
        <div className="flex gap-[53px]">
          <Skeleton className=" w-16 h-7 " />
          <Skeleton className="w-[360px] h-7" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col px-[180px] py-5 gap-8 ">
      <div className="flex pb-2 border-b border-gray-200 gap-[53px]">
        <div className="text-base font-bold w-16">Director</div>
        <p className="">
          {
            data?.crew
              .filter((data) => data.department === "Directing")
              .map((data) => data.name)[0]
          }
        </p>
      </div>
      <div className="flex pb-2 border-b border-gray-200 gap-[53px]">
        <div className="text-base font-bold w-16">Writers</div>
        <p className="flex ">
          {data?.crew
            .filter((data) => data.department === "Writing")
            .map((data) => data.name)
            .join(" · ")}
        </p>
      </div>
      <div className="flex gap-[53px]">
        <div className="text-base font-bold w-16">Stars</div>
        <p className="">{data?.cast[0]?.name}</p>
      </div>
    </div>
  );
};