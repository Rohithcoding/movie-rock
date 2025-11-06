"use client";

import { tmdb } from "@/api/tmdb";
import { Params } from "@/types";
import { Spinner } from "@heroui/react";
import { useScrollIntoView } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Suspense, use } from "react";
import dynamic from "next/dynamic";
import { NextPage } from "next";
const PhotosSection = dynamic(() => import("@/components/ui/other/PhotosSection"));
const TvShowRelatedSection = dynamic(() => import("@/components/sections/TV/Details/Related"));
const TvShowCastsSection = dynamic(() => import("@/components/sections/TV/Details/Casts"));
const TvShowBackdropSection = dynamic(() => import("@/components/sections/TV/Details/Backdrop"));
const TvShowOverviewSection = dynamic(() => import("@/components/sections/TV/Details/Overview"));
const TvShowsSeasonsSelection = dynamic(() => import("@/components/sections/TV/Details/Seasons"));
const YouTubePlayer = dynamic(() => import("@/components/common/YouTubePlayer"));

const TVShowDetailPage: NextPage<Params<{ id: number }>> = ({ params }) => {
  const { id } = use(params);
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 500,
  });

  const {
    data: tv,
    isPending,
    error,
  } = useQuery({
    queryFn: () =>
      tmdb.tvShows.details(id, [
        "images",
        "videos",
        "credits",
        "keywords",
        "recommendations",
        "similar",
        "reviews",
        "watch/providers",
      ]),
    queryKey: ["tv-show-detail", id],
  });

  if (isPending) {
    return (
      <div className="mx-auto max-w-5xl">
        <Spinner size="lg" className="absolute-center" color="warning" variant="simple" />
      </div>
    );
  }

  // Find the first YouTube trailer
  const trailer = tv?.videos?.results?.find(
    (video: any) => video.site === 'YouTube' && video.type === 'Trailer'
  );

  // If no trailer, look for any YouTube video
  const youtubeVideo = trailer || tv?.videos?.results?.find(
    (video: any) => video.site === 'YouTube' && video.key
  );

  if (error) notFound();

  return (
    <div className="mx-auto max-w-5xl">
      <Suspense
        fallback={
          <Spinner size="lg" className="absolute-center" color="warning" variant="simple" />
        }
      >
        <div className="space-y-8">
          <TvShowBackdropSection tvShow={tv} />
          {youtubeVideo && (
            <div className="bg-card rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Trailer</h2>
              <YouTubePlayer 
                videoId={youtubeVideo.key} 
                autoplay={false}
              />
            </div>
          )}
          <TvShowOverviewSection tvShow={tv} />
          <TvShowsSeasonsSelection tvShow={tv} seasons={tv.seasons} />
          <TvShowCastsSection casts={tv.credits.cast} />
          <PhotosSection images={tv.images.backdrops} title="Backdrops" />
          <TvShowRelatedSection tvShow={tv} />
        </div>
      </Suspense>
    </div>
  );
};

export default TVShowDetailPage;
