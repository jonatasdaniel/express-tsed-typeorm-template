import User from "@domain/user/user.entity";
import { EntitySchema } from "typeorm";

export const UserEntitySchema = new EntitySchema<User>({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      generated: "uuid",
      type: "uuid",
    },
    email: {
      type: "varchar",
      nullable: false,
    },
    encryptedPassword: {
      name: "encrypted_password",
      type: "varchar",
      nullable: false,
    },
  },
  uniques: [
    {
      name: "unique_email",
      columns: ["email"],
    },
  ],
});
