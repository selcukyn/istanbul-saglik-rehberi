'use client';

import { HealthInstitution } from '@/types';

interface HealthCardProps {
  institution: HealthInstitution;
}

// export function yerine export default function kullanıyoruz
export default function HealthCard({ institution }: HealthCardProps) {
  const handleDirections = () => {
    // Öncelikle yeni format koordinatları kontrol et, yoksa eski formatı kullan
    const lat = institution.Latitude || institution.ENLEM || 0;
    const lng = institution.Longitude || institution.BOYLAM || 0;
    
    if (lat && lng && lat !== 0 && lng !== 0) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(url, '_blank');
    } else {
      alert('Konum bilgisi eksik.');
    }
  };

  // Alt kategori bilgisini al (yeni veya eski format)
  const altKategori = institution["Alt Kategori"] || institution.ALT_KATEGORI || 'Belirtilmemiş';

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">
        {institution["Saglik Tesisi Adi"] || 'Bilinmeyen Kurum'}
      </h2>
      
      <div className="flex items-center gap-2">
        <span className="text-gray-600">
          {altKategori}
        </span>
        {(institution.Latitude || institution.ENLEM) && (
          <span className="bg-blue-100 text-blue-800 text-sm px-2 py-0.5 rounded">
            {((institution.Latitude || institution.ENLEM || 0) * 1000 / 1000).toFixed(1)} km
          </span>
        )}
      </div>
      
      <p className="text-gray-700 mt-3">
        {institution.ADRES}
      </p>
      
      <p className="text-sm text-gray-500 mt-1">
        {institution["Mahalle Adi"]}, {institution["Ilce Adi"]}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {altKategori}
        </span>
        
        <button
          onClick={handleDirections}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-5 h-5"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
            />
          </svg>
          Yol Tarifi
        </button>
      </div>
    </div>
  );
}
