import { HugeiconsIcon } from '@hugeicons/react'
import {
  Alert01Icon,
  SearchIcon,
  WifiOffIcon,
  AlertCircleIcon
} from '@hugeicons/core-free-icons'

interface ErrorDisplayProps {
  error: string
  onRetry?: () => void
}

function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  // Determine error type and message
  const getErrorDetails = () => {
    if (error.includes('500') || error.includes('Internal Server Error')) {
      return {
        icon: Alert01Icon,
        iconColor: 'text-red-500',
        title: 'Server Error',
        message: 'The server encountered an error while processing your request. Please try again later.',
        suggestion: 'If the problem persists, contact support.'
      }
    }
    if (error.includes('404') || error.includes('Not Found')) {
      return {
        icon: SearchIcon,
        iconColor: 'text-gray-500',
        title: 'Not Found',
        message: 'The requested resource could not be found.',
        suggestion: 'Please check your connection and try again.'
      }
    }
    if (error.includes('network') || error.includes('fetch') || error.includes('Failed to fetch') || error.includes('Connection')) {
      return {
        icon: WifiOffIcon,
        iconColor: 'text-gray-500',
        title: 'Connection Error',
        message: 'Unable to connect to the server. Please check your internet connection.',
        suggestion: 'Make sure you are connected to the internet and try again.'
      }
    }
    return {
      icon: AlertCircleIcon,
      iconColor: 'text-red-500',
      title: 'Error',
      message: error,
      suggestion: 'Please try again or contact support if the problem persists.'
    }
  }

  const errorDetails = getErrorDetails()

  return (
    <div className="bg-white p-8 text-center" style={{ borderRadius: 0 }}>
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className={`mb-2 ${errorDetails.iconColor}`}>
          <HugeiconsIcon icon={errorDetails.icon} className="w-16 h-16" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{errorDetails.title}</h3>
        <p className="text-sm text-gray-600 max-w-md">{errorDetails.message}</p>
        <p className="text-xs text-gray-500">{errorDetails.suggestion}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors focus:outline-none"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorDisplay

