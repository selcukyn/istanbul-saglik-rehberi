'use client';

import { useState, useEffect } from 'react';
import { HealthInstitution, FilterOptions } from '@/types';
import FilterSection from '@/components/FilterSection';
import HealthCard from '@/components/HealthCard';

export default function Home() {
  const [data, setData] = useState<HealthInstitution[]>([]);
  const [filteredData, setFilteredData] = useState<HealthInstitution[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    il: '',
    ilce: '',
    anaKategori: '',
    altKategori: '',
    searchTerm: ''
  });

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Dünya'nın yarıçapı (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          setFilters(prev => ({
            ...prev,
            il: '',
            ilce: ''
          }));

          const dataWithDistances = data.map(item => {
            const lat = item.Latitude || item.ENLEM || 0;
            const lng = item.Longitude || item.BOYLAM || 0;
            const distance = calculateDistance(latitude, longitude, lat, lng);
            return { ...item, distance };
          });

          const sortedData = dataWithDistances.sort((a, b) => 
            (a.distance || Infinity) - (b.distance || Infinity)
          );

          setFilteredData(sortedData);
        },
        (error) => {
          console.error('Konum alınamadı:', error);
          alert('Konumunuza erişilemedi. Lütfen konum erişimine izin verdiğinizden emin olun.');
        }
      );
    } else {
      alert('Tarayıcınız konum hizmetini desteklemiyor.');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/health_data.json');
        const jsonData = await response.json();
        setData(jsonData.data);
        setFilteredData(jsonData.data);
        setLoading(false);
      } catch (error) {
        console.error('Veri yükleme hatası:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let filtered = data;

    if (filters.il) {
      filtered = filtered.filter(item => 
        (item["Il Adi"] === filters.il) || (item.IL_ADI === filters.il)
      );
    }

    if (filters.ilce) {
      filtered = filtered.filter(item => 
        (item["Ilce Adi"] === filters.ilce) || (item.ILCE_ADI === filters.ilce)
      );
    }

    if (filters.anaKategori) {
      filtered = filtered.filter(item => 
        (item["Ana Kategori"] === filters.anaKategori) || (item.ANA_KATEGORI === filters.anaKategori)
      );
    }

    if (filters.altKategori) {
      filtered = filtered.filter(item => 
        (item["Alt Kategori"] === filters.altKategori) || (item.ALT_KATEGORI === filters.altKategori)
      );
    }

    if (userLocation) {
      filtered = filtered.map(item => {
        const lat = item.Latitude || item.ENLEM || 0;
        const lng = item.Longitude || item.BOYLAM || 0;
        const distance = calculateDistance(userLocation.lat, userLocation.lng, lat, lng);
        return { ...item, distance };
      }).sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    }

    setFilteredData(filtered);
  }, [data, filters, userLocation]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FilterSection
        data={data}
        currentFilters={filters}
        onFilterChange={setFilters}
        onUseLocation={handleUseLocation}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredData.map((institution, index) => (
          <HealthCard key={institution._id || index} institution={institution} />
        ))}
      </div>
      
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Arama kriterlerinize uygun sonuç bulunamadı.
          </p>
        </div>
      )}
    </div>
  );
}
