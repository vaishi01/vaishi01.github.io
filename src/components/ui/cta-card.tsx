import * as React from "react";
import { cn } from "@/lib/utils";

// Define the props interface for the component
interface CtaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: React.ReactNode;
  description: string;
  graduationDate?: string;
}

// Reusable CtaCard component with a clean, modern layout
const CtaCard = React.forwardRef<HTMLDivElement, CtaCardProps>(
  ({ className, title, subtitle, description, graduationDate, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-xl border bg-card text-card-foreground shadow",
          "flex flex-col", // Single column layout
          className
        )}
        {...props}
      >
        {/* Content Section */}
        <div className="w-full p-6 md:p-8 flex flex-col justify-center">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg md:text-xl font-bold tracking-tight">
                {subtitle}
              </h2>
              {graduationDate && (
                <div className="text-blue-600 dark:text-blue-400 font-semibold text-base">
                  {graduationDate}
                </div>
              )}
            </div>
            <div className="mt-2 text-muted-foreground whitespace-pre-line">
              <div className="text-blue-600 dark:text-blue-400 font-semibold text-base">University of California, Santa Cruz | 2022-2026</div>
              <div className="text-gray-700 dark:text-gray-300 mt-2"><span className="font-bold">GPA:</span> 3.7 | 7x Dean's Honor List</div>
              <div className="text-gray-700 dark:text-gray-300 mt-1"><span className="font-bold">Relevant Coursework:</span> Introduction to Data Structures, Principle of Computer Systems Design, Artificial Intelligence</div>
              <div className="text-gray-700 dark:text-gray-300 mt-1"><span className="font-bold">Organizations:</span> AIEA Lab</div>
              <div className="text-gray-700 dark:text-gray-300 italic mt-1">Currently, working on the official CSE 140: Artificial Intelligence course and Pacman website.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
CtaCard.displayName = "CtaCard";

export { CtaCard };
