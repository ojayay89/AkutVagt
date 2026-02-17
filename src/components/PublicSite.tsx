import { useState, useMemo, useEffect } from 'react';
import { CraftsmanCard } from './CraftsmanCard';
import { FilterBar } from './FilterBar';
import { Craftsman } from '../types';
import { api } from '../utils/api';
import { AlertCircle } from 'lucide-react';

export function PublicSite() {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCraftsmen();
  }, []);

  const loadCraftsmen = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getCraftsmen();
      
      // If no data, try to initialize
      if (data.length === 0) {
        try {
          await api.initDatabase();
          const newData = await api.getCraftsmen();
          setCraftsmen(newData);
        } catch (initError) {
          console.log('Database might already be initialized');
          setCraftsmen([]);
        }
      } else {
        setCraftsmen(data);
      }
    } catch (error) {
      console.error('Error loading craftsmen:', error);
      setError('Kunne ikke indlæse håndværkere. Prøv igen senere.');
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(craftsmen.map(c => c.category))).sort();
  }, [craftsmen]);

  // Filter craftsmen
  const filteredCraftsmen = useMemo(() => {
    if (selectedCategory === 'Alle') {
      return craftsmen;
    }
    return craftsmen.filter(c => c.category === selectedCategory);
  }, [selectedCategory, craftsmen]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-lg text-gray-600">Indlæser...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadCraftsmen}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Prøv igen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Akutvagt</h1>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Find hjælp når du har brug for det</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter */}
        {categories.length > 0 && (
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}

        {/* Results Count */}
        {filteredCraftsmen.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-600">
              Viser <span className="font-semibold">{filteredCraftsmen.length}</span>{' '}
              {filteredCraftsmen.length === 1 ? 'håndværker' : 'håndværkere'}
            </p>
          </div>
        )}

        {/* Craftsmen Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCraftsmen.map((craftsman) => (
            <CraftsmanCard key={craftsman.id} craftsman={craftsman} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCraftsmen.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {craftsmen.length === 0 
                ? 'Ingen håndværkere tilføjet endnu.'
                : 'Ingen håndværkere fundet i denne kategori'}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2026 Akutvagt. Alle rettigheder forbeholdes.</p>
            <p className="mt-2">
              Ring altid og bekræft priser før håndværkeren kommer ud.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}