import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { VerifyOtpSchema } from '@/lib/validators/AuthPages';
import { toast } from 'sonner';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { ResendOTP, verifyOTP } from '@/services/auth';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function VerifyOTP() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const form = useForm({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  async function handleResend() {
    try {
      const data = await ResendOTP();
      if (data.success) {
        toast.success('OTP sent successfully');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function onSubmit(values) {
    const data = {
      ...values,
      email: location?.state?.email,
    };
    try {
      setLoading(true);
      await verifyOTP(data);
      toast.success('Successfully Verified');
      window.location.href = '/';
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error('Error verifying OTP:', err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col justify-around"
      >
        <div className="w-full grid grid-cols-1 gap-10 mb-10">
          <h3 className="text-5xl mb-2 font-jost">Verification OTP</h3>

          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <InputOTP maxLength={5} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Enter the 4-digit code sent to your email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button
            variant="default"
            size="lg"
            type="submit"
            className="w-full"
            loading={loading}
          >
            Verify
          </Button>
          <p className="text-center mb-0 text-[#9C9C9C]">
            {'Don’t Receive code'}
            <Button
              variant="link"
              type="button"
              onClick={handleResend}
              className="text-primary pl-1"
            >
              Resend OTP
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}

export default VerifyOTP;
