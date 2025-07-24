'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Settings, LogOut, Moon, Sun } from 'lucide-react'

import Container from '@/components/container'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  return (
    <header className="bg-white shadow">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href={'/sensors'}>
            <div className="flex items-center">
              <Image
                src="/assets/flood-wave.png"
                alt="Logo"
                width={60}
                height={40}
                className="mr-2 h-auto w-auto"
              />
              <span className="text-xl font-bold">
                Flood Level and Monitoring System
              </span>
            </div>
          </Link>

          {/* Theme Toggle and Avatar */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                aria-label="Toggle dark mode"
              />
              <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>

            {/* Avatar with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Container>
    </header>
  )
}
