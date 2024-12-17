"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  if (localStorage.getItem("token")) {
    router.push("/submit-car");
  } else {
    router.push("/login");
  }
  return <></>;
}
