import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { leekListStyles as styles } from './LeekList.styles';
import { ILeekListProps, SortField, SortDirection } from './LeekList.types';
import { LeekResponse } from '../../../../services/leekwarsToolsAPI.schemas';
import { theme } from '../../../theme';
import { getImage } from '../../../utils/ImageLoader';
import Dropdown from '../../shared/dropdown/Dropdown';
import HoverTooltip from '../../shared/hover-tooltip/HoverTooltip';
import LeekDetail from '../leek-detail/LeekDetail';

function LeekList({ leeks, getDropdownItems }: ILeekListProps) {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (leekId: string) => {
    setOpenDropdown(openDropdown === leekId ? null : leekId);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedLeeks = useMemo(() => {
    return [...leeks].sort((a: LeekResponse, b: LeekResponse) => {
      if (sortField === 'name') {
        const nameA = (a.name ?? '').toLowerCase();
        const nameB = (b.name ?? '').toLowerCase();
        return sortDirection === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
      if (sortField === 'level') {
        return sortDirection === 'asc'
          ? (a.build?.level ?? 0) - (b.build?.level ?? 0)
          : (b.build?.level ?? 0) - (a.build?.level ?? 0);
      }
      if (sortField === 'ai') {
        const aiA = (a.ai?.id ?? '').toLowerCase();
        const aiB = (b.ai?.id ?? '').toLowerCase();
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
          <th style={getThStyle('ai')} onClick={() => handleSort('ai')}>
            AI
            <span style={styles.sortIndicator}>{getSortIndicator('ai')}</span>
          </th>
          {getDropdownItems && <th style={styles.th}>Actions</th>}
        </tr>
      </thead>
      <tbody style={styles.tbody}>
        {sortedLeeks.map((leek, index) => (
          <tr
            key={leek.id ?? `${leek.name ?? 'leek'}-${index}`}
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
                  src={getImage(
                    `leekwars/image/leek/${leek.imageName ?? 'leek/1'}`,
                  )}
                  alt={leek.name ?? 'Leek'}
                  style={styles.leekImage}
                />
              </HoverTooltip>
            </td>
            <td style={styles.td}>{leek.name ?? 'Unnamed Leek'}</td>
            <td style={styles.td}>{leek.build?.level ?? '-'}</td>
            <td style={styles.td}>
              {leek.ai ? (
                <button
                  type="button"
                  style={styles.hashLink}
                  onClick={() => navigate(`/ai/${leek.ai?.id}`)}
                >
                  {leek.ai?.name}
                </button>
              ) : (
                <span style={{ color: theme.colors.text.tertiary }}>No AI</span>
              )}
            </td>
            {getDropdownItems && (
              <td style={styles.actionsCell}>
                <Dropdown
                  items={getDropdownItems(leek)}
                  isOpen={openDropdown === (leek.id ?? '')}
                  onToggle={() => toggleDropdown(leek.id ?? '')}
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeekList;
