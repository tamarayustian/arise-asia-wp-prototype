import { useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { IoPlayCircleOutline } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import DecorativeIcons from "./DecorativeIcons";
import ScheduleCarousel from "./ScheduleCarousel";

import data from "@/data/arise2026.json";

export default function Arise26Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const currentRef = containerRef.current;
    const handleScroll = () => {
      if (currentRef) {
        const scrollPosition = currentRef.scrollLeft;
        const offsetWidth = currentRef.children[0].offsetWidth + 24;
        const idx = Math.round(scrollPosition / offsetWidth);
        setActiveIdx(idx);
      }
    };

    currentRef?.addEventListener("scroll", handleScroll);

    return () => {
      currentRef?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const clickHandler = (idx: number) => () => {
    containerRef.current?.scrollTo({
      behavior: "smooth",
      left: idx * (containerRef.current.children[0].offsetWidth + 24),
    });
  };

  return (
    <div className="relative bg-white">
      {/* Hero */}
      <section className="relative overflow-x-clip">
        <DecorativeIcons />
        <div className="container mx-auto px-4 py-40 sm:px-10 sm:pt-48">
          <div className="flex max-w-3xl flex-col">
            <p className="font-heading w-fit bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-3xl font-semibold tracking-wider text-nowrap text-transparent uppercase sm:text-4xl">
              Arise Asia 2026
            </p>
            <div className="flex items-start justify-center">
              <h1 className="font-heading bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-5xl font-bold text-transparent uppercase sm:text-7xl md:text-8xl">
                <span className="block">For</span>
                <span className="block">The</span>
              </h1>
              <img
                alt="Joy"
                className="w-48 shrink-0 sm:w-72 lg:w-108"
                src="/images/joy.svg"
              />
            </div>
            <div className="font-heading text-md -mt-4 flex gap-x-4 font-bold uppercase sm:-mt-10 sm:gap-x-8 sm:text-xl md:gap-x-28">
              <p className="bg-linear-to-r from-[#2563eb] to-[#3172f0] bg-clip-text text-nowrap text-transparent">
                27-31 July
              </p>
              <p className="bg-linear-to-r from-[#3172f0] to-[#3b82f6] bg-clip-text text-nowrap text-transparent">
                Manila, Philippines
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-primary-blue py-6 text-center">
        <p className="font-heading px-4 text-sm font-semibold text-white uppercase md:text-xl lg:text-2xl xl:text-3xl">
          God is awakening Asia for His purpose,
          <br /> and a new generation is rising to answer the call.
        </p>
      </section>

      <div className="container mx-auto flex flex-col gap-y-4 p-4 sm:p-10">
        {/* Awakening Quote */}
        <section className="relative overflow-hidden rounded-3xl bg-black p-4 sm:p-10">
          <p className="font-heading mx-auto max-w-lg text-center text-xs font-bold text-white uppercase sm:text-xl">
            Hebrews 12:2
          </p>
          <p className="mx-auto text-center text-xs text-white sm:text-xl">
            &ldquo;Let us fix our eyes on Jesus, the pioneer and perfecter of
            our faith, who <span className="font-bold">for the joy</span> that
            was set before him endured the cross, scorning its shame, and sat
            down at the right hand of the throne of God.&rdquo;
          </p>
        </section>

        {/* Speakers */}
        <section className="space-y-2 rounded-3xl bg-gradient-to-br from-[#d8d0f5] to-[#9d8ae6] p-4 sm:space-y-4 sm:p-8">
          <h2
            className="font-heading scroll-mt-48 text-2xl font-semibold uppercase sm:text-3xl md:text-4xl"
            id="speakers"
          >
            Speakers
          </h2>
          <p className="font-heading text-sm uppercase md:text-base">
            Meet the speakers for Arise Asia 2026
          </p>
          <div
            className="grid snap-x snap-mandatory grid-flow-col gap-x-6 overflow-x-auto"
            ref={containerRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {data.speakers.map(({ imgSrc, title, subtitle }) => (
              <div
                className="flex w-[133px] snap-start flex-col overflow-hidden rounded-lg border border-[#737373] sm:w-[166px]"
                key={title}
              >
                <img
                  alt={`Background image for ${title}`}
                  className="aspect-[133/165] bg-neutral-500 object-cover sm:aspect-[166/196]"
                  src={imgSrc}
                />
                <div className="my-auto p-2 text-center">
                  <h3 className="text-xs font-bold uppercase sm:text-sm">
                    {title}
                  </h3>
                  <p className="text-[10px] sm:text-xs">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-x-10 lg:justify-start lg:gap-x-4">
            <IoMdArrowBack
              className="size-10 rounded-full border-2 border-black p-2 text-black hover:border-black/50 hover:text-black/50"
              onClick={clickHandler(activeIdx - 1)}
            />
            <IoMdArrowForward
              className="size-10 rounded-full border-2 border-black p-2 text-black hover:border-black/50 hover:text-black/50"
              onClick={clickHandler(activeIdx + 1)}
            />
          </div>
        </section>

        {/* Schedule */}
        <ScheduleCarousel />

        {/* FAQ */}
        <section className="rounded-3xl bg-gradient-to-br from-[#ffa45b] to-[#fe5f5b] p-4 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-9">
            <div>
              <h2
                className="font-heading scroll-mt-48 text-2xl font-semibold uppercase sm:text-3xl md:text-4xl"
                id="faq"
              >
                FAQ
              </h2>
              <Accordion className="-ml-1 flex-1 pt-5" allowMultiple={false}>
                {data.faq.map(({ id, question, answer }) => (
                  <AccordionItem key={id}>
                    <AccordionTrigger
                      className="border-[#ff985c] bg-[#ffdbbd] text-black hover:bg-[#ffdbbd]/80"
                      id={id}
                    >
                      {question}
                    </AccordionTrigger>
                    <AccordionContent
                      className="border border-[#ff985c]"
                      id={id}
                    >
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <img
              alt="Worship"
              className="rounded-2xl object-cover lg:max-w-sm"
              src="/2026/faq.jpg"
            />
          </div>
        </section>

        {/* Stay Tuned */}
        <section className="flex flex-wrap items-center justify-center gap-x-3 py-4">
          <p className="font-heading text-center text-lg font-bold uppercase sm:text-xl md:text-2xl">
            Stay tuned for more information
          </p>
          <div
            className="size-8 sm:size-10"
            style={{
              background:
                "linear-gradient(100deg, #2c80ff -8.62%, #6ba7ff 20%, #f9a35f 60%, #ff4c5a 105.43%)",
              WebkitMask: "url('/icons/wave.svg') no-repeat center / contain",
              mask: "url('/icons/wave.svg') no-repeat center / contain",
            }}
          />
        </section>

        {/* Bottom Cards */}
        <div className="flex flex-col gap-y-4 sm:gap-10 lg:flex-row">
          <section className="flex-1 rounded-2xl bg-orange-100 p-4 sm:p-6">
            <div className="flex flex-col items-center gap-y-2 text-center">
              <div className="relative flex flex-col items-center gap-2">
                <img
                  alt="What is Arise? logo"
                  className="relative w-8 md:absolute md:-left-16 md:w-10"
                  src="/logos/logo.svg"
                />
                <div className="flex flex-col items-center gap-y-2 text-center">
                  <p className="text-sm font-bold uppercase">Learn more</p>
                  <h3 className="text-h4 uppercase">About Arise Asia</h3>
                </div>
              </div>
              <p className="text-sm">
                Arise Asia is a missions movement launched in 2023 to inspire
                young adults across Asia and beyond to take the gospel where it
                has never been heard.
              </p>
              <p className="text-sm">
                Now, in the 21st century, the need for the Gospel to be shared
                and lived out in Asia is tremendous, and God is setting the
                hearts of people in Asia on fire for His glory and purpose. The
                time has come for Asia to arise and participate in God&apos;s
                Great Commission.
              </p>
              <a
                className="flex items-center gap-x-0.5 text-sm underline"
                href="/about"
              >
                Learn more about Arise Asia
                <MdArrowRightAlt />
              </a>
              <div className="mt-2">
                <a
                  className="font-heading mt-2 flex w-fit items-center gap-1 rounded-full border-2 border-orange-500 px-4 py-1 text-xs font-medium hover:bg-orange-500 hover:text-white md:text-sm"
                  href="https://youtu.be/GwPLi5IUdkI"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  What is Arise Asia <IoPlayCircleOutline size={20} />
                </a>
              </div>
            </div>
          </section>

          <section className="flex-1 rounded-2xl bg-red-100 p-4 sm:p-6">
            <div className="flex h-full flex-col items-center justify-between gap-y-2 text-center">
              <div className="flex flex-col gap-y-2">
                <p className="text-sm font-bold uppercase">
                  Check out what happened in
                </p>
                <h3 className="text-h4 text-red-500 uppercase">
                  Arise Asia 2023
                </h3>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex w-full gap-1 md:gap-2">
                  {[1, 2].map((num) => (
                    <div
                      key={num}
                      className="relative aspect-square flex-1 overflow-hidden"
                    >
                      <img
                        src={`/2023/recap-${num}.jpg`}
                        className="absolute inset-0 h-full w-full rounded-lg object-cover md:rounded-xl"
                        alt="Arise Asia 2023 Recap"
                      />
                    </div>
                  ))}
                  <div className="relative aspect-video flex-[1.5] overflow-hidden">
                    <img
                      src="/2023/recap-3.jpg"
                      className="absolute inset-0 h-full w-full rounded-lg object-cover md:rounded-xl"
                      alt="Arise Asia 2023 Recap"
                    />
                  </div>
                  {[4, 5].map((num) => (
                    <div
                      key={num}
                      className="relative aspect-square flex-1 overflow-hidden"
                    >
                      <img
                        src={`/2023/recap-${num}.jpg`}
                        className="absolute inset-0 h-full w-full rounded-lg object-cover md:rounded-xl"
                        alt="Arise Asia 2023 Recap"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm">
                  On July 25-29, 1844 people from all across Asia attended the
                  first ever Arise Asia in Bangkok, Thailand. Praise God for all
                  He did during this conference! Check out the recap page for
                  the summary, moments, and program.
                </p>
              </div>
              <a
                className="font-heading flex w-fit items-center gap-2 rounded-full border-2 border-red-500 px-4 py-1 text-xs font-medium hover:bg-red-500 hover:text-white md:text-sm"
                href="https://arise2023.ariseasia.org/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Arise Asia 2023 Recap <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
