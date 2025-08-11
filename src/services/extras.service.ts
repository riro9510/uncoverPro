import mongoose from 'mongoose';
import Extras from '../models/extras.model.js';

const getExtrasByLang = async (lang: string) => {
  const extrasDocs = await Extras.find().lean();
  if (!extrasDocs.length) return {};

  const result: Record<string, string> = {};

  const isPlainObject = (value: any) =>
    value !== null && typeof value === 'object' && !Array.isArray(value);

  const traverse = (obj: any, prefix = '') => {
    for (const key in obj) {
      if (isPlainObject(obj[key])) {
        traverse(obj[key], prefix ? `${prefix}.${key}` : key);
      } else if (typeof obj[key] === 'string' && key === lang) {
        result[prefix] = obj[key];
      }
    }
  };

  for (const doc of extrasDocs) {
    traverse(doc);
  }

  return result;
};


export default {
  getExtrasByLang
};
