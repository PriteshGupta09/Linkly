import React from 'react'
import ForgotPasswordContent from '@/components/forgot-password/ForgotPasswordContent'

const page = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <ForgotPasswordContent />
    </div>
  )
}

export default page

export function generateMetadata({params}) {
  return{
    title: 'Reset Password | Linkly - Recover Your Account',
    description: 'Recover access to your Linkly account by resetting your password. Get back to shortening and managing your links.',
    keywords: 'Linkly forgot password, reset password, account recovery, URL shortener password reset',
    author: 'Linkly Team',
    robots: 'index, follow',
    openGraph: {
      title: 'Reset Password | Linkly - Recover Your Account',
    description: 'Recover access to your Linkly account by resetting your password. Get back to shortening and managing your links.',
      url: 'https://linkly-shortlink.vercel.app/forgot-password',
      type: 'website',
      images: [
        {
          url: 'https://linkly-shortlink.vercel.app/favicon.ico',
          width: 1200,
          height: 630,
          alt: 'Linkly | Shorten and Customize Your Links Instantly',
        },
      ],
    }
  }
}
