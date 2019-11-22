// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/sw_express',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/publications_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: 'postgres://xxvrggrvsohmjb:4b3c21c54a4ffd770a2b39070aa965bc4ef7647ccb728c7377cd868521f1a15c@ec2-107-21-94-185.compute-1.amazonaws.com:5432/d9pes31b11fie8',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
