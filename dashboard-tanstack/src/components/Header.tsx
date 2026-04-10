import { Button } from '@heroui/react'
import { Person } from '@gravity-ui/icons'

export default function Header() {
  const handleLogout = () => {
    console.log('User logged out!')
  }
  const switchLanguage = () => {
    console.log('Langugage button clicked!')
  }

  return (
    <div>
      <div className="w-full py-5 px-6 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">MockMart</h1>
          <div>Search</div>
          <div className="flex gap-2">
            <Button onClick={switchLanguage} variant="secondary">
              Language
            </Button>
            <Button onClick={handleLogout}>
              Login
              <Person />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
