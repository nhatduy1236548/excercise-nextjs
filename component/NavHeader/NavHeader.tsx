import { AppContext } from "@/contexts/app.context";
import Link from "next/link";
import { useContext } from "react";

export default function NavHeader() {
    const { isAuthenticated, profile } = useContext(AppContext)
    
    return (
        <nav className='bg-blue-900 fixed top-0 w-full z-10 p-6 flex justify-between'>
            <div className='text-2xl font-semi text-primary'>
                CyberLogitec
            </div>
            <div className='flex justify-end'>
                    {isAuthenticated && (
                        <div
                            className='ml-6 flex cursor-pointer items-center py-1 hover:text-white/70' >
                            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md mr-5 p-2 hover:bg-blue-100 transition'>
                                <span className='text-blue-600'>Tài khoản của tôi</span>
                            </div>
                            <div className='text-black'>{profile}</div>
                        </div>
                    )}
                    {!isAuthenticated && (
                        <div className='flex items-center'>
                            <Link href='/register' className='mx-3 capitalize hover:text-white/70'>
                                Đăng ký
                            </Link>
                            <div className='h-4 border-r-[1px] border-r-white/40' />
                            <Link href='/login' className='mx-3 capitalize hover:text-white/70'>
                                Đăng nhập
                            </Link>
                        </div>
                    )}
            </div>
        </nav>
    )
}