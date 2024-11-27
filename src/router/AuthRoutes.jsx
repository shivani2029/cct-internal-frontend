import { lazy } from 'react';

const LoginPages = lazy(() => import('../pages/Authpages/Login/Login'));
const SignUpPages = lazy(() => import('../pages/Authpages/signup/signup'));
const ForgotPasswordPage = lazy(
  () => import('../pages/Authpages/forgotpassword/VerifyEmail'),
);
const SetPasswordPage = lazy(
  () => import('../pages/Authpages/forgotpassword/SetPassword'),
);
const VerifyOtpPage = lazy(
  () => import('../pages/Authpages/verifyOTP/VerifyOTP'),
);
export const AuthRoutes = [
  { index: true, path: '/*', element: <LoginPages /> },
  { path: '/sign-up', element: <SignUpPages /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/set-password', element: <SetPasswordPage /> },
  { path: '/verify-otp', element: <VerifyOtpPage /> },
];
