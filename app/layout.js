import localFont from "next/font/local";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Cube from "@/components/layout/Cube";
import { ToastContainer } from 'react-toastify';
import { ProfileProvider } from "./context/ProfileContext";
import Header from "@/components/layout/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: 'Linkly | Shorten and Customize Your Links Instantly',
  description: 'Transform long URLs into short, easy-to-share custom links with Linkly. Enjoy personalized URLs, efficient tracking, and seamless sharing.',
  keywords: 'URL shortener, customize links, shorten URLs, personalized links, free link shortener, link customization, shareable links',
  author: 'Linkly Team',
  robots: 'index, follow',
  openGraph: {
    title: 'Linkly - Simplify and Customize Your URLs',
    description: 'Shorten and customize your links with Linkly for easy sharing and analytics.',
    url: 'https://linkly-shortlink.vercel.app',
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
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
              {/* Basic Favicon */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      
      {/* PNG Favicons */}
      <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
      <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
      
      {/* Apple Touch Icon */}
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Android Chrome Icons */}
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
      
      {/* Manifest for Progressive Web Apps */}
      <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0B101B]`}
      >
        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
        />
        
        {/* Decorative Elements */}
        <div className='absolute -top-16 right-16'>
          <Cube height='300' width='300' />
        </div>
        <div className='absolute top-64 left-0'>
          <Cube height='300' width='300' />
        </div>

        {/* Context Provider */}
        <ProfileProvider>
          <div className='h-screen'>
            {/* Header */}
            <header className="fixed z-10">
              <Header />
            </header>

            {/* Page Content */}
            {children}
          </div>
        </ProfileProvider>
      </body>
    </html>
  );
}
