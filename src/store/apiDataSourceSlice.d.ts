import ApiDataSource from '../apiContacts/apiDataSource';
export interface ApiDataSourceState {
    apiDataSource: ApiDataSource | null;
}
export declare const setApiDataSource: import("@reduxjs/toolkit").ActionCreatorWithPayload<ApiDataSource, "apiDataSource/setApiDataSource">, clearApiDataSource: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"apiDataSource/clearApiDataSource">;
declare const _default: import("redux").Reducer<ApiDataSourceState>;
export default _default;
