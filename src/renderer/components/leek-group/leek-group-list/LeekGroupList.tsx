import LeekGroupCard from '../leek-group-card/LeekGroupCard';
import { ILeekGroupListProps } from './LeekGroupList.types';

function LeekGroupList({
  leekGroups,
  onRemoveLeekGroup,
  showAddLeekButton,
  onAddLeekGroup,
  showAddGroupButton,
  showRemoveLeekGroupButton,
}: ILeekGroupListProps) {
  return (
    <div>
      {leekGroups.map((group) => (
        <LeekGroupCard
          key={group.id}
          leekGroup={group}
          showAddLeekButton={showAddLeekButton}
          showRemoveLeekGroupButton={showRemoveLeekGroupButton}
          onRemoveLeekGroup={onRemoveLeekGroup}
          showAddGroupButton={showAddGroupButton}
          onAddLeekGroup={onAddLeekGroup}
        />
      ))}
      {leekGroups.length === 0 && <p>No leek groups available.</p>}
    </div>
  );
}

export default LeekGroupList;
