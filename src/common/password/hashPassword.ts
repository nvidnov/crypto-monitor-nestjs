import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;
const PEPPER = process.env.PEPPER_SECRET; // Хранится отдельно от базы

// Хеширование пароля
export async function hashPassword(password: string) {
  const peppered = password + PEPPER;
  return await bcrypt.hash(peppered, SALT_ROUNDS);
}

// Проверка пароля
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const peppered = password + PEPPER;

  return await bcrypt.compare(peppered, hash);
}
