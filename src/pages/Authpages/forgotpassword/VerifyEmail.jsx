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
import { useForm } from 'react-hook-form';
import { verfiyEmailSchema } from '@/lib/validators/AuthPages';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { forgotPasswordVerifyEmail } from '@/services/auth';

function VerifyEmail() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(verfiyEmailSchema),
    defaultValues: {
      mobile: '',
    },
  });
  async function onSubmit(values) {
    setLoading(true);
    await forgotPasswordVerifyEmail(values, navigate);
    setLoading(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col justify-between"
      >
        <div className="w-full grid grid-cols-1 gap-10 mb-10">
          <h3 className="text-5xl mb-2 font-jost">Forgot Password</h3>

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Mobile Number" {...field} />
                </FormControl>
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
            Send OTP
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default VerifyEmail;
