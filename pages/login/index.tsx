import { useForm } from 'react-hook-form'
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import Button from '@/component/Button/Button'
import authApi from '@/api/auth.api'
import { AppContext } from '@/contexts/app.context'
import { ErrorResponse } from '@/tyles/utils.type'
import Input from '@/component/Input'
import { isAxiosUnprocessableEntityError } from '@/utils/utils'
import { Schema, schema } from '@/utils/rules'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const router = useRouter();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.login(body)
  })
  
  const onSubmit = handleSubmit((data) => {
    console.log('chuẩn bị gửi')
    console.log('data: '+data.email);
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log('thành công nhưng sắp gặp lỗi')
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        router.push('/home')
      },
      onError: (error) => {
        console.log('lỗi khi nhận về');
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

  return (
    <div className='bg-orange'>
      <Head>
        <title>Đăng nhập</title>
        <meta name='description' content='Đăng nhập' />
      </Head>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
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
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                >
                  Đăng nhập
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
    </div>
  )
}
