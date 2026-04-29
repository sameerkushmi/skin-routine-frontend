'use client'

import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { MyProvider } from '../utils/Context/Context'
import { usePathname } from 'next/navigation'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import { Toaster } from 'react-hot-toast'

const Layout = ({ children }) => {
    const pathname = usePathname()

    const hiddenPaths = [
        '/login/',
        '/register/',
        '/sitemap/',
        '/verify-email/',
        '/forgot-password/',
        '/reset-password/',
        '/sitemap/',
        '/checkout/',
        '/payment-failed/',
        '/payment-success/',
        '/payment-callback/'
    ];

    const hideNavbarFooter =
        hiddenPaths.includes(pathname) ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/account');

    const showNavbarFooter = !hideNavbarFooter;

    return (
        <MyProvider>
            {showNavbarFooter && <Navbar />}
            {children}
            {showNavbarFooter && <Footer />}
            {showNavbarFooter && <ScrollToTop />}
            <Toaster />
        </MyProvider>
    )
}

export default Layout
