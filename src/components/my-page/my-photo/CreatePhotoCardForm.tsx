"use client";

import Dropdown from "@/components/common/input/Dropdown";
import Input from "@/components/common/input/Input";
import Upload from "@/components/common/input/Upload";
import Textarea from "@/components/common/input/Textarea";
import ThinBtn from "@/components/common/button/ThinBtn";
import CreatePhotoCardAction from "@/lib/actions/create-photo-card.action";
import { CreatePhotoCardFormSchema, createPhotoCardSchema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Grade } from "@/types/input.types";
import { useRouter } from "next/navigation";

export default function CreatePhotoCardForm() {
  const {
    control,
    watch,
    setValue,
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
  const [state, formAction, isPending] = useActionState(CreatePhotoCardAction, null);
  const grade = watch("grade");
  const router = useRouter();

  useEffect(() => {
    if (grade && grade in Grade) {
      setValue("stock", Grade[grade as keyof typeof Grade], {
        shouldValidate: true, // 즉시 유효성 검사 실행 (isValid에 영향)
      });
    }
  }, [grade, setValue]);

  useEffect(() => {
    if (!state) return; // 초기 state가 null인 경우 처리

    alert(state.message); // 상태 메시지 알림

    // 상태가 true인 경우에만 새로 만들 사진 카드 페이지로 이동
    if (state.status) {
      router.push(`/my-photos/${state.userPhotoCardId}`);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="w-form">
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
