import React from 'react';
import HoverTooltip from '../shared/hover-tooltip/HoverTooltip';
import { IEntityAiPathProps } from './EntityAiPath.types';

const EntityAiPath: React.FC<IEntityAiPathProps> = ({ entityAiPath }) => {
  // Extract filename from path (handles both / and \ separator)
  const fileName = entityAiPath.split(/[/\\]/).pop() || entityAiPath;

  return (
    <HoverTooltip tooltip={entityAiPath}>
      <span style={{ cursor: 'help' }}>{fileName}</span>
    </HoverTooltip>
  );
};

export default EntityAiPath;
