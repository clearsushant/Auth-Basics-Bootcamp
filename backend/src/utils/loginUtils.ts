import bcrypt from "bcrypt";
import { users, User } from "../data/users";

export const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const findUser = (username: string): User | undefined => {
  return users.find((user) => user.username === username);
};
