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

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const filtered = data.filter(item => {
      const matchesIl = !filters.il || item.IL_ADI === filters.il;
      const matchesIlce = !filters.ilce || item.ILCE_ADI === filters.ilce;
      const matchesAnaKategori = !filters.anaKategori || item.ANA_KATEGORI === filters.anaKategori;
      const matchesAltKategori = !filters.altKategori || item.ALT_KATEGORI === filters.altKategori;
      const matchesSearch = !filters.searchTerm || 
        item.SAGLIK_TESISI_ADI.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.ADRES.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesIl && matchesIlce && matchesAnaKategori && matchesAltKategori && matchesSearch;
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
        currentFilters={filters}
        onFilterChange={handleFilterChange}
        data={data}
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
