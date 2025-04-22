const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('./config');

async function fetchAndSaveData() {
  try {
    // API endpoint ve parametreler
    const url = config.build.apiUrl;
    const params = {
      resource_id: config.data.resourceId,
      limit: config.data.limit
    };

    console.log('Veri çekme işlemi başlatıldı:', config.build.currentDate);

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
      lastUpdated: config.build.currentDate,
      updatedBy: config.build.githubUser,
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
