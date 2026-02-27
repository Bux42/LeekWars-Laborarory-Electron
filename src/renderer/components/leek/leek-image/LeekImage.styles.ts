export interface ILeekImageStyles {
  image: (url: string | undefined) => React.CSSProperties;
}

export const leekImageStyles: ILeekImageStyles = {
  image: (url: string | undefined) => ({
    backgroundImage: `url(${url})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    width: '100%',
    cursor: 'pointer',
  }),
};
