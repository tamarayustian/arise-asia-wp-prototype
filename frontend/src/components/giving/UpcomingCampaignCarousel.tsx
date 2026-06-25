import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import React from "react";

interface Card {
  image: string;
  title: string;
  description: string;
  tags: string[];
  donationUrl: string;
  learnUrl?: string;
}

export function UpcomingCampaignCarousel({ data }: { data: Card[] }) {
  const [api, setApi] =
    React.useState<ReturnType<typeof Carousel>["api"]>(null);
  const [current, setCurrent] = React.useState(0);
  const total = data.length;

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="relative">
      <Carousel opts={{ align: "start" }} setApi={setApi} className="w-full">
        <CarouselContent className="-ml-3 pb-12 md:-ml-4">
          {data.map((card, i) => (
            <CarouselItem key={i} className="basis-[77%] pl-3 md:basis-[30%] lg:basis-[23%] md:pl-4">
              <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-48 w-full object-cover sm:h-56"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <div className="flex flex-1 flex-col gap-3 p-4 sm:p-6">
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-accent-orange-lightest font-heading text-accent-orange-dark rounded-full px-3 py-1 text-xs font-medium tracking-wider uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-heading text-lg font-bold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-neutral-600 sm:text-base">
                    {card.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-3 pt-2">
                    <a
                      href={card.donationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "font-heading border-accent-orange-dark flex items-center gap-2 rounded-full border-2",
                        "text-accent-orange-dark px-5 py-2 text-xs font-semibold uppercase",
                        "hover:bg-accent-orange-dark transition hover:text-white",
                      )}
                    >
                      Give Now
                      <ArrowUpRight className="size-3.5" />
                    </a>
                    {card.learnUrl && (
                      <a
                        href={card.learnUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "font-heading flex items-center gap-2 rounded-full border-2 border-neutral-300",
                          "px-5 py-2 text-xs font-semibold text-neutral-600 uppercase",
                          "transition hover:border-neutral-500 hover:text-neutral-800",
                        )}
                      >
                        Learn More
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <CarouselDots
        count={total}
        current={current}
        onSelect={(i) => api?.scrollTo(i)}
        className="mt-4"
      />
    </div>
  );
}
