import mongoose from 'mongoose';
import Language from '../models/language.model.js';

const getAll = async () => {
  return await Language.find();
};

const getById = async (id: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID inválido');
  }
  return await Language.findById(id);
};

export default {
  getAll,
  getById,
};
