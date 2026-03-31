import { useState, useMemo } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button, Col, List, Row, Typography } from 'antd';
import { leekListStyles as styles } from './LeekList.styles';
import { ILeekListProps, SortField, SortDirection } from './LeekList.types';
import { LeekResponse } from '../../../../services/leekwarsToolsAPI.schemas';
import { theme } from '../../../theme';
import Dropdown from '../../shared/dropdown/Dropdown';
import LeekImageHover from '../leek-image-hover/LeekImageHover';

function LeekList({
  leeks,
  getDropdownItems,
  onRemoveLeek,
  onAddLeek,
}: ILeekListProps) {
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
        dataSource={sortedLeeks}
        locale={{ emptyText: 'No leeks found.' }}
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
            {(getDropdownItems || onRemoveLeek || onAddLeek) && (
              <Col flex="80px">
                <Typography.Text style={styles.headerCell}>
                  Actions
                </Typography.Text>
              </Col>
            )}
          </Row>
        }
        renderItem={(leek, index) => (
          <List.Item
            key={leek.id ?? `${leek.name ?? 'leek'}-${index}`}
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
                <div style={styles.leekImageCell}>
                  <LeekImageHover leek={leek} height={40} width={40} />
                </div>
              </Col>
              <Col flex="2">
                <Typography.Text style={styles.valueText}>
                  {leek.name ?? 'Unnamed Leek'}
                </Typography.Text>
              </Col>
              <Col flex="120px">
                <Typography.Text style={styles.valueText}>
                  {leek.build?.level ?? '-'}
                </Typography.Text>
              </Col>
              <Col flex="2">
                {leek.ai ? (
                  <button
                    type="button"
                    style={styles.hashLink}
                    onClick={() => navigate(`/ai/${leek.ai?.id}`)}
                  >
                    {leek.ai?.name}
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
                    items={getDropdownItems(leek)}
                    isOpen={openDropdown === (leek.id ?? '')}
                    onToggle={() => toggleDropdown(leek.id ?? '')}
                  />
                </Col>
              )}
              {onRemoveLeek && (
                <Button
                  onClick={() => onRemoveLeek(leek.id ?? '')}
                  shape="circle"
                  danger
                  icon={<DeleteOutlined />}
                />
              )}
              {onAddLeek && (
                <Button
                  onClick={() => onAddLeek(leek.id ?? '')}
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

export default LeekList;
