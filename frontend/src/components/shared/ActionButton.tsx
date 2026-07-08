import { ArrowUpRight } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

interface Props {
  href: string;
  outerBg?: string;
  textColor?: string;
  bg?: string;
  hoverBg?: string;
  textHover?: string;
  hoverIcon?: string;
  iconComponent?: ComponentType<{ className?: string }>;
  className?: string;
  children: ReactNode;
}

export function ActionButton({
  href,
  outerBg = "bg-gradient-accent",
  textColor = "text-white",
  bg = "",
  hoverBg = "hover:bg-white",
  textHover = "group-hover:text-gradient-accent",
  hoverIcon = "group-hover:text-accent-red",
  iconComponent: Icon = ArrowUpRight,
  className = "",
  children,
}: Readonly<Props>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-fit rounded-full ${outerBg} ${className}`}
    >
      <div
        className={`group rounded-full px-8 py-2.5 uppercase lg:px-7 lg:py-3.5 ${textColor} ${bg} ${hoverBg}`}
      >
        <p
          className={`font-heading flex items-center gap-x-2 text-xs font-semibold ${textHover} sm:text-base`}
        >
          {children}
          <Icon className={`size-5 ${hoverIcon}`} />
        </p>
      </div>
    </a>
  );
}
