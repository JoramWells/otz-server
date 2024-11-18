import bcrypt from "bcrypt";

export async function generateDefaultHashedPassword(password: string): Promise<string> {
//   const password = "12345678";
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return passwordHash;
}
