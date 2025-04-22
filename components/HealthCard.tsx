'use client';

import { HealthInstitution } from '@/types';

interface HealthCardProps {
  institution: HealthInstitution;
}

export default function HealthCard({ institution }: HealthCardProps) {
  const handleDirections = () => {
    const { ENLEM, BOYLAM } = institution;
    if (ENLEM && BOYLAM) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${ENLEM},${BOYLAM}`;
      window.open(url, '_blank');
    } else {
      alert('Konum bilgisi eksik.');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{institution.SAGLIK_TESISI_ADI || 'Bilinmeyen Kurum'}</h2>
      
      <p className="text-sm text-gray-500">{institution.ALT_KATEGORI || 'Anlaşmalı değil'}</p>
      
      <p className="text-gray-700 mt-2">{institution.ADRES || 'Adres bilgisi yok'}</p>
      
      <p className="text-sm text-gray-500">{institution.ILCE_ADI}, {institution.IL_ADI}</p>

      {institution.TELEFON && (
        <p className="text-blue-500 mt-2">
          İletişim: <a href={`tel:${institution.TELEFON}`}>{institution.TELEFON}</a>
        </p>
      )}

      <div className="mt-4 flex justify-between">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">
          {institution.ALT_KATEGORI || 'Anlaşmalı değil'}
        </button>
        <button
          onClick={handleDirections}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Yol Tarifi
        </button>
      </div>
    </div>
  );
}
