export interface CoreDocument {
  id: number;
  title: string;
  type: 'file' | 'text';
  description: string;
  uploadDate: string;
  content?: string;
  file?: File;
}
