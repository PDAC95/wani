/**
 * Avatar Component
 * Displays user avatars with fallback initials
 */

import { type ReactNode } from 'react'

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  children?: ReactNode
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-24 h-24 text-xl',
}

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  className = '',
  children,
}: AvatarProps) {
  // Generate initials from fallback text
  const initials = fallback
    ? fallback
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '??'

  return (
    <div
      className={`avatar ${sizeClasses[size]} font-semibold text-dark ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt || fallback || 'Avatar'}
          className="w-full h-full object-cover"
        />
      ) : children ? (
        children
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

export default Avatar
