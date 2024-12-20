abstract class DataSource {
  abstract fetchContacts(): Promise<any>;
}

export default DataSource;