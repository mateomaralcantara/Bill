"use client";

import dynamic from "next/dynamic";

const AnimatedTitle = dynamic(() => import("./AnimatedTitle").then(mod => mod.AnimatedTitle), {
  ssr: false,
});

export function AnimatedTitleWrapper() {
  return <AnimatedTitle />;
}
