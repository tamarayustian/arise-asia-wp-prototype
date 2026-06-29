import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Item {
  id: string;
  question: string;
  answer: string;
}

export function GivingOptionsAccordion({ items }: { items: Item[] }) {
  return (
    <Accordion allowMultiple>
      {items.map((item) => (
        <AccordionItem key={item.id}>
          <AccordionTrigger
            id={item.id}
            className="bg-accent-orange-light border-accent-orange-dark"
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent
            id={item.id}
            className="bg-accent-orange-lightest border-accent-orange-dark"
          >
            <div>
              <p>{item.answer}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
