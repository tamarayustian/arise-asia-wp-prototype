import { OutlineButton } from "@/components/shared/OutlineButton";
import { ArrowRight } from "lucide-react";
import { useCallback, useState } from "react";

interface Card {
  image: string;
  title: string;
  description: string;
  status: string;
  region: string;
  progress: number;
  progressLabel: string;
  donationUrl: string;
}

function getCardStyle(index: number, total: number): React.CSSProperties {
  if (index === 0) {
    return { transform: "translateX(0) scale(1)", zIndex: total };
  }
  if (index === 1) {
    return { transform: "translateX(8%) scale(0.92)", zIndex: total - 1 };
  }
  if (index === 2) {
    return { transform: "translateX(15%) scale(0.85)", zIndex: total - 2 };
  }
  if (index === 3) {
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

export function FeaturedCampaignCarousel({ data }: { data: Card[] }) {
  const [cards, setCards] = useState(data);
  const total = cards.length;
  const card = cards[0];

  const goNext = useCallback(() => {
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  }, []);

  return (
    <div
      className="mx-auto flex w-full flex-col md:flex-row md:items-center md:gap-4 lg:gap-8"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured campaigns"
    >
      <div
        className="relative order-1 w-full overflow-hidden pb-12 md:order-2 md:w-3/5 lg:w-2/3"
        style={{ minHeight: "28rem" }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className="absolute top-0 right-0 left-0 transition-all duration-300 ease-out"
            style={{ ...getCardStyle(i, total), bottom: "3rem" }}
            role="group"
            aria-roledescription="card"
            aria-label={`Card ${i + 1} of ${total}`}
          >
            <div className="mx-auto flex h-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
              <img
                src={card.image}
                alt={card.title}
                className="h-64 w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="flex flex-1 flex-col gap-3 p-4 sm:p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gradient-accent rounded-md border-2 border-black px-3 py-2 text-sm leading-none font-medium text-white">
                    {card.status}
                  </span>
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

      <div className="order-2 hidden md:order-3 md:flex">
        <button
          onClick={goNext}
          className="hover:border-accent-orange-dark hover:text-accent-orange-dark flex size-10 items-center justify-center rounded-full border-2 transition"
          aria-label="Next card"
        >
          <ArrowRight className="size-5" />
        </button>
      </div>

      <div className="order-3 flex flex-col gap-4 md:order-1 md:w-2/5 lg:w-1/3">
        <h3 className="font-heading -mr-4 text-2xl font-bold text-blue-900 uppercase md:-mr-8 md:text-3xl lg:-mr-16 lg:text-5xl">
          {card.title}
        </h3>
        <p className="text-lg font-light text-blue-900 md:text-2xl">
          {card.description}
        </p>
        <OutlineButton href={card.donationUrl}>Give Now</OutlineButton>
      </div>
    </div>
  );
}
