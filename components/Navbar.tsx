// import Link from 'next/link'
// import React from 'react'
// import Image from 'next/image'
// import { auth, signOut, signIn } from '@/auth'

// const Navbar = async () => {
//     const session = await auth();
//   return (
//     <div className='px-5 py-3 bg-white shadow-sm font-work-sans'>
//         <nav className='flex justify-between items-center'>
//             <Link href='/'>
//                 {/* <Image src='/logo.png'/> */}
//                 <Image src='/logo.png' alt='logo' width={144} height={30}/>
//             </Link>

//             <div className='flex items-center gap-5 text-black'>
//                 {
//                     session && session?.user ? (
//                         <>
//                         <Link href={'/startup/create'}>
//                             <span>Create</span>
//                         </Link>

//                         <button onClick={signOut}>
//                             <span>Logout</span>
//                         </button>

//                         <Link href={`/user/${session?.id}`}>
//                             <span>{session?.user?.name}</span>
//                         </Link>
//                         </>
//                     ) : (
//                         <button onClick={signIn( {provider: 'github'})}>
//                             <span>Login</span>
//                         </button>
//                     )
//                 }

//             </div>

//         </nav>
//     </div>
//   )
// }

// export default Navbar

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { auth, signIn, signOut } from '@/auth';

const Navbar = async () => {
    const session = await auth();

    return (
        <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form action={async () => {
                                'use server';
                                await signOut({ redirectTo: '/' }); // Use the appropriate property for your library
                            }}>
                                <button type="submit">Logout</button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            'use server';
                            await signIn('github'); // Pass the provider name directly as a string
                        }}>
                            <button type="submit">Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;


