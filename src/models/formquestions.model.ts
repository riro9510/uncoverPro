import mongoose, { Schema, Document } from 'mongoose';

const ValidationSchema = new Schema(
  {
    regex: { type: String, required: false },
    errorMessage: { type: String, required: false },
  },
  { _id: false }
);

const FieldSchema = new Schema(
  {
    fieldId: { type: String, required: true },
    question: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['input', 'textarea', 'multiselect-chips', 'checkbox', 'daterange', 'year'],
    },
    placeholder: { type: String, required: false },
    validation: { type: ValidationSchema, required: false },
    required: { type: Boolean, default: false },
    options: { type: [String], required: false },
    allowCustom: { type: Boolean, default: false },
    minSelections: { type: Number, required: false },
    maxSelections: { type: Number, required: false },
    maxLength: { type: Number, required: false },
  },
  { _id: false }
);

const SectionSchema = new Schema(
  {
    sectionId: { type: String, required: true },
    sectionName: { type: String, required: true },
    fields: { type: [FieldSchema], required: true },
    repeatable: { type: Boolean, default: false },
    maxRepeats: { type: Number, required: false },
  },
  { _id: false }
);

const SettingsSchema = new Schema(
  {
    allowSaveProgress: { type: Boolean, default: true },
    maxCustomOptions: { type: Number, default: 5 },
    defaultTheme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'light',
    },
    maxOnePage: { type: Boolean, default: true },
    highlightColor: { type: String, default: '#FFECB3' },
  },
  { _id: false }
);

const LanguageContentSchema = new Schema(
  {
    sections: { type: [SectionSchema], required: true },
    settings: { type: SettingsSchema, required: true },
  },
  { _id: false }
);

interface IForm extends Document {
  [key: string]: any; // Permite idiomas dinámicos
}

const FormSchema = new Schema<IForm>(
  {
    en: { type: LanguageContentSchema, required: false },
  },
  {
    timestamps: true,
    strict: false,
  }
);

FormSchema.index({ 'en.sections.sectionName': 'text' });

export default mongoose.models.questions || mongoose.model('questions', FormSchema);

