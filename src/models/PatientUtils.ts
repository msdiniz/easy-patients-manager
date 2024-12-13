// src/models/PatientUtils.ts
export class PatientUtils {
    static properCase(name: string): string {
      const lowerCaseWords = ['d', 'da', 'das', 'de', 'do', 'dos', 'e', 'van', 'von'];
      return name
        .trim()
        .toLowerCase()
        .split(' ')
        .map(word => {
          if (lowerCaseWords.includes(word)) {
            return word;
          }
          if (word.length > 1 && word[1] === "'") {
            return word[0].toUpperCase() + "'" + word[2].toUpperCase() + word.slice(3);
          }
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    }
  
    static isValidName(name: string): boolean {
      const nameParts = name.trim().split(/\s+/);
      return nameParts.length >= 2 && nameParts.every(part => part.length >= 2);
    }
  }