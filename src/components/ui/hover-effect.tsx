// /components/ui/hover-effect.tsx
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    icon?: React.ReactElement;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12 xl:gap-16 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <motion.div
          key={item?.title}
          className="relative group block p-2 h-full w-full cursor-pointer flex"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: idx * 0.1,
            ease: "easeOut"
          }}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => {
            if (item.link && item.link !== '#') {
              window.open(item.link, '_blank');
            }
          }}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.icon && (
              <div className="mb-2 flex justify-center items-center h-[60px]">
                {item.icon}
              </div>
            )}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-[480px] w-full max-w-[280px] mx-auto p-6 overflow-hidden bg-white dark:bg-black border border-gray-200 dark:border-white/[0.2] group-hover:border-gray-300 dark:group-hover:border-slate-700 relative z-20 flex flex-col shadow-lg dark:shadow-none",
        className
      )}
    >
      <div className="relative z-50 flex flex-col h-full justify-between">
        <div className="flex flex-col items-center text-center flex-grow">
          {children}
        </div>
        <div className="flex justify-center pt-4">
          <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white border border-blue-600 dark:border-blue-500 px-8 py-3 rounded-lg font-medium transition-colors duration-200 text-sm w-full max-w-[160px] whitespace-nowrap">
            VIEW
          </button>
        </div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-gray-900 dark:text-zinc-100 font-bold tracking-wide mt-4 text-center text-lg h-[80px] flex items-center justify-center px-2 leading-tight", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-6 text-gray-600 dark:text-zinc-400 tracking-wide leading-relaxed text-sm text-center h-[180px] px-2 flex items-center justify-center",
        className
      )}
    >
      {children}
    </p>
  );
};