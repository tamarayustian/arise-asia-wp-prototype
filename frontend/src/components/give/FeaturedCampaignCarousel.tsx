import { LinkButton } from "@/components/shared/LinkButton";
import { ArrowRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface Card {
  image: string;
  title: string;
  description: string;
  region: string;
  progress: number;
  progressLabel: string;
  donationUrl: string;
}

const VISIBLE_STACK = 3;

function getCardStyle(
  index: number,
  total: number,
  isDragging: boolean,
  dragOffset: number,
): React.CSSProperties {
  const maxOffset = total <= 2 ? 28 : 20;
  if (index === 0) {
    if (isDragging) {
      return {
        transform: `translateX(${dragOffset}%) scale(1)`,
        zIndex: total,
      };
    }
    return { transform: "translateX(0) scale(1)", zIndex: total };
  }
  if (index < VISIBLE_STACK) {
    const offset = (index / (VISIBLE_STACK - 1)) * maxOffset;
    const scale = 1 - index * ((1 - 0.85) / (VISIBLE_STACK - 1));
    return {
      transform: `translateX(${offset}%) scale(${scale})`,
      zIndex: total - index,
    };
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

export function FeaturedCampaignCarousel({ data }: { data: Card[] }) {
  const [cards, setCards] = useState(data);
  const [originIndex, setOriginIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const total = cards.length;
  const card = cards[0];
  const isDraggingRef = useRef(false);

  const goNext = useCallback(() => {
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
    setOriginIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setCards((prev) => {
      const last = prev[prev.length - 1];
      return [last, ...prev.slice(0, -1)];
    });
    setOriginIndex((prev) => (((prev - 1) % total) + total) % total);
  }, [total]);

  const goTo = useCallback(
    (index: number) => {
      const current = originIndex;
      const steps = (((index - current) % total) + total) % total;
      if (steps === 0) return;
      setCards((prev) => {
        let arr = [...prev];
        for (let i = 0; i < steps; i++) {
          const [first, ...rest] = arr;
          arr = [...rest, first];
        }
        return arr;
      });
      setOriginIndex(index);
    },
    [originIndex, total],
  );

  const touchStartX = useRef(0);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    isDraggingRef.current = true;
    setIsDragging(true);
    setDragOffset(0);
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!isDraggingRef.current) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const diff = e.touches[0].clientX - touchStartX.current;
    setDragOffset((diff / rect.width) * 100);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    setIsDragging(false);
    setDragOffset(0);
    if (Math.abs(diff) > 80) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  }

  return (
    <div
      className="mx-auto flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-x-16 xl:gap-x-10"
      aria-label="Featured campaigns"
    >
      <div
        className="relative order-1 min-h-112 w-full lg:order-2 lg:min-h-128 lg:w-1/2 lg:max-w-200"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className={`absolute top-0 right-0 left-0 ${isDragging && i === 0 ? "" : "transition-all duration-500 ease-out"}`}
            style={{
              ...getCardStyle(i, total, isDragging, dragOffset),
              bottom: "3rem",
            }}
            role="group"
            aria-roledescription="card"
            aria-label={`Card ${i + 1} of ${total}`}
          >
            <div className="mx-auto flex h-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:rounded-3xl lg:max-w-lg">
              <img
                src={card.image}
                alt={card.title}
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="flex flex-1 flex-col gap-3 p-4 sm:p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="text-accent-red-dark border-accent-red-dark rounded-md border-2 px-3 py-2 leading-none font-medium uppercase">
                    {card.region}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="h-10 w-full overflow-hidden rounded-sm bg-neutral-300">
                    <div
                      className="bg-accent-blue-darker h-full rounded-sm transition-[width] duration-500"
                      style={{ width: `${card.progress}%` }}
                    />
                  </div>
                  <p className="text-accent-blue-dark text-right text-sm">
                    {renderLabel(card.progressLabel)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="order-2 flex justify-center gap-2 lg:hidden">
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`size-2.5 rounded-full transition ${
              i === originIndex ? "bg-accent-blue-dark" : "bg-neutral-300"
            }`}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 order-3 hidden lg:order-3 lg:flex">
        <button
          onClick={goNext}
          className="hover:border-accent-orange-dark hover:text-accent-orange-dark flex size-10 items-center justify-center rounded-full border-2 transition"
          aria-label="Next card"
        >
          <ArrowRight className="size-5" />
        </button>
      </div>

      <div className="order-4 flex flex-col gap-4 lg:order-1 lg:grow lg:basis-0">
        <h3 className="font-heading text-2xl leading-tight font-bold text-blue-900 uppercase md:text-3xl lg:text-4xl xl:text-5xl">
          {card.title}
        </h3>
        <p className="text-lg font-light text-blue-900 md:text-xl lg:text-2xl">
          {card.description}
        </p>
        <LinkButton
          href={card.donationUrl}
          className="border-accent-blue-dark text-accent-blue-dark hover:bg-accent-blue-dark border-2 uppercase hover:text-white"
        >
          Give Now
        </LinkButton>
      </div>
    </div>
  );
}
