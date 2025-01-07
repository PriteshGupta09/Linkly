import LoginData from "@/components/Login/LoginData"

const Login = () => {
    return(
        <LoginData />
    )
}

export default Login

export function generateMetadata({params}) {
    return{
        title: 'Login to Linkly | Manage and Customize Your Links',
        description: 'Access your Linkly account to shorten, customize, and manage all your links. Simplify your sharing with just a few clicks.',
        keywords: 'Linkly login, URL shortener account, link management, customize links, secure login',
        author: 'Linkly Team',
        robots: 'index, follow',
        openGraph: {
            title: 'Login to Linkly | Manage and Customize Your Links',
            description: 'Access your Linkly account to shorten, customize, and manage all your links. Simplify your sharing with just a few clicks.',
          url: 'https://linkly-shortlink.vercel.app/login',
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
