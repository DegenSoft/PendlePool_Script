import crypto from 'crypto';
import axios from 'axios';

import { englishWords } from '../const/words.const.js';
import { randomIntInRange } from './general.helper.js';
import { interests } from '../const/interests.const.js';
import { expertise } from '../const/expertise.const.js';
import { activities } from '../const/activity.const.js';

export const generateSalt = () => {
  return '0x' + crypto.randomBytes(32).toString('hex');
};

export const generateName = () => {
  const wordCount = englishWords.length;
  return englishWords[randomIntInRange(0, wordCount)] + englishWords[randomIntInRange(0, wordCount)];
};

export const generateUUID = ()=> {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

export const generateBio = () => {
  
    const interest = interests[Math.floor(Math.random() * interests.length)];
    const expert = expertise[Math.floor(Math.random() * expertise.length)];
    const activity = activities[Math.floor(Math.random() * activities.length)];

    return `${expert} in ${interest}.\n${activity}.`;
};

console.log(generateBio())