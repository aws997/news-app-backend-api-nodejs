
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    }
    // ,filename: (req, file, cb) => {
    //   cb(null,Date.now() + file.originalname);
    // }
  },
    );

    const upload = multer({ storage: storage });
// app.post("/api/upload",
// upload.single("file"),
// (req, res) => {
// console.log(req.body)
// res.status(200).json("File has been uploaded");


// });

module.exports=upload.single('file')