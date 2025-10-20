import { parse } from 'csv-parse/sync';
import { TestCase } from './controllers/test-case-controller.js';

export interface CSVTestCase {
  name: string;
  description?: string;
  status?: string;
  automated?: string;
}

export function parseTestCasesFromCSV(csvContent: string): TestCase[] {
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as CSVTestCase[];

  return records.map((record) => ({
    name: record.name,
    description: record.description || '',
    status: record.status || 'draft',
    automated: record.automated?.toLowerCase() === 'true' || record.automated === '1',
  }));
}
