
'use client'
import Image from "next/image";
import middleware from "./middleware";
import { useRouter } from "next/navigation";


export default function Home() {

  useRouter().push('/home');

  return (
    <div></div>
  );
}
