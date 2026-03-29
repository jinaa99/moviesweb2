"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play, Video } from "lucide-react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};
type Response = {
  id: number;
  results: Video[];
};
export const WatchTrailerButton = (props: { id: number }) => {
  const [video, setVideo] = useState<string>("");
  useEffect(() => {
    console.log("ajillaaa");

    const getData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${props.id}/videos?language=en-US`,
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
        setVideo(data?.results[0]?.key);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-white text-black mt-20" variant="outline">
            <Play /> Watch Trailer
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[997px] h-[561px] ">
          <DialogTitle></DialogTitle>
          {
            <ReactPlayer
              src={`https://www.youtube.com/watch?v=${video}`}
              style={{
                width: "100%",
                height: "428px",
              }}
            />
          }
        </DialogContent>
      </Dialog>
    </div>
  );
};