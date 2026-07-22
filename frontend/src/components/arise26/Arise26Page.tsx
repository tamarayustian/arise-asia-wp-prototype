import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ImArrowUpRight2 } from "react-icons/im";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { IoPlayCircleOutline } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import ScheduleCarousel from "./ScheduleCarousel";

import data from "@/data/arise2026.json";

const variants = {
  initial: ({ startX, startY, scale }: { startX: number; startY: number; scale: number }) => ({
    x: startX,
    y: startY,
    scale,
    transition: {
      type: "spring",
      bounce: 0.1,
      duration: 0.8,
    },
  }),
  scrolled: ({ endX, endY, scale }: { endX: number; endY: number; scale: number }) => ({
    x: endX,
    y: endY,
    scale: scale * 0.9,
    transition: {
      type: "spring",
      bounce: 0.1,
      duration: 0.8,
    },
  }),
};

export default function Arise26Page({ locale }: { locale: string }) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(bubbleRef);

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
    <div className="bg-white">
      <section className="relative overflow-x-clip">
        <div className="absolute mt-44 right-[max(-5rem,calc(100%-30rem))] sm:right-auto sm:mt-52 lg:mt-8 overflow-x-clip w-lg sm:w-2xl md:w-4xl lg:w-6xl xl:w-7xl">
          <img alt="Background" src="/images/arise-2026-bg.svg" />
        </div>
        <div className="container mx-auto px-4 pt-40 sm:px-10 sm:pt-48">
          <div className="relative flex flex-col items-center justify-center gap-x-10 lg:flex-row lg:items-start">
            <div className="w-fit">
              <p className="font-semibold tracking-wider text-transparent uppercase bg-clip-text from-orange-500 to-indigo-900 sm:text-3xl md:text-4xl bg-linear-to-r font-heading w-fit">
                Arise Asia 2026
              </p>
              <h1 className="text-6xl font-bold text-transparent uppercase bg-clip-text from-indigo-900 to-indigo-500 sm:text-8xl md:text-9xl lg:text-8xl xl:text-9xl bg-linear-to-r text-nowrap font-heading">
                For The
              </h1>
              <div className="flex justify-between text-xs font-bold text-indigo-900 uppercase sm:text-base md:text-xl font-heading">
                <p>27-31 July</p>
                <p>Manila, Philippines</p>
              </div>
            </div>
            <div className="relative">
              <img
                alt="Joy"
                className="w-40 -mt-4 sm:w-60 md:w-80 lg:mt-10 xl:w-96"
                src="/images/joy.svg"
              />
              <div className="absolute inset-1/2">
                <div className="-translate-y-6 -translate-x-28 sm:-translate-x-40 sm:-translate-y-12 md:-translate-x-48 lg:-translate-x-28 lg:-translate-y-44">
                  <motion.svg
                    animate={{ rotate: 360 }}
                    className="size-6 fill-lime-300 rotate-160 md:size-8"
                    transition={{
                      duration: 10,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    viewBox="0 0 3 3"
                  >
                    <g opacity="0.8">
                      <rect x="0" y="1" width="2" height="2" rx="0.3" />
                      <rect x="1" y="0" width="2" height="2" rx="0.3" />
                    </g>
                  </motion.svg>
                </div>
                <div className="translate-x-24 -translate-y-12 sm:-translate-y-20 md:translate-x-32 md:-translate-y-24 lg:-translate-y-40">
                  <motion.svg
                    animate={{ rotate: -360 }}
                    className="size-6 fill-pink-300 rotate-170 md:size-8"
                    transition={{
                      duration: 10,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    viewBox="0 0 2 2"
                  >
                    <g opacity="0.8">
                      <rect x="0" y="0" width="1" height="2" rx="0.5" />
                      <rect x="1" y="0" width="1" height="2" rx="0.5" />
                    </g>
                  </motion.svg>
                </div>
                <div className="translate-x-16 -translate-y-6 sm:translate-x-20 md:translate-x-28 lg:-translate-x-12 lg:translate-y-8">
                  <motion.svg
                    animate={{ rotate: 360 }}
                    className="size-6 fill-violet-300 rotate-70 md:size-8"
                    transition={{
                      duration: 20,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    viewBox="0 0 4 4"
                  >
                    <g opacity="0.8">
                      <path d="M2 1A1 1 0 101 2 1 1 0 102 3 1 1 0 103 2 1 1 0 102 1" />
                    </g>
                  </motion.svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col max-w-3xl mx-auto mt-64 mb-10 text-center text-indigo-500 gap-y-2 sm:mt-56 lg:mt-80">
            <p className="uppercase font-heading">Hebrews 12:2</p>
            <p className="text-p">
              &ldquo;Let us fix our eyes on Jesus, the pioneer and perfecter of
              our faith, who <span className="font-bold">for the joy</span> that
              was set before him endured the cross, scorning its shame, and sat
              down at the right hand of the throne of God.&rdquo;
            </p>
          </div>
        </div>
        <div className="relative">
          <motion.img
            alt="Recap photo 1"
            animate={isInView ? "scrolled" : "initial"}
            className="absolute object-cover rounded-full inset-1/2 size-10 sm:size-14 md:size-16 lg:size-24"
            custom={{
              startX: "-44vw",
              startY: "-20rem",
              scale: 1.1,
              endX: "-42vw",
              endY: "-17rem",
            }}
            initial="initial"
            src="/2026/bubble-1.jpg"
            variants={variants}
          />
          <motion.img
            alt="Recap photo 2"
            animate={isInView ? "scrolled" : "initial"}
            className="absolute object-cover rounded-full inset-1/2 size-10 sm:size-14 md:size-16 lg:size-24"
            custom={{
              startX: "-32vw",
              startY: "-25rem",
              scale: 1.6,
              endX: "-28vw",
              endY: "-20rem",
            }}
            initial="initial"
            src="/2026/bubble-2.jpg"
            variants={variants}
          />
          <motion.img
            alt="Recap photo 3"
            animate={isInView ? "scrolled" : "initial"}
            className="absolute object-cover rounded-full inset-1/2 size-10 sm:size-14 md:size-16 lg:size-24"
            custom={{
              startX: "-20vw",
              startY: "-18rem",
              scale: 1.2,
              endX: "-14vw",
              endY: "-18rem",
            }}
            initial="initial"
            src="/2026/bubble-3.jpg"
            variants={variants}
          />
          <motion.img
            alt="Recap photo 4"
            animate={isInView ? "scrolled" : "initial"}
            className="absolute object-cover rounded-full inset-1/2 size-10 sm:size-14 md:size-16 lg:size-24"
            custom={{
              startX: "16vw",
              startY: "-21rem",
              scale: 1.8,
              endX: "8vw",
              endY: "-20rem",
            }}
            initial="initial"
            src="/2026/bubble-4.jpg"
            variants={variants}
          />
          <motion.img
            alt="Recap photo 5"
            animate={isInView ? "scrolled" : "initial"}
            className="absolute object-cover rounded-full inset-1/2 size-10 sm:size-14 md:size-16 lg:size-24"
            custom={{
              startX: "32vw",
              startY: "-17rem",
              scale: 1.4,
              endX: "23vw",
              endY: "-17rem",
            }}
            initial="initial"
            src="/2026/bubble-5.jpg"
            variants={variants}
          />
          <motion.img
            alt="Recap photo 6"
            animate={isInView ? "scrolled" : "initial"}
            className="absolute object-cover rounded-full inset-1/2 size-10 sm:size-14 md:size-16 lg:size-24"
            custom={{
              startX: "36vw",
              startY: "-26rem",
              scale: 1,
              endX: "34vw",
              endY: "-20rem",
            }}
            initial="initial"
            src="/2026/bubble-6.jpg"
            variants={variants}
          />
        </div>
        <p className="p-8 text-sm font-semibold text-center text-white uppercase bg-black md:text-xl lg:text-2xl xl:text-3xl font-heading">
          <span className="text-indigo-500">Are you in?</span> Participate by
          nomination: find out more ↓
        </p>
        <div className="flex flex-col justify-center pt-4 gap-y-4 gap-x-10 sm:flex-row sm:pt-8">
          <a
            className="flex items-center justify-center gap-2 px-6 py-4 mx-auto text-white uppercase bg-indigo-500 border-2 border-indigo-500 rounded-full w-60 sm:mx-0 hover:text-indigo-500 hover:bg-indigo-200 text-h6"
            href="https://forms.ariseasia.org/arise-asia-2026-application"
            rel="noopener noreferrer"
            target="_blank"
          >
            Participate <ImArrowUpRight2 />
          </a>
          <a
            className="flex items-center justify-center gap-2 px-6 py-4 mx-auto text-white uppercase bg-indigo-500 border-2 border-indigo-500 rounded-full w-60 sm:mx-0 hover:text-indigo-500 hover:bg-indigo-200 text-h6"
            href="https://forms.ariseasia.org/arise-asia-2026-nomination"
            rel="noopener noreferrer"
            target="_blank"
          >
            Nominate <ImArrowUpRight2 />
          </a>
        </div>
      </section>

      <div
        className="container mx-auto flex flex-col p-4 gap-y-4 sm:gap-y-10 sm:p-10"
        ref={bubbleRef}
      >
        <section className="relative rounded-3xl bg-radial-[at_35%_40%] from-orange-500/5 to-orange-500/50">
          <svg
            className="absolute h-full ml-20 md:ml-12 lg:ml-36 xl:ml-64"
            viewBox="0 0 100 100"
          >
            <path
              className="fill-white"
              d="M37 0C35 13 28 29 15 43-1 59-4 83 7 100H27C29 84 40 67 54 48 67 32 59 13 49 0ZM42 100Q44 82 71 48 95 82 85 100Z"
            />
          </svg>
          <p className="relative p-8 mx-auto max-w-lg text-xs font-bold text-center text-transparent uppercase bg-clip-text from-orange-500 to-indigo-700 from-30% sm:p-16 sm:text-xl md:float-right lg:mr-16 xl:mr-48 font-heading bg-linear-to-br">
            God is awakening Asia for His purpose, and a new generation is
            rising to answer the call.
          </p>
        </section>

        <section className="p-4 bg-radial-[at_75%_60%] from-indigo-500/5 to-indigo-500/50 rounded-3xl sm:p-8 space-y-2 sm:space-y-4">
          <h2
            className="text-2xl font-semibold uppercase sm:text-3xl md:text-4xl font-heading scroll-mt-48"
            id="speakers"
          >
            Speakers
          </h2>
          <p className="text-sm uppercase md:text-base font-heading">
            Meet the speakers for Arise Asia 2026
          </p>
          <div
            className="grid grid-flow-col overflow-x-auto gap-x-6 snap-x snap-mandatory"
            ref={containerRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {data.speakers.map(({ imgSrc, title, subtitle }) => (
              <div
                className="flex flex-col overflow-hidden border rounded-lg w-44 sm:w-48 border-neutral-500 snap-start"
                key={title}
              >
                <img
                  alt={`Background image for ${title}`}
                  className="object-cover bg-neutral-500 aspect-square"
                  src={imgSrc}
                />
                <div className="p-2 my-auto text-center">
                  <h3 className="text-sm font-bold uppercase sm:text-base">
                    {title}
                  </h3>
                  <p className="text-xs">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-x-10 lg:gap-x-4 lg:justify-start">
            <IoMdArrowBack
              className="p-2 border-2 rounded-full border-black/50 text-black/50 size-10 hover:text-black/25 hover:border-black/25"
              onClick={clickHandler(activeIdx - 1)}
            />
            <IoMdArrowForward
              className="p-2 border-2 rounded-full border-black/50 text-black/50 size-10 hover:text-black/25 hover:border-black/25"
              onClick={clickHandler(activeIdx + 1)}
            />
          </div>
        </section>

        <ScheduleCarousel />

        <section className="p-4 bg-radial-[at_15%_10%] from-pink-500/5 to-pink-500/50 rounded-3xl sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-9">
            <div>
              <h2
                className="text-2xl font-semibold uppercase sm:text-3xl md:text-4xl font-heading scroll-mt-48"
                id="faq"
              >
                FAQ
              </h2>
              <Accordion className="flex-1 pt-5 -ml-1" allowMultiple={false}>
                {data.faq.map(({ id, question, answer }) => (
                  <AccordionItem key={id}>
                    <AccordionTrigger
                      className="text-pink-700 bg-pink-100 border-pink-200 hover:bg-pink-200"
                      id={id}
                    >
                      {question}
                    </AccordionTrigger>
                    <AccordionContent id={id}>{answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <img
              alt="Worship"
              className="object-cover rounded-2xl lg:max-w-sm"
              src="/2026/faq.jpg"
            />
          </div>
        </section>

        <section className="p-4 bg-radial-[at_25%_75%] from-green-500/5 to-green-500/50 rounded-3xl sm:p-6">
          <h2
            className="text-2xl font-semibold uppercase sm:text-3xl md:text-4xl font-heading scroll-mt-48"
            id="nomination-criteria"
          >
            Nomination Criteria
          </h2>
          <div className="pt-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
              <div className="p-5 border-2 border-green-600 rounded-2xl h-fit lg:min-w-md">
                <div className="prose max-w-none text-xs leading-5 md:text-sm">
                  <p>
                    In order to participate in Arise Asia, potential
                    participants must be recommended by a church leader from
                    their country or by a member of a partnering organisation
                    listed in the About Us section.
                  </p>
                  <p>
                    Once they have completed their application and provided two
                    character references, their participation will be
                    considered. Upon meeting the criteria, they will be invited
                    to register and join us at the event.
                  </p>
                  <p>
                    If you meet the selection criteria and would like to
                    participate in Arise Asia 2026 without a nomination, please
                    reach out to us by emailing{" "}
                    <b>
                      <u>info@ariseasia.org</u>
                    </b>{" "}
                    for more details!
                  </p>
                </div>
                <a
                  className="flex items-center gap-2 px-4 py-1 mt-6 text-xs font-normal bg-green-200 border-2 rounded-full md:text-sm hover:bg-green-300 border-neutral-900 w-fit font-heading"
                  href="mailto:info@ariseasia.org"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Email Us <ImArrowUpRight2 />
                </a>
              </div>
              <Accordion allowMultiple={false}>
                {data.nominationCriteria.map(
                  ({ id, criterion, description }) => (
                    <AccordionItem key={id}>
                      <AccordionTrigger
                        className="text-green-700 bg-green-100 border-green-300 hover:bg-green-200"
                        id={id}
                      >
                        {criterion}
                      </AccordionTrigger>
                      <AccordionContent id={id}>{description}</AccordionContent>
                    </AccordionItem>
                  ),
                )}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="flex flex-wrap items-center justify-center gap-x-2 text-h5">
          <p className="text-center uppercase">
            Stay tuned for more information
          </p>
          <svg className="size-8 sm:size-10" viewBox="0 0 14 8">
            <ellipse cx="3" cy="4" rx="3" ry="4" className="fill-indigo-500" />
            <ellipse cx="9" cy="4" rx="2" ry="4" className="fill-pink-500" />
            <ellipse cx="13" cy="4" rx="1" ry="4" className="fill-green-500" />
          </svg>
        </section>

        <div className="flex flex-col gap-y-4 sm:gap-10 lg:flex-row">
          <section className="flex-1 p-4 bg-orange-100 rounded-2xl sm:p-6">
            <div className="flex flex-col items-center text-center gap-y-2">
              <div className="relative flex flex-col items-center gap-2">
                <img
                  alt="What is Arise? logo"
                  className="relative w-8 md:absolute md:-left-16 md:w-10"
                  src="/logos/logo.svg"
                />
                <div className="flex flex-col items-center text-center gap-y-2">
                  <p className="text-sm font-bold uppercase">Learn more</p>
                  <h3 className="uppercase text-h4">About Arise Asia</h3>
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
                className="flex gap-x-0.5 items-center text-sm underline"
                href={`/${locale}/about`}
              >
                Learn more about Arise Asia
                <MdArrowRightAlt />
              </a>
              <div className="flex flex-col items-center gap-4 mt-2 md:flex-row md:items-start">
                <a
                  className="flex items-center gap-1 px-4 py-1 text-xs font-medium border-2 border-orange-500 rounded-full md:text-sm hover:text-white hover:bg-orange-500 w-fit font-heading"
                  href="https://youtu.be/GwPLi5IUdkI"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  What is Arise Asia <IoPlayCircleOutline size={20} />
                </a>
                <a
                  className="flex items-center gap-1 px-4 py-1 text-xs font-medium border-2 border-orange-500 rounded-full md:text-sm hover:text-white hover:bg-orange-500 w-fit font-heading"
                  href="https://youtu.be/4G4fQidFXro"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Why Join Us <IoPlayCircleOutline size={20} />
                </a>
              </div>
            </div>
          </section>

          <section className="flex-1 p-4 bg-red-100 rounded-2xl sm:p-6">
            <div className="flex flex-col items-center justify-between h-full text-center gap-y-2">
              <div className="flex flex-col gap-y-2">
                <p className="text-sm font-bold uppercase">
                  Check out what happened in
                </p>
                <h3 className="text-red-500 uppercase text-h4">
                  Arise Asia 2023
                </h3>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex w-full gap-1 md:gap-2">
                  {[1, 2].map((num) => (
                    <div
                      key={num}
                      className="relative flex-1 overflow-hidden aspect-square"
                    >
                      <img
                        src={`/2023/recap-${num}.jpg`}
                        className="absolute inset-0 object-cover w-full h-full rounded-lg md:rounded-xl"
                        alt="Arise Asia 2023 Recap"
                      />
                    </div>
                  ))}
                  <div className="overflow-hidden relative flex-[1.5] aspect-video">
                    <img
                      src="/2023/recap-3.jpg"
                      className="absolute inset-0 object-cover w-full h-full rounded-lg md:rounded-xl"
                      alt="Arise Asia 2023 Recap"
                    />
                  </div>
                  {[4, 5].map((num) => (
                    <div
                      key={num}
                      className="relative flex-1 overflow-hidden aspect-square"
                    >
                      <img
                        src={`/2023/recap-${num}.jpg`}
                        className="absolute inset-0 object-cover w-full h-full rounded-lg md:rounded-xl"
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
                className="flex items-center gap-2 px-4 py-1 text-xs font-medium border-2 border-red-500 rounded-full md:text-sm hover:text-white hover:bg-red-500 w-fit font-heading"
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
