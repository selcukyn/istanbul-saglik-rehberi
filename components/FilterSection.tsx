'use client';

import { useState } from 'react';

interface FilterOptions {
  il: string;
  ilce: string;
  anaKategori: string;
  altKategori: string;
}

interface FilterSectionProps {
  data: any[];
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterSection({ data, onFilterChange }: FilterSectionProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    il: '',
    ilce: '',
    anaKategori: '',
    altKategori: '',
  });

  // Unique değerleri al
  const uniqueValues = {
    il: [...new Set(data.map(item => item.IL_ADI))].sort(),
    ilce: [...new Set(data.map(item => item.ILCE_ADI))].sort(),
    anaKategori: [...new Set(data.map(item => item.ANA_KATEGORI))].sort(),
    altKategori: [...new Set(data.map(item => item.ALT_KATEGORI))].sort(),
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">İl</label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.il}
            onChange={(e) => handleFilterChange('il', e.target.value)}
          >
            <option value="">Tüm İller</option>
            {uniqueValues.il.map(il => (
              <option key={il} value={il}>{il}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">İlçe</label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.ilce}
            onChange={(e) => handleFilterChange('ilce', e.target.value)}
          >
            <option value="">Tüm İlçeler</option>
            {uniqueValues.ilce.map(ilce => (
              <option key={ilce} value={ilce}>{ilce}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Ana Kategori</label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.anaKategori}
            onChange={(e) => handleFilterChange('anaKategori', e.target.value)}
          >
            <option value="">Tüm Kategoriler</option>
            {uniqueValues.anaKategori.map(kategori => (
              <option key={kategori} value={kategori}>{kategori}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Alt Kategori</label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.altKategori}
            onChange={(e) => handleFilterChange('altKategori', e.target.value)}
          >
            <option value="">Tüm Alt Kategoriler</option>
            {uniqueValues.altKategori.map(kategori => (
              <option key={kategori} value={kategori}>{kategori}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
