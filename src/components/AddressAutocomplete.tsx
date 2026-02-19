import { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

interface DawaAutocompleteResult {
  type: string;
  tekst: string;
  forslagstekst: string;
  data: {
    id?: string;
    href?: string;
  };
}

interface DawaAddress {
  id: string;
  adressebetegnelse: string;
  adgangsadresse: {
    x: number;
    y: number;
    adgangspunkt?: {
      koordinater: [number, number]; // [longitude, latitude]
    };
  };
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string, lat?: number, lon?: number) => void;
  placeholder?: string;
  className?: string;
  onCoordinatesChange?: (lat: number, lon: number) => void;
}

export function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Indtast adresse (f.eks. Nørregade 10, København)",
  className = "",
  onCoordinatesChange
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<DawaAutocompleteResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch address suggestions from DAWA
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!value || value.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        // DAWA API: Danmarks Adressers Web API (gratis og officiel)
        const response = await fetch(
          `https://api.dataforsyningen.dk/autocomplete?q=${encodeURIComponent(value)}&type=adresse&caretpos=${value.length}&fuzzy=`
        );
        const data = await response.json();
        
        // Filter to only show address type results
        const addressResults = data.filter((item: DawaAutocompleteResult) => item.type === 'adresse');
        
        setSuggestions(addressResults || []);
        setShowSuggestions(true);
        setSelectedIndex(-1);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  const handleSelectAddress = async (suggestion: DawaAutocompleteResult) => {
    const fullAddress = suggestion.tekst;
    
    console.log('🏠 Adresse valgt:', fullAddress);
    console.log('🔗 DAWA href:', suggestion.data.href);
    
    // Fetch full address details with coordinates using the href
    if (suggestion.data.href) {
      try {
        const response = await fetch(suggestion.data.href);
        const addressData: DawaAddress = await response.json();
        
        console.log('📍 DAWA API Full Response:', JSON.stringify(addressData, null, 2));
        
        // Extract coordinates from the nested structure
        // Coordinates are in adgangsadresse -> adgangspunkt -> koordinater [lon, lat]
        const koordinater = addressData.adgangsadresse?.adgangspunkt?.koordinater;
        
        if (koordinater && koordinater.length === 2) {
          const lon = koordinater[0]; // Longitude (x)
          const lat = koordinater[1]; // Latitude (y)
          
          console.log('✅ Koordinater fundet:');
          console.log('   Latitude (y):', lat);
          console.log('   Longitude (x):', lon);
          
          // Set address with coordinates
          onChange(fullAddress, lat, lon);
          
          // Also call the coordinates callback if provided
          if (onCoordinatesChange) {
            onCoordinatesChange(lat, lon);
          }
        } else {
          console.warn('⚠️ Koordinater ikke fundet i DAWA response');
          onChange(fullAddress);
        }
      } catch (error) {
        console.error('❌ Error fetching address details:', error);
        // Fallback: just set the address without coordinates
        onChange(fullAddress);
      }
    } else {
      console.warn('⚠️ Ingen href tilgængelig for denne adresse');
      // No href available, just set the address text
      onChange(fullAddress);
    }
    
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelectAddress(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${className}`}
          autoComplete="off"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.data.id || index}
              type="button"
              onClick={() => handleSelectAddress(suggestion)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                index === selectedIndex ? 'bg-red-50' : ''
              }`}
            >
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">
                    {suggestion.tekst}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions && !loading && value.length >= 3 && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-sm text-gray-500">
          Ingen adresser fundet. Prøv en anden søgning.
        </div>
      )}
    </div>
  );
}