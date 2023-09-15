import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDialog } from "~/components/Commons";
import type { BeforeInstallPromptEvent } from "./Android.types";

export const usePWAInstallPrompt = () => {
  const { t } = useTranslation("common");

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isAppInstalled, setIsAppInstalled] = useState<boolean>(false);

  const { toast } = useDialog();

  useEffect(() => {
    const appInstalledStatus = localStorage.getItem("appInstalled");

    if (appInstalledStatus === "true") {
      setIsAppInstalled(true);
      return;
    }

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();

      setDeferredPrompt(e as BeforeInstallPromptEvent);
    });

    window.addEventListener("appinstalled", () => {
      localStorage.setItem("appInstalled", "true");
      setIsAppInstalled(true);
    });
  }, []);

  const promptToInstall = () => {
    if (isAppInstalled) return;

    if (!deferredPrompt) {
      toast({
        type: "warning",
        message: t("이미 설치되어 있거나 설치할 수 없는 환경입니다")
      });
      return;
    }

    deferredPrompt.prompt();
  };

  return { promptToInstall, isAppInstalled };
};
