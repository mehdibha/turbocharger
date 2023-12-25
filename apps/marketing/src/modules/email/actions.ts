"use server";

import { prisma } from "@turbocharger/database";

interface FormData {
  email: string;
}

export const collectEmail = async (formData: FormData) => {
  const { email } = formData;
  try {
    await prisma.email.create({
      data: {
        email,
      },
    });
    return { success: true };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
