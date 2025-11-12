import { HugeiconsIcon } from '@hugeicons/react'
import { UserIcon } from '@hugeicons/core-free-icons'

interface TopBarProps {
  title?: string
  titleClassName?: string
  backgroundClassName?: string
  paddingClasses?: string
}

function TopBar({ title, titleClassName, backgroundClassName = 'bg-transparent', paddingClasses = 'pt-7 pb-5' }: TopBarProps) {
  const resolvedTitleClassName = titleClassName ?? 'text-sm font-medium text-white'

  return (
    <div className={`relative w-full ${backgroundClassName}`}>
      {/* Main content */}
      <div className={`${paddingClasses} px-5 flex items-center justify-between`}>
        <div className="flex items-center">
          {title ? (
            <span className={resolvedTitleClassName}>{title}</span>
          ) : null}
        </div>

        {/* Right side - Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <HugeiconsIcon icon={UserIcon} className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar 

