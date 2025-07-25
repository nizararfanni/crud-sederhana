import multer from "multer";

//simpan foto ke foldre images public
const storage = multer.diskStorage({
  destination: (req, file, callbaack) => {
    callbaack(null, "public/images");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

//filter hanya format foto yg di ijinkan
const fileFilter = (req, file, callback) => {
  //filter img
  const alowedImg = ["images/jpg", "image/png", "image/jpeg"];
  //cek apakah type nya gambar
  if (alowedImg.includes(file.memotype)) {
    callback(null, true);
  } else {
    callback(new Error("hanya gambar yang di ijinkan"), false);
  }
};

//export multer dan batasi limit
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1000 * 1000,
  },
  fileFilter,
});

export default upload;
