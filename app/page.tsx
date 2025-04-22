'use client';

import { useState, useEffect } from 'react';
import { HealthInstitution } from '@/types';

export default function Home() {
  const [healthData, setHealthData] = useState<HealthInstitution[]>([]);
  const [loading, setLoading] = useState(true);

  // API'den veri çekme işlemi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://data.ibb.gov.tr/api/3/action/datastore_search', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resource_id: 'f2154883-68e3-41dc-b2be-a6c2eb721c9e',
            limit: 1000000
          })
        });
        
        const data = await response.json();
        setHealthData(data.result.records);
        setLoading(false);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthData.map((institution, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{institution.SAGLIK_TESISI_ADI}</h2>
            <p className="text-gray-600">{institution.ADRES}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
