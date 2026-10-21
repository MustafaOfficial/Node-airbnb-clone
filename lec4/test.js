console.log("this is first node js program");

const fs = require("fs");
fs.writeFile("record.txt", "This is test writing file", (err) => {
  if (err) console.Console.log(err);
  else console.log("File written successfully");
});
