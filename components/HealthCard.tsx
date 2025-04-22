import { HealthInstitution, FilterOptions } from '@/types';

export const filterHealthInstitutions = (
  data: HealthInstitution[],
  filters: FilterOptions
): HealthInstitution[] => {
  return data.filter(item => {
    // İl eşleşmesi
    const matchesIl = !filters.il || 
      item["Il Adi"] === filters.il || 
      item.IL_ADI === filters.il;

    // İlçe eşleşmesi
    const matchesIlce = !filters.ilce || 
      item["Ilce Adi"] === filters.ilce || 
      item.ILCE_ADI === filters.ilce;

    // Ana kategori eşleşmesi
    const matchesAnaKategori = !filters.anaKategori || 
      item["Ana Kategori"] === filters.anaKategori || 
      item.ANA_KATEGORI === filters.anaKategori;

    // Alt kategori eşleşmesi
    const matchesAltKategori = !filters.altKategori || 
      item["Alt Kategori"] === filters.altKategori || 
      item.ALT_KATEGORI === filters.altKategori;

    // Arama terimi eşleşmesi
    const matchesSearch = !filters.searchTerm || 
      (item["Saglik Tesisi Adi"] && 
        item["Saglik Tesisi Adi"].toLowerCase().includes(filters.searchTerm.toLowerCase()));

    return matchesIl && matchesIlce && matchesAnaKategori && matchesAltKategori && matchesSearch;
  });
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Dünya'nın yarıçapı (km)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Kilometre cinsinden mesafe
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const sortByDistance = (
  data: HealthInstitution[],
  userLat: number,
  userLon: number
): HealthInstitution[] => {
  return [...data].sort((a, b) => {
    const lat1 = a.Latitude || a.ENLEM || 0;
    const lon1 = a.Longitude || a.BOYLAM || 0;
    const lat2 = b.Latitude || b.ENLEM || 0;
    const lon2 = b.Longitude || b.BOYLAM || 0;

    const dist1 = calculateDistance(userLat, userLon, lat1, lon1);
    const dist2 = calculateDistance(userLat, userLon, lat2, lon2);

    return dist1 - dist2;
  });
};
