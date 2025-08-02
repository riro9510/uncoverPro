import mongoose from 'mongoose';
import Formulario from '@/models/formulario.model.js';

const create = async (data: any) => {
  const register = await Formulario.create({ data });
  return register;
};

const getAll = async () => {
  return await Formulario.find();
};

const getById = async (id: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID inválido');
  }
  return await Formulario.findById(id);
};

const update = async (id: any, data: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID inválido');
  }
  return await Formulario.updateOne({ _id: id }, { $set: data });
};

const remove = async (id: any) => {
  return await Formulario.deleteOne({ _id: id });
};

export default {
  create,
  getAll,
  getById,
  update,
  remove,
};
