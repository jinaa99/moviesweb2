"use client";
import { Autors } from "@/app/_components/Autors";
import { Footer } from "@/app/_components/Footer";
import { Intro } from "@/app/_components/Intro";
import { MoreLikeThis } from "@/app/_components/MoreLikeThis";
import { MovieDetailB } from "@/app/_components/MovieDetailB";
import { Movie } from "@/app/_components/MovieSection";
import { parseAsBoolean, useQueryState } from "nuqs";
import { use, useEffect, useState } from "react";

const MovieDetailPage = ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const { movieId } = use(params);
  const [more, setMore] = useQueryState(
    "more",
    parseAsBoolean.withDefault(false)
  );
  const handleClick = () => {
    setMore(true);
  };
  const handleBack = () => setMore(false);
  const movieCount = more ? 20 : 5;
  // const pagination = more ? true : false;

  //   const [movie, setMovie] = useState<Movie[]>([]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const res = await fetch(
  //         `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization:
  //               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGEzNzg5MTlmNDZjZjgwYmNhNDZkMThiYTY2NzQ0MiIsIm5iZiI6MTc2MzUyMzY0Mi43NTEwMDAyLCJzdWIiOiI2OTFkM2MzYTYyYTA5ZGE0NmQ3YWQ2ZDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HZMwjz4_eYyA0XA28jMAQt2UFvsMXnmYm0DFdEFLGMk",
  //             accept: "application/json",
  //           },
  //         }
  //       );

  //       const data = await res.json();

  //       setMovie(data);
  //     };
  //     fetchData();
  //   }, []);

  return (
    <div>
      <Intro />
      {!more && (
        <>
          <MovieDetailB movieId={movieId} />
          <Autors movieId={movieId} />
          <MoreLikeThis
            movieId={movieId}
            onSeeMore={handleClick}
            movieCount={movieCount}
            pagination={more}
          />
        </>
      )}

      {more && (
        <>
          <MoreLikeThis
            movieId={movieId}
            movieCount={movieCount}
            pagination={more}
          />
        </>
      )}

      <Footer />
    </div>
  );
};

export default MovieDetailPage;