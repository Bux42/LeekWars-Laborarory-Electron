import React, { useState, useMemo, useEffect } from 'react';
import { leeksStyles as styles } from './Leeks.styles';
import { theme } from '../../theme';
import { getImage } from '../../utils/ImageLoader';
import { useServerContext } from '../../../context/server/ServerContext';
import { ILeek } from '../../../services/leekwars-laboratory/leek/Leek.types';

type SortField = 'name' | 'level' | 'talent' | 'ai';
type SortDirection = 'asc' | 'desc';

function Leeks() {
  const { port, service } = useServerContext();
  const [leeks, setLeeks] = useState<ILeek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  useEffect(() => {
    const fetchLeeks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await service.getLeeks({ port });
        setLeeks(response.leeks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch leeks');
      } finally {
        setLoading(false);
      }
    };

    fetchLeeks();
  }, [port, service]);

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

  if (loading) {
    return (
      <div style={styles.container}>
        <h1>Leeks</h1>
        <p>Loading leeks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <h1>Leeks</h1>
        <p style={{ color: theme.colors.accent.error }}>Error: {error}</p>
      </div>
    );
  }

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
                  src={getImage(leek.imageName)}
                  alt={leek.name}
                  style={styles.leekImage}
                />
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leeks;
