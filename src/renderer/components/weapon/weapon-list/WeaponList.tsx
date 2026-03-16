import WeaponImage from '../weapon-image/WeaponImage';
import { IWeaponListProps } from './WeaponList.types';
import { weaponListStyles as styles } from './WeaponList.styles';

function WeaponList({ weaponIds, width = 48, height = 48 }: IWeaponListProps) {
  return (
    <div style={styles.itemsGrid}>
      {weaponIds.map((weaponId) => (
        <WeaponImage
          key={weaponId}
          weaponId={weaponId}
          width={width}
          height={height}
        />
      ))}
    </div>
  );
}

export default WeaponList;
