"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Map, CalendarDays, Banknote, Compass } from 'lucide-react'

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/discover', label: 'Discover', icon: Map },
    { href: '/reserve', label: 'Reserve', icon: CalendarDays },
    { href: '/investment', label: 'Investment', icon: Banknote },
    { href: '/events', label: 'Events', icon: Compass },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-md backdrop-blur rounded-3xl  text-center mt-4 w-1/3 mx-auto">
      <div className="container mx-auto px-4">
      <div className="flex justify-center items-center py-4 align-middle">
        <div className="hidden md:flex space-x-2">
        {navItems.map((item) => (
          <Button
          key={item.href}
          variant={pathname === item.href ? "default" : "ghost"}
          asChild
          >
          <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon">
          <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="flex flex-col space-y-4 mt-8">
          {navItems.map((item) => (
            <Button
            key={item.href}
            variant={pathname === item.href ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setIsOpen(false)}
            asChild
            >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
            </Button>
          ))}
          </div>
        </SheetContent>
        </Sheet>
      </div>
      </div>
    </nav>
  )
}

export default Navbar

