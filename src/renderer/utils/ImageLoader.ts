import { loadAssetsFromContext } from './AssetLoader';

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

const { assets: images, keys: imageKeys } = loadAssetsFromContext<string>(
  imageContext,
  /\.(png|jpe?g|gif)$/,
);

export { images };

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
