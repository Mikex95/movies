import React from "react";
import Image from "next/image";

export default async function MovieDetail({ params }) {
  const { movie } = params;
  console.log(params.movie);
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const data = await fetch(
    `
  https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const res = await data.json();
  console.log({ res });

  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl">{res.title}</h2>
        <h2 className="text-lg">{res.release_date}</h2>
        <h2 className="text-2xl">Runtime: {res.runtime} minutes</h2>
        <p className="bg-green-600 inline-block my-2 py-2 px-4 rounded-md">{res.status}</p>
        <div className="flex justify-center items-center">
          <Image className="my-12" src={imagePath + res.backdrop_path} width={600} height={600} priority />
        </div>
        <div className="flex justify-center">
          <p className="max-w-xl ">{res.overview}</p>
        </div>
      </div>
    </div>
  );
}
