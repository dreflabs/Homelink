import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(1, { message: "Password wajib diisi." }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter."),
  email: z.string().email("Format email tidak valid."),
  phone: z.string().regex(/^(\+62|0)[0-9]{9,13}$/, "Format nomor telepon tidak valid."),
  role: z.enum(["BUYER", "OWNER", "SURVEYOR"]),
  password: z.string()
    .min(8, "Password minimal 8 karakter.")
    .regex(/[A-Z]/, "Harus mengandung minimal 1 huruf besar.")
    .regex(/[0-9]/, "Harus mengandung minimal 1 angka.")
    .refine(pw => !["password123", "12345678"].includes(pw.toLowerCase()), "Password terlalu umum, gunakan kombinasi yang lebih unik."),
  confirmPassword: z.string(),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "Anda harus menyetujui Syarat & Ketentuan",
  }),
}).refine(d => d.password === d.confirmPassword, {
  message: "Konfirmasi password tidak cocok.",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
