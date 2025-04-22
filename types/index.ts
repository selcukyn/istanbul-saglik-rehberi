export interface HealthInstitution {
  _id: number;
  "Saglik Tesisi Adi": string;
  "Ana Kategori": string;
  "Alt Kategori": string;
  "Ilce Adi": string;
  "Mahalle Adi": string;
  ADRES: string;
  Latitude: number;
  Longitude: number;
  ANA_KATEGORI: string;
  ALT_KATEGORI: string;
  ENLEM: number;
  BOYLAM: number;
}

export interface FilterOptions {
  il: string;
  ilce: string;
  anaKategori: string;
  altKategori: string;
  searchTerm: string;
}
