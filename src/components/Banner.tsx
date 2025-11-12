interface BannerProps {
  adminName?: string
}

function Banner({ adminName = 'Emmanuel' }: BannerProps) {
  // Get current date and day
  const today = new Date()
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  const dayName = dayNames[today.getDay()]
  const date = `${today.getDate()} ${monthNames[today.getMonth()]}, ${today.getFullYear()}`
  
  // Get greeting based on time of day
  const hour = today.getHours()
  let greeting = 'Good morning'
  if (hour >= 12 && hour < 17) {
    greeting = 'Good afternoon'
  } else if (hour >= 17) {
    greeting = 'Good evening'
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background pattern - flipped horizontally */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/pattern-white.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'scaleX(-1)',
        }}
      />
      
      {/* Overlay color */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: '#E3000F', opacity: 0.9 }}
      />
      
      {/* Content */}
      <div className="relative z-10 px-5 pt-28 pb-16 space-y-6">
        <div className="flex items-start justify-between">
          {/* Left side - Greeting */}
          <div className="flex flex-col">
            <span className="text-white text-lg font-semibold">
              {greeting}, {adminName}
            </span>
          </div>

          {/* Right side - Date and Day */}
          <div className="flex flex-col items-end">
            <span className="text-white text-sm font-medium">
              {dayName}
            </span>
            <span className="text-white text-xs opacity-90">
              {date}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white text-sm font-medium">
            Staff ID: ZEN-120984
          </span>
        </div>
      </div>
    </div>
  )
}

export default Banner

