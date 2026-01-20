import { Role } from "../types/roles";
import { AuthRequest } from "../middleware/auth";

export const isAdmin = (req: AuthRequest): boolean => {
  return req.user?.role === Role.ADMIN;
};

export const isUser = (req: AuthRequest): boolean => {
  return req.user?.role === Role.USER;
};
