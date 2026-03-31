import { useState, useMemo } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button, Col, List, Row, Typography } from 'antd';
import { mobListStyles as styles } from './MobList.styles';
import { IMobListProps, SortField, SortDirection } from './MobList.types';
import { MobResponse } from '../../../../services/leekwarsToolsAPI.schemas';
import { theme } from '../../../theme';
import Dropdown from '../../shared/dropdown/Dropdown';
import BossImage from '../../boss/boss-image/BossImage';

function MobList({
  mobs,
  getDropdownItems,
  onRemoveMob,
  onAddMob,
}: IMobListProps) {
  const navigate = useNavigate();

  const [sortField, setSortField] = useState<SortField | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (mobId: string) => {
    setOpenDropdown(openDropdown === mobId ? null : mobId);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedMobs = useMemo(() => {
    return [...mobs].sort((a: MobResponse, b: MobResponse) => {
      if (sortField === 'name') {
        const nameA = (a.name ?? '').toLowerCase();
        const nameB = (b.name ?? '').toLowerCase();
        return sortDirection === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
      if (sortField === 'type') {
        const typeA = (a.type ?? '').toLowerCase();
        const typeB = (b.type ?? '').toLowerCase();
        return sortDirection === 'asc'
          ? typeA.localeCompare(typeB)
          : typeB.localeCompare(typeA);
      }
      if (sortField === 'level') {
        return sortDirection === 'asc'
          ? (a.build?.level ?? 0) - (b.build?.level ?? 0)
          : (b.build?.level ?? 0) - (a.build?.level ?? 0);
      }
      if (sortField === 'ai') {
        const aiA = (a.ai?.name ?? '').toLowerCase();
        const aiB = (b.ai?.name ?? '').toLowerCase();
        return sortDirection === 'asc'
          ? aiA.localeCompare(aiB)
          : aiB.localeCompare(aiA);
      }
      return 0;
    });
  }, [sortField, sortDirection, mobs]);

  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? '▲' : '▼';
  };

  const getThStyle = (field: SortField) => ({
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
        dataSource={sortedMobs}
        locale={{ emptyText: 'No mobs found.' }}
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
            <Col flex="2">
              <button
                type="button"
                style={getThStyle('type')}
                onClick={() => handleSort('type')}
              >
                Type
                <span style={styles.sortIndicator}>
                  {getSortIndicator('type')}
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
            {(getDropdownItems || onRemoveMob || onAddMob) && (
              <Col flex="80px">
                <Typography.Text style={styles.headerCell}>
                  Actions
                </Typography.Text>
              </Col>
            )}
          </Row>
        }
        renderItem={(mob, index) => (
          <List.Item
            key={mob.id ?? `${mob.name ?? 'mob'}-${index}`}
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
                <BossImage boss={mob} height={48} width={48} showTooltip />
              </Col>
              <Col flex="2">
                <Typography.Text style={styles.valueText}>
                  {mob.name ?? 'Unnamed Mob'}
                </Typography.Text>
              </Col>
              <Col flex="2">
                <Typography.Text style={styles.valueText}>
                  {mob.type ?? '-'}
                </Typography.Text>
              </Col>
              <Col flex="120px">
                <Typography.Text style={styles.valueText}>
                  {mob.build?.level ?? '-'}
                </Typography.Text>
              </Col>
              <Col flex="2">
                {mob.ai ? (
                  <button
                    type="button"
                    style={styles.hashLink}
                    onClick={() => navigate(`/ai/${mob.ai?.id}`)}
                  >
                    {mob.ai?.name}
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
                    items={getDropdownItems(mob)}
                    isOpen={openDropdown === (mob.id ?? '')}
                    onToggle={() => toggleDropdown(mob.id ?? '')}
                  />
                </Col>
              )}
              {onRemoveMob && (
                <Button
                  onClick={() => onRemoveMob(mob.id ?? '')}
                  shape="circle"
                  danger
                  icon={<DeleteOutlined />}
                />
              )}
              {onAddMob && (
                <Button
                  onClick={() => onAddMob(mob.id ?? '')}
                  shape="circle"
                  type="primary"
                  icon={<PlusOutlined />}
                />
              )}
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}

export default MobList;
