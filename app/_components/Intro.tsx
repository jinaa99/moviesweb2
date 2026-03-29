"use client";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

import { useEffect, useState } from "react";
import { SearchSection } from "./SearchSection";
import { ModeToggle } from "./ModeToggle";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import GenreList from "./GenreList";
import { useTheme } from "next-themes";
import Link from "next/link";

export type Genre = {
  id: number;
  name: string;
};
type Response = {
  genres: Genre[];
};

export const Intro = () => {
  const [genres, setgenres] = useState<Genre[]>([]);
  const { setTheme, theme } = useTheme();
  //k
  const searchParams = useSearchParams();

  const genreIds = searchParams.get("genreIds")?.split(",") || [];
  console.log("aaaaA", genreIds);

  const router = useRouter();

  const handleClickGenre = (genreId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const updatedGenreIds = genreIds?.includes(genreId)
      ? genreIds.filter((id) => id !== genreId)
      : [...genreIds, genreId];
    params.set("genreIds", updatedGenreIds.join(","));
    router.push("/genresfilter" + "?" + params);
  };

  useEffect(() => {
    const getGenre = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
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
        setgenres(data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    getGenre();
  }, []);
  return (
    <div className="h-9 w-screen flex justify-center  text-center items-center my-[11.5px] px-20">
      <Link href="/">
        <img alt="logo" src="/Logo.png" className="w-[92px] h-5 mr-[332px]" />
      </Link>
      <Popover>
        <PopoverTrigger className="flex" asChild>
          <Button variant="outline">
            <ChevronDown />
            Genre
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[450px]  ">
          <GenreList path="genres" />
        </PopoverContent>
      </Popover>
      <SearchSection />
      <ModeToggle />
    </div>
  );
};