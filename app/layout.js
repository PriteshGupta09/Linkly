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
  title: "Linkly: Customize link by your own choice.",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0B101B]`}
      >
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="dark"
        />
        
        <div className='absolute -top-16 right-16'>
          <Cube height='300' width='300' />
        </div>
        <div className='absolute top-64 left-0'>
          <Cube height='300' width='300' />
        </div>
        <ProfileProvider>
          <div className='h-screen'>
            <header className="fixed z-10">
              <Header />
            </header>
            {children}
          </div>
        </ProfileProvider>
      </body>
    </html>
  );
}
