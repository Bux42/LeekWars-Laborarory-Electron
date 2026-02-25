export type WsEvent<T = any> = {
  type: string;
  payload: T;
};
