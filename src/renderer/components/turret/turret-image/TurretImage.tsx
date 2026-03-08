import { useMemo } from 'react';
import { getImage } from '../../../utils/ImageLoader';
import EntityBuild from '../../entity/entity-build/EntityBuild';
import HoverTooltip from '../../shared/hover-tooltip/HoverTooltip';
import { ITurretImageProps } from './TurretImage.types';
import { turretImageStyles } from './TurretImage.styles';
import {
  TURRET_DATA,
  TURRET_PIECE_SIZE,
} from '../../../constants/leekwars/Turrets';

function TurretImage({
  turret,
  showTooltip = false,
  width,
  height,
}: ITurretImageProps) {
  const data = useMemo(() => {
    return TURRET_DATA[Math.floor(turret.build.level / 10)];
  }, [turret.build.level]);

  const offset = useMemo(() => {
    return TURRET_PIECE_SIZE[data[0].t][1] * 0.3 - data[0].z;
  }, [data]);

  const pieces = useMemo(() => {
    let z = offset; // offset
    return data.map((piece) => {
      const p = {
        t: piece.t,
        w: TURRET_PIECE_SIZE[piece.t][0],
        z: (z += piece.z) / 0.3,
      };
      return p;
    });
  }, [data, offset]);

  const svgHeight = useMemo(() => {
    return (data.reduce((s, p) => s + p.z, 0) + offset) / 0.3;
  }, [data, offset]);

  const svgWidth = useMemo(() => {
    return pieces.reduce((w, p) => Math.max(w, p.w), 0);
  }, [pieces]);

  const viewBox = useMemo(() => {
    const w = svgWidth;
    const h = svgHeight;
    return `0 0 ${w} ${h}`;
  }, [svgWidth, svgHeight]);

  const skinName = 'blue';

  if (showTooltip) {
    return (
      <HoverTooltip
        tooltip={
          <EntityBuild entityBuild={turret.build} includeBaseStats={false} />
        }
      >
        <div style={turretImageStyles.container(width, height)}>
          <svg
            viewBox={viewBox}
            preserveAspectRatio="xMidYMid meet"
            style={turretImageStyles.svg}
          >
            {pieces.map((piece, index) => (
              <image
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                x={(svgWidth - piece.w) / 2}
                y={svgHeight - piece.z}
                href={getImage(`leekwars/image/turret/${piece.t}_${skinName}`)}
              />
            ))}
          </svg>
        </div>
      </HoverTooltip>
    );
  }

  return (
    <div style={turretImageStyles.container(width, height)}>
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={turretImageStyles.svg}
      >
        {pieces.map((piece, index) => (
          <image
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            x={(svgWidth - piece.w) / 2}
            y={svgHeight - piece.z}
            href={getImage(`leekwars/image/turret/${piece.t}_${skinName}`)}
          />
        ))}
      </svg>
    </div>
  );
}

export default TurretImage;
