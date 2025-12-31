We are building an electron application, using react and typescript for the renderer process, and nodejs for the main process. The application is open-source and we want to follow best practices for code quality, readability, and maintainability. Please follow these guidelines when contributing code:

React components should have their own folder with a kebab-case name, the component itself will have a PascalCase name. Each component folder should contain an [ComponentName].tsx file for the component code, and a [ComponentName].styles.ts file for the component styles.

Here is an example style file structure for a component named UserProfile:

```src/
  components/
    user-profile/
      UserProfile.tsx
      UserProfile.styles.ts
```

And here is an example of how to define styles in the UserProfile.styles.ts file:

```typescript
export interface IUserProfileStyles {
  container: React.CSSProperties;
}

export const userProfileStyles: IUserProfileStyles = {
  container: {
    display: 'flex',
    padding: 20,
    gap: 20,
    width: '100%',
  },
};
```

It should be imported and used in the UserProfile.tsx file like this:

```jsx
import React from 'react';
import { userProfileStyles as styles } from './UserProfile.styles';

const UserProfile: React.FC = () => {
  return <div style={styles.container}>User Profile Content</div>;
};
```

React components should also have a types file if they have props. Here is an example of a types file for the UserProfile component:

```typescript
export interface IUserProfileProps {
  userId: string;
}
```

This types file should be named UserProfile.types.ts and imported in the UserProfile.tsx file like this:

```typescript
import React from 'react';
import { IUserProfileProps } from './UserProfile.types';
```
