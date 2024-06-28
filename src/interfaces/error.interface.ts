export type TErrors = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  errors: TErrors;
  status: number;
  message: string;
  stackTrace: string;
};
