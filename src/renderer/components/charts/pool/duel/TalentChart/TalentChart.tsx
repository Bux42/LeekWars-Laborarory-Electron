import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ITalentChartProps } from './TalentChart.types';
import { talentChartStyles as styles } from './TalentChart.styles';
import { theme } from '../../../../../theme';

const COLORS = [
  '#007acc',
  '#4caf50',
  '#f44336',
  '#ff9800',
  '#2196f3',
  '#9c27b0',
  '#00bcd4',
  '#795548',
];

const TalentChart: React.FC<ITalentChartProps> = ({
  data,
  title = 'Talent Progression',
  height = 400,
}) => {
  const { chartData, entityNames } = useMemo(() => {
    const names = new Set<string>();
    const timeGroups: Record<string, any> = {};

    data.forEach((point) => {
      names.add(point.entityName);
      const time = new Date(point.datetime).getTime();
      const timeKey = time.toString();

      if (!timeGroups[timeKey]) {
        timeGroups[timeKey] = {
          time,
          displayTime: new Date(point.datetime).toLocaleString(),
        };
      }
      timeGroups[timeKey][point.entityName] = point.talent;
    });

    const sortedData = Object.values(timeGroups).sort(
      (a, b) => a.time - b.time,
    );

    return {
      chartData: sortedData,
      entityNames: Array.from(names),
    };
  }, [data]);

  return (
    <div style={styles.container}>
      <div style={styles.title}>{title}</div>
      <div style={{ ...styles.chartContainer, height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.colors.border.secondary}
            />
            <XAxis
              dataKey="time"
              type="number"
              domain={['auto', 'auto']}
              tick={{ fill: theme.colors.text.secondary, fontSize: 12 }}
              tickFormatter={(unixTime) =>
                new Date(unixTime).toLocaleTimeString()
              }
              stroke={theme.colors.text.tertiary}
            />
            <YAxis
              domain={['auto', 'auto']}
              tick={{ fill: theme.colors.text.secondary, fontSize: 12 }}
              stroke={theme.colors.text.tertiary}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.colors.background.tertiary,
                border: `1px solid ${theme.colors.border.primary}`,
                borderRadius: theme.borderRadius.sm,
                color: theme.colors.text.primary,
              }}
              labelFormatter={(label) => new Date(label).toLocaleString()}
              itemStyle={{ fontSize: 12 }}
            />
            <Legend
              wrapperStyle={{ paddingTop: 10 }}
              formatter={(value) => (
                <span style={{ color: theme.colors.text.secondary }}>
                  {value}
                </span>
              )}
            />
            {entityNames.map((name, index) => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke={COLORS[index % COLORS.length]}
                activeDot={{ r: 8 }}
                dot={entityNames.length < 5} // Only show dots if there aren't too many entities
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TalentChart;
