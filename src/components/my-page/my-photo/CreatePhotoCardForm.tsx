"use client";

import Dropdown from "@/components/common/input/Dropdown";
import Input from "@/components/common/input/Input";
import Upload from "@/components/common/input/Upload";
import Textarea from "@/components/common/input/Textarea";
import ThinBtn from "@/components/common/button/ThinBtn";
import { CreatePhotoCardFormSchema, createPhotoCardSchema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Grade } from "@/types/input.types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

export default function CreatePhotoCardForm({ cookie }: { cookie: string | undefined }) {
  console.log("cookie: ", JSON.stringify(cookie));
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreatePhotoCardFormSchema>({
    resolver: zodResolver(createPhotoCardSchema),
    mode: "onChange",
    defaultValues: {
      photoCardName: "",
      grade: "",
      genre: "",
      price: "",
      stock: Grade.COMMON,
      image: undefined,
      photoCardContent: "",
    },
  });

  const [isPending, setIsPending] = useState(false);
  const grade = watch("grade");
  const router = useRouter();

  useEffect(() => {
    if (grade && grade in Grade) {
      setValue("stock", Grade[grade as keyof typeof Grade], {
        shouldValidate: true,
      });
    }
  }, [grade, setValue]);

  const onSubmit = async (data: CreatePhotoCardFormSchema) => {
    setIsPending(true);

    // FormData 구성
    const formData = new FormData();
    formData.append("photoCardName", data.photoCardName);
    formData.append("grade", data.grade);
    formData.append("genre", data.genre);
    formData.append("stock", data.stock.toString());
    formData.append("price", data.price);
    formData.append("photoCardContent", data.photoCardContent);
    if (data.image) {
      formData.append("image", data.image); // File 객체 추가
    }

    try {
      const response = await axios.post(
        `https://five-fav-photo-team2-be-1zgs.onrender.com/api/photocards`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Cookie: cookie,
          },
        }
      );

      const { message, userPhotoCardId } = response.data;
      alert(message);
      router.push(`/my-photos/${userPhotoCardId}`);
    } catch (error) {
      const axiosError = error as AxiosError<{ error?: string }>;
      const message = axiosError.response?.data?.error || "카드 생성 실패";
      alert(message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-form">
      <Input name="photoCardName" control={control} />
      <Dropdown name="grade" control={control} />
      <Dropdown name="genre" control={control} />
      <Input name="price" control={control} />
      <Input name="stock" control={control} hidden readOnly />
      <Upload name="image" control={control} />
      <Textarea name="photoCardContent" control={control} />

      <ThinBtn type="submit" disabled={!isValid || isPending} className="mt-[10px]">
        {isPending ? "생성 중..." : "생성하기"}
      </ThinBtn>
    </form>
  );
}
