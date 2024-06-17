import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { ConfirmToken } from "@/types/index";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const navigate = useNavigate();
  const [token, setToken] = useState<ConfirmToken["token"]>("");

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/auth/login");
    },
  });

  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };

  const handleComplete = (token: ConfirmToken["token"]) => mutate({ token });

  return (
    <>
      <h1 className="text-5xl font-black text-neutral-500">
        Confirma tu Cuenta
      </h1>
      <p className="text-2xl font-light text-neutral-500 mt-5">
        Ingresa el código que recibiste {""}
        <span className=" text-teal-500 font-bold"> por e-mail</span>
      </p>
      <form className="space-y-8 p-10 bg-orange-50 mt-10 rounded-lg border-2 border-teal-300">
        <label className="font-normal text-neutral-600 text-2xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-2 border-teal-400 placeholder-orange-50 bg-transparent" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-2 border-teal-400 placeholder-orange-50 bg-transparent" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-2 border-teal-400 placeholder-orange-50 bg-transparent" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-2 border-teal-400 placeholder-orange-50 bg-transparent" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-2 border-teal-400 placeholder-orange-50 bg-transparent" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-2 border-teal-400 placeholder-orange-50 bg-transparent" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/request-code"
          className="text-center text-gray-500 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
