import { Button } from '@heroui/react'
import { Person } from '@gravity-ui/icons'
import { useAuth0 } from '@auth0/auth0-react'

export default function Header() {
  const { isAuthenticated, logout: auth0Logout, user } = useAuth0()

  return (
    <div>
      <div className="w-full py-5 px-6 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Mock Mart</h1>
          <div className="flex gap-2 items-center">
            {isAuthenticated && (
              <>
                <p>{user?.nickname}</p>
                <Button
                  onClick={() =>
                    auth0Logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Logout
                  <Person />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
