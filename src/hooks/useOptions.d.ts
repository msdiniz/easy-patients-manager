import { Bookmark } from '../models/PatientModels';
interface Options {
    genders: string[];
    bloodTypes: string[];
    rhFactors: string[];
    ethnicGroups: string[];
    bookmarks: Bookmark[];
    emailTypes: string[];
    addressTypes: string[];
    phoneTypes: string[];
}
declare const useOptions: () => Options;
export default useOptions;
