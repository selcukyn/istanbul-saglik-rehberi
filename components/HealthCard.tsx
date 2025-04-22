'use client';

import { HealthInstitution } from '@/types';

interface HealthCardProps {
  institution: HealthInstitution;
}

export default function HealthCard({ institution }: HealthCardProps) {
  const handleDirections = () => {
    // Önce Latitude/Longitude'u kontrol et, yoksa ENLEM/BOYLAM'ı kullan
    const lat = institution.Latitude || institution.ENLEM;
    const lng = institution.Longitude || institution.BOYLAM;
    
    if (lat && lng && lat !== 0 && lng !== 0) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(url, '_blank');
    } else {
      alert('Konum bilgisi eksik.');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">
        {institution["Saglik Tesisi Adi"] || 'Bilinmeyen Kurum'}
      </h2>
      
      <div className="flex items-center gap-2 mt-2">
        <div className="text-gray-600">
          {institution["Alt Kategori"] || institution.ALT_KATEGORI || 'Belirtilmemiş'}
        </div>
        <div className="bg-blue-100 text-blue-800 text-sm px-2 py-0.5 rounded">
          {(institution.Latitude && institution.Longitude) ? 
            `${(institution.Latitude * 1000 / 1000).toFixed(1)} km` : ''}
        </div>
      </div>
      
      <p className="text-gray-700 mt-2">{institution.ADRES}</p>
      
      <p className="text-sm text-gray-500 mt-1">
        {institution["Mahalle Adi"]}, {institution["Ilce Adi"]}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {institution["Alt Kategori"] || institution.ALT_KATEGORI || 'Belirtilmemiş'}
        </span>
        
        <button
          onClick={handleDirections}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Yol Tarifi
        </button>
      </div>
    </div>
  );
}
