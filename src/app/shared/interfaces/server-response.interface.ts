export interface ServerResponse<T> {
  isError: boolean;
  message: string;
  code: number;
  data: [T];
  count: number;
}

export interface AuthServerResponse {
  token: string;
  message: string;
}
