import React, { useState, useMemo } from 'react';
import { leeksStyles as styles } from './Leeks.styles';
import { ILeek, SortField, SortDirection } from './Leeks.types';
import { theme } from '../../theme';
import { getImage } from '../../utils/ImageLoader';

// Mock data - replace with actual API call later
const mockLeeks: ILeek[] = [
  {
    id: 1,
    name: 'SuperLeek',
    level: 100,
    talent: 1520,
    ai: 'aggressive_v2',
    image: 'leekwars/image/leek/leek1_front_apple',
  },
  {
    id: 2,
    name: 'DefenderLeek',
    level: 85,
    talent: 1234,
    ai: 'defensive',
    image: 'leekwars/image/leek/leek1_front_apple',
  },
  {
    id: 3,
    name: 'SpeedyLeek',
    level: 92,
    talent: 1450,
    ai: 'speed_rush',
    image: 'leekwars/image/leek/leek1_front_apple',
  },
  {
    id: 4,
    name: 'TankLeek',
    level: 78,
    talent: 1189,
    ai: 'tank_mode',
    image: 'leekwars/image/leek/leek1_front_apple',
  },
];

function Leeks() {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedLeeks = useMemo(() => {
    return [...mockLeeks].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [sortField, sortDirection]);

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
    <div style={styles.container}>
      <h1>Leeks</h1>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Image</th>
            <th style={getThStyle('name')} onClick={() => handleSort('name')}>
              Name
              <span style={styles.sortIndicator}>
                {getSortIndicator('name')}
              </span>
            </th>
            <th style={getThStyle('level')} onClick={() => handleSort('level')}>
              Level
              <span style={styles.sortIndicator}>
                {getSortIndicator('level')}
              </span>
            </th>
            <th
              style={getThStyle('talent')}
              onClick={() => handleSort('talent')}
            >
              Talent
              <span style={styles.sortIndicator}>
                {getSortIndicator('talent')}
              </span>
            </th>
            <th style={getThStyle('ai')} onClick={() => handleSort('ai')}>
              AI
              <span style={styles.sortIndicator}>{getSortIndicator('ai')}</span>
            </th>
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
                <img
                  src={getImage(leek.image)}
                  alt={leek.name}
                  style={styles.leekImage}
                />
              </td>
              <td style={styles.td}>{leek.name}</td>
              <td style={styles.td}>{leek.level}</td>
              <td style={styles.td}>
                <img
                  src={getImage('leekwars/image/talent')}
                  alt="Talent"
                  style={styles.talentIcon}
                />
                {Number.prototype.toLocaleString.call(leek.talent)}
              </td>
              <td style={styles.td}>{leek.ai}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leeks;
