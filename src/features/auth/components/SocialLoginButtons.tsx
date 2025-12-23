import React from "react";
import SocialButton from "./SocialButton";

interface SocialLoginButtonsProps {
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
  onGithubLogin: () => void;
  isLoading: boolean;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGoogleLogin,
  onFacebookLogin,
  onGithubLogin,
  isLoading,
}) => {
  return (
    <div className="space-y-3">
      <SocialButton
        provider="google"
        onClick={onGoogleLogin}
        disabled={isLoading}
      />
      <SocialButton
        provider="facebook"
        onClick={onFacebookLogin}
        disabled={isLoading}
      />
      <SocialButton
        provider="github"
        onClick={onGithubLogin}
        disabled={isLoading}
      />
    </div>
  );
};

export default SocialLoginButtons;
