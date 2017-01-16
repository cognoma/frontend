const AppSettings = {
  app:{
    title: 'Cognoma',
    version: '0.0.1'
  },

  api:{
    baseUrl:    '',//http://localhost\:8000
    genes:  '/genes',
    diseases:   '/diseases',
    samples:    '/samples',
    geneSearch: {
      base: 'https://mygene.info/v3/query?q=',
      params:{
        suggest_from: 'symbol^2,alias',
        species:      'human',
        entrezonly:   'true',
        size:          100
      } 
    }
}

};



export default AppSettings;
