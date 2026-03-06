import EntityStatItem from './entity-stat-item.ts/EntityStatItem';
import { IEntityStatsProps } from './EntityStats.types';
import { entityStatsStyles as styles } from './EntityStats.styles';

function EntityStats({ minStats, totalStats }: IEntityStatsProps) {
  return (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>Stats</h3>
      <div style={styles.statsGrid}>
        <EntityStatItem
          iconPath="leekwars/image/charac/life"
          label="Life"
          value={totalStats.life}
          minValue={minStats?.life}
        />
        <EntityStatItem
          iconPath="leekwars/image/charac/strength"
          label="Strength"
          value={totalStats.strength}
          minValue={minStats?.strength}
        />
        <EntityStatItem
          iconPath="leekwars/image/charac/wisdom"
          label="Wisdom"
          value={totalStats.wisdom}
          minValue={minStats?.wisdom}
        />
        <EntityStatItem
          iconPath="leekwars/image/charac/agility"
          label="Agility"
          value={totalStats.agility}
          minValue={minStats?.agility}
        />
        <EntityStatItem
          iconPath="leekwars/image/charac/resistance"
          label="Resistance"
          value={totalStats.resistance}
          minValue={minStats?.resistance}
        />
        <EntityStatItem
          iconPath="leekwars/image/charac/science"
          label="Science"
          value={totalStats.science}
          minValue={minStats?.science}
        />
        <EntityStatItem
          iconPath="leekwars/image/charac/magic"
          label="Magic"
          value={totalStats.magic}
          minValue={minStats?.magic}
        />
        <EntityStatItem
          iconPath="leekwars/image/charac/frequency"
          label="Frequency"
          value={totalStats.frequency}
        />
        <EntityStatItem
          iconPath="leekwars/image/charac/cores"
          label="Cores"
          value={totalStats.cores}
        />
        <EntityStatItem
          iconPath="leekwars/image/charac/ram"
          label="RAM"
          value={totalStats.ram}
        />
        <EntityStatItem
          iconPath="leekwars/image/charac/tp"
          label="TP"
          value={totalStats.tp}
        />
        <EntityStatItem
          iconPath="leekwars/image/charac/mp"
          label="MP"
          value={totalStats.mp}
        />
      </div>
    </div>
  );
}

export default EntityStats;
