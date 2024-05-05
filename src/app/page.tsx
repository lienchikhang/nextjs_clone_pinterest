
'use client'
import { useRouter } from "next/navigation";
import Loading from "./components/Loading";
import { useContext, useEffect } from "react";
import { Context } from "@/redux/context";


export default function Home() {

  useRouter().push('/home');
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    dispatch({
      type: 'toggleLoading',
      payload: true,
    });

    return () => {
      dispatch({
        type: 'toggleLoading',
        payload: false,
      });
    }
  }, [])

  return (
    <Loading />
  );
}
