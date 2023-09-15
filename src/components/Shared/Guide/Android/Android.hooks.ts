import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useState } from "react";
import { useDialog, useModal } from "~/components/Commons";
import {
  ANDROID_GUIDE,
  APP_INSTALLED,
  BEFORE_INSTALL_PROMPT,
  DISMISSED_INSTALL_PROMPT
} from "./Android.constants";
import type { BeforeInstallPromptEvent } from "./Android.types";

export const usePWAInstallPrompt = () => {
  const { t } = useTranslation("common");

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(true);

  const { toast } = useDialog();
  const { unmount } = useModal();

  const checkAppStatus = useCallback(() => {
    const appInstalledStatus = sessionStorage.getItem(APP_INSTALLED);
    const dismissedInstallPrompt = sessionStorage.getItem(DISMISSED_INSTALL_PROMPT);

    if (appInstalledStatus === "true" || dismissedInstallPrompt === "true") {
      setShowPrompt(false);
      return;
    }

    setShowPrompt(true);
  }, []);

  const beforeInstallPromptEvent = (e: Event) => {
    e.preventDefault();
    setDeferredPrompt(e as BeforeInstallPromptEvent);
  };

  const appInstalledEvent = useCallback(() => {
    sessionStorage.setItem(APP_INSTALLED, "true");
    checkAppStatus();
  }, [checkAppStatus]);

  useEffect(() => {
    checkAppStatus();

    window.addEventListener(BEFORE_INSTALL_PROMPT, beforeInstallPromptEvent);

    window.addEventListener(APP_INSTALLED, appInstalledEvent);

    return () => {
      window.removeEventListener(BEFORE_INSTALL_PROMPT, beforeInstallPromptEvent);
      window.removeEventListener(APP_INSTALLED, appInstalledEvent);
    };
  }, [appInstalledEvent, checkAppStatus]);

  const dismissPrompt = () => setDeferredPrompt(null);

  const dismissAndAvoidFuturePrompts = () => {
    sessionStorage.setItem(DISMISSED_INSTALL_PROMPT, "true");

    checkAppStatus();

    dismissPrompt();

    unmount(ANDROID_GUIDE);
  };

  const promptToInstall = () => {
    if (!deferredPrompt) {
      toast({
        type: "error",
        message: t("이미 설치되어 있거나 설치할 수 없는 환경입니다")
      });
      return;
    }

    deferredPrompt.prompt();
  };

  return { promptToInstall, dismissAndAvoidFuturePrompts, showPrompt };
};
