'use client';

import { FilterOptions } from '@/types';

interface FilterSectionProps {
  data: any[];
  currentFilters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterSection({ data, currentFilters, onFilterChange }: FilterSectionProps) {
  // Unique değerleri al (Array.from ve Set yerine farklı bir yaklaşım)
  const getUniqueValues = (key: string): string[] => {
    const values: { [key: string]: boolean } = {};
    data.forEach(item => {
      if (item[key]) {
        values[item[key]] = true;
      }
    });
    return Object.keys(values).sort();
  };

  const uniqueValues = {
    il: getUniqueValues('IL_ADI'),
    ilce: getUniqueValues('ILCE_ADI'),
    anaKategori: getUniqueValues('ANA_KATEGORI'),
    altKategori: getUniqueValues('ALT_KATEGORI'),
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
