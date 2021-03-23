import crypto from "crypto";
import multer, { DiskStorageOptions, FileFilterCallback } from "multer";
import path from "path";

const uploadFolder = path.resolve(__dirname, "tmp", "uploads");

export default {
  dest: uploadFolder,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, undefined);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
  limits: {
    filesize: 2 * 1024 * 1024,
  },
  filefilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const allowedMimes = [
      "images/jpeg",
      "images/png",
      "images/gif",
      "images/pjpeg",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid Filetype."));
    }
  },
} as DiskStorageOptions;
