import Joi from 'joi';

// Patrón regex
const nameRegex = /^[a-zA-Z áéíóúÁÉÍÓÚñÑ]{2,50}$/;
const emailRegex = /^\S+@\S+\.\S+$/;
const linkedInRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[^\s\/]+\/?$/;
const periodRegex = /^(0[1-9]|1[0-2])\/\d{4} - (0[1-9]|1[0-2])\/\d{4}$/;
const yearRegex = /^(19|20)\d{2}$/;


const formResponsesSchema = Joi.object({
  'personal_info.full_name': Joi.string().pattern(nameRegex).required(),
  'personal_info.professional_title': Joi.string().required(),
  'personal_info.email': Joi.string().pattern(emailRegex).required(),
  'personal_info.phone': Joi.string().allow('').optional(),
  'personal_info.linkedin': Joi.string().pattern(linkedInRegex).allow('').optional(),

  'professional_summary.summary': Joi.string().max(250).required(),

  'key_skills.skills': Joi.array().items(Joi.string()).min(5).max(8).required(),

  'work_experience.job_title': Joi.string().required(),
  'work_experience.company': Joi.string().required(),
  'work_experience.period': Joi.string().pattern(periodRegex).required(),
  'work_experience.achievements': Joi.string().required(), // o array si viene separado

  'education.degree': Joi.string().required(),
  'education.institution': Joi.string().required(),
  'education.graduation_year': Joi.string().pattern(yearRegex).required(),

  'letter_customization.target_company': Joi.string().allow('').optional(),
  'letter_customization.target_position': Joi.string().required(),

  'languages.languages': Joi.array().items(Joi.string()).max(4).optional(),

  'availability.immediate': Joi.boolean().optional()
});


function validateFormResponses(data:any) {
  return formResponsesSchema.validate(data, {
    abortEarly: false,
    allowUnknown: false
  });
}


export default validateFormResponses

