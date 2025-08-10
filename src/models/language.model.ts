import mongoose from 'mongoose';

const { Schema } = mongoose;

const HeroSchema = new Schema(
  {
    h1: {
      type: String,
      required: [true, 'Hero title is required'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    subtitle: {
      type: String,
      required: [true, 'Subtitle is required'],
      maxlength: [200, 'Subtitle cannot exceed 200 characters'],
    },
    cta: {
      type: String,
      required: [true, 'CTA text is required'],
      maxlength: [50, 'CTA text cannot exceed 50 characters'],
    },
  },
  { _id: false }
);

const ModalSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Modal title is required'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    next: {
      type: String,
      required: [true, 'Next button text is required'],
      maxlength: [30, 'Button text cannot exceed 30 characters'],
    },
    previous: {
      type: String,
      required: [true, 'Previous button text is required'],
      maxlength: [30, 'Button text cannot exceed 30 characters'],
    },
    submit: {
      type: String,
      required: [true, 'Submit button text is required'],
      maxlength: [30, 'Button text cannot exceed 30 characters'],
    },
    close: {
      type: String,
      required: [true, 'Close button text is required'],
      maxlength: [30, 'Button text cannot exceed 30 characters'],
    },
    requiredField: {
      type: String,
      required: [true, 'Required field message is required'],
      maxlength: [100, 'Message cannot exceed 100 characters'],
    },
  },
  { _id: false }
);

const LanguageSchema = new Schema(
  {
    language: {
      type: String,
      required: [true, 'Language code is required'],
      unique: true,
      trim: true,
      uppercase: true,
      minlength: 2,
      maxlength: 5,
      match: [/^[a-z]{2}(-[A-Z]{2})?$/, 'Invalid language code format (e.g. en or en-US)'],
    },
    name: {
      type: String,
      required: [true, 'Language name is required'],
      trim: true,
      maxlength: [50, 'Language name cannot exceed 50 characters'],
    },
    isRTL: {
      type: Boolean,
      required: [true, 'RTL flag is required'],
      default: false,
    },
    translations: {
      hero: {
        type: HeroSchema,
        required: [true, 'Hero section translations are required'],
      },
      modal: {
        type: ModalSchema,
        required: [true, 'Modal translations are required'],
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        const { _id, __v, ...rest } = ret;
        return rest;
      },
    },
  }
);

LanguageSchema.index({ language: 1 });
LanguageSchema.index({ name: 1 });

LanguageSchema.pre('save', function (next) {
  if (this.language.startsWith('ar') || this.language.startsWith('he')) {
    this.isRTL = true;
  }
  next();
});

export default mongoose.models.languages || mongoose.model('languages', LanguageSchema);
