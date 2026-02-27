import { getImage } from '../../../utils/ImageLoader';
import HoverTooltip from '../../shared/hover-tooltip/HoverTooltip';
import LeekDetail from '../leek-detail/LeekDetail';
import { leekImageStyles } from './LeekImage.styles';
import { ILeekImageProps } from './LeekImage.types';

function LeekImage({ leek, showTooltip, height, width }: ILeekImageProps) {
  if (showTooltip) {
    return (
      <HoverTooltip
        tooltip={<LeekDetail leek={leek} />}
        height={height}
        width={width}
      >
        <div
          style={leekImageStyles.image(
            getImage(`leekwars/image/leek/${leek.imageName ?? 'leek/1'}`),
          )}
        />
      </HoverTooltip>
    );
  }
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
