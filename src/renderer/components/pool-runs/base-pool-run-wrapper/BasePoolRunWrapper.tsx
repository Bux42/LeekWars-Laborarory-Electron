import React, { useEffect, useMemo, useState } from 'react';
import { basePoolRunWrapperStyles as styles } from './BasePoolRunWrapper.styles';
import { IBasePoolRunWrapperProps } from './BasePoolRunWrapper.types';
import Spinner from '../../shared/spinner/Spinner';
import Button from '../../shared/button/Button';
import { formatDate, getDuration } from '../../../utils/DateUtils';
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import { usePoolFightEstimation } from '../../../../hooks/pools/duel/usePoolFightEstimation';
import { usePoolRunEta } from '../../../../hooks/pool-runs/eta/usePoolRunEta';
import HoverTooltip from '../../shared/hover-tooltip/HoverTooltip';
import SeedIcon from '../../../icons/Seed';
import { BasePoolRunResponse } from '../../../../services/leekwarsToolsAPI.schemas';
import { usePoolRunFinishedWs } from '../../../../hooks/pool-runs/base/usePoolRunFinishedWs';

function BasePoolRunWrapper({
  run: runProp,
  children,
  combinationsCount,
  processedFights,
  onStop,
}: IBasePoolRunWrapperProps) {
  const [baseRunResponse, setBaseRunResponse] =
    useState<BasePoolRunResponse>(runProp);

  useEffect(() => {
    setBaseRunResponse(runProp);
  }, [runProp]);

  const [stopping, setStopping] = React.useState(false);

  const { totalFights } = usePoolFightEstimation(
    combinationsCount,
    baseRunResponse.basePool?.fightLimit || 0,
  );

  const etaString = usePoolRunEta(
    processedFights,
    totalFights,
    baseRunResponse.startDate,
  );

  usePoolRunFinishedWs((poolRun) => {
    if (baseRunResponse.id === poolRun?.run?.id) {
      setBaseRunResponse(poolRun.run);
    }
  });

  const handleStop = async () => {
    if (onStop) {
      setStopping(true);
      await onStop();
    }
  };

  const statusText = useMemo(() => {
    if (baseRunResponse.interrupted) return 'Interrupted';
    if (baseRunResponse.running) return 'Running';
    return 'Completed';
  }, [baseRunResponse.running, baseRunResponse.interrupted]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <h2 style={styles.title}>
            Run: {baseRunResponse.basePool.name || 'Unknown Pool'}
          </h2>
          {baseRunResponse.basePool.deterministic && (
            <HoverTooltip
              tooltip={
                <div>Start seed: {baseRunResponse.basePool.startSeed}</div>
              }
            >
              <div style={styles.seedIcon}>
                <SeedIcon />
              </div>
            </HoverTooltip>
          )}
          <span
            style={styles.statusBadge(
              baseRunResponse.running,
              baseRunResponse.interrupted,
            )}
          >
            {statusText}
          </span>
          {baseRunResponse.running && <Spinner />}
        </div>

        {baseRunResponse.running && onStop ? (
          <Button onClick={handleStop} variant="danger" disabled={stopping}>
            {stopping ? 'Stopping...' : 'Stop'}
          </Button>
        ) : (
          <div style={styles.label}>
            ID:{' '}
            <span style={{ fontFamily: 'monospace' }}>
              {baseRunResponse.id}
            </span>
          </div>
        )}
      </div>

      <div style={styles.infoGrid}>
        <div style={styles.infoItem}>
          <span style={styles.label}>Start Time</span>
          <span style={styles.value}>
            {formatDate(baseRunResponse.startDate)}
          </span>
        </div>
        {!baseRunResponse.running && (
          <div style={styles.infoItem}>
            <span style={styles.label}>End Time</span>
            <span style={styles.value}>
              {formatDate(baseRunResponse.endDate)}
            </span>
          </div>
        )}
        <div style={styles.infoItem}>
          <span style={styles.label}>Duration</span>
          <span style={styles.value}>
            {getDuration(baseRunResponse.startDate, baseRunResponse.endDate)}
          </span>
        </div>
        <div style={styles.infoItem}>
          <span style={styles.label}>Status</span>
          <span style={styles.value}>
            {baseRunResponse.running ? 'Active execution' : 'Finished'}
          </span>
        </div>
        <div style={styles.infoItemFullWidth}>
          <ProgressBar
            label={`Fight Progress ${etaString}`}
            value={processedFights}
            max={totalFights}
          />
        </div>
      </div>

      {children && <div style={styles.childrenContainer}>{children}</div>}
    </div>
  );
}

export default BasePoolRunWrapper;
