import React from 'react';
import { Bookmark } from '../../models/PatientModels';
interface FilterByBookmarksProps {
    options: Bookmark[];
    selectedBookmarks: string[];
    onBookmarkChange: (selected: string[]) => void;
    onClearBookmarks: () => void;
}
declare const _default: React.NamedExoticComponent<FilterByBookmarksProps>;
export default _default;
