const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const { parse } = require("csv-parse");
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Port = 9000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/getDashboardData', async (req, res) => {
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


// Endpoint to handle form submission
app.post('/predict', (req, res) => {
    const data = req.body; // Form data received from frontend

    // Create CSV writer
    const csvWriter = createCsvWriter({
        path: 'form_data.csv',
        header: Object.keys(data).map(key => ({ id: key, title: key }))
    });

    // Write form data to CSV file
    csvWriter.writeRecords([data])
        .then(() => {
            console.log('CSV file written successfully');
            res.sendStatus(200); // Send success response to frontend
        })
        .catch(error => {
            console.error('Error writing CSV file:', error);
            res.sendStatus(500); // Send error response to frontend
        });
});



app.listen(Port, () => console.log(`SERVER IS RUNNING ON PORT ${Port}`));
