import bcrypt from "bcryptjs";

export const hash = async (str: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashed = await bcrypt.hash(str, salt);
  return hashed;
};

export const compare = async (str: string, hash: string) => {
  const isValid = await bcrypt.compare(str, hash);
  return isValid;
};

