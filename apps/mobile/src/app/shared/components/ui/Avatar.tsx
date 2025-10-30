/**
 * Avatar Component
 * User avatar with fallback to initials
 */

import { View, Text, Image, StyleSheet, type ImageSourcePropType, type ViewStyle } from 'react-native'
import { colors, typography } from '../../theme'

interface AvatarProps {
  source?: ImageSourcePropType | string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  style?: ViewStyle
}

export function Avatar({ source, name, size = 'md', style }: AvatarProps) {
  const sizeStyles = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 96, height: 96 },
  }

  const textSizes = {
    sm: { fontSize: typography.sizes.xs },
    md: { fontSize: typography.sizes.base },
    lg: { fontSize: typography.sizes.xl },
    xl: { fontSize: typography.sizes.xxxl },
  }

  const getInitials = (name: string) => {
    const names = name.split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  const imageSource = typeof source === 'string' ? { uri: source } : source

  return (
    <View
      style={[
        styles.container,
        sizeStyles[size],
        style
      ]}
    >
      {source ? (
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="cover"
        />
      ) : name ? (
        <Text style={[styles.text, textSizes[size]]}>
          {getInitials(name)}
        </Text>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.coralLight,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontWeight: typography.weights.bold,
    color: colors.brown,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.coralLight,
  },
})
