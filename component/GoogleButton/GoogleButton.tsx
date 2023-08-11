
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

const GoogleSignInButton = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID as string;
    const onSignIn = () => {
        console.log('sucessfully');
    }

    return (
        <div>
            <Link href="/signin" className="g-signin2" data-onsuccess="onSignIn" data-clientid={clientId} >Đăng kí</Link>
        </div>
    )
}

export default GoogleSignInButton