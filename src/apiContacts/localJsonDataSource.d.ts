import DataSource from './dataSource';
declare class LocalJsonDataSource extends DataSource {
    fetchContacts(): Promise<any>;
}
export default LocalJsonDataSource;
