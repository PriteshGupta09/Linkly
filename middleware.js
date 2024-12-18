import { NextResponse } from 'next/server'
 
export function middleware(request) {
  const cookie = request.cookies.get('token')?.value

  if(cookie){
    return NextResponse.redirect(new URL('/', request.url))
  }
  
}
export const config = {
    matcher: ['/login','/register' ]
  }