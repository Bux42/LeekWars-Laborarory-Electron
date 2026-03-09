export interface IBasePoolListBasePool {
  name: string;
}

export interface IBasePoolListItem {
  id: string;
  basePool: IBasePoolListBasePool;
}

export interface IBasePoolListProps<TPool extends IBasePoolListItem> {
  pools: TPool[];
  getLabel: (pool: TPool) => string;
  onViewPoolClick: (pool: TPool) => void;
  emptyMessage: string;
}
