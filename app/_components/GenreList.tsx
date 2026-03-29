"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { Genre } from "./Intro";

export default function GenreList({ path = "" }: { path?: string }) {
  const [genres, setgenres] = useState<Genre[]>([]);

  // const { genreIds } = useParams() as { genreIds: string };

  const searchParams = useSearchParams();
  const genreIds = searchParams.get("genreIds")?.split(",") || [];
  console.log("aaaaA", genreIds);
  const pathname = usePathname();
  const router = useRouter();

  // const handleClickGenre = (genreId: string) => {
  //   const params = new URLSearchParams(searchParams.toString());

  //   const updatedGenreIds = genreIds?.includes(genreId)
  //     ? genreIds.filter((id) => id !== genreId)
  //     : [...genreIds, genreId];
  //   params.set("genreIds", updatedGenreIds.join(","));
  //   console.log(pathname + path);

  //   router.push(pathname + "?" + params.toString());
  // };
  const handleClickGenre = (genreId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const updatedGenreIds = genreIds?.includes(genreId)
      ? genreIds.filter((id) => id !== genreId)
      : [...genreIds, genreId];

    if (updatedGenreIds.length === 0) {
      params.delete("genreIds");
    } else {
      params.set("genreIds", updatedGenreIds.join(","));
    }

    const targetPath = path ? "/" + path : pathname;

    router.push(`${targetPath}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const getGenre = async () => {
      const res = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGEzNzg5MTlmNDZjZjgwYmNhNDZkMThiYTY2NzQ0MiIsIm5iZiI6MTc2MzUyMzY0Mi43NTEwMDAyLCJzdWIiOiI2OTFkM2MzYTYyYTA5ZGE0NmQ3YWQ2ZDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HZMwjz4_eYyA0XA28jMAQt2UFvsMXnmYm0DFdEFLGMk",
          },
        },
      );

      const data = await res.json();
      setgenres(data.genres);
    };
    getGenre();
  }, []);
  return (
    <div className="flex flex-col w-[387px]">
      <p className="text-2xl font-semibold">Genres</p>
      <p>See lists of movies by genre</p>
      <div className="w-full flex flex-wrap gap-4 my-4">
        {genres?.map((genre, index) => {
          return (
            <Badge
              key={index}
              className="hover:bg-black hover:text-white"
              variant={
                genreIds.includes(genre.id.toString()) ? "default" : "outline"
              }
              onClick={() => handleClickGenre(genre.id.toString())}
            >
              {genre.name} <ChevronRight />
            </Badge>
          );
        })}
      </div>
    </div>
  );
}