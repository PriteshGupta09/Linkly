import localFont from "next/font/local";
import "../globals.css";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: 'Verify Your Email | Linkly - Secure Your Account',
    description: 'Verify your email to activate your Linkly account. Start shortening and customizing links securely.',
    keywords: 'Linkly email verification, secure URL shortener, activate account, verify email',
    author: 'Linkly Team',
    robots: 'index, follow',
    openGraph: {
        title: 'Verify Your Email | Linkly - Secure Your Account',
        description: 'Verify your email to activate your Linkly account. Start shortening and customizing links securely.',
      url: 'https://linkly-shortlink.vercel.app/verify',
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
        <div className=''> 
            {children}
        </div>
    );
}
