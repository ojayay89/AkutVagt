interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function FilterBar({ categories, selectedCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('Alle')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
            selectedCategory === 'Alle'
              ? 'bg-red-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
          }`}
        >
          Alle
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
