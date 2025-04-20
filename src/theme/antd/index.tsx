import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';
import zh_CN from 'antd/locale/zh_CN';
import useLocale from '@/locales/useLocale';
import { useSettings } from '@/store/settingStore';

import { ThemeMode } from '#/enum';

type Props = {
  children: React.ReactNode;
};
export default function AntdConfig({ children }: Props) {
  const { themeMode, themeColorPresets } = useSettings();
  const { language } = useLocale();
  const algorithm = themeMode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm;
  // const colorPrimary = colorPrimarys[themeColorPresets];

  return (
    <ConfigProvider
      locale={zh_CN}
      theme={{
        // token: {  ...customThemeTokenConfig, ...themeModeToken[themeMode].token },
        // components: { ...customComponentConfig, ...themeModeToken[themeMode].components },
        // algorithm,
      }}
    >
      {/* https://ant.design/docs/react/compatible-style-cn#styleprovider */}
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
}
