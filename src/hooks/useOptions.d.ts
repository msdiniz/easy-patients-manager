import { Bookmark } from '../models/PatientModels';
interface Options {
    genders: string[];
    bloodTypes: string[];
    rhFactors: string[];
    ethnicGroups: string[];
    bookmarks: Bookmark[];
}
declare const useOptions: () => Options;
export default useOptions;
