import { LinkButton } from "@/components/shared/LinkButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";

interface Card {
  image: string;
  title: string;
  description: string;
  tags: string[];
  donationUrl1: string;
  donationUrl2?: string;
}

export function AllCampaignCarousel({ data }: { data: Card[] }) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelAccumulatorRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !api) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      wheelAccumulatorRef.current += e.deltaY || e.deltaX;

      if (Math.abs(wheelAccumulatorRef.current) >= 50) {
        if (wheelAccumulatorRef.current > 0) {
          api.scrollNext();
        } else {
          api.scrollPrev();
        }
        wheelAccumulatorRef.current = 0;
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [api]);

  return (
    <div ref={containerRef} className="relative">
      <Carousel
        opts={{ align: "start", dragFree: true }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="mr-8 -ml-3 pb-12 md:mr-10 md:-ml-4 lg:mr-20">
          {data.map((card, i) => (
            <CarouselItem
              key={i}
              className={`pl-3 md:pl-4 w-80 ${i === data.length - 1 ? "mr-3 md:mr-4" : ""}`}
            >
              <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-xl">
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
                        className="text-accent-red-dark border-accent-red-dark rounded-md border-2 px-3 py-2 leading-none font-medium uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-blue-900 uppercase">
                    {card.title}
                  </h3>
                  <p className="text-sm font-light text-blue-900 sm:text-base">
                    {card.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    <LinkButton href={card.donationUrl1} className="border-accent-blue-dark text-accent-blue-dark hover:bg-accent-blue-dark hover:text-white border-2">
                      Give Now
                    </LinkButton>
                    {card.donationUrl2 && (
                      <LinkButton href={card.donationUrl2} className="border-accent-blue-dark text-accent-blue-dark hover:bg-accent-blue-dark hover:text-white border-2">
                        Learn More
                      </LinkButton>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
