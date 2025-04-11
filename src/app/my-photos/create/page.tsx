import CreatePhotoCardForm from "@/components/my-page/my-photo/CreatePhotoCardForm";
// import { cookies } from "next/headers";
export default async function Page() {
  // const cookieStore = await cookies();
  // const cookie = cookieStore.get("token")?.value || "";

  return <CreatePhotoCardForm />;
}
