"use client"
import { userWithoutPassword } from "@/types/global";

export default (user: userWithoutPassword) => {
  const { firstName, lastName } = user;
  return firstName[0] + lastName[0];
};
