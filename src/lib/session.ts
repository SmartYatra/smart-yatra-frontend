// import { cookies } from 'next/headers';

// import 'server-only';

// export async function setAuthToken(token: string) {
//   const cookieStore = await cookies();

//   cookieStore.set('authToken', token, {
//     httpOnly: true, // Prevents JavaScript access
//     secure: process.env.NODE_ENV === 'production', // Set to true in production
//     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
//     sameSite: 'lax', // Protects against CSRF attacks
//     path: '/', // Allow all pages to access the cookie
//   });
// }

import { cookies } from 'next/headers';

import 'server-only';

export async function setAuthToken(token: string, role: string) {
  const cookieStore = await cookies();

  cookieStore.set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: 'lax',
    path: '/',
  });

  cookieStore.set('authRole', role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: 'lax',
    path: '/',
  });
}

export async function removeAuthToken() {
  const cookieStore = await cookies();

  cookieStore.delete('authToken');
  cookieStore.delete('authRole');
}
