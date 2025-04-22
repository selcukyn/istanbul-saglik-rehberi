import fs from 'fs';
import path from 'path';
import axios from 'axios';

async function fetchHealthData() {
  try {
    const url = "https://data.ibb.gov.tr/api/3/action/datastore_search";
    const params = {
      resource_id: "f2154883-68e3-41dc-b2be-a6c2eb721c9e",
      limit: 1000000
    };

    const response = await axios.get(url, { params });
    
    if (response.data.success) {
      const data = {
        lastUpdated: new Date().toISOString(),
        data: response.data.result.records
      };

      // public/data klasörünü oluştur
      const dataDir = path.join(process.cwd(), 'public', 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Veriyi JSON dosyasına kaydet
      fs.writeFileSync(
        path.join(dataDir, 'health_data.json'),
        JSON.stringify(data, null, 2)
      );

      console.log('Veri başarıyla güncellendi:', new Date().toISOString());
    }
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    throw error;
  }
}

// Script doğrudan çalıştırıldığında
if (require.main === module) {
  fetchHealthData();
}

export default fetchHealthData;
