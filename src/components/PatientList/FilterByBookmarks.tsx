import React from 'react';
import { Bookmark } from '../../models/PatientModels';

interface FilterByBookmarksProps {
  options: Bookmark[];
  selectedBookmarks: string[];
  onBookmarkChange: (selected: string[]) => void;
  onClearBookmarks: () => void;
}

const FilterByBookmarks: React.FC<FilterByBookmarksProps> = ({
  options,
  selectedBookmarks,
  onBookmarkChange,
  onClearBookmarks,
}) => {
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
      <label htmlFor="bookmarks">Filter by Bookmarks:</label>
      <select
        id="bookmarks"
        multiple
        value={selectedBookmarks}
        onChange={handleBookmarkChange}
        style={{ width: '100%' }}
      >
        {options.map((bookmark: Bookmark) => (
          <option key={bookmark.id} value={bookmark.name}>
            {bookmark.name}
          </option>
        ))}
      </select>
      <button type="button" onClick={onClearBookmarks}>
        Clear Bookmarks
      </button>
    </div>
  );
};

export default React.memo(FilterByBookmarks);