"use server";

import axios, { AxiosError } from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default async function CreatePhotoCardAction(_: unknown, formData: FormData) {
  const photoCardName = formData.get("photoCardName") as string;
  const grade = formData.get("grade") as string;
  const genre = formData.get("genre") as string;
  const stock = formData.get("stock") as string;
  const price = formData.get("price") as string;
  const photoCardContent = formData.get("photoCardContent") as string;
  const image = formData.get("image") as File;

  if (!photoCardName || !grade || !genre || !stock || !price || !photoCardContent || !image) {
    return {
      status: false,
      message: "모든 필드를 입력해주세요.",
    };
  }

  // ✅ FormData 객체 구성
  const axiosForm = new FormData();
  axiosForm.append("photoCardName", photoCardName);
  axiosForm.append("grade", grade);
  axiosForm.append("genre", genre);
  axiosForm.append("stock", stock);
  axiosForm.append("price", price);
  axiosForm.append("photoCardContent", photoCardContent);
  axiosForm.append("image", image); // ✔️ 파일 포함

  try {
    const response = await axios.post(`${API_URL}/photocards`, axiosForm, {
      headers: {
        "Content-Type": "multipart/form-data", // 필수!
      },
    });
    const { message, userPhotoCardId } = response.data;
    return {
      status: true,
      message: message,
      userPhotoCardId,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: string }>;
    const message = axiosError.response?.data?.error || "카드 생성 실패";
    return { status: false, message, userPhotoCardId: null };
  }
}
