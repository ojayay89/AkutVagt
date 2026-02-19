import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { CraftsmanCard } from './CraftsmanCard';
import { Craftsman } from '../types';
import { api } from '../utils/api';
import { AlertCircle, MapPin, ArrowLeft, Navigation } from 'lucide-react';
import { getUserLocation, geocodeAddress, calculateDistance } from '../utils/geolocation';

// Category images and gradients
const categoryData: Record<string, { image: string; gradient: string; description: string }> = {
  'VVS': {
    image: 'https://images.unsplash.com/photo-1654440122140-f1fc995ddb34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwdG9vbHMlMjB3YXRlciUyMHBpcGV8ZW58MXx8fHwxNzcxNTA2MTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-blue-600/80 to-blue-800/80',
    description: 'Vandskader, utætte rør, stoppede afløb'
  },
  'Elektriker': {
    image: 'https://images.unsplash.com/photo-1751486289947-4f5f5961b3aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHdvcmslMjB3aXJpbmd8ZW58MXx8fHwxNzcxNTA2MTMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-yellow-600/80 to-orange-700/80',
    description: 'Strømafbrydelser, elproblemer, fejlfinding'
  },
  'Kloakfirma': {
    image: 'https://images.unsplash.com/photo-1650246363606-a2402ec42b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMGRyYWluJTIwcGlwZSUyMHdvcmt8ZW58MXx8fHwxNzcxNTA2MjQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-gray-700/80 to-gray-900/80',
    description: 'Kloakproblemer, stoppede afløb, TV-inspektion'
  },
  'Låsesmed': {
    image: 'https://images.unsplash.com/photo-1667857399223-593f0b4e0961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2Nrc21pdGglMjBrZXlzJTIwbG9ja3xlbnwxfHx8fDE3NzE1MDYxMzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-purple-600/80 to-purple-800/80',
    description: 'Låst ude, nødåbning, låseskift'
  },
  'Glarmester': {
    image: 'https://images.unsplash.com/photo-1723400830780-64e3d550705b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHdpbmRvdyUyMHJlcGFpcnxlbnwxfHx8fDE3NzE1MDYxMzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-cyan-600/80 to-cyan-800/80',
    description: 'Knust glas, akut udskiftning, reparation'
  },
  'Andet akut': {
    image: 'https://images.unsplash.com/photo-1742069028920-c2acf52aaa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjBzZXJ2aWNlJTIwcm9hZHNpZGUlMjBhc3Npc3RhbmNlfGVufDF8fHx8MTc3MTUwNjEzNHww&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-red-600/80 to-red-800/80',
    description: 'Sikkerhedsvagt, autohjælp, andre akutte behov'
  }
};

export function CategoryView() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [manualAddress, setManualAddress] = useState('');
  const [geocoding, setGeocoding] = useState(false);

  useEffect(() => {
    loadCraftsmen();
  }, []);

  useEffect(() => {
    // Try to get user location automatically
    requestLocation();
  }, []);

  const loadCraftsmen = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getCraftsmen();
      
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

  const requestLocation = async () => {
    try {
      const position = await getUserLocation();
      setUserLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
      setLocationPermission('granted');
    } catch (error) {
      console.log('Location permission denied or unavailable');
      setLocationPermission('denied');
    }
  };

  const handleManualAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualAddress.trim()) return;

    setGeocoding(true);
    try {
      const coords = await geocodeAddress(manualAddress);
      if (coords) {
        setUserLocation(coords);
        setLocationPermission('granted');
      } else {
        alert('Kunne ikke finde adressen. Prøv venligst igen.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Fejl ved søgning efter adresse. Prøv venligst igen.');
    } finally {
      setGeocoding(false);
    }
  };

  // Calculate distances and sort craftsmen
  const sortedCraftsmen = useMemo(() => {
    let filtered = craftsmen;
    
    // Filter by category
    if (category && category !== 'Alle') {
      filtered = craftsmen.filter(c => c.category === category);
    }

    // Calculate distances if user location is available
    if (userLocation) {
      filtered = filtered.map(craftsman => {
        if (craftsman.lat && craftsman.lon) {
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lon,
            craftsman.lat,
            craftsman.lon
          );
          return { ...craftsman, distance };
        }
        return craftsman;
      });

      // Sort by distance (closest first)
      filtered = filtered.sort((a, b) => {
        if (a.distance !== undefined && b.distance !== undefined) {
          return a.distance - b.distance;
        }
        if (a.distance !== undefined) return -1;
        if (b.distance !== undefined) return 1;
        return 0;
      });
    }

    return filtered;
  }, [craftsmen, category, userLocation]);

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

  const currentCategoryData = categoryData[category || 'Alle'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Image Background */}
      <header className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        {currentCategoryData && (
          <>
            <img 
              src={currentCategoryData.image} 
              alt={category || ''}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${currentCategoryData.gradient}`} />
          </>
        )}
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:text-white/90 mb-6 transition-colors drop-shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Tilbage til kategorier</span>
          </button>
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-3">
              <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-lg" />
              <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">
                {category || 'Alle kategorier'}
              </h1>
            </div>
            {currentCategoryData && (
              <p className="text-lg sm:text-xl text-white/95 mt-2 drop-shadow-md">
                {currentCategoryData.description}
              </p>
            )}
            <p className="text-sm sm:text-base text-white/90 mt-4 drop-shadow-md">
              Find den nærmeste akuthjælp i dit område
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Location Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Find håndværkere i dit område
            </h2>
          </div>

          {locationPermission === 'granted' && userLocation ? (
            <div className="flex items-center gap-2 text-green-600">
              <Navigation className="w-5 h-5" />
              <span>Viser håndværkere sorteret efter afstand</span>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">
                Tillad geolokation eller indtast din adresse for at se afstande
              </p>
              
              {locationPermission === 'denied' && (
                <form onSubmit={handleManualAddressSubmit} className="flex gap-3">
                  <input
                    type="text"
                    value={manualAddress}
                    onChange={(e) => setManualAddress(e.target.value)}
                    placeholder="Indtast din adresse (f.eks. Nørregade 10, København)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={geocoding}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors"
                  >
                    {geocoding ? 'Søger...' : 'Søg'}
                  </button>
                </form>
              )}

              {locationPermission === 'prompt' && (
                <button
                  onClick={requestLocation}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Brug min lokation
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        {sortedCraftsmen.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-600">
              Viser <span className="font-semibold">{sortedCraftsmen.length}</span>{' '}
              {sortedCraftsmen.length === 1 ? 'håndværker' : 'håndværkere'}
              {userLocation && ' (sorteret efter afstand)'}
            </p>
          </div>
        )}

        {/* Craftsmen Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCraftsmen.map((craftsman) => (
            <CraftsmanCard key={craftsman.id} craftsman={craftsman} />
          ))}
        </div>

        {/* Empty State */}
        {sortedCraftsmen.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">
              Ingen håndværkere fundet i kategorien "{category}"
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Vælg anden kategori
            </button>
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