import mongoose from 'mongoose';
import Language from '../models/language.model.js';

const getAll = async () => {
  return await Language.find();
};

const getById = async (id: any) => {
  const language = await Language.find().lean();
  return language.find((lang) => lang.language.toString() === id.toString()) || null;
};

export default {
  getAll,
  getById,
};
