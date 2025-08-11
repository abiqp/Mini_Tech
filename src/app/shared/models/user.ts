// Modelo para el usuario y la sesión de autenticación.
export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Datos de demostración para el login
export const DEMO_USER: User = {
  id: "u-demo-1",
  name: "Usuario Demo",
  email: "demo@shop.com",
  role: "user",
};

export const DEMO_CREDENTIALS = {
  email: "demo@shop.com",
  password: "Demo123!",
};