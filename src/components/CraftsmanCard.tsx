import { useState } from 'react';
import { Craftsman } from '../types';
import { Phone, ExternalLink, MapPin, Clock, Navigation } from 'lucide-react';

interface CraftsmanCardProps {
  craftsman: Craftsman;
}

export function CraftsmanCard({ craftsman }: CraftsmanCardProps) {
  const [showPhone, setShowPhone] = useState(false);

  // DEBUG: Log craftsman data to help troubleshoot
  if (craftsman.category === 'Andet akut') {
    console.log('🔍 Andet akut håndværker:', {
      companyName: craftsman.companyName,
      category: craftsman.category,
      subcategory: craftsman.subcategory,
      hasSubcategory: !!craftsman.subcategory
    });
  }

  const handlePhoneClick = async () => {
    setShowPhone(true);
    
    // Track click
    try {
      const { projectId, publicAnonKey } = await import('../utils/supabase/info');
      const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-27acf415`;
      
      await fetch(`${API_URL}/clicks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          craftsmanId: craftsman.id,
          type: 'phone'
        })
      });
    } catch (error) {
      console.error('Error tracking phone click:', error);
    }
  };

  const handleWebsiteClick = async () => {
    // Track click
    try {
      const { projectId, publicAnonKey } = await import('../utils/supabase/info');
      const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-27acf415`;
      
      await fetch(`${API_URL}/clicks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          craftsmanId: craftsman.id,
          type: 'website'
        })
      });
    } catch (error) {
      console.error('Error tracking website click:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{craftsman.companyName}</h3>
        </div>
        {/* Only show subcategory for "Andet akut" to distinguish service types */}
        {craftsman.category === 'Andet akut' && craftsman.subcategory && (
          <div className="mt-2">
            <span className="inline-block px-3 py-1.5 text-sm font-semibold bg-red-600 text-white rounded-lg shadow-md">
              {craftsman.subcategory}
            </span>
          </div>
        )}
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 mb-3 text-gray-600">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <span className="text-sm">{craftsman.address}</span>
          {craftsman.distance !== undefined && (
            <div className="flex items-center gap-1 mt-1 text-green-600">
              <Navigation className="w-3 h-3" />
              <span className="text-xs font-medium">{craftsman.distance} km væk</span>
            </div>
          )}
        </div>
      </div>

      {/* Hourly Rate */}
      {craftsman.hourlyRate && (
        <div className="flex items-center gap-2 mb-4 text-gray-600">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">Akut timepris: {craftsman.hourlyRate} kr./time</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 pt-4 border-t border-gray-100">
        {/* Phone Button */}
        <button
          onClick={handlePhoneClick}
          className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm flex-1 sm:flex-initial min-h-[44px]"
        >
          <Phone className="w-4 h-4" />
          {showPhone ? craftsman.phone : 'Se nummer'}
        </button>

        {/* Website Link */}
        {craftsman.website && (
          <a
            href={craftsman.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWebsiteClick}
            className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm flex-1 sm:flex-initial min-h-[44px]"
          >
            <ExternalLink className="w-4 h-4" />
            Hjemmeside
          </a>
        )}
      </div>
    </div>
  );
}