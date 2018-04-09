const apiEnv = {
  local: "",
  dev: "http://localhost:8080",
  production: "https://api.cognoma.org"
};

const AppSettings = {
  app: {
    title: "Cognoma",
    version: "0.0.1"
  },

  api: {
    baseUrl: apiEnv.production,
    diseases: "/diseases",
    samples: "/samples",
    users: "/users",
    classifiers: "/classifiers",
    geneSearch: {
      base: "https://mygene.info/v3/query?q=type_of_gene:protein-coding",
      params: {
        species: "human",
        entrezonly: "true",
        size: 100
      }
    }
  }
};

export default AppSettings;
