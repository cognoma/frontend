const AppSettings = {
  app:{
    title: 'Cognoma',
    version: '0.0.1'
  },

  api:{
    baseUrl: '/api/v1',
    geneSearch:{
      base: 'https://mygene.info/v3/query?q=',
      params:{
        suggest_from: 'symbol^2,alias',
        species:      'human',
        entrezonly:   'true',
        size:          100
      } 
    },
    cBioPortal:{
      base: 'http://www.cbioportal.org/webservice.do',
      params:{
        cmd:                'getMutationData',
        genetic_profile_id: '_tcga_mutations',
        gene_list:          []
      }
    }
}

};



export default AppSettings;
