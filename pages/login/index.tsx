import { useForm } from 'react-hook-form'
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useState } from 'react'
import Button from '@/component/Button/Button'
import authApi, { URL_GOOGLE } from '@/api/auth.api'
import { AppContext } from '@/contexts/app.context'
import { ErrorResponse } from '@/tyles/utils.type'
import Input from '@/component/Input'
import { isAxiosUnprocessableEntityError } from '@/utils/utils'
import { Schema, schema } from '@/utils/rules'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosResponse } from 'axios';
import { signIn, useSession } from 'next-auth/react';
import LoginGoogleButton from '@/component/GoogleButton';
import config from '@/constants/config';
import cookieStore from '@/app/cookie';
import { deleteCookie } from '@/utils/auth';
import { NextApiResponse } from 'next';

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])


export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(true);
  const router = useRouter();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.login(body)
  })

  const onSubmit = handleSubmit((data) => {
          loginMutation.mutate(data, {
            onSuccess: (data:AxiosResponse) => {
              setIsAuthenticated(true)
              setProfile(data.data.user)
              router.push('/home')
            },
            onError: (error) => {
              if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
                const formError = error.response?.data.data;
                if (formError) {
                  Object.keys(formError).forEach((key) => {
                    setError(key as keyof FormData, {
                      message: formError[key as keyof FormData],
                      type: 'Server'
                    })
                  })
                }
              }
            }
          })
  })

  const onGoogleSubmit = async() => {
    //Window thuộc browser cho phép truy cập server google, đồng thời nhập url để thực hiện get.
    window.location.assign('http://localhost:3009/google/login');
    
  }

  return (
    <>
      <Head>
        <title>Đăng nhập</title>
        <meta name='description' content='Đăng nhập' />
      </Head>
      <div className='container mt-3'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={showError?errors.email?.message:''}
                placeholder='Email'
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={showError?errors.password?.message:''}
                placeholder='Password'
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  name='submit1'
                  className='flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                  onClick={() => setSelectedButton('submit1')}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-3'>
              <Button
                onClick={
                  () => {
                    setShowError(false)
                  onGoogleSubmit()}}
                className='flex w-full items-center justify-center bg-blue-500 border py-4 px-6 text-sm uppercase text-white hover:bg-blue-600'
              >
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 left-0 flex items-center justify-center w-12 h-12 bg-white rounded-l-md ">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"  alt="Google" className='w-6 h-6' />
                  </div>
                  <p className="pl-14">Login with Google</p>
                </div>
              </Button>
            </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' href='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
