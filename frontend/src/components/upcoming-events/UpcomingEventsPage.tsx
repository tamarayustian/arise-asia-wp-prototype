import { getFragmentName } from "@/lib/utils";
import { useState } from "react";
import {
  RiArrowDropDownLine,
  RiArrowDropRightLine,
  RiFileList3Line,
  RiGift2Line,
  RiGlobalLine,
} from "react-icons/ri";
import ReactMarkdown from "react-markdown";

interface Movement {
  country: string;
  title: string;
  subtitle: string;
  backgroundSrc: string;
  posterSrc: string;
  donateTarget: string;
  signupTarget: string;
  websiteTarget: string;
  category: string;
  links: { title: string; target: string }[];
  description: string;
}

interface MovementsData {
  upcomingMovementsList: Movement[];
  pastMovementsList: Movement[];
  futureMovementsList: Movement[];
}

const sortOptions = [
  { title: "Date", compareFn: () => 0 },
  {
    title: "Alphabetical",
    compareFn: (a: Movement, b: Movement) => a.title.localeCompare(b.title),
  },
];

const tabs = [
  { label: "Upcoming", dataKey: "upcomingMovementsList" as const },
  { label: "Past", dataKey: "pastMovementsList" as const },
  { label: "Stay Tuned", dataKey: "futureMovementsList" as const },
];

function MovementsDropdown({
  active,
  data,
}: {
  active: boolean;
  data: string[];
}) {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-500 ${
        active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      } max-h-[calc(100vh-26rem)]`}
    >
      <div className="ml-10 hidden overflow-y-auto rounded-xl bg-white px-10 text-lg font-bold shadow-sm lg:flex lg:flex-col">
        {data?.map((item, i) => (
          <a
            className="border-b-2 py-1 first:pt-4 last:border-0 last:pb-4 hover:text-orange-500"
            key={`${item}-${i}`}
            href={`#${getFragmentName(item)}`}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}

function MovementCard({
  title,
  subtitle,
  posterSrc,
  backgroundSrc,
  donateTarget,
  signupTarget,
  websiteTarget,
  links,
  description,
}: {
  title: string;
  subtitle: string;
  posterSrc: string;
  backgroundSrc: string;
  donateTarget: string;
  signupTarget: string;
  websiteTarget: string;
  links: { title: string; target: string }[];
  description: string;
}) {
  const imgSrc = posterSrc || backgroundSrc;

  return (
    <article
      className="flex scroll-mt-48 flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm 2xl:flex-row"
      id={getFragmentName(title)}
    >
      {imgSrc && (
        <img
          alt={title}
          className="mx-auto aspect-video h-fit w-full max-w-96 rounded-xl bg-gray-400 object-cover"
          src={imgSrc}
        />
      )}
      <div className="flex w-full flex-col gap-y-4">
        <div>
          <h3 className="text-h4 text-cyan-700">{title}</h3>
          <p className="text-p text-gray-500 italic">{subtitle}</p>
        </div>
        {(donateTarget || signupTarget || websiteTarget) && (
          <div className="flex gap-x-4">
            {[
              { Icon: RiGift2Line, target: donateTarget, title: "Donate" },
              { Icon: RiFileList3Line, target: signupTarget, title: "Signup" },
              { Icon: RiGlobalLine, target: websiteTarget, title: "Website" },
            ].map(
              ({ Icon, target, title: btnTitle }) =>
                target && (
                  <a
                    key={btnTitle}
                    className="flex w-full max-w-72 items-center justify-center gap-x-2 rounded-full border border-cyan-500 bg-cyan-500 py-1 hover:bg-cyan-50 sm:border-2 sm:px-6"
                    href={target}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="hidden sm:block" size={24} />
                    <p className="text-xs font-bold sm:text-base">{btnTitle}</p>
                  </a>
                ),
            )}
          </div>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {links.map((link) => (
              <a
                key={link.title}
                className="rounded-full border border-cyan-500 bg-cyan-50 px-4 py-1 text-xs font-bold hover:bg-cyan-500 sm:border-2 sm:px-6 sm:text-base"
                href={link.target}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.title}
              </a>
            ))}
          </div>
        )}
        {description && (
          <div className="prose prose-sm prose-strong:text-black prose-headings:text-black prose-a:text-cyan-700 sm:prose-base marker:text-black">
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        )}
      </div>
    </article>
  );
}

export default function UpcomingEventsPage({ data }: { data: MovementsData }) {
  const [tabIdx, setTabIdx] = useState(0);
  const [tabActive, setTabActive] = useState(true);
  const [sortIdx, setSortIdx] = useState(0);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const getSidebarTabData = (idx: number): Movement[] => {
    const key = tabs[idx].dataKey;
    const items = structuredClone(data[key]);
    const sorted = items.sort(sortOptions[sortIdx].compareFn);

    if (idx === 1) {
      const phItems = sorted.filter((item) => item.country === "Philippines");
      const nonPhItems = sorted.filter(
        (item) => item.country !== "Philippines",
      );
      return [...nonPhItems, ...phItems];
    }

    return sorted;
  };

  return (
    <div className="bg-cyan-50 px-4 py-60">
      <div className="container mx-auto">
        <h1 className="text-h1 text-center text-cyan-700 uppercase">
          Movements
        </h1>
        <p className="pb-10 text-center font-bold">
          Check out where Arise movements are taking place!
        </p>
        <div className="mt-10 flex flex-col gap-10 sm:mt-20 lg:flex-row">
          <aside className="mx-auto flex h-full w-full gap-x-2 gap-y-4 sm:gap-x-6 lg:sticky lg:top-10 lg:max-w-64 lg:flex-col lg:pt-32 xl:max-w-96">
            {tabs.map((tab, idx) => (
              <div key={tab.label}>
                <button
                  className={`flex w-full items-center justify-center rounded-full border-2 border-orange-300 py-2 sm:border-4 sm:px-8 lg:justify-between ${
                    tabIdx === idx
                      ? "bg-orange-300"
                      : "bg-orange-50 hover:bg-orange-300"
                  }`}
                  onClick={() => {
                    if (tabIdx === idx) {
                      setTabActive(!tabActive);
                    } else {
                      setTabActive(true);
                    }
                    setTabIdx(idx);
                  }}
                >
                  <p className="text-xs font-bold text-black sm:text-base xl:text-xl">
                    {tab.label}
                  </p>
                  <RiArrowDropRightLine
                    className={`hidden transition-transform duration-500 lg:block ${
                      tabIdx === idx && tabActive && "rotate-90"
                    }`}
                    size={28}
                  />
                </button>
                <MovementsDropdown
                  active={tabIdx === idx && tabActive}
                  data={getSidebarTabData(idx).map(({ title }) => title)}
                />
              </div>
            ))}
          </aside>

          <section className="flex w-full flex-col gap-y-4">
            <div className="flex flex-col justify-between xl:flex-row">
              <h2 className="text-h3 text-center text-orange-700 lg:text-left">
                {tabs[tabIdx].label}
              </h2>
              <div className="mt-4 flex h-fit w-fit items-center self-end rounded-full bg-white px-4 text-xs shadow-sm sm:py-1 sm:text-base xl:mt-0 xl:self-start">
                <p className="mr-2 font-bold text-gray-500">Sort by: </p>
                <div className="relative">
                  <button
                    className="flex items-center"
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    onBlur={() =>
                      setTimeout(() => setSortDropdownOpen(false), 200)
                    }
                  >
                    <p className="w-24 font-bold uppercase sm:w-32">
                      {sortOptions[sortIdx].title}
                    </p>
                    <RiArrowDropDownLine className="text-gray-500" size={28} />
                  </button>
                  {sortDropdownOpen && (
                    <ul className="rounded-box absolute right-0 z-50 mt-1 bg-white shadow-2xl">
                      {sortOptions.map(({ title }, idx) => (
                        <li key={title}>
                          <button
                            className="block w-full px-4 py-2 text-xs font-bold whitespace-nowrap uppercase hover:bg-gray-100 sm:text-sm"
                            onClick={() => {
                              setSortIdx(idx);
                              setSortDropdownOpen(false);
                            }}
                          >
                            {title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            {tabIdx === 2 && (
              <p className="text-p">
                These movements are currently in the preparation stage. More
                details will be released soon.
              </p>
            )}
            {getSidebarTabData(tabIdx)?.map((item) => (
              <MovementCard key={`${item.title}-${item.subtitle}`} {...item} />
            ))}
            <p className="text-p">
              Don&apos;t see your country here? Contact
              <a
                className="mx-1 text-cyan-700 underline hover:text-cyan-500"
                href="mailto:info@ariseasia.org"
              >
                info@ariseasia.org
              </a>
              to find out more about hosting an Arise Movement in your
              country/city!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
