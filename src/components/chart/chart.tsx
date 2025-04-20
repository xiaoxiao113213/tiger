import { memo } from 'react';
import type { Props as ApexChartProps } from 'react-apexcharts';
import ApexChart from 'react-apexcharts';

import { useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';

import { StyledApexChart } from './styles';

function Chart(props: ApexChartProps) {
  const { themeMode } = useSettings();
  const theme = useThemeToken();
  return (
    <StyledApexChart $thememode={themeMode} $theme={theme}>
      <ApexChart {...props} />
    </StyledApexChart>
  );
}

export default memo(Chart);
