import { LanguageCode } from '../models/formRequestInterface.js';

function getSectionTitles(languageCode: LanguageCode) {
  const sectionTitles = {
    es: {
      professionalSummary: 'RESUMEN PROFESIONAL',
      keySkills: 'HABILIDADES CLAVE',
      workExperience: 'EXPERIENCIA LABORAL',
      education: 'EDUCACIÓN',
      languages: 'IDIOMAS',
    },
    en: {
      professionalSummary: 'PROFESSIONAL SUMMARY',
      keySkills: 'KEY SKILLS',
      workExperience: 'WORK EXPERIENCE',
      education: 'EDUCATION',
      languages: 'LANGUAGES',
    },
    fr: {
      professionalSummary: 'RÉSUMÉ PROFESSIONNEL',
      keySkills: 'COMPÉTENCES CLÉS',
      workExperience: 'EXPÉRIENCE PROFESSIONNELLE',
      education: 'FORMATION',
      languages: 'LANGUES',
    },
    de: {
      professionalSummary: 'BERUFLICHES PROFIL',
      keySkills: 'KENNTNISSE',
      workExperience: 'BERUFSERFAHRUNG',
      education: 'AUSBILDUNG',
      languages: 'SPRACHEN',
    },
    it: {
      professionalSummary: 'RIEPILOGO PROFESSIONALE',
      keySkills: 'COMPETENZE CHIAVE',
      workExperience: 'ESPERIENZA LAVORATIVA',
      education: 'ISTRUZIONE',
      languages: 'LINGUE',
    },
    pt: {
      professionalSummary: 'RESUMO PROFISSIONAL',
      keySkills: 'HABILIDADES-CHAVE',
      workExperience: 'EXPERIÊNCIA PROFISSIONAL',
      education: 'EDUCAÇÃO',
      languages: 'IDIOMAS',
    },
    zh: {
      professionalSummary: '专业概述',
      keySkills: '关键技能',
      workExperience: '工作经历',
      education: '教育背景',
      languages: '语言能力',
    },
    ja: {
      professionalSummary: 'プロフェッショナルサマリー',
      keySkills: '主なスキル',
      workExperience: '職務経歴',
      education: '学歴',
      languages: '言語',
    },
    hi: {
      professionalSummary: 'पेशेवर सारांश',
      keySkills: 'मुख्य कौशल',
      workExperience: 'कार्य अनुभव',
      education: 'शिक्षा',
      languages: 'भाषाएँ',
    },
    fa: {
      professionalSummary: 'خلاصه حرفه‌ای',
      keySkills: 'مهارت‌های کلیدی',
      workExperience: 'سوابق کاری',
      education: 'تحصیلات',
      languages: 'زبان‌ها',
    },
    ar: {
      professionalSummary: 'ملخص مهني',
      keySkills: 'المهارات الرئيسية',
      workExperience: 'الخبرة العملية',
      education: 'التعليم',
      languages: 'اللغات',
    },
    ru: {
      professionalSummary: 'ПРОФЕССИОНАЛЬНОЕ РЕЗЮМЕ',
      keySkills: 'КЛЮЧЕВЫЕ НАВЫКИ',
      workExperience: 'ОПЫТ РАБОТЫ',
      education: 'ОБРАЗОВАНИЕ',
      languages: 'ЯЗЫКИ',
    },
  };

  return sectionTitles[languageCode] || sectionTitles.en;
}

function getCoverLetterTexts(languageCode: LanguageCode) {
  const texts = {
    es: {
      greeting: 'Estimado equipo de contratación,',
      intro: (position: string, company: string) =>
        `Estoy entusiasmado de postularme para el puesto de ${position} en ${company}. Con mi experiencia descrita a continuación, confío en poder contribuir de manera efectiva.`,
      highlights: 'Aspectos destacados de mi experiencia:',
      closing:
        'Estaría encantado de tener la oportunidad de discutir cómo mis habilidades se alinean con sus necesidades. Gracias por su consideración.',
      farewell: 'Atentamente,',
    },
    en: {
      greeting: 'Dear Hiring Team,',
      intro: (position: string, company: string) =>
        `I am excited to apply for the ${position} position at ${company}. With my experience as described below, I am confident in my ability to contribute effectively.`,
      highlights: 'Key highlights from my experience:',
      closing:
        'I would welcome the opportunity to discuss how my skills align with your needs. Thank you for your consideration.',
      farewell: 'Best regards,',
    },
    fr: {
      greeting: 'Chère équipe de recrutement,',
      intro: (position: string, company: string) =>
        `Je suis ravi de postuler pour le poste de ${position} chez ${company}. Avec mon expérience décrite ci-dessous, je suis confiant de pouvoir contribuer efficacement.`,
      highlights: 'Points forts de mon expérience :',
      closing:
        "Je serais heureux d'avoir l'occasion de discuter de la façon dont mes compétences correspondent à vos besoins. Merci pour votre considération.",
      farewell: 'Cordialement,',
    },
    de: {
      greeting: 'Sehr geehrtes Einstellungsteam,',
      intro: (position: string, company: string) =>
        `Ich freue mich, mich für die Position als ${position} bei ${company} zu bewerben. Mit meiner unten beschriebenen Erfahrung bin ich zuversichtlich, effektiv beitragen zu können.`,
      highlights: 'Höhepunkte meiner Erfahrung:',
      closing:
        'Ich würde mich über die Gelegenheit freuen, zu besprechen, wie meine Fähigkeiten Ihren Anforderungen entsprechen. Vielen Dank für Ihre Berücksichtigung.',
      farewell: 'Mit freundlichen Grüßen,',
    },
    it: {
      greeting: 'Gentile team di assunzione,',
      intro: (position: string, company: string) =>
        `Sono entusiasta di candidarmi per la posizione di ${position} presso ${company}. Con la mia esperienza come descritta di seguito, sono fiducioso di poter contribuire efficacemente.`,
      highlights: 'Punti salienti della mia esperienza:',
      closing:
        "Sarei lieto di avere l'opportunità di discutere come le mie competenze si allineano alle vostre esigenze. Grazie per la considerazione.",
      farewell: 'Cordiali saluti,',
    },
    pt: {
      greeting: 'Caro time de recrutamento,',
      intro: (position: string, company: string) =>
        `Estou animado para me candidatar à posição de ${position} na ${company}. Com minha experiência descrita abaixo, estou confiante em minha capacidade de contribuir efetivamente.`,
      highlights: 'Principais destaques da minha experiência:',
      closing:
        'Gostaria de ter a oportunidade de discutir como minhas habilidades se alinham às suas necessidades. Obrigado pela consideração.',
      farewell: 'Atenciosamente,',
    },
    zh: {
      greeting: '招聘团队您好，',
      intro: (position: string, company: string) =>
        `我很高兴申请${company}的${position}职位。根据下面描述的经验，我相信我能够有效地做出贡献。`,
      highlights: '我的经验亮点：',
      closing: '我希望有机会讨论我的技能如何符合您的需求。感谢您的考虑。',
      farewell: '此致,',
    },
    ja: {
      greeting: '採用担当者様、',
      intro: (position: string, company: string) =>
        `${company}の${position}のポジションに応募できることを大変うれしく思います。以下に記載された経験をもとに、効果的に貢献できると確信しています。`,
      highlights: '私の経験のハイライト：',
      closing:
        '私のスキルが貴社のニーズにどのように適合するかについて話し合う機会をいただければ幸いです。ご検討いただきありがとうございます。',
      farewell: '敬具,',
    },
    hi: {
      greeting: 'प्रिय हायरिंग टीम,',
      intro: (position: string, company: string) =>
        `मैं ${company} में ${position} पद के लिए आवेदन करने के लिए उत्साहित हूं। नीचे वर्णित मेरे अनुभव के साथ, मुझे विश्वास है कि मैं प्रभावी ढंग से योगदान कर सकता हूं।`,
      highlights: 'मेरे अनुभव के मुख्य बिंदु:',
      closing:
        'मैं इस अवसर का स्वागत करूंगा कि कैसे मेरी क्षमताएँ आपकी आवश्यकताओं के अनुरूप हैं। विचार के लिए धन्यवाद।',
      farewell: 'सादर,',
    },
    fa: {
      greeting: 'تیم استخدام محترم،',
      intro: (position: string, company: string) =>
        `من مشتاقم برای موقعیت ${position} در ${company} درخواست دهم. با توجه به تجربه‌های شرح داده شده، مطمئن هستم که می‌توانم به طور مؤثر کمک کنم.`,
      highlights: 'نکات برجسته از تجربه من:',
      closing:
        'خوشحال می‌شوم فرصتی برای بحث دربارهٔ چگونگی هماهنگی مهارت‌هایم با نیازهای شما داشته باشم. از توجه شما سپاسگزارم.',
      farewell: 'با احترام,',
    },
    ar: {
      greeting: 'فريق التوظيف المحترم،',
      intro: (position: string, company: string) =>
        `أنا متحمس للتقدم لوظيفة ${position} في ${company}. مع خبرتي كما هو موضح أدناه، أنا واثق من قدرتي على المساهمة بشكل فعال.`,
      highlights: 'أبرز النقاط من خبرتي:',
      closing: 'سأكون سعيدًا بفرصة مناقشة كيفية توافق مهاراتي مع احتياجاتكم. شكرًا لاهتمامكم.',
      farewell: 'مع أطيب التحيات,',
    },
    ru: {
      greeting: 'Уважаемая команда по найму,',
      intro: (position: string, company: string) =>
        `Я рад подать заявку на должность ${position} в ${company}. С моим опытом, описанным ниже, я уверен в своей способности эффективно внести вклад.`,
      highlights: 'Основные моменты моего опыта:',
      closing:
        'Буду рад обсудить, как мои навыки соответствуют вашим потребностям. Спасибо за внимание.',
      farewell: 'С уважением,',
    },
  };

  return texts[languageCode] || texts.en;
}

export { getSectionTitles, getCoverLetterTexts };
