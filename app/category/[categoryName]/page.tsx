"use client";
import { Cardbox } from "@/app/_components/Cardbox";
import { Footer } from "@/app/_components/Footer";
import { Movie, MovieSection } from "@/app/_components/MovieSection";
import { PaginationCard } from "@/app/_components/PaginationCard";
import { sections } from "@/app/_constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { title } from "process";
import { use, useEffect, useState } from "react";
type Response = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_result: number;
};

const CategorySectionDetail = ({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) => {
  const { categoryName } = use(params);
  const title = sections.find(
    (item) => item.categoryName === categoryName
  )?.title;
  const [movies, setMovies] = useState<Movie[]>([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [currentPage] = useQueryState("page", {
    defaultValue: "1",
  });
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${categoryName}?language=en-US&page=${currentPage}`,
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

        setMovies(data.results);
        setTotalPage(data.total_pages);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [categoryName, currentPage]);
  // const nextPage = () => {
  //   setCurrentPage((prev) => prev + 1);
  // };
  // const prevPage = () => {
  //   setCurrentPage((prev) => prev - 1);
  // };

  return (
    <div>
      <div className="px-20 pt-[52px]">
        <div className="flex justify-between">
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className=" gap-8 w-full grid grid-cols-1 sm:grid-cols-5 justify-center items-center pt-8 ">
          {movies?.map((movie) => (
            <Cardbox
              id={movie.id}
              key={movie.id}
              image={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
              score={movie.vote_average}
              mname={movie.title}
            />
          ))}
        </div>
      </div>
      <PaginationCard totalPages={totalPage} />
      {/* <div className="mt-8 px-20 flex justify-end">
        <Pagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft />
                Previous
              </Button>
            </PaginationItem>

            {currentPage > 2 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}
            {currentPage > 1 && (
              <>
                <PaginationItem>
                  <Button onClick={prevPage} variant="outline">
                    {currentPage - 1}
                  </Button>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <Button variant="default">{currentPage}</Button>
            </PaginationItem>

            <PaginationItem>
              <Button onClick={nextPage} variant="outline">
                {currentPage + 1}
              </Button>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                onClick={nextPage}
                disabled={currentPage === totalPage}
              >
                Next
                <ChevronRight />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div> */}

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CategorySectionDetail;