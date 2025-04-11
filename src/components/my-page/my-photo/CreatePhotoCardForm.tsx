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
import { useSnackbarStore } from "@/store/useSnackbarStore";
import { axiosClient } from "@/services/axiosClient/axiosClient";
import { useQueryClient } from "@tanstack/react-query";
import { photoCardKeys, userKeys } from "@/utils/queryKeys";

export default function CreatePhotoCardForm() {
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
      name: "",
      grade: "",
      genre: "",
      price: "",
      stock: Grade.COMMON,
      image: undefined,
      description: "",
    },
  });

  const [isPending, setIsPending] = useState(false);
  const grade = watch("grade");
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();

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
    formData.append("name", data.name);
    formData.append("grade", data.grade);
    formData.append("genre", data.genre);
    formData.append("stock", data.stock.toString());
    formData.append("price", data.price);
    formData.append("description", data.description);
    if (data.image) {
      formData.append("image", data.image); // File 객체 추가
    }

    try {
      const response = await axiosClient.post(`/photocards`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const { userPhotoCardId } = response.data;
      queryClient.invalidateQueries({ queryKey: photoCardKeys.all });
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      openSnackbar(
        "SUCCESS",
        `[${data.grade} | ${data.name}] 포토카드 생성에 성공했습니다.`,
        "포토카드 생성"
      );
      router.push(`/my-photos/${userPhotoCardId}`);
    } catch (error) {
      openSnackbar(
        "ERROR",
        `[${data.grade} | ${data.name}] 포토카드 생성에 실패했습니다.`,
        "포토카드 생성"
      );
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-form">
      <Input name="name" control={control} />
      <Dropdown name="grade" control={control} />
      <Dropdown name="genre" control={control} />
      <Input name="price" control={control} />
      <Input name="stock" control={control} hidden readOnly />
      <Upload name="image" control={control} />
      <Textarea name="description" control={control} />

      <ThinBtn type="submit" disabled={!isValid || isPending} className="mt-[10px]">
        {isPending ? "생성 중..." : "생성하기"}
      </ThinBtn>
    </form>
  );
}
