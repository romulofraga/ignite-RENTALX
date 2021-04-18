import fs from "fs";

import upload from "../config/uploads.ts/upload.config";

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(`${upload.dest}/${filename}`);
  } catch {
    return;
  }
  await fs.promises.unlink(`${upload.dest}/${filename}`);
};
