"use client"

import { University } from "lucide-react";
import { z } from "zod"

export const signUpSchema = z.object( {
 fullName: z.string().min(3),
 email: z.string().email(),
 universityId: z.coerce.number(),
 universityCard: z.string().nonempty('Hình ảnh thẻ sinh viên không được để trống!'),
    password: z.string().min(8),
});


export const signInSchema = z.object( {
 email: z.string().email(),
 password: z.string().min(8),
});