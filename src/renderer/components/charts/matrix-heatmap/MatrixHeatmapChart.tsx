import { Fragment, useMemo, useRef, useState } from 'react';
import { Slider } from 'antd';
import {
  IMatrixHeatmapChartProps,
  IMatrixHeatmapEntity,
} from './MatrixHeatmapChart.types';
import { matrixHeatmapChartStyles as styles } from './MatrixHeatmapChart.styles';
import HoverTooltip from '../../shared/hover-tooltip/HoverTooltip';
import {
  AXIS_CELL_SIZE,
  DEFAULT_CELL_MAX_SIZE,
  DEFAULT_CELL_MIN_SIZE,
  DEFAULT_CELL_SIZE,
  DEFAULT_TITLE,
  MOCK_PAIRS,
} from './MatrixHeatmap.constants';
import { getHeatColor } from '../../../utils/ColorsHelpers';

function MatrixHeatmapChart({
  pairs = MOCK_PAIRS,
  title = DEFAULT_TITLE,
  cellSize: cellSizeProp = DEFAULT_CELL_SIZE,
  onHoverEntityElement,
  onHoverPairElement,
}: IMatrixHeatmapChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState<number>(cellSizeProp);

  const {
    orderedEntities,
    matrixValuesByIds,
    minValue,
    maxValue,
    hasData,
    matrixRowCount,
    formattedMinValue,
    formattedMaxValue,
  } = useMemo(() => {
    const entitiesById = new Map<string, IMatrixHeatmapEntity>();
    const matrixByPair = new Map<string, number>();
    const values: number[] = [];

    pairs.forEach((pair) => {
      const fromId = pair.from.id?.trim();
      const toId = pair.to.id?.trim();
      const fromLabel = pair.from.label?.trim();
      const toLabel = pair.to.label?.trim();

      if (!fromId || !toId || !Number.isFinite(pair.value)) {
        return;
      }

      const sanitizedFromLabel = fromLabel || fromId;
      const sanitizedToLabel = toLabel || toId;

      if (!entitiesById.has(fromId)) {
        entitiesById.set(fromId, { id: fromId, label: sanitizedFromLabel });
      }

      if (!entitiesById.has(toId)) {
        entitiesById.set(toId, { id: toId, label: sanitizedToLabel });
      }

      const key = `${fromId}::${toId}`;
      matrixByPair.set(key, pair.value);
      values.push(pair.value);
    });

    const ordered = Array.from(entitiesById.values()).sort((entityA, entityB) =>
      entityA.label.localeCompare(entityB.label),
    );

    const nextMinValue = values.length > 0 ? Math.min(...values) : 0;
    const nextMaxValue = values.length > 0 ? Math.max(...values) : 0;

    return {
      orderedEntities: ordered,
      matrixValuesByIds: matrixByPair,
      minValue: nextMinValue,
      maxValue: nextMaxValue,
      hasData: ordered.length > 0 && values.length > 0,
      matrixRowCount: ordered.length,
      formattedMinValue: nextMinValue.toLocaleString(),
      formattedMaxValue: nextMaxValue.toLocaleString(),
    };
  }, [pairs]);

  function getNormalizedValue(value: number) {
    if (maxValue === minValue) {
      return 1;
    }

    return (value - minValue) / (maxValue - minValue);
  }

  const gridTemplateColumns = `${AXIS_CELL_SIZE}px repeat(${matrixRowCount}, ${Math.max(cellSize, 20)}px)`;
  const gridTemplateRows = `${Math.max(cellSize, 20)}px repeat(${matrixRowCount}, ${Math.max(cellSize, 20)}px)`;

  if (!hasData) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.title}>{title}</h3>
          <p style={styles.subtitle}>No matrix values to display.</p>
        </div>
        <div style={styles.emptyState}>
          Provide pairs to render the heatmap.
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        <div style={styles.sliderContainer}>
          <p style={styles.subtitle}>Cell Size</p>
          <Slider
            min={DEFAULT_CELL_MIN_SIZE}
            max={DEFAULT_CELL_MAX_SIZE}
            value={cellSize}
            onChange={(value) => setCellSize(value)}
            style={{ width: '100%' }}
          />
        </div>

        <p style={styles.subtitle}>
          {orderedEntities.length} entities • {pairs.length} pair values
        </p>
      </div>

      <div style={styles.matrixScroll}>
        <div
          style={{
            ...styles.matrixGrid,
            gridTemplateColumns,
            gridTemplateRows,
          }}
        >
          <div
            style={{
              ...styles.cornerCell,
              width: AXIS_CELL_SIZE,
              height: Math.max(cellSize, 20),
            }}
          >
            From → To
          </div>

          {orderedEntities.map((columnEntity) => (
            <HoverTooltip
              key={`col-tooltip-${columnEntity.id}`}
              tooltip={onHoverEntityElement(columnEntity.id)}
              height={Math.max(cellSize, 20)}
              width={Math.max(cellSize, 20)}
            >
              <div
                key={`col-${columnEntity.id}`}
                style={{
                  ...styles.axisCell,
                  ...styles.columnHeaderCell,
                  width: Math.max(cellSize, 20),
                  height: Math.max(cellSize, 20),
                }}
              >
                {columnEntity.label}
              </div>
            </HoverTooltip>
          ))}

          {orderedEntities.map((rowEntity) => {
            return (
              <Fragment key={`matrix-row-${rowEntity.id}`}>
                <div
                  key={`row-${rowEntity.id}`}
                  style={{
                    ...styles.axisCell,
                    ...styles.rowHeaderCell,
                    width: AXIS_CELL_SIZE,
                    height: Math.max(cellSize, 20),
                  }}
                >
                  <HoverTooltip
                    key={`col-tooltip-${rowEntity.id}`}
                    tooltip={onHoverEntityElement(rowEntity.id)}
                  >
                    <div
                      key={`col-${rowEntity.id}`}
                      style={{
                        ...styles.axisCell,
                        height: Math.max(cellSize, 20),
                      }}
                    >
                      {rowEntity.label}
                    </div>
                  </HoverTooltip>
                </div>

                {orderedEntities.map((columnEntity) => {
                  const pairKey = `${rowEntity.id}::${columnEntity.id}`;
                  const cellValue = matrixValuesByIds.get(pairKey);
                  const hasCellValue = cellValue !== undefined;
                  const normalizedValue = hasCellValue
                    ? getNormalizedValue(cellValue)
                    : 0;
                  const backgroundColor = hasCellValue
                    ? getHeatColor(normalizedValue)
                    : 'rgba(110, 110, 110, 0.08)';

                  return (
                    <HoverTooltip
                      key={`cell-tooltip-${pairKey}`}
                      delay={300}
                      tooltip={
                        hasCellValue
                          ? onHoverPairElement(
                              rowEntity.id,
                              columnEntity.id,
                              cellValue,
                            )
                          : null
                      }
                    >
                      <div
                        key={`cell-${pairKey}`}
                        style={{
                          ...styles.dataCell,
                          width: Math.max(cellSize, 20),
                          height: Math.max(cellSize, 20),
                          backgroundColor,
                          cursor: hasCellValue ? 'pointer' : 'default',
                          opacity: hasCellValue ? 1 : 0.45,
                        }}
                      />
                    </HoverTooltip>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>

      <div style={styles.legendSection}>
        <p style={styles.legendTitle}>Value intensity</p>
        <div style={styles.gradientLegendWrapper}>
          <div style={styles.gradientLegendBar} />
          <div style={styles.gradientLegendLabels}>
            <span>Low ({formattedMinValue})</span>
            <span>High ({formattedMaxValue})</span>
          </div>
        </div>

        <p style={styles.legendTitle}>Entities (truncated labels)</p>
        <div style={styles.entitiesLegend}>
          {orderedEntities.map((entity) => (
            <span key={`legend-${entity.id}`} style={styles.entityLegendItem}>
              {entity.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MatrixHeatmapChart;
