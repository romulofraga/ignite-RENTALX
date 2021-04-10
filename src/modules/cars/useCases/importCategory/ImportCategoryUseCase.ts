import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import ICategoryRepository from "../../repositories/ICategoryRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export default class ImportCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  public loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => reject(err));
    });
  }

  public async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategory(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const existCategory = this.categoryRepository.findByName(name);

      if (!existCategory) {
        this.categoryRepository.create({ name, description });
      }
    });
  }
}
