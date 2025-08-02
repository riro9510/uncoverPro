import mongoose from 'mongoose';

const formularioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

const Formulario = mongoose.model('Formulario', formularioSchema);

export default Formulario;
