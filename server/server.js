const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const { parse } = require("csv-parse");
const Port = 9000;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/getDashboardData", async (req, res) => {
  let data = [];
  let lineNumber = 0;
  let responseSent = false;  

  fs.createReadStream("./dataset.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      if (!responseSent) {  
        data.push(row);
        lineNumber++;
        if (lineNumber >= 5000 ) {
          this.emit("end");
        }
      }
    })
    .on("end", function () {
      console.log("finished");
      if (!responseSent) {  
        responseSent = true;
        res.status(200).json(data);
      }
    })
    .on("error", function (error) {
      console.log(error.message);
      if (!responseSent) {  
        responseSent = true;
        res.status(500).json({ error: error.message });
      }
    });
});

app.post("/form", async (req, res) => {

}



app.listen(Port, () => console.log(`SERVER IS RUNNING ON PORT ${Port}`));
