import { getImage } from '../../../utils/ImageLoader';
import { leekImageStyles } from './LeekImage.styles';
import { ILeekImageProps } from './LeekImage.types';

function LeekImage({ leek, height, width }: ILeekImageProps) {
  return (
    <div style={{ height, width }}>
      <div
        style={leekImageStyles.image(
          getImage(`leekwars/image/leek/${leek.imageName ?? 'leek/1'}`),
        )}
      />
    </div>
  );
}

export default LeekImage;
