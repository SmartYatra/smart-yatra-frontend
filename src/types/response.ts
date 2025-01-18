export interface ISuccessResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
}

// Define the types for bad request (validation error)
export interface IBadRequestResponse {
  success: false;
  message: string;
  data: Array<{
    [key: string]: string[];
  }>;
}
