import React from 'react';
import { bodyStyles as styles } from './Body.styles';
import { IBodyProps } from './Body.types';

function Body({ children }: IBodyProps) {
  return <main style={styles.container}>{children}</main>;
}

export default Body;
