import { OutlineButton } from "@/components/shared/OutlineButton";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";

interface Card {
  image: string;
  title: string;
  description: string;
  tags: string[];
  donationUrl1: string;
  donationUrl2?: string;
}

export function AllCampaignCarousel({ data }: { data: Card[] }) {
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
            <CarouselItem
              key={i}
              className="basis-[77%] pl-3 md:basis-[30%] md:pl-4"
            >
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
      <CarouselDots
        count={total}
        current={current}
        onSelect={(i) => api?.scrollTo(i)}
        className="mt-4"
      />
    </div>
  );
}
