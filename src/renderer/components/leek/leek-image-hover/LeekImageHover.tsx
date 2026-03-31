import HoverTooltip from '../../shared/hover-tooltip/HoverTooltip';
import LeekDetail from '../leek-detail/LeekDetail';
import LeekImage from '../leek-image/LeekImage';
import { ILeekImageHoverProps } from './LeekImageHover.types';

function LeekImageHover({ leek, height, width }: ILeekImageHoverProps) {
  return (
    <HoverTooltip
      tooltip={<LeekDetail leek={leek} />}
      height={height}
      width={width}
    >
      <LeekImage leek={leek} height={height} width={width} />
    </HoverTooltip>
  );
}

export default LeekImageHover;
