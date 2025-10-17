// /components/ui/hover-effect1.tsx - Updated with Link Navigation
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

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
        "grid grid-cols-1 lg:grid-cols-4 gap-6 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <motion.div
          key={item?.title}
          className="relative group block p-2 h-full w-full flex"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: idx * 0.1,
            ease: "easeOut"
          }}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
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
          <Card link={item.link}>
            {item.icon && (
              <div className="mb-4 flex justify-center">
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
  link,
}: {
  className?: string;
  children: React.ReactNode;
  link: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-6 overflow-hidden bg-white dark:bg-black border border-gray-200 dark:border-white/[0.2] group-hover:border-gray-300 dark:group-hover:border-slate-700 relative z-20 flex flex-col min-h-[400px] max-h-[400px] shadow-lg dark:shadow-none",
        className
      )}
    >
      <div className="relative z-50 flex flex-col h-full">
        <div className="flex flex-col h-full">
          <div className="text-center flex-grow">
            {children}
          </div>
          <div className="mt-auto pt-8 flex justify-center">
            <Link 
              to={link} 
              className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black border border-gray-900 dark:border-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 text-sm w-full max-w-[160px] whitespace-nowrap text-center inline-block"
            >
              LEARN MORE
            </Link>
          </div>
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
    <h4 className={cn("text-gray-900 dark:text-zinc-100 font-bold tracking-wide mt-4 text-center", className)}>
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
        "mt-8 text-gray-600 dark:text-zinc-400 tracking-wide leading-relaxed text-sm text-center",
        className
      )}
    >
      {children}
    </p>
  );
};