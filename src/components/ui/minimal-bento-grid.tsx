"use client";

import { cn } from "@/lib/utils";
import {
    CheckCircle,
    Clock,
    Star,
    TrendingUp,
    Video,
    Globe,
} from "lucide-react";

export interface BentoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
}

interface BentoGridProps {
    items: BentoItem[];
}

const itemsSample: BentoItem[] = [
    {
        title: "Analytics Dashboard",
        meta: "v2.4.1",
        description:
            "Real-time metrics with AI-powered insights and predictive analytics",
        icon: <TrendingUp className="w-4 h-4 text-blue-500" />,
        status: "Live",
        tags: ["Statistics", "Reports", "AI"],
        colSpan: 2,
        hasPersistentHover: true,
    },
    {
        title: "Task Manager",
        meta: "84 completed",
        description: "Automated workflow management with priority scheduling",
        icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
        status: "Updated",
        tags: ["Productivity", "Automation"],
    },
    {
        title: "Media Library",
        meta: "12GB used",
        description: "Cloud storage with intelligent content processing",
        icon: <Video className="w-4 h-4 text-purple-500" />,
        tags: ["Storage", "CDN"],
        colSpan: 2,
    },
    {
        title: "Global Network",
        meta: "6 regions",
        description: "Multi-region deployment with edge computing",
        icon: <Globe className="w-4 h-4 text-sky-500" />,
        status: "Beta",
        tags: ["Infrastructure", "Edge"],
    },
];

function MinimalBentoGrid({ items = itemsSample }: BentoGridProps) {
    const itemsCount = items.length;
    const remainder = itemsCount % 3;
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-7xl mx-auto">
            {items.map((item, index) => {
                const isLastItem = index === itemsCount - 1;
                const shouldCenter = isLastItem && remainder === 1;
                
                return (
                    <div
                        key={index}
                        className={cn(
                            "group relative p-4 rounded-xl overflow-hidden transition-all duration-300",
                            "border border-gray-100/80 dark:border-white/10 bg-white dark:bg-black",
                            "hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.03)]",
                            "hover:-translate-y-0.5 will-change-transform",
                            "col-span-1 h-full flex flex-col",
                            shouldCenter && "md:col-start-2"
                        )}
                    >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
                    </div>

                    <div className="relative flex flex-col space-y-3 flex-1">
                        <div className="flex items-center justify-between">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10 group-hover:bg-gradient-to-br transition-all duration-300">
                                {item.icon}
                            </div>
                            {item.status && (
                                <span
                                    className={cn(
                                        "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm",
                                        "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300",
                                        "transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20"
                                    )}
                                >
                                    {item.status}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2 flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 tracking-tight text-[15px] line-clamp-1">
                                {item.title}
                                {item.meta && (
                                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-normal">
                                        {item.meta}
                                    </span>
                                )}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug font-[425] line-clamp-3">
                                {item.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-2">
                            <div className="flex items-center flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                                {item.tags?.slice(0, 3).map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/20 whitespace-nowrap"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.cta || "Explore →"}
                            </span>
                        </div>
                    </div>

                    <div className="absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-gray-100/50 to-transparent dark:via-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                );
            })}
        </div>
    );
}

export { MinimalBentoGrid }

