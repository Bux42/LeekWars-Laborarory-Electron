// Webpack-specific require.context type declaration
declare const require: {
  context(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp,
  ): {
    keys(): string[];
    (id: string): string;
  };
};

const imageContext = require.context(
  '../../../assets',
  true,
  /\.(png|jpe?g|gif)$/,
);

export const images: Record<string, string> = {};
const imageKeys: string[] = [];

imageContext.keys().forEach((key: string) => {
  const imageName = key.replace('./', '').replace(/\.(png|jpe?g|gif)$/, '');
  images[imageName] = imageContext(key);
  imageKeys.push(imageName);
});

console.log(images);

// Generate type from available images (for autocomplete)
export type ImagePath = (typeof imageKeys)[number];

export function getImage(path: string): string | undefined {
  return images[path];
}

// Type-safe version
export function getImageSafe(path: ImagePath): string {
  return images[path];
}
