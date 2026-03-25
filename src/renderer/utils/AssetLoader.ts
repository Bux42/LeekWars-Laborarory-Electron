export interface IWebpackContext<TModule = unknown> {
  keys(): string[];
  (id: string): TModule;
}

export interface ILoadAssetsResult<TAsset> {
  assets: Record<string, TAsset>;
  keys: string[];
}

export function loadAssetsFromContext<TModule, TAsset = TModule>(
  context: IWebpackContext<TModule>,
  extensionPattern: RegExp,
  mapModule?: (module: TModule) => TAsset,
): ILoadAssetsResult<TAsset> {
  const assets: Record<string, TAsset> = {};
  const keys: string[] = [];

  context.keys().forEach((key: string) => {
    const assetName = key.replace('./', '').replace(extensionPattern, '');
    const moduleValue = context(key);

    assets[assetName] = mapModule
      ? mapModule(moduleValue)
      : (moduleValue as unknown as TAsset);
    keys.push(assetName);
  });

  return {
    assets,
    keys,
  };
}
