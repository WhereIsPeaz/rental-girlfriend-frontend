import '@/styles/globals.css'
import Nav from '@/components/nav'
import { Kanit } from 'next/font/google'
const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })
export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${kanit.className}`}>
                <Nav />
                {children}
            </body>
        </html>
    )
}
