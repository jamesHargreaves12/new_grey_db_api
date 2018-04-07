var username = process.env.DBUSERNAME;
var password = process.env.DBPASSWORD;
var addr = process.env.MONGODB_ADDRESS;
module.exports = {  
  db: {
      production: "mongodb://" + username + ":" + password + "@" + addr + ":45218/new_grey_db_restapi_production",
      development: "mongodb://" + username + ":" + password + "@" + addr + ":27017/test",
      }
};


