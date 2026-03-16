import { WEAPONS_IDS_TO_NAMES } from '../../../constants/leekwars/Weapons';
import { getImage } from '../../../utils/ImageLoader';
import { IWeaponImageProps } from './WeaponImage.types';
import { weaponImageStyles as styles } from './WeaponImage.styles';

function WeaponImage({ weaponId, width, height }: IWeaponImageProps) {
  return (
    <div
      style={styles.image(
        getImage(`leekwars/image/weapon/${WEAPONS_IDS_TO_NAMES[weaponId]}`),
        width,
        height,
      )}
    />
  );
}

export default WeaponImage;
