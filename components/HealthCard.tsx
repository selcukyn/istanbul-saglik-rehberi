'use client';

import { MapPinIcon } from '@heroicons/react/24/outline';

interface HealthInstitution {
  SAGLIK_TESISI_ADI: string;
  ANA_KATEGORI: string;
  ALT_KATEGORI: string;
  IL_ADI: string;
  ILCE_ADI: string;
  MAHALLE_ADI: string;
  ADRES: string;
  ENLEM: number;
  BOYLAM: number;
}

interface HealthCardProps {
  institution: HealthInstitution;
}

export default function HealthCard({ institution }: HealthCardProps) {
  const handleDirectionsClick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${institution.ENLEM},${institution.BOYLAM}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {institution.SAGLIK_TESISI_ADI}
      </h3>
      
      <div className="space-y-2 text-gray-600">
        <p><span className="font-medium">Ana Kategori:</span> {institution.ANA_KATEGORI}</p>
        <p><span className="font-medium">Alt Kategori:</span> {institution.ALT_KATEGORI}</p>
        <p><span className="font-medium">İl/İlçe:</span> {institution.IL_ADI}/{institution.ILCE_ADI}</p>
        <p><span className="font-medium">Mahalle:</span> {institution.MAHALLE_ADI}</p>
        <p><span className="font-medium">Adres:</span> {institution.ADRES}</p>
      </div>

      <button
        onClick={handleDirectionsClick}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <MapPinIcon className="h-5 w-5 mr-2" />
        Yol Tarifi Al
      </button>
    </div>
  );
}
