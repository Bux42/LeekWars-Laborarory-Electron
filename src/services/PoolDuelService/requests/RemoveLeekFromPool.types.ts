export interface IRemoveLeekFromPoolRequest {
  poolId: string;
  leekId: string;
}

export interface IRemoveLeekFromPoolResponse {
  message: string;
  success: boolean;
}
