import { CreateBasePoolRequest } from '../../../../services/leekwarsToolsAPI.schemas';

export interface IBasePoolFormProps {
  selectedLeeksCount: number;
  onBasePoolRequestChange: (basePoolRequest: CreateBasePoolRequest) => void;
  initialBasePoolRequest?: Partial<CreateBasePoolRequest>;
}
