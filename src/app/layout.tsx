import '@/styles/globals.css'
import Nav from '@/components/nav/nav'
import { Kanit } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${kanit.className}`}>
                <AuthProvider>
                    <Nav />
                    {children}
                    <Toaster
                        position="top-center"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                fontFamily: kanit.style.fontFamily,
                            },
                        }}
                    />
                </AuthProvider>
            </body>
        </html>
    )
}
