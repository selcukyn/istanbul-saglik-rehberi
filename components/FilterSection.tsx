'use client';

import { FilterOptions, HealthInstitution } from '@/types';

interface FilterSectionProps {
  data: HealthInstitution[];
  currentFilters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onUseLocation: () => void;  // Yeni prop ekledik
}

export default function FilterSection({ 
  data, 
  currentFilters, 
  onFilterChange,
  onUseLocation 
}: FilterSectionProps) {
  const getUniqueValues = (key: string, alternativeKey?: string): string[] => {
    const values: { [key: string]: boolean } = {};
    data.forEach(item => {
      const value = item[key as keyof HealthInstitution] || 
                   (alternativeKey && item[alternativeKey as keyof HealthInstitution]);
      if (value) {
        values[value.toString()] = true;
      }
    });
    return Object.keys(values).sort();
  };

  const uniqueValues = {
    il: getUniqueValues("Il Adi", "IL_ADI"),
    ilce: getUniqueValues("Ilce Adi", "ILCE_ADI"),
    anaKategori: getUniqueValues("Ana Kategori", "ANA_KATEGORI"),
    altKategori: getUniqueValues("Alt Kategori", "ALT_KATEGORI")
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFilterChange({
      ...currentFilters,
      [key]: value
    });
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <select
            className="w-full px-4 py-2 border rounded-md text-gray-700"
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
            className="w-full px-4 py-2 border rounded-md text-gray-700"
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
            className="w-full px-4 py-2 border rounded-md text-gray-700"
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
            className="w-full px-4 py-2 border rounded-md text-gray-700"
            value={currentFilters.altKategori}
            onChange={(e) => handleFilterChange('altKategori', e.target.value)}
          >
            <option value="">Tüm Alt Kategoriler</option>
            {uniqueValues.altKategori.map(kategori => (
              <option key={kategori} value={kategori}>{kategori}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
          >
            Sıfırla
          </button>
          <button
            onClick={onUseLocation}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Konumu Kullan
          </button>
        </div>
      </div>
    </div>
  );
}
