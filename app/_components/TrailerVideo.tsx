"use client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

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
export const TrailerVideo = ({ movieId }: { movieId: string }) => {
  const [video, setVideo] = useState<Video>();

  useEffect(() => {
    const fetchData = async () => {
      const videoRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGEzNzg5MTlmNDZjZjgwYmNhNDZkMThiYTY2NzQ0MiIsIm5iZiI6MTc2MzUyMzY0Mi43NTEwMDAyLCJzdWIiOiI2OTFkM2MzYTYyYTA5ZGE0NmQ3YWQ2ZDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HZMwjz4_eYyA0XA28jMAQt2UFvsMXnmYm0DFdEFLGMk",
            accept: "application/json",
          },
        }
      );
      const videoData = await videoRes.json();
      console.log(videoData?.results[0]?.key);

      setVideo(videoData?.results[0]?.key);
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-hidden flex w-full ">
      <ReactPlayer
        src={`https://www.youtube.com/watch?v=${video}`}
        style={{
          width: "100%",
          height: "428px",
        }}
      />
    </div>
  );
};