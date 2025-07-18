import React, { memo } from "react";

type FeatureCardProps = {
  emoji: string;
  title: string;
  desc: string;
};

const FeatureCard = memo(function FeatureCard({ emoji, title, desc }: FeatureCardProps) {
  return (
    <div className="bg-slate-900/70 p-6 rounded-2xl shadow-xl flex gap-4 items-start hover:bg-sky-900/70 transition">
      <span className="text-4xl">{emoji}</span>
      <div>
        <h3 className="font-bold text-lg text-sky-200 mb-1">{title}</h3>
        <p className="text-white/85">{desc}</p>
      </div>
    </div>
  );
});

export default FeatureCard;
