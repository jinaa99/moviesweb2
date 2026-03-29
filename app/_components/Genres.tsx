import { ChevronRight } from "lucide-react";

type GenresProps = {
  genre: string;
};
export const Genres = (props: GenresProps) => {
  return (
    <div className="flex flex-row justify-center items-center text-center  rounded-lg border shadow-md  border-gray-500 text-black text-xs pl-2.5 ">
      <div className=" font-semibold">{props.genre}</div>
      <ChevronRight />
    </div>
  );
};