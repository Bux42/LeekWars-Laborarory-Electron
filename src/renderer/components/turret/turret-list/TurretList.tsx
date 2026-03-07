import { useMemo, useState } from 'react';
import { Col, List, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ITurretListProps } from './TurretList.types';
import { turretListStyles as styles } from './TurretList.styles';
import { SortField, SortDirection } from '../../leek/leek-list/LeekList.types';
import { TurretResponse } from '../../../../services/leekwarsToolsAPI.schemas';
import { theme } from '../../../theme';
import TurretImage from '../turret-image/TurretImage';
import Dropdown from '../../shared/dropdown/Dropdown';

function TurretList({ turrets, getDropdownItems }: ITurretListProps) {
  const navigate = useNavigate();

  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleDropdown = (leekId: string) => {
    setOpenDropdown(openDropdown === leekId ? null : leekId);
  };

  const sortedTurrets = useMemo(() => {
    return [...turrets].sort((a: TurretResponse, b: TurretResponse) => {
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
  }, [sortField, sortDirection, turrets]);

  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? '▲' : '▼';
  };

  const getThStyle = (field: SortField) => ({
    ...styles.headerCell,
    ...styles.sortableHeaderCell,
    backgroundColor:
      sortField === field
        ? theme.colors.background.tertiary
        : theme.colors.background.elevated,
  });

  return (
    <div style={styles.container}>
      <List
        bordered
        dataSource={sortedTurrets}
        locale={{ emptyText: 'No turrets found.' }}
        header={
          <Row style={styles.headerRow} gutter={12} align="middle">
            <Col flex="56px">
              <Typography.Text style={styles.headerCell}>Image</Typography.Text>
            </Col>
            <Col flex="2">
              <button
                type="button"
                style={getThStyle('name')}
                onClick={() => handleSort('name')}
              >
                Name
                <span style={styles.sortIndicator}>
                  {getSortIndicator('name')}
                </span>
              </button>
            </Col>
            <Col flex="120px">
              <button
                type="button"
                style={getThStyle('level')}
                onClick={() => handleSort('level')}
              >
                Level
                <span style={styles.sortIndicator}>
                  {getSortIndicator('level')}
                </span>
              </button>
            </Col>
            <Col flex="2">
              <button
                type="button"
                style={getThStyle('ai')}
                onClick={() => handleSort('ai')}
              >
                AI
                <span style={styles.sortIndicator}>
                  {getSortIndicator('ai')}
                </span>
              </button>
            </Col>
            {getDropdownItems && (
              <Col flex="80px">
                <Typography.Text style={styles.headerCell}>
                  Actions
                </Typography.Text>
              </Col>
            )}
          </Row>
        }
        renderItem={(turret, index) => (
          <List.Item
            key={turret.id ?? `${turret.name ?? 'turret'}-${index}`}
            style={styles.listItem}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.colors.background.tertiary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.colors.background.secondary;
            }}
          >
            <Row style={styles.itemRow} gutter={12} align="middle">
              <Col flex="56px">
                <TurretImage
                  turret={turret}
                  showTooltip
                  height={40}
                  width={40}
                />
              </Col>
              <Col flex="2">
                <Typography.Text style={styles.valueText}>
                  {turret.name ?? 'Unnamed Turret'}
                </Typography.Text>
              </Col>
              <Col flex="120px">
                <Typography.Text style={styles.valueText}>
                  {turret.build?.level ?? '-'}
                </Typography.Text>
              </Col>
              <Col flex="2">
                {turret.ai ? (
                  <button
                    type="button"
                    style={styles.hashLink}
                    onClick={() => navigate(`/ai/${turret.ai?.id}`)}
                  >
                    {turret.ai?.name}
                  </button>
                ) : (
                  <Typography.Text style={styles.emptyAiText}>
                    No AI
                  </Typography.Text>
                )}
              </Col>
              {getDropdownItems && (
                <Col flex="80px" style={styles.actionsCell}>
                  <Dropdown
                    items={getDropdownItems(turret)}
                    isOpen={openDropdown === (turret.id ?? '')}
                    onToggle={() => toggleDropdown(turret.id ?? '')}
                  />
                </Col>
              )}
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}

export default TurretList;
