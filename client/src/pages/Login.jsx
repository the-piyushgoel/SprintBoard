import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth.js';
import { ROUTES } from '../utils/constants.js';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card.jsx';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await login(data);
      toast.success(response?.message || 'Welcome back!');
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      toast.error(error?.message || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4 relative font-sans">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary-200/20 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent-200/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-black text-base shadow-sm">
            S
          </div>
          <span className="text-xl font-bold tracking-tight text-surface-900">SprintBoard</span>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>Enter your workspace credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                disabled={isSubmitting}
                {...register('email')}
              />

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-surface-700 select-none">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => toast('Forgot password feature coming in Phase 2!')}
                    className="text-xs font-semibold text-primary-600 hover:text-primary-700 outline-none cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                  disabled={isSubmitting}
                  {...register('password')}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                fullWidth
                className="mt-2"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-surface-500">
              New to SprintBoard?{' '}
              <Link
                to={ROUTES.REGISTER}
                className="font-semibold text-primary-600 hover:text-primary-700 underline outline-none"
              >
                Create an account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
