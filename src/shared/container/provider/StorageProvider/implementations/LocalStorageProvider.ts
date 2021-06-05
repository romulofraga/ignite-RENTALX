import fs from "fs";
import { resolve } from "path";

import uploadConfig from "@config/uploads.ts/upload.config";

import IStorageProvider from "../IStorageProvider";

export default class LocalStorageProvider implements IStorageProvider {
  public async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.dest, file),
      resolve(`${uploadConfig.dest}/${folder}`, file)
    );

    return file;
  }
  public async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${uploadConfig.dest}/${folder}`, file);
    console.log(filename);
    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }
    await fs.promises.unlink(filename);
  }
}
