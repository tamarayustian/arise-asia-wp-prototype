import { OutlineButton } from "@/components/shared/OutlineButton";
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
              className="basis-[77%] pl-3 md:basis-[40%] md:pl-4 lg:basis-[30%] xl:basis-[24%]"
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
                    <OutlineButton href={card.donationUrl1}>
                      Give Now
                    </OutlineButton>
                    {card.donationUrl2 && (
                      <OutlineButton href={card.donationUrl2}>
                        Learn More
                      </OutlineButton>
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
