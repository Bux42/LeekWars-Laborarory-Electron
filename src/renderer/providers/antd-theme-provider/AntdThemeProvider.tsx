import { ConfigProvider } from 'antd';
import { theme } from '../../theme';
import { IAntdThemeProviderProps } from './AntdThemeProvider.types';

function AntdThemeProvider({ children }: IAntdThemeProviderProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme.colors.accent.primary,
          colorText: theme.colors.text.primary,
          colorTextSecondary: theme.colors.text.secondary,
          colorBgBase: theme.colors.background.primary,
          colorBgContainer: theme.colors.background.secondary,
          colorBorder: theme.colors.border.primary,
          borderRadius: theme.borderRadius.md,
          fontFamily: theme.fonts.primary,
        },
        components: {
          Menu: {
            itemBg: 'transparent',
            subMenuItemBg: 'transparent',
            itemColor: theme.colors.text.primary,
            itemHoverColor: theme.colors.text.primary,
            itemHoverBg: theme.colors.background.tertiary,
            itemSelectedColor: theme.colors.text.primary,
            itemSelectedBg: theme.colors.background.elevated,
            itemActiveBg: theme.colors.background.tertiary,
            groupTitleColor: theme.colors.text.secondary,
            popupBg: theme.colors.background.secondary,
          },
          Tabs: {
            itemColor: theme.colors.text.secondary,
            itemHoverColor: theme.colors.text.primary,
            itemSelectedColor: theme.colors.accent.primary,
            inkBarColor: theme.colors.accent.primary,
            titleFontSize: 14,
          },
          Button: {
            colorTextDisabled: theme.colors.text.tertiary,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntdThemeProvider;
