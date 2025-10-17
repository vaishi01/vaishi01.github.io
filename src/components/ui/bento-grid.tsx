import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background?: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl p-6 transition-all duration-300",
      // light styles
      "bg-gray-50/50 hover:bg-gray-100/50",
      // dark styles
      "dark:bg-white/5 dark:hover:bg-white/10",
      "border border-gray-200/50 dark:border-white/10",
      "hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-white/5",
      "aspect-square lg:aspect-auto",
      className,
    )}
  >
    <div className="flex items-start">
      <Icon className="h-8 w-8 stroke-1 text-gray-900 dark:text-white transition-transform duration-300 group-hover:scale-110" />
    </div>
    
    <div className="flex flex-col gap-2 mt-auto">
      <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h3>
      <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>

    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-gray-100/20 to-transparent dark:via-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
);

export { BentoCard, BentoGrid };
