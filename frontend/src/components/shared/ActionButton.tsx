import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  href: string;
  bg?: string;
  textColor?: string;
  innerBg?: string;
  innerHover?: string;
  hover?: string;
  iconHover?: string;
  className?: string;
  children: ReactNode;
}

export function ActionButton({
  href,
  bg = "bg-gradient-accent",
  textColor = "text-white",
  innerBg = "",
  innerHover = "hover:bg-white",
  hover = "group-hover:text-gradient-accent",
  iconHover = "group-hover:text-accent-red",
  className = "",
  children,
}: Readonly<Props>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-fit rounded-full p-0.5 ${bg} ${className}`}
    >
      <div
        className={`group rounded-full px-8 py-4 uppercase ${textColor} ${innerBg} ${innerHover}`}
      >
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
