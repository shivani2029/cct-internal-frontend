import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { setPasswordSchema } from '@/lib/validators/AuthPages';
import { useNavigate } from 'react-router-dom';
import PasswordField from '@/components/ui/input-password';
import EyeIcon from '@/assets/icons/eye-icon.svg';
import HideEyeIcon from '@/assets/icons/eye-hide-icon.svg';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { forgotPassword } from '@/services/auth';

function SetPassword() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const token = location?.state?.token;

  const form = useForm({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    await forgotPassword(values, navigate, token);
    setLoading(false);
  }
  useEffect(() => {
    if (!token) {
      navigate('/verify-otp');
    }
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col justify-evenly"
      >
        <div className="w-full grid grid-cols-1 gap-6 mb-10">
          <h3 className="text-5xl mb-4 font-jost">Change Password</h3>
          <PasswordField />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Enter your Confirm Password"
                    {...field}
                    icon={
                      <button
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        type="button"
                        className="cursor-pointer"
                      >
                        <img
                          src={!isPasswordVisible ? EyeIcon : HideEyeIcon}
                          alt="eyeIcon"
                          width={20}
                          height={20}
                        />
                      </button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-10">
          <Button
            variant="default"
            size="lg"
            type="submit"
            className="w-full"
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SetPassword;
