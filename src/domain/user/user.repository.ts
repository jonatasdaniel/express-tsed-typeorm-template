import BaseRepository from "@domain/shared/base.repository";
import User from "./user.entity";

export default interface UserRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
