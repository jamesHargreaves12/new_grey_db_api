var location = "35.177.160.3"

module.exports = {  
  db: {
      production: "mongodb://"+location+":27017/test -u testNext -p pass",
      development: "mongodb://"+location+":27017/  -u testNext -p pass",
  }
};
