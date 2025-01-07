import RegisterData from "@/components/Register/RegisterData"

const Register = () => {
    return(
    <RegisterData />
)
}

export default Register

export function generateMetadata({params}) {
    return{
        title: 'Register for Linkly | Create and Customize Short Links',
        description: 'Join Linkly for free to start creating and customizing your own short links. Simplify sharing and manage your URLs effortlessly.',
        keywords: 'Linkly register, create account, customize links, free URL shortener, personalized short links',
        author: 'Linkly Team',
        robots: 'index, follow',
        openGraph: {
            title: 'Register for Linkly | Create and Customize Short Links',
            description: 'Join Linkly for free to start creating and customizing your own short links. Simplify sharing and manage your URLs effortlessly.',
          url: 'https://linkly-shortlink.vercel.app/register',
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
