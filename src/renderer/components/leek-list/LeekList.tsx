import React, { useState, useMemo } from 'react';
import { leekListStyles as styles } from './LeekList.styles';
import { ILeekListProps, SortField, SortDirection } from './LeekList.types';
import { ILeek } from '../../../services/leekwars-laboratory/types/leek/Leek.types';
import { theme } from '../../theme';
import { getImage } from '../../utils/ImageLoader';
import Dropdown from '../shared/dropdown/Dropdown';
import { IDropdownItem } from '../shared/dropdown/Dropdown.types';
import HoverTooltip from '../shared/hover-tooltip/HoverTooltip';
import LeekDetail from '../leek-detail/LeekDetail';
import { useDeleteLeek } from '../../../hooks/leeks/useDeleteLeek';

function LeekList({ leeks }: ILeekListProps) {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const deleteLeekMutation = useDeleteLeek();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEdit = (leek: ILeek) => {
    // TODO: Implement edit functionality
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDuplicate = (leek: ILeek) => {
    // TODO: Implement duplicate functionality
  };

  const handleDelete = async (leek: ILeek) => {
    if (
      window.confirm(`Are you sure you want to delete leek "${leek.name}"?`)
    ) {
      try {
        await deleteLeekMutation.mutateAsync(leek.id);
      } catch (err) {
        console.error('Failed to delete leek:', err);
      }
    }
  };

  const toggleDropdown = (leekId: string) => {
    setOpenDropdown(openDropdown === leekId ? null : leekId);
  };

  const getDropdownItems = (leek: ILeek): IDropdownItem[] => [
    {
      label: 'Edit',
      onClick: () => handleEdit(leek),
    },
    {
      label: 'Duplicate',
      onClick: () => handleDuplicate(leek),
    },
    {
      label: 'Delete',
      onClick: () => handleDelete(leek),
      variant: 'danger',
    },
  ];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedLeeks = useMemo(() => {
    return [...leeks].sort((a: ILeek, b: ILeek) => {
      if (sortField === 'name') {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortDirection === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
      if (sortField === 'level') {
        return sortDirection === 'asc'
          ? a.build.level - b.build.level
          : b.build.level - a.build.level;
      }
      if (sortField === 'talent') {
        return sortDirection === 'asc' ? a.elo - b.elo : b.elo - a.elo;
      }
      if (sortField === 'ai') {
        const aiA = a.aiFilePath.toLowerCase();
        const aiB = b.aiFilePath.toLowerCase();
        return sortDirection === 'asc'
          ? aiA.localeCompare(aiB)
          : aiB.localeCompare(aiA);
      }

      return 0;
    });
  }, [sortField, sortDirection, leeks]);

  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? '▲' : '▼';
  };

  const getThStyle = (field: SortField) => ({
    ...styles.th,
    ...styles.thSortable,
    backgroundColor:
      sortField === field
        ? theme.colors.background.tertiary
        : theme.colors.background.elevated,
  });

  return (
    <table style={styles.table}>
      <thead style={styles.thead}>
        <tr>
          <th style={styles.th}>Image</th>
          <th style={getThStyle('name')} onClick={() => handleSort('name')}>
            Name
            <span style={styles.sortIndicator}>{getSortIndicator('name')}</span>
          </th>
          <th style={getThStyle('level')} onClick={() => handleSort('level')}>
            Level
            <span style={styles.sortIndicator}>
              {getSortIndicator('level')}
            </span>
          </th>
          <th style={getThStyle('talent')} onClick={() => handleSort('talent')}>
            Talent
            <span style={styles.sortIndicator}>
              {getSortIndicator('talent')}
            </span>
          </th>
          <th style={getThStyle('ai')} onClick={() => handleSort('ai')}>
            AI
            <span style={styles.sortIndicator}>{getSortIndicator('ai')}</span>
          </th>
          <th style={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody style={styles.tbody}>
        {sortedLeeks.map((leek) => (
          <tr
            key={leek.id}
            style={styles.tr}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.colors.background.tertiary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.colors.background.secondary;
            }}
          >
            <td style={styles.td}>
              <HoverTooltip tooltip={<LeekDetail leek={leek} />}>
                <img
                  src={getImage(`leekwars/image/leek/${leek.imageName}`)}
                  alt={leek.name}
                  style={styles.leekImage}
                />
              </HoverTooltip>
            </td>
            <td style={styles.td}>{leek.name}</td>
            <td style={styles.td}>{leek.build.level}</td>
            <td style={styles.td}>
              <img
                src={getImage('leekwars/image/talent')}
                alt="Talent"
                style={styles.talentIcon}
              />
              {Number.prototype.toLocaleString.call(leek.elo)}
            </td>
            <td style={styles.td}>{leek.aiFilePath}</td>
            <td style={styles.actionsCell}>
              <Dropdown
                items={getDropdownItems(leek)}
                isOpen={openDropdown === leek.id}
                onToggle={() => toggleDropdown(leek.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeekList;
