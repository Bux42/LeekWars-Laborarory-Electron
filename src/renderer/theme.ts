export const theme = {
  colors: {
    // Background colors
    background: {
      primary: '#1e1e1e',
      secondary: '#252526',
      tertiary: '#2d2d30',
      elevated: '#3e3e42',
    },
    // Text colors
    text: {
      primary: '#cccccc',
      secondary: '#9d9d9d',
      tertiary: '#6e6e6e',
      inverse: '#1e1e1e',
    },
    // Accent colors
    accent: {
      primary: '#007acc',
      primaryHover: '#005a9e',
      success: '#4caf50',
      error: '#f44336',
      warning: '#ff9800',
      info: '#2196f3',
    },
    // Border colors
    border: {
      primary: '#3e3e42',
      secondary: '#454545',
      focus: '#007acc',
    },
  },
  fonts: {
    primary: '"Geist Mono", "Consolas", "Monaco", monospace',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 2,
    md: 4,
    lg: 8,
  },
};

export type Theme = typeof theme;
