import React, { useEffect, useMemo, useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { leftPanelStyles as styles } from './LeftPanel.styles';
import { theme } from '../../theme';

interface NavItem {
  path: string;
  label: string;
  children?: NavItem[];
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Home' },
  {
    path: '/pools',
    label: 'Pools',
    children: [
      { path: '/pools/duel', label: 'Duel' },
      { path: '/pools/farmer', label: 'Farmer' },
      { path: '/pools/team', label: 'Team' },
      {
        path: '/pools/boss',
        label: 'Boss',
        children: [{ path: '/pools/boss/pumpkin', label: 'Pumpkin' }],
      },
    ],
  },
  { path: '/leeks', label: 'Leeks' },
  { path: '/farmers', label: 'Farmers' },
  { path: '/turrets', label: 'Turrets' },
  { path: '/teams', label: 'Teams' },
  {
    path: '/mobs',
    label: 'Boss',
    children: [
      // { path: '/mobs/nasu', label: 'Nasu' },
      // { path: '/mobs/fennel', label: 'Fennel' },
      { path: '/mobs/pumpkin', label: 'Pumpkin' },
    ],
  },
  { path: '/leek-groups', label: 'Leek groups' },
  { path: '/ais', label: 'AIs' },
];

function LeftPanel() {
  const navigate = useNavigate();
  const location = useLocation();

  const { menuItems, parentByKey, allKeys } = useMemo(() => {
    const parentMap = new Map<string, string | undefined>();
    const keys = new Set<string>();

    const toMenuItems = (
      items: NavItem[],
      parentKey?: string,
    ): Required<MenuProps>['items'] => {
      return items.map((item) => {
        parentMap.set(item.path, parentKey);
        keys.add(item.path);

        return {
          key: item.path,
          label: item.label,
          children: item.children
            ? toMenuItems(item.children, item.path)
            : undefined,
        };
      });
    };

    return {
      menuItems: toMenuItems(NAV_ITEMS),
      parentByKey: parentMap,
      allKeys: keys,
    };
  }, []);

  const selectedKey = useMemo(() => {
    const { pathname } = location;

    if (allKeys.has(pathname)) {
      return pathname;
    }

    const matchingPath = Array.from(allKeys)
      .filter((path) => pathname.startsWith(`${path}/`))
      .sort((pathA, pathB) => pathB.length - pathA.length)[0];

    return matchingPath ?? '/';
  }, [allKeys, location]);

  const defaultOpenKeys = useMemo(() => {
    const keysToOpen: string[] = [];
    let currentKey = parentByKey.get(selectedKey);

    while (currentKey) {
      keysToOpen.unshift(currentKey);
      currentKey = parentByKey.get(currentKey);
    }

    return keysToOpen;
  }, [parentByKey, selectedKey]);

  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  useEffect(() => {
    setOpenKeys(defaultOpenKeys);
  }, [defaultOpenKeys]);

  return (
    <aside style={styles.container}>
      <h3>Navigation</h3>
      <nav style={styles.nav}>
        <Menu
          mode="inline"
          items={menuItems}
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys as string[])}
          onClick={({ key }) => navigate(String(key))}
          style={{
            borderInlineEnd: 0,
            backgroundColor: theme.colors.background.secondary,
          }}
        />
      </nav>
    </aside>
  );
}

export default LeftPanel;
