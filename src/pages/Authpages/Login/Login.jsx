import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
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
import { emailSchema, usernameSchema } from '@/lib/validators/AuthPages';
import { useState } from 'react';
import { login } from '../../../services/auth';
import { useAppDispatch } from '../../../store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PasswordField from '@/components/ui/input-password';
function Login() {
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('account');
  const schema = selectedTab === 'account' ? emailSchema : usernameSchema;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      userName: '',
      password: '',
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      await login(values, navigate, dispatch);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-between h-full"
      >
        <div className="w-full grid grid-cols-1 gap-3">
          <div className="w-full mb-5">
            <h3 className="text-4xl mb-2 font-medium">Welcome!</h3>
            <p className="text-[#9C9C9C] text-lg font-light">
              Enter your credential to access your account
            </p>
          </div>
          <Tabs
            defaultValue="account"
            className="w-[400px]"
            onValueChange={value => setSelectedTab(value)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Login with Email</TabsTrigger>
              <TabsTrigger value="password">Login with UserName</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="lg:mt-9">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your Email address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your Email Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            <TabsContent value="password">
              <div className="grid grid-cols-1 gap-2 lg:mt-9">
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <PasswordField />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="mt-6">
          <Button
            variant="default"
            size="lg"
            type="submit"
            className="w-full"
            loading={loading}
          >
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default Login;
