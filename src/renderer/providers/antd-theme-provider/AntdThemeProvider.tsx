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
          Tabs: {
            itemColor: theme.colors.text.secondary,
            itemHoverColor: theme.colors.text.primary,
            itemSelectedColor: theme.colors.accent.primary,
            inkBarColor: theme.colors.accent.primary,
            titleFontSize: 14,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntdThemeProvider;
