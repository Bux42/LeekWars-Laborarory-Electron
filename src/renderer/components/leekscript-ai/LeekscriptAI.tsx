import React from 'react';
import { ILeekscriptAIProps } from './LeekscriptAI.types';
import { leekscriptAIStyles as styles } from './LeekscriptAI.styles';
import GitInfos from './git-infos/GitInfos';
import MergedCode from './merged-code/MergedCode';

const LeekscriptAI: React.FC<ILeekscriptAIProps> = ({ leekscriptAI }) => {
  return (
    <div style={styles.container} id={`leekscript-ai-${leekscriptAI.id}`}>
      <div>
        <h3 style={styles.sectionTitle}>LeekScript AI Details</h3>
        <GitInfos gitInfos={leekscriptAI.gitInfos} />
      </div>

      <div>
        <MergedCode mergedCode={leekscriptAI.mergedCode} />
      </div>
    </div>
  );
};

export default LeekscriptAI;
