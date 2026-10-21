const add_function = require("./add");

function reqhandler(req, res) {
  const inputdata = [];
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      '<h1>Welcome to Calculator</h1><br/><a href="/calculator">Go To Calculator</a>',
    );
    res.end();
    return;
  } else if (req.url === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(' <form action="/result" method="POST">');
    res.write(
      '<input type="text" name="first" id="first" placeholder="First Number">' +
        "<br>" +
        '<input type="text" name="second" id="second" placeholder="Second Number"><br>' +
        '<input type="submit" value="Add">',
    );
    res.write(" </form>");
    res.end();
    return;
  } else if (req.url === "/result") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Result</h1><br/>");
    req.on("data", (chunk) => {
      inputdata.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(inputdata).toString();
      const params = new URLSearchParams(parsedBody);

      const firstNumber = Number(params.get("first"));
      const secondNumber = Number(params.get("second"));
      let sum = add_function(firstNumber, secondNumber);
      res.write(`<p>${sum}</p>`);
      res.write('<br/><a href="/calculator">Calculate Again</a>');
      res.end();
    });
    return;
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write(
      '<html><body><h1 style="color:red">This is default response from the server</h1></body></html>',
    );
    res.end();
  }
}

module.exports = reqhandler;
