import { useTranslation } from "next-i18next";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { checkNameValidation } from "~/states/server/profile";
import { debounce } from "~/utils";
import { useWelcomeContext } from "../../index.page";

export const useName = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const { t } = useTranslation("welcome");

  const {
    welcomeForm: { setError, setValue, clearErrors, register, formState }
  } = useWelcomeContext();

  const validateNickName = debounce<({ target }: ChangeEvent<HTMLInputElement>) => void>(
    async ({ target: { value } }) => {
      let nickname = value;

      if (nickname.length > 16) {
        nickname = nickname.slice(0, 16);
        setValue("name", nickname, { shouldDirty: true });
      }

      if (!nickname) {
        setSuccessMessage("");
        setError("name", { type: "required" });
        return;
      }

      setValue("name", nickname, { shouldDirty: true });

      const isValid = await checkNameValidation(nickname);

      if (isValid) {
        setSuccessMessage(t("최고의 닉네임이에요"));
        clearErrors("name");
      } else {
        setSuccessMessage("");
        setError("name", { type: "validate", message: t("앗 누군가 사용 중인 닉네임이에요") });
      }
    },
    300
  );

  return {
    register,
    validateNickName,
    successMessage,
    errorMessage: formState.errors.name?.message
  };
};
