import { useMemo } from 'react';
import { ITeamPickerProps } from './TeamPicker.types';
import LeekImage from '../../leek/leek-image/LeekImage';
import { teamPickerStyles as styles } from './TeamPicker.styles';
import TurretImage from '../../turret/turret-image/TurretImage';

function TeamPicker({
  label,
  availableTeams,
  selectedTeamIds,
  onTeamSelect,
}: ITeamPickerProps) {
  const filteredTeams = useMemo(
    () => availableTeams.filter((team) => !selectedTeamIds.includes(team.id)),
    [availableTeams, selectedTeamIds],
  );

  return (
    <div>
      <h3 style={styles.label}>{label}</h3>
      {filteredTeams.length === 0 ? (
        <p>No more teams available. All teams are already in this pool.</p>
      ) : (
        <div style={styles.teamsGrid}>
          {filteredTeams.map((team) => (
            <div
              aria-hidden="true"
              key={team.id}
              style={styles.teamItem}
              onClick={() => onTeamSelect(team.id)}
            >
              <div>{team.name}</div>
              <div>
                <TurretImage
                  turret={team.turret}
                  height={40}
                  width={40}
                  showTooltip
                />
                {team.leeks.map((leek) => (
                  <LeekImage
                    key={leek.id}
                    leek={leek}
                    height={40}
                    width={40}
                    showTooltip
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamPicker;
