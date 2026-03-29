"use client";
import { Cardbox } from "@/app/_components/Cardbox";
import { Movie, MovieSection } from "@/app/_components/MovieSection";
import { sections } from "@/app/_constants";
import { Button } from "@/components/ui/button";
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
import { title } from "process";
import { use, useEffect, useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
type PaginationCardProps = {
  totalPages: number;
};

export const PaginationCard = ({ totalPages }: PaginationCardProps) => {
  const [currentPage, setCurrentPage] = useQueryState("page", {
    defaultValue: "1",
  });
  const nextPage = () => {
    setCurrentPage((Number(currentPage) + 1).toString());
  };
  const prevPage = () => {
    setCurrentPage((Number(currentPage) - 1).toString());
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const res = await fetch(
  //         `https://api.themoviedb.org/3/movie/${categoryName}?language=en-US&page=${currentPage}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization:
  //               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGEzNzg5MTlmNDZjZjgwYmNhNDZkMThiYTY2NzQ0MiIsIm5iZiI6MTc2MzUyMzY0Mi43NTEwMDAyLCJzdWIiOiI2OTFkM2MzYTYyYTA5ZGE0NmQ3YWQ2ZDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HZMwjz4_eYyA0XA28jMAQt2UFvsMXnmYm0DFdEFLGMk",
  //             accept: "application/json",
  //           },
  //         }
  //       );

  //       const data = (await res.json()) as Response;

  //       setMovies(data.results);
  //       setTotalPage(data.total_pages);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getData();
  // }, [currentPage]);
  // const nextPage = () => {
  //   setCurrentPage((prev) => prev + 1);
  // };
  // const prevPage = () => {
  //   setCurrentPage((prev) => prev - 1);
  // };

  return (
    <div className="mt-8 px-20">
      <Pagination className="flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="outline"
              onClick={prevPage}
              aria-hidden={currentPage == "1"}
            >
              <ChevronLeft />
              Previous
            </Button>
          </PaginationItem>

          {currentPage >= "2" && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}
          {currentPage > "1" && (
            <>
              <PaginationItem>
                <Button onClick={prevPage} variant="outline"></Button>
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
              // disabled={currentPage === totalPage}
            >
              Next
              <ChevronRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};