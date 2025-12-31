We are building an electron application, using react and typescript for the renderer process, and nodejs for the main process. The application is open-source and we want to follow best practices for code quality, readability, and maintainability. Please follow these guidelines when contributing code:

## Component Structure

React components should have their own folder with a kebab-case name, the component itself will have a PascalCase name. Each component folder should contain an [ComponentName].tsx file for the component code, and a [ComponentName].styles.ts file for the component styles.

Here is an example style file structure for a component named UserProfile:

```src/
  components/
    user-profile/
      UserProfile.tsx
      UserProfile.styles.ts
      UserProfile.types.ts
```

### Component Implementation

Components must be defined as **function declarations**, not arrow functions or React.FC:

```typescript
// ✅ Correct
function UserProfile({ userId }: IUserProfileProps) {
  return <div style={styles.container}>User Profile Content</div>;
}

// ❌ Incorrect
const UserProfile: React.FC<IUserProfileProps> = ({ userId }) => {
  return <div style={styles.container}>User Profile Content</div>;
};
```

### Styles

Styles should be defined in a separate [ComponentName].styles.ts file with typed interfaces:

```typescript
import { theme } from '../../theme';

export interface IUserProfileStyles {
  container: React.CSSProperties;
}

export const userProfileStyles: IUserProfileStyles = {
  container: {
    display: 'flex',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    width: '100%',
    backgroundColor: theme.colors.background.primary,
    color: theme.colors.text.primary,
  },
};
```

It should be imported and used in the UserProfile.tsx file like this:

```tsx
import React from 'react';
import { userProfileStyles as styles } from './UserProfile.styles';
import { IUserProfileProps } from './UserProfile.types';

function UserProfile({ userId }: IUserProfileProps) {
  return <div style={styles.container}>User Profile Content</div>;
}

export default UserProfile;
```

### Props and Types

React components should have a types file if they have props. The types file should be named [ComponentName].types.ts:

```typescript
export interface IUserProfileProps {
  userId: string;
  isActive?: boolean;
}
```

## Theme System

The application uses a centralized dark theme defined in `src/renderer/theme.ts`. Always import and use theme constants for colors, fonts, spacing, and border radius:

```typescript
import { theme } from '../../theme';

// Use theme colors
backgroundColor: theme.colors.background.primary,
color: theme.colors.text.primary,

// Use theme spacing
padding: theme.spacing.md,
gap: theme.spacing.lg,

// Use theme fonts
fontFamily: theme.fonts.primary, // Geist Mono

// Use theme border radius
borderRadius: theme.borderRadius.md,
```

## Shared Components

Reusable UI components (Button, Input, etc.) should be placed in `src/renderer/components/shared/` folder. These components follow the same structure as regular components and should be used throughout the application for consistency.

Example usage:

```tsx
import Button from '../shared/button/Button';
import Input from '../shared/input/Input';
```

## Context Pattern

React contexts should be placed in `src/context/[context-name]/` with the following structure:

```
context/
  server/
    ServerContext.tsx          # Context provider and hook
    ServerContext.types.ts     # Context types and interfaces
```

Context files should export both the provider component and a custom hook:

```typescript
export function ServerProvider({ children }: IServerProviderProps) {
  // Context logic
  return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>;
}

export function useServerContext() {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('useServerContext must be used within a ServerProvider');
  }
  return context;
}
```

## Services Pattern

HTTP services should be placed in `src/services/[service-name]/` with the following structure:

```
services/
  leekwars-laboratory/
    LeekWarsLaboratoryService.ts       # Service implementation
    LeekWarsLaboratoryService.types.ts # Service types and interfaces
```

Services should be exported as singleton instances:

```typescript
class LeekWarsLaboratoryService {
  async checkServerStatus({ port, timeout = 5000 }: ICheckServerStatusParams) {
    // Service logic with JSON headers
    const response = await fetch(`http://localhost:${port}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }
}

export default new LeekWarsLaboratoryService();
```

## Layout Structure

The application uses a consistent layout structure:

- `src/renderer/layout/` - Main layout components
  - `Layout.tsx` - Main layout wrapper with context providers
  - `header/` - Header component
  - `body/` - Body component that renders route content
  - `left-panel/` - Left sidebar navigation
  - `right-panel/` - Right sidebar for additional options

## Font and Styling

- **Default font**: Geist Mono (loaded from Google Fonts)
- **Font fallbacks**: 'Consolas', 'Monaco', monospace
- All components should use `theme.fonts.primary` for consistency
