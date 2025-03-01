import type { Metadata } from 'next'
import '../globals.css'
import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Initialize font

export const metadata: Metadata = {
    title: 'Corvus',
    description: 'Corvus - Modern LMS',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <main>
                <Header />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    )
}