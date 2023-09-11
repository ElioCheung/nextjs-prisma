import { PropsWithChildren } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='min-h-screen flex flex-col'>
      <Layout.Header />
      <section className='flex-1 flex flex-col overflow-hidden overflow-y-auto'>
        {children}
      </section>
      <Layout.Footer />
    </div>
  )
}

Layout.Header = Header
Layout.Footer = Footer