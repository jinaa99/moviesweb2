import GenreList from "@/app/_components/GenreList";
import { Intro } from "../_components/Intro";
import { Footer } from "../_components/Footer";
import { FilteredMovies } from "../_components/FilteredMovies";

export default function Genre() {
  return (
    <div className="h-screen w-screen items-center gap-13">
      <Intro />
      <div className="flex flex-col items-center gap-8">
        <h1 className="flex w-302.5 justify-start text-3xl font-semibold">
          Search filter
        </h1>
        <div className="flex gap-8 px-40">
          <div className="w-[387px] h-[352px]">
            <GenreList />
          </div>
          <div>
            <FilteredMovies />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}