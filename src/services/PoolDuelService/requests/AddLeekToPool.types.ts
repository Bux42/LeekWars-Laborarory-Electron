export interface IAddLeekToPoolRequest {
  poolId: string;
  leekId: string;
}

export interface IAddLeekToPoolResponse {
  message: string;
  success: boolean;
}
