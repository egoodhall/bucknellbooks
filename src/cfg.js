
const cfg = {
  production: {
    mongo: {
      host: 'db',
      port: 27017,
      user: 'production',
      pass: 'buck.ME.harder',
      db: 'bucknellBooks'
    },
    elasticSearch: {
      host: 'elasticsearch',
      port: 9200,
      auth: 'elastic:changeme'
    }
  },
  development: {
    mongo: {
      host: 'localhost',
      port: 27017,
      user: 'production',
      pass: 'buck.ME.harder',
      db: 'bucknellBooks'
    },
    elasticSearch: {
      host: 'localhost',
      port: 9200,
      auth: 'elastic:changeme'
    }
  }
};

export default (process.env.NODE_ENV === 'production') ? cfg.production : cfg.development;
