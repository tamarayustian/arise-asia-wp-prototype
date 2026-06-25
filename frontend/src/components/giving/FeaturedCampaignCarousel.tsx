import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface Slide {
  image: string;
  title: string;
  description: string;
  status: string;
  region: string;
  progress: number;
  progressLabel: string;
  donationUrl: string;
}

function getSlideStyle(
  index: number,
  current: number,
  total: number,
): React.CSSProperties {
  const diff = index - current;
  if (diff < 0) {
    return { transform: "translateX(-110%) scale(0.8)", zIndex: 0, opacity: 0 };
  }
  if (diff === 0) {
    return { transform: "translateX(0) scale(1)", zIndex: total };
  }
  if (diff === 1) {
    return { transform: "translateX(8%) scale(0.92)", zIndex: total - 1 };
  }
  if (diff === 2) {
    return { transform: "translateX(15%) scale(0.85)", zIndex: total - 2 };
  }
  if (diff === 3) {
    return { transform: "translateX(20%) scale(0.79)", zIndex: total - 3 };
  }
  return { transform: "translateX(110%) scale(0.7)", zIndex: 0, opacity: 0 };
}

function renderLabel(label: string) {
  const parts = label.split(/(\*\*[^*]+\*\*)/);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <span key={i} className="font-bold">
        {part.slice(2, -2)}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function FeaturedCampaignCarousel({ data }: { data: Slide[] }) {
  const [current, setCurrent] = React.useState(0);
  const total = data.length;
  const last = total - 1;
  const slide = data[current];

  function goPrev() {
    setCurrent((c) => Math.max(0, c - 1));
  }

  function goNext() {
    setCurrent((c) => Math.min(last, c + 1));
  }

  return (
    <div
      className="mx-auto flex w-full flex-col gap-6 md:flex-row md:items-center md:gap-8 lg:gap-16"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured campaigns"
    >
      <div className="flex flex-col gap-4 md:w-2/5 lg:w-1/3">
        <h3 className="font-heading -mr-4 text-2xl font-bold text-blue-900 uppercase md:-mr-8 md:text-3xl lg:-mr-16 lg:text-5xl">
          {slide.title}
        </h3>
        <p className="text-lg font-light text-blue-900 md:text-2xl">
          {slide.description}
        </p>
        <a
          href={slide.donationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading border-accent-blue-dark text-accent-blue-dark hover:bg-accent-blue-dark flex w-fit items-center gap-2 rounded-full border-2 px-6 py-3 font-semibold transition hover:text-white"
        >
          Give Now
        </a>
        <div className="flex items-center gap-3">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className={cn(
              "flex size-10 items-center justify-center rounded-full border border-neutral-300 transition",
              current === 0
                ? "cursor-not-allowed opacity-40"
                : "hover:border-accent-orange-dark hover:text-accent-orange-dark",
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex gap-2">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "size-2.5 rounded-full transition",
                  i === current ? "bg-accent-blue-dark" : "bg-neutral-300",
                )}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current ? "true" : "false"}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={current === last}
            className={cn(
              "flex size-10 items-center justify-center rounded-full border border-neutral-300 transition",
              current === last
                ? "cursor-not-allowed opacity-40"
                : "hover:border-accent-orange-dark hover:text-accent-orange-dark",
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden pb-12 md:w-3/5 lg:w-2/3"
        style={{ minHeight: "28rem" }}
      >
        {data.map((slide, i) => (
          <div
            key={i}
            className="absolute top-0 right-0 left-0 transition-all duration-300 ease-out"
            style={{ ...getSlideStyle(i, current, total), bottom: "3rem" }}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${total}`}
          >
            <div className="mx-auto flex h-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-48 w-full object-cover sm:h-64"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="flex flex-1 flex-col gap-3 p-4 sm:p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gradient-accent rounded-md border-2 border-black px-3 py-2 text-sm leading-none font-medium text-white">
                    {slide.status}
                  </span>
                  <span className="text-accent-red-dark border-accent-red-dark rounded-md border-2 px-3 py-2 leading-none font-medium uppercase">
                    {slide.region}
                  </span>
                </div>
                <div className="mt-auto flex flex-col gap-1">
                  <div className="h-10 w-full overflow-hidden rounded-sm bg-neutral-300">
                    <div
                      className="bg-accent-blue-darker h-full rounded-sm transition-[width] duration-500"
                      style={{ width: `${slide.progress}%` }}
                    />
                  </div>
                  <p className="text-accent-blue-dark text-right text-sm">
                    {renderLabel(slide.progressLabel)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
