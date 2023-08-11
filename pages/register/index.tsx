import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import {omit} from 'lodash'
import { useContext } from 'react'
import { AppContext } from '@/contexts/app.context'
import { Schema, schema } from '@/utils/rules'
import authApi from '@/api/auth.api'
import { isAxiosUnprocessableEntityError } from '@/utils/utils'
import { ErrorResponse } from '@/tyles/utils.type'
import Input from '@/component/Input'
import Button from '@/component/Button/Button'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
      resolver: yupResolver(registerSchema)
    })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data:AxiosResponse) => {
        setIsAuthenticated(true)
        setProfile(data.data.user)
        router.push('/home')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  const onGoogleSubmit = async() => {
    window.location.assign('http://localhost:3009/google/register');
  }

  return (
    <>
      <Head>
        <title>Đăng ký </title>
        <meta name='description' content='Đăng ký tài khoản' />
      </Head>
      <div className='container mt-3'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on'
              />

              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-2'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password'
                autoComplete='on'
              />

              <div className='mt-2'>
                <Button
                  className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  Đăng ký
                </Button>
              </div>
              <div className='mt-3'>
              <Button
                onClick={() => onGoogleSubmit()}
                className='flex w-full items-center justify-center bg-blue-500 border py-4 px-6 text-sm uppercase text-white hover:bg-blue-600'
              >
                <div className="w-full flex justify-between relative mb-2">
                  <div className="absolute inset-y-0 left-0 flex items-center justify-center w-12 h-12 bg-white rounded-l-md ">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"  alt="Google" className='w-6 h-6' />
                  </div>
                  <p className="pl-14">Login with Google</p>
                </div>
              </Button>
            </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' href='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
