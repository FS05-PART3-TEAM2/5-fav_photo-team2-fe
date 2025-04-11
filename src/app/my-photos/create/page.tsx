import CreatePhotoCardForm from "@/components/my-page/my-photo/CreatePhotoCardForm";

import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.toString() ?? "";

  return (
    <>
      <CreatePhotoCardForm cookie={token} />
    </>
  );
}
