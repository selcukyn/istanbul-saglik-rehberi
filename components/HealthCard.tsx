'use client';

import { HealthInstitution } from '@/types';
import { truncateText, getCategoryIcon } from '@/lib/utils';

interface HealthCardProps {
  institution: HealthInstitution;
}

export default function HealthCard({ institution }: HealthCardProps) {
  const handleDirections = () => {
    const lat = institution.Latitude || institution.ENLEM || 0;
    const lng = institution.Longitude || institution.BOYLAM || 0;
    
    if (lat && lng && lat !== 0 && lng !== 0) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(url, '_blank');
    } else {
      alert('Konum bilgisi eksik.');
    }
  };

  const altKategori = institution["Alt Kategori"] || institution.ALT_KATEGORI || 'Belirtilmemiş';
  const tesisAdi = institution["Saglik Tesisi Adi"] || 'Bilinmeyen Kurum';

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex items-start gap-3 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={getCategoryIcon(altKategori)}
            />
          </svg>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {truncateText(tesisAdi, 40)}
            </h2>
            {institution.distance && (
              <span className="text-sm text-blue-600 font-medium">
                {institution.distance.toFixed(1)} km
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-2">
          {truncateText(institution.ADRES, 100)}
        </p>

        <p className="text-xs text-gray-500">
          {institution["Mahalle Adi"]}, {institution["Ilce Adi"]}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full font-medium">
          {truncateText(altKategori, 25)}
        </span>
        
        <button
          onClick={handleDirections}
          className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            className="w-4 h-4"
          >
            <path 
              fillRule="evenodd" 
              d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
              clipRule="evenodd"
            />
          </svg>
          Yol Tarifi
        </button>
      </div>
    </div>
  );
}
