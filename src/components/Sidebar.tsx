import { NavLink } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { 
  Home01Icon, 
  UserIcon
} from '@hugeicons/core-free-icons'

function Sidebar() {
  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: Home01Icon, to: '/dashboard' },
    { id: 'users', label: 'Users', icon: UserIcon, to: '/users' },
  ]

  return (
    <div className="w-20 bg-white h-screen fixed left-0 top-0 flex flex-col z-10" style={{ backgroundColor: '#ffffff' }}>
      {/* Logo section */}
      <div className="px-4 py-6 border-b border-gray-200 flex items-center justify-center">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="h-6 w-6 object-contain"
        />
      </div>

      {/* Menu items */}
      <nav className="flex-1 px-2 py-6">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.to}
                end={item.to === '/dashboard'}
                className={({ isActive }) =>
                  `group w-full flex flex-col items-center justify-center p-3 rounded-lg transition-all focus:outline-none focus-visible:outline-none ${
                    isActive ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
                onMouseDown={(e) => e.preventDefault()}
              >
                {({ isActive }) => (
                  <>
                    <HugeiconsIcon 
                      icon={item.icon} 
                      className={`w-5 h-5 mb-1 ${isActive ? 'text-red-600' : 'text-gray-600'}`}
                    />
                    <span className={`text-xs ${isActive ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar

