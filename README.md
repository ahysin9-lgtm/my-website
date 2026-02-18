# EWMS - Enterprise Warehouse Management System

## 🏥 نظام إدارة المستودعات الطبية

تطبيق ويب احترافي لإدارة الأجهزة والمعدات الطبية، مبني بأحدث التقنيات مع دعم كامل للغتين العربية والإنجليزية.

---

## ✨ المميزات

- 🌐 **متعدد اللغات**: دعم كامل للعربية (RTL) والإنجليزية (LTR)
- 🎨 **تصميم احترافي**: واجهة مستخدم عصرية ومتجاوبة
- 🔐 **نظام مصادقة آمن**: NextAuth v5 مع تشفير كلمات المرور
- 📊 **لوحة تحكم إدارية**: إدارة كاملة للمنتجات والعلامات التجارية
- 🤖 **مستشار ذكي**: نظام توصيات مدعوم بالذكاء الاصطناعي
- ⚡ **أداء عالي**: مبني على Next.js 16 و React 19
- 🗄️ **قاعدة بيانات قوية**: Prisma ORM مع دعم PostgreSQL
- 🎭 **رسوم متحركة**: تأثيرات سلسة باستخدام Framer Motion
- 🔒 **أمان مشدد**: Security Headers وحماية متعددة المستويات

---

## 🛠️ التقنيات المستخدمة

### Frontend
- **Next.js 16** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible Components
- **next-intl** - Internationalization

### Backend
- **Prisma** - ORM
- **PostgreSQL** - Database (SQLite للتطوير)
- **NextAuth v5** - Authentication

### DevOps
- **Docker** - Containerization
- **Vercel** - Deployment (Recommended)

---

## 🚀 البدء السريع

### المتطلبات

- Node.js 20+
- npm أو yarn
- PostgreSQL (للإنتاج)

### التثبيت

```bash
# 1. استنساخ المشروع
git clone <repository-url>
cd ewms-app

# 2. تثبيت المكتبات
npm install

# 3. إعداد متغيرات البيئة
cp .env.example .env.local
# ثم قم بتعديل .env.local وإضافة القيم المطلوبة

# 4. إعداد قاعدة البيانات
npm run db:push
npm run db:seed

# 5. تشغيل المشروع
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح

### بيانات الدخول الافتراضية

```
البريد: admin@ewms.com
كلمة المرور: admin123
```

⚠️ **تحذير**: غيّر كلمة المرور فوراً بعد أول تسجيل دخول!

---

## 📁 بنية المشروع

```
ewms-app/
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── seed.ts            # Initial data
│   └── migrations/        # Database migrations
├── public/
│   └── images/           # Static assets
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── [locale]/    # Localized routes
│   │   ├── api/         # API routes
│   │   └── globals.css  # Global styles
│   ├── components/       # React components
│   │   ├── layout/      # Layout components
│   │   ├── home/        # Home page components
│   │   └── ui/          # Reusable UI components
│   ├── lib/             # Utility functions
│   ├── types/           # TypeScript definitions
│   ├── auth.ts          # NextAuth configuration
│   └── middleware.ts    # Next.js middleware
├── messages/            # Translation files
│   ├── en.json         # English
│   └── ar.json         # Arabic
├── .env.local          # Environment variables (local)
├── .env.example        # Environment template
├── next.config.mjs     # Next.js config
├── tailwind.config.ts  # Tailwind config
└── tsconfig.json       # TypeScript config
```

---

## 🗄️ قاعدة البيانات

### إدارة Database

```bash
# إنشاء migration جديدة
npm run db:migrate

# دفع التغييرات للـ database مباشرة
npm run db:push

# فتح Prisma Studio (واجهة مرئية)
npm run db:studio

# تحديث Prisma Client
npm run db:generate

# إضافة بيانات أولية
npm run db:seed
```

### Models الرئيسية

- **User**: المستخدمين والصلاحيات
- **Product**: المنتجات والأجهزة  
- **Brand**: العلامات التجارية
- **Solution**: الحلول والخدمات
- **Lead**: طلبات العملاء
- **Inventory**: المخزون

---

## 🔐 المصادقة والأمان

### NextAuth v5

المشروع يستخدم NextAuth v5 للمصادقة مع:
- ✅ Credentials Provider
- ✅ JWT Sessions
- ✅ Password Hashing (bcrypt)
- ✅ Role-based Access Control

### Security Headers

Security headers مفعّلة في `next.config.mjs`:
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Strict-Transport-Security`
- `Referrer-Policy`
- وغيرها...

---

## 🌍 التدويل (i18n)

### إضافة ترجمات

1. افتح `messages/ar.json` أو `messages/en.json`
2. أضف المفتاح والقيمة:

```json
{
  "common": {
    "newKey": "النص بالعربية"
  }
}
```

3. استخدمها في المكونات:

```tsx
import { useTranslations } from 'next-intl'

const t = useTranslations('common')
t('newKey') // "النص بالعربية"
```

---

## 📦 النشر

راجع [DEPLOYMENT.md](./DEPLOYMENT.md) للحصول على دليل كامل للنشر.

### نشر سريع على Vercel

```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel
```

أو ادفع للـ GitHub وربط repository مع Vercel Dashboard.

---

## 🧪 الاختبار

```bash
# Lint
npm run lint

# Type checking
npm run build
```

---

## 📝 Scripts المتاحة

| Script | الوصف |
|--------|-------|
| `npm run dev` | تشغيل بيئة التطوير |
| `npm run build` | بناء للإنتاج |
| `npm run start` | تشغيل الإنتاج |
| `npm run lint` | فحص الأكواد |
| `npm run db:migrate` | إنشاء migration |
| `npm run db:push` | دفع التغييرات للـ DB |
| `npm run db:seed` | إضافة بيانات أولية |
| `npm run db:studio` | فتح Prisma Studio |

---

## 🤝 المساهمة

المساهمات مرحب بها! يرجى:

1. Fork المشروع
2. إنشاء branch للميزة الجديدة
3. Commit التغييرات
4. Push للـ branch
5. فتح Pull Request

---

## 📄 الترخيص

هذا المشروع خاص ومحمي بحقوق النشر.

---

## 📞 الدعم

للاستفسارات والدعم:
- البريد الإلكتروني: support@ewms.com
- الموقع: https://ewms.com

---

## 🙏 شكر وتقدير

شكراً لاستخدام EWMS!

تم البناء بـ ❤️ باستخدام Next.js و Prisma
