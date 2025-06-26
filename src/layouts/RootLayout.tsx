import { type FC } from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout: FC = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Header and Footer are hidden for CLI experience on Home page */}
      {/* <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <MainNav items={navItems} />
            <LanguageSwitcher />
          </div>
        </div>
      </header> */}
      <main className="flex-1 h-full">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default RootLayout
