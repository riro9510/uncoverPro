import mongoose from 'mongoose';

const cvrequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

const Cvrequest = mongoose.model('Cvrequest', cvrequestSchema);

export default Cvrequest;
