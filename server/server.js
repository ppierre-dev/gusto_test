const PORT = 4000

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const extensions = /(\.jpg|\.jpeg|\.png|\.gif|\.svg)$/i

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(fileUpload());
app.use("/public", express.static("public"));

app.post('/upload', (req, res) => {
    if (!req.files) return res.status(500).send({ msg: "file is not found" })

    const file = req.files.file
    if (extensions.exec(file.name)) { // vérifie l'extension du fichier pour vérifier si c'est une image
        file.mv(`${__dirname}/public/${file.name}`, function (err) {
            if (err) {
                console.log(err)
                return res.status(500).send({ msg: "Error occured" });
            }
            
            return res.send({name: file.name, path: `/${file.name}`});
        });
    } else { // Pas une image ou alors pas le bon type
        res.status(500).send({ msg: "Wrong type" })
    }
})

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
})
