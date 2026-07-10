import type { ReactNode } from "react";

interface Props {
  href: string;
  size?: keyof typeof sizeMap;
  target?: string;
  rel?: string;
  className?: string;
  children: ReactNode;
}

const sizeMap = {
  sm: "px-4 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm",
  md: "px-6 py-3 text-xs sm:px-8 sm:py-4 sm:text-sm",
  lg: "px-8 py-4 text-sm sm:px-10 sm:py-5 sm:text-base",
};

export function LinkButton({
  href,
  size = "md",
  target = "_blank",
  rel = "noopener noreferrer",
  className = "",
  children,
}: Props) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`font-heading flex w-fit items-center gap-2 rounded-full font-semibold transition ${sizeMap[size]} ${className}`}
    >
      {children}
    </a>
  );
}
