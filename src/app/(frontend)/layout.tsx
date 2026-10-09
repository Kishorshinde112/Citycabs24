import React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import '../../index.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FloatingActions from '../../components/FloatingActions'
import HomeAutoEnquiry from '../../components/HomeAutoEnquiry'

import BookingModalProvider from '../../components/booking/BookingModalContext'
import EnquiryModalProvider from '../../components/enquiry/EnquiryModalContext'

export const metadata: Metadata = {
  title: 'CityCabs24 - Best Taxi Service in Mumbai',
  description: 'Reliable and affordable outstation and local cabs in Mumbai.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="bg-zinc-50 text-zinc-900 font-sans antialiased">
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TDJCRQRM');
            `,
          }}
        />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18424689411"
        />
        <Script
          id="google-ads-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18424689411');
            `,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TDJCRQRM"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Umami Analytics */}
        <Script
          defer
          src="https://analytics.kishorlab.dev/script.js"
          data-website-id="ef7050a7-d39c-46f4-be2b-227b21627d90"
          strategy="afterInteractive"
        />

        <BookingModalProvider>
          <EnquiryModalProvider>
            <Navbar />
            <main>{children}</main>
            <FloatingActions />
            <HomeAutoEnquiry />
            <Footer />
          </EnquiryModalProvider>
        </BookingModalProvider>
      </body>
    </html>
  )
}

