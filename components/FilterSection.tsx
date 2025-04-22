'use client';

import { FilterOptions } from '@/types';

interface FilterSectionProps {
  data: any[];
  currentFilters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterSection({ data, currentFilters, onFilterChange }: FilterSectionProps) {
  // Unique değerleri al (Set kullanmadan)
  const getUniqueValues = (arr: any[], key: string): string[] => {
    const values = arr.map(item => item[key]);
    const uniqueValues = values.filter((value, index) => values.indexOf(value) === index);
    return uniqueValues.sort();
  };

  const uniqueValues = {
    il: getUniqueValues(data, 'IL_ADI'),
    ilce: getUniqueValues(data, 'ILCE_ADI'),
    anaKategori: getUniqueValues(data, 'ANA_KATEGORI'),
    altKategori: getUniqueValues(data, 'ALT_KATEGORI'),
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters: FilterOptions = {
      ...currentFilters,
      [key]: value
    };
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Arama Kutusu */}
        <div className="lg:col-span-2">
          <input
            type="text"
            placeholder="Sağlık kurumu veya adres ara..."
            className="w-full px-4 py-2 border rounded-md"
            value={currentFilters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          />
        </div>

        <div>
          <select
            className="w-full px-4 py-2 border rounded-md"
            value={currentFilters.il}
            onChange={(e) => handleFilterChange('il', e.target.value)}
          >
            <option value="">Tüm İller</option>
            {uniqueValues.il.map(il => (
              <option key={il} value={il}>{il}</option>
            ))}
          </select>
        </div>

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
      </div>
    </div>
  );
}
