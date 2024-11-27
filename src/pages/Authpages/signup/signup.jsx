import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { signUpSchema } from '@/lib/validators/AuthPages';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import PasswordField from '@/components/ui/input-password';
import EyeIcon from '@/assets/icons/eye-icon.svg';
import HideEyeIcon from '@/assets/icons/eye-hide-icon.svg';

function SignUp() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = values => {
    console.log(values);
    toast.success('OTP sent successfully');
    navigate('/verify-otp');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col justify-around"
      >
        <div className="w-full">
          <h3 className="text-5xl mt-auto mb-2 font-jost">Register Account</h3>
        </div>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
        <Button type="submit" size="lg" variant="default">
          Submit
        </Button>
        <p className="text-center mb-0 text-[#9C9C9C]">
          Already have an account?{' '}
          <Link to="/" className="text-primary">
            Sign In
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default SignUp;
