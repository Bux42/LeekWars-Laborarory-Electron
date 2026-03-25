import { getImage } from '../../../utils/ImageLoader';
import HoverTooltip from '../../shared/hover-tooltip/HoverTooltip';
import { IBossImageProps } from './BossImage.types';
import { bossImageStyles as styles } from './BossImage.styles';
import EntityBuild from '../../entity/entity-build/EntityBuild';

function BossImage({ boss, showTooltip, height, width }: IBossImageProps) {
  if (showTooltip) {
    return (
      <HoverTooltip
        tooltip={<EntityBuild entityBuild={boss.build} />}
        height={height}
        width={width}
      >
        <div
          style={styles.image(
            getImage(`leekwars/image/mob/${boss.internalName ?? 'leek/1'}`),
          )}
        />
      </HoverTooltip>
    );
  }
  return (
    <div style={{ height, width }}>
      <div
        style={styles.image(
          getImage(`leekwars/image/mob/${boss.internalName ?? 'leek/1'}`),
        )}
      />
    </div>
  );
}

export default BossImage;
