const fs = require("fs");

function requestListner(req, res) {
  console.log(req.url, req.method);
  //   process.exit();

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      '<html><body><h1 style="color:red">Welcome to home</h1></body></html>',
    );
    res.write('<form action=\"/submit-details\" method=\"POST\">');
    res.write(
      '<input type="text" name="Username" id="Username" placeholder="Username"><br>' +
        '<label for="male">Male</label>' +
        '<input type="radio" id="male" name="gender" value="male">' +
        '<label for="female">Female</label>' +
        '<input type="radio" id="female" name="gender" value="female">' +
        "<br>" +
        '<input type="submit" value="SUBMIT">',
    );

    res.write("</form>");
    res.end();
  } else if (req.url === "/submit-details" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      // console.log(chunk);  // I am not getting this printd in the terminal
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const params = new URLSearchParams(parsedBody);
      const jsonObject = {};
      for (const [key, val] of params.entries()) {
        jsonObject[key] = val;
      }
      const jsonString = JSON.stringify(jsonObject);
      console.log(parsedBody);
      console.log(jsonString);
      fs.writeFileSync("record.txt", jsonString);

      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end(); // <-- Ends the response and triggers the redirect
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write(
      '<html><body><h1 style="color:red">This is default response from the server</h1></body></html>',
    );
    res.end();
  }
}

module.exports = requestListner;
