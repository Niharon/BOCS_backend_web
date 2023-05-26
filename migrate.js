// run syncDb here so that it can be run from the command line

const db = require("./config/db");
db.syncDb();