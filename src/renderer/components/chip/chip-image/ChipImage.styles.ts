export interface ChipImageStyles {
  image: (
    url: string | undefined,
    width?: number | string,
    height?: number | string,
  ) => React.CSSProperties;
}

export const chipImageStyles: ChipImageStyles = {
  image: (
    url: string | undefined,
    width?: number | string,
    height?: number | string,
  ) => ({
    backgroundImage: `url(${url})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: height ?? '100%',
    width: width ?? '100%',
    cursor: 'pointer',
  }),
};
