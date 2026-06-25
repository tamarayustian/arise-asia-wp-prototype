import { Minus, Plus } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface AccordionContextValue {
  toggleItem: (id: string) => void;
  isOpen: (id: string) => boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("useAccordion must be used within <Accordion>");
  return ctx;
}

export function Accordion({
  children,
  className = "",
  allowMultiple = false,
}: {
  children: ReactNode;
  className?: string;
  allowMultiple?: boolean;
}) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (allowMultiple) {
            next.add(id);
          } else {
            next.clear();
            next.add(id);
          }
        }
        return next;
      });
    },
    [allowMultiple],
  );

  const isOpen = useCallback((id: string) => openItems.has(id), [openItems]);

  const value = useMemo(() => ({ toggleItem, isOpen }), [toggleItem, isOpen]);

  return (
    <AccordionContext.Provider value={value}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`overflow-hidden ${className}`}>{children}</div>;
}

export function AccordionTrigger({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const { toggleItem, isOpen } = useAccordion();
  const open = isOpen(id);

  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={() => toggleItem(id)}
      className={`flex w-full items-center justify-between border p-4 text-left transition-all duration-300 ease-in-out ${
        open ? "rounded-t-sm rounded-b-none" : "rounded-sm"
      } ${className}`}
    >
      <span className="font-heading text-xs font-light tracking-tight uppercase md:text-sm lg:text-base">
        {children}
      </span>
      <span className="ml-4 shrink-0">
        {open ? <Minus size={20} /> : <Plus size={20} />}
      </span>
    </button>
  );
}

export function AccordionContent({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const { isOpen } = useAccordion();
  const open = isOpen(id);

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div
        className={`rounded-b-sm border-x border-b p-4 text-xs md:text-sm ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export function AccordionTab({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AccordionItem className={className}>
      <AccordionTrigger id={id}>{title}</AccordionTrigger>
      <AccordionContent id={id}>{children}</AccordionContent>
    </AccordionItem>
  );
}
