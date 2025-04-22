const config = {
  build: {
    outputDirectory: 'out',
    staticExport: true,
    environment: process.env.NODE_ENV || 'development',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://data.ibb.gov.tr/api/3/action/datastore_search',
    currentDate: process.env.CURRENT_DATE || '2025-04-22 11:09:51',
    githubUser: process.env.GITHUB_USER || 'selcukyn'
  },
  data: {
    resourceId: 'f2154883-68e3-41dc-b2be-a6c2eb721c9e',
    limit: 1000000
  }
};

module.exports = config;
