type User = {
  username: string;
  role: string;
};

export const getUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = (): void => {
  localStorage.removeItem("user");
};

export const isLoggedIn = (): boolean => {
  return getUser() !== null;
};
