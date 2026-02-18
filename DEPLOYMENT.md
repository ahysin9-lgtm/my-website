# 🚀 دليل النشر - EWMS Application

## المتطلبات الأساسية

### قبل البدء، تأكد من توفر:

- ✅ حساب على منصة استضافة (Vercel، Railway، أو DigitalOcean)
- ✅ قاعدة بيانات PostgreSQL جاهزة
- ✅ Domain (نطاق) خاص (اختياري ولكن موصى به)
- ✅ Git repository للمشروع

---

## 📦 الخطوة 1: تجهيز المشروع

### 1.1 تثبيت المكتبات المطلوبة

قبل النشر، يجب تثبيت المكتبات الناقصة:

```bash
# تثبيت bcryptjs لتشفير كلمات المرور
npm install bcryptjs @types/bcryptjs

# تثبيت @auth/prisma-adapter (اختياري)
npm install @auth/prisma-adapter
```

### 1.2 توليد مفتاح AUTH_SECRET

```bash
# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# أو استخدم موقع
# https://generate-secret.vercel.app/32
```

احفظ المفتاح الناتج في ملف `.env.local`

### 1.3 تحديث كلمات المرور

في ملف `prisma/seed.ts`، قم بتشفير كلمة المرور:

```typescript
import bcrypt from 'bcryptjs'

// استبدل السطر
password: 'admin123',

// بالتالي:
password: await bcrypt.hash('admin123', 10),
```

وفي ملف `src/auth.ts`، ألغِ التعليق عن:

```typescript
import bcrypt from "bcryptjs"

// واستبدل
const isPasswordValid = credentials.password === user.password

// بـ
const isPasswordValid = await bcrypt.compare(
  credentials.password as string,
  user.password
)
```

---

## 🗄️ الخطوة 2: إعداد قاعدة البيانات

### 2.1 اختر مزود PostgreSQL

**الخيارات الموصى بها:**

#### أ) Vercel Postgres (الأسهل)
1. افتح [Vercel Dashboard](https://vercel.com)
2. اذهب إلى Storage → Create Database → Postgres
3. انسخ `DATABASE_URL` من صفحة الإعدادات

#### ب) Supabase (مجاني)
1. افتح [Supabase](https://supabase.com)
2. أنشئ مشروع جديد
3. اذهب إلى Settings → Database
4. انسخ Connection String (Session mode)

#### ج) Railway (سهل ومرن)
1. افتح [Railway.app](https://railway.app)
2. New Project → Provision PostgreSQL
3. انسخ `DATABASE_URL`

### 2.2 تحديث schema.prisma

في ملف `prisma/schema.prisma`، تأكد من:

```prisma
datasource db {
  provider = "postgresql"  // ليس sqlite
  url      = env("DATABASE_URL")
}
```

### 2.3 إعداد قاعدة البيانات

```bash
# إنشاء migration جديدة
npx prisma migrate dev --name init

# تشغيل migrations في الإنتاج
npx prisma migrate deploy

# إنشاء Prisma Client
npx prisma generate

# إضافة بيانات أولية
npx prisma db seed
```

### 2.4 إضافة script seed في package.json

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "scripts": {
    "db:seed": "prisma db seed"
  }
}
```

تثبيت tsx:
```bash
npm install -D tsx
```

---

## 🌐 الخطوة 3: النشر على Vercel (موصى به)

### 3.1 تجهيز المشروع

```bash
# تأكد من نظافة Git
git add .
git commit -m "Production ready"
git push origin main
```

### 3.2 النشر

1. اذهب إلى [Vercel](https://vercel.com)
2. اضغط "New Project"
3. استورد repository من GitHub
4. أضف Environment Variables:

```
DATABASE_URL=postgresql://...
AUTH_SECRET=your-generated-secret
AUTH_URL=https://yourdomain.com
AUTH_TRUST_HOST=true
NODE_ENV=production
```

5. اضغط "Deploy"

### 3.3 ما بعد النشر

```bash
# شغل migrations على قاعدة البيانات الإنتاجية
# من Vercel Dashboard → Project → Settings → Functions
# يمكنك تشغيل:
npx prisma migrate deploy
npx prisma db seed
```

---

## 🐳 الخطوة 4: النشر باستخدام Docker (اختياري)

### 4.1 بناء الـ Image

```bash
docker build -t ewms-app .
```

### 4.2 تشغيل الـ Container

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e AUTH_SECRET="your-secret" \
  -e AUTH_URL="https://yourdomain.com" \
  -e NODE_ENV="production" \
  ewms-app
```

---

## 🔒 الخطوة 5: التأكد من الأمان

### قائمة مراجعة الأمان:

- [ ] تم تغيير `AUTH_SECRET` إلى قيمة عشوائية قوية
- [ ] تم تشفير جميع كلمات المرور باستخدام bcrypt
- [ ] تم تفعيل HTTPS على الـ domain
- [ ] تم إخفاء ملفات `.env.local` من Git
- [ ] تم اختبار صفحات Admin (محمية بشكل صحيح)
- [ ] تم تحديث `AUTH_URL` للـ domain الفعلي
- [ ] تم مراجعة Security Headers في `next.config.mjs`

---

## 📊 الخطوة 6: المراقبة والصيانة

### إضافة مراقبة الأخطاء (Sentry)

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### إضافة Uptime Monitoring

استخدم [UptimeRobot](https://uptimerobot.com) أو [Better Uptime](https://betteruptime.com)

---

## 🧪 الخطوة 7: الاختبار النهائي

### قائمة الاختبار:

- [ ] الصفحة الرئيسية تعمل
- [ ] تبديل اللغات (عربي/إنجليزي) يعمل
- [ ] تسجيل الدخول يعمل
- [ ] صفحات Admin محمية ويمكن الوصول إليها
- [ ] صفحات المنتجات تعمل
- [ ] النماذج تعمل (Contact، Advisor)
- [ ] الصور تظهر بشكل صحيح
- [ ] الموقع سريع وResponsive

---

## 🆘 استكشاف الأخطاء وإصلاحها

### مشكلة: Database connection failed

**الحل:**
```bash
# تحقق من صحة DATABASE_URL
echo $DATABASE_URL

# اختبر الاتصال
npx prisma db pull
```

### مشكلة: Auth not working

**الحل:**
- تأكد من `AUTH_SECRET` موجود ولا يحتوي spaces
- تأكد من `AUTH_URL` يطابق الـ domain الفعلي
- تأكد من تثبيت bcryptjs

### مشكلة: Build failed

**الحل:**
```bash
# امسح cache وأعد البناء
rm -rf .next
npm run build
```

---

## 📚 موارد إضافية

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)

---

## ✅ قائمة التحقق النهائية

قبل إطلاق الموقع للعموم:

- [ ] تم النشر بنجاح
- [ ] تم اختبار جميع الوظائف
- [ ] تم إضافة المراقبة
- [ ] تم إعداد النسخ الاحتياطي
- [ ] تم توثيق بيانات الدخول
- [ ] تم إبلاغ الفريق
- [ ] تم إعداد Domain مخصص
- [ ] تم تفعيل SSL

---

## 🎉 تهانينا!

موقعك الآن جاهز للنشر! 🚀
