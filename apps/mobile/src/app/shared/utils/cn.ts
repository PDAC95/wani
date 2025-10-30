/**
 * Class name utility
 * Simple utility to merge class names (similar to clsx/classnames)
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
