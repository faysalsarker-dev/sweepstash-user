import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  Button,
  Typography,
  Input,
  IconButton,
  CircularProgress,
} from '@material-tailwind/react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuth from './../../hook/useAuth';
import { useMutation } from '@tanstack/react-query';
import useAxios from '../../hook/useAxios';

const Register = () => {
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [otpView, setOtpView] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpLoading, setOtpLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const axiosSecure = useAxios(); 
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  // Additional State for Resend Functionality
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [otpTimer, setOtpTimer] = useState(120);
  const [formData, setFormData] = useState(null);

  // Toggle Password Visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Mutation for user registration
  const { mutateAsync: registerUser } = useMutation({
    mutationFn: async () => {
      const { data: userResponse } = await axiosSecure.post(
        '/user/register',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (userResponse) {
        setUser(userResponse);
        setFormData(null);
        localStorage.setItem('user', JSON.stringify(userResponse));
        toast.success('Registration successful!');
        navigate('/');
      } else {
        throw new Error('Registration failed!');
      }
    },
    onError: () => {
      toast.error('Registration failed. Please try again.');
    },
  });

  // Mutation for OTP verification
  const { mutateAsync: verifyOtp } = useMutation({
    mutationFn: async () => {
      const otpCode = otp.join('');
      const info = { email, otp: otpCode };
      const { data: otpConfirm } = await axiosSecure.post('user/verify-otp', info);

      if (otpConfirm) {
        await registerUser();
      } else {
        throw new Error('OTP verification failed.');
      }
    },
    onError: () => {
      toast.error('OTP verification failed.');
      setOtpLoading(false);
    },
    onSuccess: () => {
      setOtpLoading(false);
    },
  });

  // Handle OTP submission
  const handleOtpSubmit = async () => {
    if (otp.some((digit) => digit === '')) {
      toast.error('Please enter all OTP digits.');
      return;
    }
    setOtpLoading(true);
    await verifyOtp();
  };

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Only allow digits
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last digit
    setOtp(newOtp);
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Handle Resend OTP
  const handleResend = async () => {
    if (resendDisabled) return;
    try {
      setResendDisabled(true);
      setResendTimer(60);
      setOtpTimer(120); // Reset OTP timer on resend
      // Resend OTP by triggering the onSubmit function
      await onSubmit(formData);
      toast.success('OTP resent. Please check your email.');
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.');
      setResendDisabled(false);
    }
  };

  // Handle image upload
  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setImg(file);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const newFormData = new FormData();
      newFormData.append('name', data.name);
      newFormData.append('email', data.email);
      newFormData.append('password', data.password);
      newFormData.append('role', 'user'); 
      if (img) {
        newFormData.append('image', img);
      }
      setFormData(newFormData);
      setEmail(data.email);

      const { data: verify } = await axiosSecure.post('/user/verify', {
        email: data.email,
      });

      if (verify) {
        setOtpView(true);
        setOtpTimer(120); 
        toast.success(`Verification OTP sent to ${data.email}.`);
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  // Focus on the first OTP input when OTP view is active
  useEffect(() => {
    if (otpView) {
      otpRefs.current[0]?.focus();
    }
  }, [otpView]);

  // Handle Resend Timer Countdown
  useEffect(() => {
    if (resendDisabled && resendTimer > 0) {
      const timerInterval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    } else if (resendTimer === 0) {
      setResendDisabled(false);
    }
  }, [resendDisabled, resendTimer]);

  // Handle OTP Timer Countdown
  useEffect(() => {
    if (otpView && otpTimer > 0) {
      const otpInterval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(otpInterval);
    } else if (otpTimer === 0) {
      toast.error('Time expired! Please resend OTP.');
    }
  }, [otpView, otpTimer]);

  return (
    <>


      <main className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
        <Card className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
          <Typography variant="h4" className="text-center mb-6 text-indigo-600">
            Register
          </Typography>

          {!otpView ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              aria-label="Register Form"
            >
              <div className="flex justify-center mb-4">
                <label htmlFor="imageUpload">
                  <img
                    src={
                      imageUrl ||
                      'https://via.placeholder.com/150?text=Profile+Image'
                    }
                    alt="Profile"
                    className="w-24 h-24 rounded-full cursor-pointer object-cover border-2 border-indigo-300 transition-transform transform hover:scale-105"
                  />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImgUpload}
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Full Name"
                  placeholder="Enter your full name"
                  {...register('name', { required: 'Full Name is required' })}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  error={!!errors.name}
                />
                {errors.name && (
                  <Typography
                    variant="small"
                    color="red"
                    className="mt-1"
                  >
                    {errors.name.message}
                  </Typography>
                )}
              </div>

              <div>
                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter your email address"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value:
                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  error={!!errors.email}
                />
                {errors.email && (
                  <Typography
                    variant="small"
                    color="red"
                    className="mt-1"
                  >
                    {errors.email.message}
                  </Typography>
                )}
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="Enter your password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  error={!!errors.password}
                />
                <IconButton
                  variant="text"
                  className="absolute top-3 right-3"
                  onClick={togglePasswordVisibility}
                  aria-label={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-indigo-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5 0.993 0 1.953-0.138 2.863-0.395"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.25 14.25l4.5 4.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-indigo-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </IconButton>
                {errors.password && (
                  <Typography
                    variant="small"
                    color="red"
                    className="mt-1"
                  >
                    {errors.password.message}
                  </Typography>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                Register
              </Button>
              <Typography className="text-center text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 hover:underline">
                  Login
                </Link>
              </Typography>
            </form>
          ) : (
            <div className="space-y-6">
              <Typography
                variant="h5"
                className="text-center mb-4 text-indigo-600"
              >
                OTP Verification
              </Typography>
              <Typography className="text-center text-gray-600">
                Enter the 4-digit code sent to <strong>{email}</strong>
              </Typography>
              <div className="grid grid-cols-4 gap-4">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    inputMode="numeric"
                    pattern="\d{1}"
                    ref={(el) => (otpRefs.current[index] = el)}
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    className="text-center text-xl border-2 p-4 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md"
                    aria-label={`OTP Digit ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                onClick={handleOtpSubmit}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                disabled={otpLoading}
              >
                {otpLoading ? (
                  <CircularProgress color="inherit" size="24px" />
                ) : (
                  'Submit OTP'
                )}
              </Button>

              <div className="flex justify-between items-center">
                <Typography className="text-gray-600">
                  Didn't receive the OTP?
                </Typography>
                <button
                  onClick={handleResend}
                  className={`text-indigo-600 hover:underline ${
                    resendDisabled ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  disabled={resendDisabled}
                >
                  {resendDisabled
                    ? `Resend (${resendTimer}s)`
                    : 'Resend'}
                </button>
              </div>

              {otpTimer > 0 && (
                <Typography className="text-center text-gray-500">
                  OTP expires in: {Math.floor(otpTimer / 60)}:
                  {('0' + (otpTimer % 60)).slice(-2)} minutes
                </Typography>
              )}
            </div>
          )}
        </Card>
      </main>
    </>
  );
};

export default Register;
