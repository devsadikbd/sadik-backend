process.chdir(__dirname);
process.env.NODE_ENV = process.env.NODE_ENV || "production";
process.argv = ["node", "keystone-next", process.env.KEYSTONE_MODE || "start"];

require("@keystone-next/keystone/bin/cli");
