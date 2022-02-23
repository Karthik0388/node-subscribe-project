const fs = require("fs");
const http = require("http");
const nodemailer = require("nodemailer");
const { parse } = require("querystring");

http
  .createServer((req, res) => {
    if (req.method === "POST") {
      let urlencoded = "application/x-www-form-urlencoded";
      if (req.headers["content-type"] === urlencoded) {
        let body = "";
        //?Sending the data
        req.on("data", chunk => {
          body += chunk;
        });
        req.on("end", _ => {
          let { email } = parse(body);
          //?Creating a transporter to send email
          let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "rkkarthi43@gmail.com",
              pass: "Karthi143",
            },
          });
          let option = {
            from: "rkkarthi43@gmail.com",
            to: `${email}`,
            subject: "Node class in TestYantra",
            html: `<h1>Welcome to Testyantra</h1>
                    <p>Your are successfully subscribed to testyantra</p>
                    `,
            };
            // ?send Mail
          transport.sendMail(option, err => {
            if (err) throw err;
            console.log(`successfull email sent to ${email}`);
            res.end(
              `<h1 style='color:green'>Thank you for subscription ${email}</h1>`
            );
          });
        });
      } else {
        res.end(null);
      }
    } else {
        //?GET method loads here
      if (req.url === "" || req.url === "/") {
        res.writeHead(200, "ok", { "content-type": "text/html" });
        fs.createReadStream("./index.html", "utf-8").pipe(res);
      } else if (req.url === "/style.css") {
        res.writeHead(200, "ok", { "content-type": "text/css" });
        fs.createReadStream("./style.css", "utf-8").pipe(res);
      } else {
        res.writeHead(404, "page not found", { "content-type": "text/html" });
      }
    }
  })
  .listen(5000, err => {
    if (err) throw err;
    console.log("server is running");
  });
