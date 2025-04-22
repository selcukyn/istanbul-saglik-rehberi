import { HealthInstitution } from '@/types';

export async function getHealthData(): Promise<HealthInstitution[]> {
  try {
    const response = await fetch('/data/health_data.json');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Veri yükleme hatası:', error);
    return [];
  }
}

export function filterHealthData(
  data: HealthInstitution[],
  filters: {
    il?: string;
    ilce?: string;
    anaKategori?: string;
    altKategori?: string;
    searchTerm?: string;
  }
): HealthInstitution[] {
  return data.filter(item => {
    const matchesIl = !filters.il || item.IL_ADI === filters.il;
    const matchesIlce = !filters.ilce || item.ILCE_ADI === filters.ilce;
    const matchesAnaKategori = !filters.anaKategori || item.ANA_KATEGORI === filters.anaKategori;
    const matchesAltKategori = !filters.altKategori || item.ALT_KATEGORI === filters.altKategori;
    const matchesSearch = !filters.searchTerm || 
      item.SAGLIK_TESISI_ADI.toLowerCase().includes(filters.searchTerm.toLowerCase());

    return matchesIl && matchesIlce && matchesAnaKategori && matchesAltKategori && matchesSearch;
  });
}
