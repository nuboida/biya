import { BiyaButton } from "@/components/BiyaButton";
import { BiyaInput } from "@/components/BiyaInput";
import ForgotPasswordEmail from "@/modules/Auth/ForgotPasswordEmailBody";
import AuthLayout from "@/modules/layouts/AuthLayout/AuthLayout";

const PasswordEmailResetPage = () => {
  return (
    <AuthLayout>
      <ForgotPasswordEmail />
    </AuthLayout>
  )
}

export default PasswordEmailResetPage;
