import mongoose from 'mongoose';
import Formquestions from '../models/formquestions.model.js';


const getAll = async () => {
  return await Formquestions.find();
};

const getById = async (id:any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID inválido');
  }
  return await Formquestions.findById(id);
};


export default {
  getAll,
  getById,
};

