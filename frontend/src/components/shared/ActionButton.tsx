import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  href: string;
  bg?: string;
  hover?: string;
  iconHover?: string;
  className?: string;
  children: ReactNode;
}

export function ActionButton({
  href,
  bg = "bg-gradient-accent",
  hover = "group-hover:text-gradient-accent",
  iconHover = "group-hover:text-accent-red",
  className = "",
  children,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`mx-auto w-fit rounded-full p-0.5 ${bg} ${className}`}
    >
      <div className="group rounded-full px-8 py-4 text-white uppercase hover:bg-white">
        <p
          className={`font-heading flex items-center gap-x-2 text-xs font-semibold ${hover} sm:text-base`}
        >
          {children}
          <ArrowUpRight className={`size-5 ${iconHover}`} />
        </p>
      </div>
    </a>
  );
}
