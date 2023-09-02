import { useDialog } from "~/components/Commons";
import type { PROVIDER_LIST } from "~/constants";
import { useSignInWithOAuthMutate } from "~/states/server";
import type { OneOf } from "~/types";
import { Button } from "../Button/Button.styles";

export interface SocialLoginProps {
  provider: OneOf<typeof PROVIDER_LIST>;
}

export const SocialLoginButton = ({ provider }: SocialLoginProps) => {
  const { toast } = useDialog();

  const { mutate: signInWithOAuthMutate } = useSignInWithOAuthMutate({
    onError: () => toast({ type: "error", message: "로그인에 실패하였습니다." })
  });

  const handleOAuthLogin = () => signInWithOAuthMutate(provider);

  return <Button onClick={handleOAuthLogin}>Github 계정으로 로그인</Button>;
};
