import crypto from "crypto";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const uploadFolder = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "tmp",
  "uploads"
);

export default {
  dest: uploadFolder,
  multer: {
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
      fileSize: 2 * 1024 * 1024,
    },
    filefilter: (
      req: Request,
      file: Express.Multer.File,
      callback: FileFilterCallback
    ): void => {
      const allowedMimes = [
        "images/jpeg",
        "images/png",
        "images/gif",
        "images/pjpeg",
      ];

      if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new Error("Invalid Filetype."));
      }
    },
  },
};
