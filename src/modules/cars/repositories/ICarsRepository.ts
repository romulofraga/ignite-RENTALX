import ICreateCarDTO from "../dtos/ICreateCarDTO";
import Car from "../infra/typeorm/entities/Car";

export default interface ICarsRepository {
  create({
    name,
    description,
    daily_rate,
    fine_amount,
    license_plate,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findById(car_id: string): Promise<Car>;
  findAllAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]>;
  updateAvailable(car_id: string, available: boolean): Promise<void>;
}
