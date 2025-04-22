const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function fetchAndSaveData() {
  try {
    // API endpoint ve parametreler
    const url = process.env.NEXT_PUBLIC_API_URL || "https://data.ibb.gov.tr/api/3/action/datastore_search";
    const params = {
      resource_id: "f2154883-68e3-41dc-b2be-a6c2eb721c9e",
      limit: 1000000
    };

    console.log('Veri çekme işlemi başlatıldı:', process.env.CURRENT_DATE);

    // API'den veriyi çek
    const response = await axios.get(url, { params });

    if (!response.data.success) {
      throw new Error('API başarısız yanıt döndü');
    }

    // Veriyi işle ve kategorileri düzenle
    const processedData = response.data.result.records.map(record => ({
      ...record,
      // Boş değerleri düzelt
      ANA_KATEGORI: record.ANA_KATEGORI || 'Diğer',
      ALT_KATEGORI: record.ALT_KATEGORI || 'Belirtilmemiş',
      // Koordinatları number tipine çevir
      ENLEM: parseFloat(record.ENLEM) || 0,
      BOYLAM: parseFloat(record.BOYLAM) || 0
    }));

    // Veriyi JSON dosyası olarak kaydet
    const dataToSave = {
      lastUpdated: process.env.CURRENT_DATE,
      updatedBy: process.env.GITHUB_USER || 'system',
      totalRecords: processedData.length,
      data: processedData
    };

    const dataDir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(dataDir, 'health_data.json'),
      JSON.stringify(dataToSave, null, 2)
    );

    console.log(`Veri başarıyla güncellendi. Toplam kayıt: ${processedData.length}`);
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    throw error;
  }
}

// Script doğrudan çalıştırıldığında
if (require.main === module) {
  fetchAndSaveData();
}

module.exports = fetchAndSaveData;
