interface ApiDataSourceState {
    apiDataSource: any | null;
}
export declare const setApiDataSource: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "apiDataSource/setApiDataSource">, clearApiDataSource: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"apiDataSource/clearApiDataSource">;
declare const _default: import("redux").Reducer<ApiDataSourceState>;
export default _default;
export type { ApiDataSourceState };
