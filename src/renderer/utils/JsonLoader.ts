import { loadAssetsFromContext } from './AssetLoader';

// Webpack-specific require.context type declaration
declare const require: {
  context(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp,
  ): {
    keys(): string[];
    (id: string): unknown;
  };
};

const jsonContext = require.context('../../../assets', true, /\.json$/);

const { assets: jsons, keys: jsonKeys } = loadAssetsFromContext<unknown>(
  jsonContext,
  /\.json$/,
  (jsonModule) =>
    typeof jsonModule === 'object' &&
    jsonModule !== null &&
    'default' in jsonModule
      ? (jsonModule as { default: unknown }).default
      : jsonModule,
);

export { jsons };

// Generate type from available JSON files (for autocomplete)
export type JsonPath = (typeof jsonKeys)[number];

export function getJson(path: string): unknown {
  return jsons[path];
}

// Type-safe version
export function getJsonSafe(path: JsonPath): unknown {
  return jsons[path];
}
