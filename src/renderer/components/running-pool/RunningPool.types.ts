import { RunningPoolResponse } from '../../../services/leekwarsToolsAPI.schemas';

export interface IRunningPoolProps {
  runningPool: RunningPoolResponse;
  onHide: (poolRunId: string) => void;
}
