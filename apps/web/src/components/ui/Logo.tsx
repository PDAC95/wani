/**
 * Logo Component
 * Displays Wani logo in different variants and sizes
 */

interface LogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  horizontal: {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
  },
  vertical: {
    sm: 'h-12',
    md: 'h-16',
    lg: 'h-24',
  },
  icon: {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  },
}

export function Logo({
  variant = 'horizontal',
  size = 'md',
  className = '',
}: LogoProps) {
  const sizeClass = sizeClasses[variant][size]

  // Get logo path based on variant
  const getLogoPath = () => {
    switch (variant) {
      case 'horizontal':
        return '/logo/logo-horizontal-naranja.png'
      case 'vertical':
        return '/logo/logo-vertical-naranja.png'
      case 'icon':
        return '/logo/logo-naranja.png'
      default:
        return '/logo/logo-horizontal-naranja.png'
    }
  }

  return (
    <img
      src={getLogoPath()}
      alt="Wani"
      className={`${sizeClass} ${className}`}
    />
  )
}

export default Logo
