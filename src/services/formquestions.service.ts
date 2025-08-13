import mongoose from 'mongoose';
import Formquestions from '../models/formquestions.model.js';

const getAll = async () => {
  return await Formquestions.find();
};

const getByLanguageName = async (languageCode: string) => {
  const validLanguages = ['es', 'pt', 'en', 'fr', 'de', 'ja', 'zh', 'hi', 'fa', 'ar', 'ru'];
  if (!validLanguages.includes(languageCode)) {
    throw new Error(`Idioma no soportado. Usa uno de: ${validLanguages.join(', ')}`);
  }

  const forms = await Formquestions.find({
    [languageCode]: { $exists: true },
  }).lean();

  return forms.map((form) => ({
    id: form._id,
    ...form[languageCode],
    metadata: {
      availableLanguages: Object.keys(form).filter((key) => validLanguages.includes(key)),
    },
  }));
};

export default {
  getAll,
  getByLanguageName,
};
