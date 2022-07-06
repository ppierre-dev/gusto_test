const PORT = 4000

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(fileUpload());
app.use("/public", express.static("public"));

app.post('/upload', (req, res) => {
    if (!req.files) return res.status(500).send({ msg: "file is not found" })

    const file = req.files.file
    file.mv(`${__dirname}/public/${file.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        
        return res.send({name: file.name, path: `/${file.name}`});
    });
})

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
})
