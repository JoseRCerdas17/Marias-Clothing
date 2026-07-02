"use client";

import { Category } from "@/lib/api";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar -mx-5 px-5">
      <button
        onClick={() => onCategoryChange(null)}
        className={`text-sm px-6 py-2 rounded-full whitespace-nowrap active:scale-95 transition-all ${
          activeCategory === null
            ? "bg-primary-container text-white"
            : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onCategoryChange(cat.slug)}
          className={`text-sm px-6 py-2 rounded-full whitespace-nowrap active:scale-95 transition-all ${
            activeCategory === cat.slug
              ? "bg-primary-container text-white"
              : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
