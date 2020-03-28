const MongoClient: any = require('mongodb').MongoClient;

class Api {
  static getDataFromMongoDb() {
    const dbUser = process.env.MONGODB_USER;
    const dbPassword = process.env.MONGODB_PW';
    const uri = `mongodb://${dbUser}:${dbPassword}@ds263460.mlab.com:63460/heroku_1fbr8gq4`;

    MongoClient.connect(uri, (error: any, client: any) => {
      if (error) {
        throw error;
      }

      const db = client.db('heroku_1fbr8gq4');
      const haushaltsplan = db.collection('haushaltsplan');
      console.log(haushaltsplan);
    });
  }

}

export default Api;
