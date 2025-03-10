export type CreateFormDataProps = {
  image?: {
    fileName: string;
    type: string;
    mimeType: string;
    uri: string;
    size: number;
  };
  body?: Record<string, string>;
};
