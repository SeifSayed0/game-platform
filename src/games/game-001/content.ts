import type {
  Case017EvidenceId,
  Case017PersonId,
} from './game'

export type Case017Evidence = {
  id: Case017EvidenceId
  title: string
  location: string
  summary: string
  details: string[]
  category: 'physical' | 'document' | 'testimony' | 'digital' | 'timeline'
  isRedHerring?: boolean
}

export type Case017Person = {
  id: Case017PersonId
  name: string
  role: string
  description: string
}

export type Case017Hint = {
  id: string
  text: string
  cost: number
}

export type Case017DeductionQuestion = {
  id:
    | 'whatHappened'
    | 'meaningOf217'
    | 'reason'
    | 'meaningOf417'
  title: string
  options: Array<{
    value: string
    label: string
  }>
}

export const case017Evidence: Case017Evidence[] = [
  {
    id: 'phone',
    title: 'الهاتف المكسور',
    location: 'مكتب آدم',
    summary: 'هاتف مكسور على الأرض بجوار المكتب.',
    details: [
      'الهاتف تعرض لضربة قوية أدت إلى تحطم الشاشة.',
      'لا توجد آثار واضحة لمعركة داخل المكتب.',
      'آخر مكالمة صادرة منه كانت مكالمة الطوارئ عند 02:17.',
    ],
    category: 'physical',
  },
  {
    id: 'clock',
    title: 'ساعة الحائط',
    location: 'غرفة المعيشة',
    summary: 'الساعة متوقفة عند 02:17.',
    details: [
      'عقارب الساعة متوقفة عند 02:17 بالضبط.',
      'البطارية ما زالت تعمل.',
      'فحص الساعة يشير إلى أن العقارب حُركت يدويًا.',
    ],
    category: 'timeline',
  },
  {
    id: 'coffee',
    title: 'فنجان القهوة',
    location: 'المكتب',
    summary: 'فنجان قهوة ما زال دافئًا على المكتب.',
    details: [
      'الفنجان وُجد بجوار أوراق آدم.',
      'القهوة كانت لا تزال دافئة عند وصول الشرطة.',
      'درجة حرارة القهوة وحدها لا تحدد وقت مغادرة آدم بدقة.',
    ],
    category: 'physical',
    isRedHerring: true,
  },
  {
    id: 'door',
    title: 'الباب الرئيسي',
    location: 'مدخل الشقة',
    summary: 'الباب كان مغلقًا من الداخل دون آثار اقتحام.',
    details: [
      'لا توجد آثار كسر على القفل.',
      'لا توجد علامات على اقتحام الباب.',
      'وضع القفل جعل الدخول من الباب الرئيسي غير مرجح بعد مغادرة آدم.',
    ],
    category: 'physical',
  },
  {
    id: 'window',
    title: 'النافذة المفتوحة',
    location: 'الغرفة الثالثة',
    summary: 'نافذة مفتوحة في الطابق الثالث.',
    details: [
      'النافذة كانت مفتوحة عند وصول الشرطة.',
      'لا توجد آثار دخول أو خروج حولها.',
      'لا توجد علامات أقدام أو أدوات بالقرب منها.',
    ],
    category: 'physical',
    isRedHerring: true,
  },
  {
    id: 'camera',
    title: 'تسجيل الكاميرا',
    location: 'محيط المبنى',
    summary: 'شخص يرتدي جاكيتًا داكنًا ظهر قرب ممر الخدمة.',
    details: [
      'التسجيل يعود إلى الساعة 02:21.',
      'الشخص تحرك في اتجاه درج الخدمة.',
      'جودة التسجيل لا تسمح بالتأكد من هوية الشخص من الوجه.',
    ],
    category: 'digital',
  },
  {
    id: 'guard',
    title: 'شهادة الحارس',
    location: 'مدخل المبنى',
    summary: 'الحارس حمدي كان موجودًا في المبنى ليلتها.',
    details: [
      'حمدي يقول إنه لم يرَ أحدًا يدخل من الباب الرئيسي بعد 01:40.',
      'يقول إن درج الخدمة نادرًا ما يستخدمه السكان.',
      'لم يذكر أنه راقب درج الخدمة طوال الليل.',
    ],
    category: 'testimony',
  },
  {
    id: 'service-stairs',
    title: 'درج الخدمة',
    location: 'خلف المبنى',
    summary: 'ممر خدمة يؤدي إلى باب خلفي يفتح على زقاق.',
    details: [
      'يوجد باب خدمة خلف الدرج.',
      'الباب يؤدي إلى الزقاق الخلفي للمبنى.',
      'وجدت الشرطة آثار تراب حديثة بالقرب من الدرج.',
      'وُجدت قطعة ورق ممزقة تحمل الرقم 417 بالقرب من المكان.',
    ],
    category: 'physical',
  },
  {
    id: 'note-417',
    title: 'الورقة الممزقة',
    location: 'درج الخدمة',
    summary: 'قطعة ورق صغيرة تحمل الرقم 417.',
    details: [
      'الورقة تبدو جزءًا من مستند أكبر.',
      'الرقم 417 مكتوب بخط واضح.',
      'لا يوجد ما يشير إلى أن الرقم مرتبط برقم الشقة.',
    ],
    category: 'document',
  },
  {
    id: 'account-file',
    title: 'ملف الحساب 417',
    location: 'ملفات آدم',
    summary: 'ملف مالي يتعلق بحساب يحمل الرقم 417.',
    details: [
      'الحساب مرتبط بتحويلات مالية غير مبررة.',
      'التحويلات مرتبطة بشركة Northline Trading.',
      'اسم مازن فؤاد يظهر ضمن المستندات المرتبطة بالحساب.',
      'الملف يوضح أن آدم كان يتتبع حركة الأموال.',
    ],
    category: 'document',
  },
  {
    id: 'adam-message',
    title: 'الرسالة غير المرسلة',
    location: 'هاتف احتياطي',
    summary: 'رسالة كتبها آدم ولم يرسلها.',
    details: [
      'الرسالة تقول: "لو حصل لي حاجة، دوروا على 417."',
      'الرسالة لم تُرسل إلى أي شخص.',
      'وجود الرسالة يشير إلى أن آدم كان يخشى أن يحدث له شيء.',
    ],
    category: 'digital',
  },
  {
    id: 'mazen-statement',
    title: 'تصريح مازن',
    location: 'مكتب الشرطة',
    summary: 'مازن فؤاد يقول إنه لم يعرف شيئًا عن اختفاء آدم.',
    details: [
      'مازن يقول إنه رأى آدم آخر مرة حوالي الساعة 11 مساءً.',
      'يقول إنه لا يعرف ما الذي كان آدم يبحث عنه.',
      'يعترف بأن آدم كان يعمل على بعض الملفات المالية.',
      'تصريحه لا يفسر علاقة اسم الشركة بالحساب 417.',
    ],
    category: 'testimony',
  },
]

export const case017People: Case017Person[] = [
  {
    id: 'adam',
    name: 'آدم ناصر',
    role: 'الشخص المختفي',
    description:
      'محاسب يبلغ من العمر 29 عامًا. كان يتتبع مخالفات مالية داخل شركة Northline Trading.',
  },
  {
    id: 'mazen',
    name: 'مازن فؤاد',
    role: 'مدير في Northline Trading',
    description:
      'كان اسمه يظهر ضمن المستندات المتعلقة بالحساب 417.',
  },
  {
    id: 'layla',
    name: 'ليلى',
    role: 'زميلة آدم',
    description:
      'كانت تعرف أن آدم يعمل على ملفات مالية غير معتادة قبل اختفائه.',
  },
  {
    id: 'hamdy',
    name: 'حمدي',
    role: 'حارس المبنى',
    description:
      'كان يعمل في المبنى ليلة اختفاء آدم، وشاهد حركة المدخل الرئيسي.',
  },
]

export const case017Hints: Case017Hint[] = [
  {
    id: 'timeline',
    text: 'هناك تفصيلة في توقيت الأحداث لا تتوافق مع كون 02:17 وقت حدوث شيء لآدم.',
    cost: 5,
  },
  {
    id: 'service-route',
    text: 'الباب المغلق ليس بالضرورة معناه أن آدم لم يغادر الشقة.',
    cost: 5,
  },
  {
    id: '417',
    text: 'الرقم 417 يظهر في أكثر من مكان، لكن معناه لا يتعلق بالمبنى نفسه.',
    cost: 5,
  },
  {
    id: 'motive',
    text: 'ابحث عمّا كان آدم يخشاه قبل أن تختفي آثاره.',
    cost: 5,
  },
]

export const case017DeductionQuestions: Case017DeductionQuestion[] = [
  {
    id: 'whatHappened',
    title: 'ماذا حدث لآدم؟',
    options: [
      {
        value: 'murdered',
        label: 'قُتل',
      },
      {
        value: 'kidnapped',
        label: 'اختُطف',
      },
      {
        value: 'escaped',
        label: 'اختفى بإرادته',
      },
      {
        value: 'left-after-fight',
        label: 'غادر بعد شجار',
      },
    ],
  },
  {
    id: 'meaningOf217',
    title: 'ما معنى 02:17؟',
    options: [
      {
        value: 'death',
        label: 'وقت وفاة آدم',
      },
      {
        value: 'entry',
        label: 'وقت دخول شخص إلى الشقة',
      },
      {
        value: 'plan-start',
        label: 'بداية خطة الاختفاء',
      },
      {
        value: 'power-failure',
        label: 'وقت انقطاع الكهرباء',
      },
    ],
  },
  {
    id: 'reason',
    title: 'لماذا اختفى آدم؟',
    options: [
      {
        value: 'police',
        label: 'لأنه كان ذاهبًا للشرطة',
      },
      {
        value: 'crime',
        label: 'لأنه تورط في جريمة',
      },
      {
        value: 'protect-self',
        label: 'لحماية نفسه بعد اكتشاف المخالفات المالية',
      },
      {
        value: 'steal-money',
        label: 'للسرقة والهروب بالمال',
      },
    ],
  },
  {
    id: 'meaningOf417',
    title: 'ما معنى 417؟',
    options: [
      {
        value: 'apartment',
        label: 'رقم شقة',
      },
      {
        value: 'phone',
        label: 'رمز الهاتف',
      },
      {
        value: 'financial-account',
        label: 'حساب مالي مرتبط بالمخالفات',
      },
      {
        value: 'car',
        label: 'رقم سيارة',
      },
    ],
  },
]
