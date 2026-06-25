import type { ReactNode } from "react";

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
}

export function OutlineButton({ href, className = "", children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-heading border-accent-blue-dark text-accent-blue-dark hover:bg-accent-blue-dark flex w-fit items-center gap-2 rounded-full border-2 px-6 py-3 font-semibold transition hover:text-white ${className}`}
    >
      {children}
    </a>
  );
}
