'use client';

import { FilterOptions } from '@/types';

interface FilterSectionProps {
  data: any[];
  currentFilters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterSection({ data, currentFilters, onFilterChange }: FilterSectionProps) {
  const getUniqueValues = (key: string): string[] => {
    const values: { [key: string]: boolean } = {};
    data.forEach(item => {
      // Hem eski hem yeni alan adlarını kontrol et
      const value = item[key] || item[key.toLowerCase()] || item[key.toUpperCase()];
      if (value) {
        values[value] = true;
      }
    });
    return Object.keys(values).sort();
  };

  const uniqueValues = {
    il: getUniqueValues('Il Adi'),
    ilce: getUniqueValues('Ilce Adi'),
    anaKategori: getUniqueValues('Ana Kategori'),
    altKategori: getUniqueValues('Alt Kategori')
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters: FilterOptions = {
      ...currentFilters,
      [key]: value
    };
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    onFilterChange({
      il: '',
      ilce: '',
      anaKategori: '',
      altKategori: '',
      searchTerm: ''
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <select
            className="w-full px-4 py-2 border rounded-md"
            value={currentFilters.ilce}
            onChange={(e) => handleFilterChange('ilce', e.target.value)}
          >
            <option value="">Tüm İlçeler</option>
            {uniqueValues.ilce.map(ilce => (
              <option key={ilce} value={ilce}>{ilce}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            className="w-full px-4 py-2 border rounded-md"
            value={currentFilters.anaKategori}
            onChange={(e) => handleFilterChange('anaKategori', e.target.value)}
          >
            <option value="">Tüm Kategoriler</option>
            {uniqueValues.anaKategori.map(kategori => (
              <option key={kategori} value={kategori}>{kategori}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            className="w-full px-4 py-2 border rounded-md"
            value={currentFilters.altKategori}
            onChange={(e) => handleFilterChange('altKategori', e.target.value)}
          >
            <option value="">Tüm Alt Kategoriler</option>
            {uniqueValues.altKategori.map(kategori => (
              <option key={kategori} value={kategori}>{kategori}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleResetFilters}
          className="w-full md:w-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
        >
          Filtreleri Sıfırla
        </button>
      </div>
    </div>
  );
}
