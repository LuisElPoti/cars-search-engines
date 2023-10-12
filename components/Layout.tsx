import { Footer, Navbar } from '@/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "CarSearch",
  description: "Generated by create next app",
}

export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
        
        <Navbar />
        <main>{children}</main>
        <Footer/>
       
    </>  
       
  )
}