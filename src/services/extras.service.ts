import mongoose from 'mongoose';
import Extras from '../models/extras.model.js';

const getAllExtras = async (lang = 'en') => {
  const extras = await Extras.findOne({});

  if (!extras) return [];

  // Transforma a formato de tuplas
  return [
    [
      'errors.pdfGeneration',
      extras.errors?.pdfGeneration?.[lang] || extras.errors?.pdfGeneration?.en,
    ],
    [
      'errors.retrySuggestion',
      extras.errors?.retrySuggestion?.[lang] || extras.errors?.retrySuggestion?.en,
    ],
    [
      'accessibility.statement',
      extras.accessibility?.statement?.[lang] || extras.accessibility?.statement?.en,
    ],
    [
      'accessibility.labels.closeModal',
      extras.accessibility?.labels?.closeModal?.[lang] ||
        extras.accessibility?.labels?.closeModal?.en,
    ],
    [
      'accessibility.labels.fileInput',
      extras.accessibility?.labels?.fileInput?.[lang] ||
        extras.accessibility?.labels?.fileInput?.en,
    ],
  ].filter(([_, value]) => value !== undefined);
};

export default {
  getAllExtras,
};
