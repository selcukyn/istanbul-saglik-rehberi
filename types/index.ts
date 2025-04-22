export interface HealthInstitution {
  SAGLIK_TESISI_ADI: string;
  ANA_KATEGORI: string;
  ALT_KATEGORI: string;
  IL_ADI: string;
  ILCE_ADI: string;
  MAHALLE_ADI: string;
  ADRES: string;
  ENLEM: number;
  BOYLAM: number;
}

export interface FilterOptions {
  il: string;
  ilce: string;
  anaKategori: string;
  altKategori: string;
  searchTerm: string; // searchTerm eklendi
}
