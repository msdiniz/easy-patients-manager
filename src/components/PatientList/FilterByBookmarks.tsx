import React from 'react';
import { Bookmark } from '../../models/PatientModels';

interface FilterByBookmarksProps {
  options: Bookmark[];
  selectedBookmarks: string[];
  onBookmarkChange: (selected: string[]) => void;
  onClearBookmarks: () => void;
}

const FilterByBookmarks: React.FC<FilterByBookmarksProps> = ({ options, onBookmarkChange, onClearBookmarks }) => {
  const handleBookmarkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = e.target;
    const selected: string[] = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    onBookmarkChange(selected);
  };

  return (
    <div className="bookmark-filter">
      <label>Filter by Bookmarks:</label>
      <select multiple onChange={handleBookmarkChange}>
        {options.map((bookmark: Bookmark) => (
          <option key={bookmark.id} value={bookmark.name}>
            {bookmark.name}
          </option>
        ))}
      </select>
      <button onClick={onClearBookmarks}>Clear Bookmarks</button>
    </div>
  );
};

export default React.memo(FilterByBookmarks);