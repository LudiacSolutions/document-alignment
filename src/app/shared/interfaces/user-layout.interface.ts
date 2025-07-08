export interface CoreDocument {
  id: number;
  title: string;
  type: 'file' | 'text';
  description: string;
  uploadDate: string;
}

export interface Reference {
  id: number;
  title: string;
  url: string;
}

export interface AnalysisItem {
  type: 'core' | 'ref';
  item: CoreDocument | Reference;
  tolerance: number;
  alignment: number;
  issues: string[];
}

export interface AnalysisIteration {
  results: AnalysisItem[];
  tolerances: { [key: string]: number };
  label: string;
}

export interface Analysis {
  id: number;
  document: string;
  date: Date;
  coreDocsCount: number;
  refsCount: number;
  finalAlignment: number;
  results: AnalysisItem[];
  iterations: AnalysisIteration[];
  uploadedFile: File | null;
  directTextInput: string | null;
  selectedCoreDocs: CoreDocument[];
  selectedRefs: Reference[];
  originalText: string;
  finalResults: AnalysisItem[];
  toleranceValues: { [key: string]: number };
  purged: boolean;
}

export interface TokenUsage {
  input: number;
  output: number;
}

export interface TokensUsed {
  gpt45: TokenUsage;
  gpt4o: TokenUsage;
  gpt41: TokenUsage;
  gpt35: TokenUsage;
}