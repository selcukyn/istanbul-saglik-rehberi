'use client';

import { useState, useEffect } from 'react';
import { HealthInstitution, FilterOptions } from '@/types';
import FilterSection from '@/components/FilterSection';
import HealthCard from '@/components/HealthCard';

export default function Home() {
  const [data, setData] = useState<HealthInstitution[]>([]);
  const [filteredData, setFilteredData] = useState<HealthInstitution[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    il: '',
    ilce: '',
    anaKategori: '',
    altKategori: '',
    searchTerm: ''
  });

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
    const filtered = data.filter(item => {
      const matchesIlce = !filters.ilce || item["Ilce Adi"] === filters.ilce;
      const matchesAnaKategori = !filters.anaKategori || item["Ana Kategori"] === filters.anaKategori;
      const matchesAltKategori = !filters.altKategori || item["Alt Kategori"] === filters.altKategori;

      return matchesIlce && matchesAnaKategori && matchesAltKategori;
    });

    setFilteredData(filtered);
  }, [data, filters]);

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
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredData.map((institution, index) => (
          <HealthCard key={index} institution={institution} />
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
