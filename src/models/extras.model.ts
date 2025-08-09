import mongoose from 'mongoose';

const { Schema } = mongoose;


export interface ITranslation {
  en: string;
  [key: string]: string; 
}

const TranslationSchema = new Schema<ITranslation>({
  en: { type: String, required: true },
}, { _id: false, strict: false });


const ExtraSchema = new Schema({
  errors: {
    pdfGeneration: { type: TranslationSchema, required: false },
    retrySuggestion: { type: TranslationSchema, required: false }
  },
  accessibility: {
    statement: { type: TranslationSchema, required: false },
    labels: {
      closeModal: { type: TranslationSchema, required: false },
      fileInput: { type: TranslationSchema, required: false }
    }
  }
}, { 
  timestamps: true,
  strict: false 
});

export default mongoose.model('Extra', ExtraSchema);