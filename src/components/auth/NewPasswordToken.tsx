import { validateToken } from "@/api/AuthAPI";
import { ConfirmToken } from "@/types/index";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type NewPasswordTokenProps = {
  token: ConfirmToken["token"];
  setToken: React.Dispatch<React.SetStateAction<string>>;

  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewPasswordToken({
  token,
  setToken,
  setIsValidToken,
}: NewPasswordTokenProps) {
  const { mutate } = useMutation({
    mutationFn: validateToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      setIsValidToken(true);
    },
  });

  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };
  const handleComplete = (token: ConfirmToken["token"]) => mutate({ token });

  return (
    <>
      <form className="space-y-8 p-10 bg-orange-50 mt-10 rounded-lg border-2 border-teal-300">
        <label className="font-normal text-2xl text-center block">
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
      <nav className="mt-10 flex flex-col space-y-4 w-max mx-auto">
        <Link
          to="/auth/forgot-password"
          className="text-center text-gray-500 font-normal hover:text-teal-500 transition-colors"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
