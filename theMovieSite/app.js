var mysql = require("mysql");

var baglanti = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lotr_123"
});

baglanti.on('error', function(err) {
    console.log("[mysql error]",err);
  });