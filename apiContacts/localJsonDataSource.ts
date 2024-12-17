import { promises as fs } from 'fs';
import path from 'path';
import DataSource from './dataSource';

class LocalJsonDataSource extends DataSource {
  async fetchContacts(): Promise<any> {
    try {
      const data = await fs.readFile(path.join(__dirname, '../data/patients.json'), 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading local contacts file:', error);
      return [];
    }
  }
}

export default LocalJsonDataSource;