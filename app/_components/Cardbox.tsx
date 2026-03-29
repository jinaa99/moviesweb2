import Link from "next/link";

type CardboxProps = {
  image: string;
  score: number;
  mname: string;
  id: number;
};
export const Cardbox = (props: CardboxProps) => {
  return (
    <Link rel="preload" href={`/movie/${props.id}`}>
      <div
        key={props.id}
        className=" h-[439px] bg-[#F4F4F5] dark:bg-[#27272A] flex flex-col rounded-lg"
      >
        <img
          alt="photo"
          src={props.image}
          className=" h-[340px] w-full rounded-t-lg"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.png";
          }}
        />
        <div className="py-2 px-2">
          <div className="flex gap-1 text-center items-center">
            <img alt="icon" src="/Star.png" className="h-4 w-4" />
            <div className="">{Math.round(props.score * 10) / 10}/10</div>
          </div>
          <div className="">{props.mname}</div>
        </div>
      </div>
    </Link>
  );
};