import {
  POSTGRES_DATA_SOURCE,
  PostgresDataSource,
} from "../data-source/PostgresDatasource";
import User from "@domain/user/user.entity";
import UserRepository from "@domain/user/user.repository";
import { UserEntitySchema } from "../schemas/user.schema";
import { Inject } from "@tsed/di";

export default class UserPgRepository implements UserRepository {
  private repository;

  constructor(
    @Inject(POSTGRES_DATA_SOURCE)
    dataSource: typeof PostgresDataSource
  ) {
    this.repository = dataSource.getRepository<User>(UserEntitySchema);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }
  findAll(): Promise<User[]> {
    return this.repository.find();
  }
  findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }
}
