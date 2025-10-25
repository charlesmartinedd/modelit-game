// Cell Collective + ModelIt K12 Color Palette
export const colors = {
  // Primary Colors (Cell Collective)
  primary: '#0d75bb',      // Cell Collective Blue
  primaryDark: '#232323',  // Dark Header/Background
  primaryLight: '#52a7e0', // Light Blue

  // Secondary/Accent
  accent: '#E67E22',       // Orange (success/energy)
  success: '#27ae60',      // Green
  warning: '#f39c12',      // Yellow
  error: '#e74c3c',        // Red

  // Neutrals
  textPrimary: '#232323',
  textSecondary: '#727272',
  textLight: '#999',
  border: '#ddd',
  backgroundLight: '#f9f9f9',
  backgroundMedium: '#f2f2f2',
  backgroundDark: '#E8E8E8',

  // Special
  white: '#fff',
  lightGray: '#eee',
  mediumGray: '#ccc',
  darkGray: '#444',

  // Game-specific
  levelComplete: '#27ae60',
  nodeActive: '#0d75bb',
  nodeInactive: '#787878',
  arrowActivation: '#27ae60',
  arrowInhibition: '#e74c3c',
}

export const gradients = {
  header: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
  success: `linear-gradient(135deg, ${colors.success} 0%, ${colors.primaryLight} 100%)`,
  warning: `linear-gradient(135deg, ${colors.warning} 0%, ${colors.accent} 100%)`,
  primary: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
}
