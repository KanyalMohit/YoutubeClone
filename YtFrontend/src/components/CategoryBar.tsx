
import { Category } from "@/data/mockData";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryBarProps {
  categories: Category[];
}

const CategoryBar = ({ categories }: CategoryBarProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("1");
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useState<HTMLDivElement | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const scroll = (direction: "left" | "right") => {
    const container = containerRef[0];
    if (!container) return;
    
    const scrollAmount = 200;
    const newPosition = direction === "left" 
      ? Math.max(scrollPosition - scrollAmount, 0)
      : scrollPosition + scrollAmount;
    
    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  return (
    <div className="relative flex items-center w-full">
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute left-0 z-10 h-full rounded-r-none bg-gradient-to-r from-background to-transparent hidden md:flex"
        onClick={() => scroll("left")}
      >
        <ArrowLeft size={16} />
      </Button>

      <div 
        ref={(ref) => containerRef[1](ref)} 
        className="flex items-center gap-2 overflow-x-auto py-3 px-2 scrollbar-none"
        onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors",
              activeCategory === category.id
                ? "bg-white text-background"
                : "bg-stream-gray hover:bg-stream-hover text-foreground"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      <Button 
        variant="ghost" 
        size="icon"
        className="absolute right-0 z-10 h-full rounded-l-none bg-gradient-to-l from-background to-transparent hidden md:flex"
        onClick={() => scroll("right")}
      >
        <ArrowRight size={16} />
      </Button>
    </div>
  );
};

export default CategoryBar;
