import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
type MovieSearchCardProps = {
  image: string;
  score: number;
  mname: string;
  id: number;
  release_date: string;
};

export const MovieSearchCard = (props: MovieSearchCardProps) => {
  const date = props.release_date ? format(props.release_date, "yyyy") : "";

  return (
    <Link rel="preload" href={`/movie/${props.id}`}>
      <div key={props.id} className="flex py-3  border-b border-gray-500 ">
        <img
          alt="photo"
          src={props.image}
          className="h-[244px] w-[165px] rounded-lg"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.png";
          }}
        />
        <div className="py-2 px-2">
          <div className="text-xl font-semibold">{props.mname}</div>
          <div className="flex gap-1 text-center items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <div className="text-gray-500 text-sm">
              {Math.round(props.score * 10) / 10}/10
            </div>
          </div>
          <div className="pt-3">
            <div className=" text-sm">
              {date}
              <Button variant="ghost" className="ml-50">
                See more <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};