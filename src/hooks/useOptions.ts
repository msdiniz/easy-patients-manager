import { useState, useEffect } from 'react';
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

const useOptions = () => {
  const [options, setOptions] = useState<Options>({
    genders: [],
    bloodTypes: [],
    rhFactors: [],
    ethnicGroups: [],
    bookmarks: [],
    emailTypes: [],
    addressTypes: [],
    phoneTypes: []
  });

  useEffect(() => {
    fetch('/options.json')
      .then(response => response.json())
      .then(data => {
        const transformedBookmarks = data.bookmarks.map((bookmark: string, index: number) => ({
          id: index.toString(),
          name: bookmark
        }));
        setOptions({
          genders: data.genders || [],
          bloodTypes: data.bloodTypes || [],
          rhFactors: data.rhFactors || [],
          ethnicGroups: data.ethnicGroups || [],
          bookmarks: transformedBookmarks,
          emailTypes: data.emailTypes || [],
          addressTypes: data.addressTypes || [],
          phoneTypes: data.phoneTypes || []
        });
      })
      .catch(error => console.error('Error loading options:', error));
  }, []);

  return options;
};

export default useOptions;