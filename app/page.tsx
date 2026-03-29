import { Intro } from "./_components/Intro";
import { Carouselx } from "./_components/Carousexl";
import { Footer } from "./_components/Footer";
import { MovieSection } from "./_components/MovieSection";

export const sections = [
  {
    title: "Top Rated",
    categoryName: "top_rated",
  },
  {
    title: "Upcoming",
    categoryName: "upcoming",
  },
  {
    title: "Popular",
    categoryName: "popular",
  },
];

export default function Home() {
  return (
    <div
      className="border w-screen h-screen flex-col
     bg-white dark:bg-black"
    >
      <Intro />
      <Carouselx />

      {sections.map((item) => (
        <MovieSection
          key={item.title}
          title={item.title}
          categoryName={item.categoryName}
        />
      ))}

      <Footer />
    </div>
  );
}