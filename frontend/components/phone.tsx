import Image from "next/image";
import React from "react";

export default function PhoneMockup({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="hidden md:block relative mx-auto border-black dark:border-black bg-black border-[14px] rounded-[2.5rem] h-[82vh] w-[375px] shadow-xl drop-shadow-2xl z-10">
        <div className="w-[148px] h-[24px] bg-black top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[3px] bg-black absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-black absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-black absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className="rounded-[2rem] overflow-auto w-full h-full text-black bg-white p-4 px-1">
          {children}
        </div>
      </div>
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/028/754/535/large/twilight-skyscrapers-cartoon-animation-high-rise-buildings-sundown-dusk-4k-motion-graphic-sunset-downtown-2d-animated-background-full-frame-after-hours-aesthetic-lofi-live-wallpaper-video.jpg"
        alt="bg"
        width={1000}
        height={1000}
        className="absolute top-0 left-0 w-full h-full object-fill blur-xs z-0 opacity-50"
      />
      <div className="md:hidden flex items-center justify-center pt-8 flex-col bg-gradient-to-l from-primary via-secondary to-tertiary text-white min-h-screen">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
