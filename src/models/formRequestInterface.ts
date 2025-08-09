export interface FormRequest {
  'personal_info.full_name': string;
  'personal_info.professional_title': string;
  'personal_info.email': string;
  'personal_info.phone'?: string;
  'personal_info.linkedin'?: string;

  'professional_summary.summary': string;

  'key_skills.skills': string[];
  'work_experience.job_title': string;
  'work_experience.company': string;
  'work_experience.period': string;
  'work_experience.achievements': string;

  'education.degree': string;
  'education.institution': string;
  'education.graduation_year': string;

  'letter_customization.target_company'?: string;
  'letter_customization.target_position': string;

  'languages.languages'?: string[]; // max 4

  'availability.immediate'?: boolean;
}
