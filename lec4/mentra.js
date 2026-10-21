const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      '  <a href="/home">Home</a><a href="/profile">Profile</a><a href="setting">Setting</a><a href="/dashboard">Dashboard</a>',
    );
    res.end();
    return;
  } else if (req.url.toLowerCase() === "/home") {
    res.write(
      '  <a href="/home">Home</a><a href="/profile">Profile</a><a href="setting">Setting</a><a href="/dashboard">Dashboard</a>',
    );
    res.write("<h1>Home</h1>");
    res.end();
    return;
  } else if (req.url.toLowerCase() === "/profile") {
    res.write(
      '  <a href="/home">Home</a><a href="/profile">Profile</a><a href="setting">Setting</a><a href="/dashboard">Dashboard</a>',
    );
    res.write("<h1>Profile</h1>");
    res.end();
    return;
  } else if (req.url.toLowerCase() === "/setting") {
    res.write(
      '  <a href="/home">Home</a><a href="/profile">Profile</a><a href="setting">Setting</a><a href="/dashboard">Dashboard</a>',
    );
    res.write("<h1>Setting</h1>");
    res.end();
    return;
  } else {
    res.write(
      '  <a href="/home">Home</a><a href="/profile">Profile</a><a href="setting">Setting</a><a href="/dashboard">Dashboard</a>',
    );
    res.write("<h1>Dashboard</h1>");
    res.end();
    return;
  }
});

server.listen(3000, console.log("Server is Listning"));
