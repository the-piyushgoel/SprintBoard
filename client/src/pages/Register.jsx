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

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const Register = () => {
  const { register: signup } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { name, email, password } = data;
      const response = await signup({ name, email, password });
      toast.success(response?.message || 'Account created successfully!');
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      toast.error(error?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4 relative font-sans">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-primary-200/20 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-accent-200/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-black text-base shadow-sm">
            S
          </div>
          <span className="text-xl font-bold tracking-tight text-surface-900">SprintBoard</span>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Create your account</CardTitle>
            <CardDescription>Get started with SprintBoard for free today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Input
                label="Full name"
                placeholder="John Doe"
                error={errors.name?.message}
                disabled={isSubmitting}
                {...register('name')}
              />

              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                disabled={isSubmitting}
                {...register('email')}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Minimum 8 characters"
                error={errors.password?.message}
                disabled={isSubmitting}
                helperText="Must contain uppercase, lowercase, and a number"
                {...register('password')}
              />

              <Input
                label="Confirm password"
                type="password"
                placeholder="Repeat password"
                error={errors.confirmPassword?.message}
                disabled={isSubmitting}
                {...register('confirmPassword')}
              />

              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                fullWidth
                className="mt-2"
              >
                Sign Up
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-surface-500">
              Already have an account?{' '}
              <Link
                to={ROUTES.LOGIN}
                className="font-semibold text-primary-600 hover:text-primary-700 underline outline-none"
              >
                Sign in instead
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
