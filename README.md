# Admin Dashboard - Next.js

لوحة تحكم متكاملة لمواقع Next.js مع نظام إدارة محتوى متقدم وأدوات ذكاء اصطناعي.

## 🌟 المميزات

### 🔐 نظام المصادقة
- تسجيل دخول لمدير واحد فقط
- إمكانية تغيير كلمة المرور من لوحة التحكم
- جلسات آمنة مع انتهاء الصلاحية
- حماية ضد هجمات CSRF و XSS

### 📄 إدارة الصفحات
- إنشاء/تعديل/حذف الصفحات بسهولة
- محرر Block-based متقدم
- إعدادات SEO كاملة لكل صفحة
- دعم النشر وإلغاء النشر

### 🎨 Landing Page Builder
- محرر سحب وإفلات متطور
- مكونات جاهزة: Hero, Features, Pricing, Testimonials, Contact Form, Custom HTML
- معاينة مباشرة أثناء البناء
- نشر وإلغاء النشر بضغطة زر

### 🤖 AI Tool Builder
- إنشاء أدوات ذكاء اصطناعي مخصصة
- حقول إدخال مرنة
- إدارة البرومبتات مع حفظ النسخ السابقة
- واجهة اختبار مدمجة
- إعدادات LLM متقدمة

### 📊 Pixel & Script Injection
- إضافة أكواد تتبع Global أو per-page
- اختيار موضع التثبيت (head, body_start, body_end)
- إعداد قواعد شرطية بسيطة
- زر تفعيل/تعطيل سريع
- شاشة Debug متكاملة

### ⚙️ الإعدادات
- تغيير بيانات تسجيل الدخول
- تخزين مفاتيح API بأمان
- إعدادات عامة للموقع
- إعدادات الأمان المتقدمة

## 🛠️ التقنيات المستخدمة

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: SQLite مع Prisma ORM
- **Authentication**: JWT Tokens
- **Security**: bcryptjs, DOMPurify, CSRF Protection
- **AI Integration**: z-ai-web-dev-sdk
- **State Management**: React Hooks

## 📁 هيكل المشروع

```
src/
├── app/
│   ├── admin/                    # لوحة التحكم
│   │   ├── login/                # صفحة تسجيل الدخول
│   │   ├── dashboard/            # الصفحة الرئيسية
│   │   ├── pages/                # إدارة الصفحات
│   │   ├── landing-pages/        # بناء الصفحات الهبوطية
│   │   ├── ai-tools/             # بناء أدوات AI
│   │   ├── scripts/              # إدارة السكربتات
│   │   └── settings/             # الإعدادات
│   ├── api/
│   │   ├── auth/                 # واجهات المصادقة
│   │   ├── pages/                # واجهات إدارة الصفحات
│   │   ├── landing-pages/        # واجهات الصفحات الهبوطية
│   │   ├── ai-tools/             # واجهات أدوات AI
│   │   ├── scripts/              # واجهات السكربتات
│   │   ├── settings/             # واجهات الإعدادات
│   │   ├── dashboard/            # واجهات الإحصائيات
│   │   └── admin/                # واجهات تهيئة النظام
│   └── layout.tsx               # التخطيط الرئيسي
├── components/
│   └── ui/                      # مكونات واجهة المستخدم
├── hooks/
│   └── useAuth.tsx              # هوك المصادقة
├── lib/
│   ├── auth.ts                  # وظائف المصادقة
│   ├── db.ts                    # اتصال قاعدة البيانات
│   ├── security.ts              # وظائف الأمان
│   └── utils.ts                 # وظائف مساعدة
└── prisma/
    └── schema.prisma            # مخطط قاعدة البيانات
```

## 🚀 خطوات التشغيل المحلي

### المتطلبات الأساسية
- Node.js 18+ 
- npm أو yarn

### 1. تثبيت المشروع
```bash
git clone <repository-url>
cd admin-dashboard
npm install
```

### 2. إعداد قاعدة البيانات
```bash
# إنشاء قاعدة البيانات
npm run db:push

# (اختياري) فتح Prisma Studio للتصفح
npx prisma studio
```

### 3. إعداد المتغيرات البيئية
أنشئ ملف `.env.local` في جذر المشروع:

```env
# قاعدة البيانات
DATABASE_URL="file:./dev.db"

# سر JWT (استخدم قيمة عشوائية قوية)
JWT_SECRET="your-super-secret-jwt-key-here"

# مفاتيح API (اختياري)
OPENAI_API_KEY="your-openai-api-key"
```

### 4. تهيئة حساب المدير
قبل استخدام لوحة التحكم، يجب إنشاء حساب المدير:

```bash
# أرسل طلب POST لإنشاء حساب المدير
curl -X POST http://localhost:3000/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your-secure-password",
    "name": "Admin User"
  }'
```

### 5. تشغيل خادم التطوير
```bash
npm run dev
```

### 6. الوصول إلى لوحة التحكم
- افتح المتصفح على `http://localhost:3000/admin/login`
- سجل الدخول باستخدام البريد الإلكتروني وكلمة المرور التي أنشأتها

## 🌐 خطوات النشر

### النشر على Vercel

#### 1. إعداد Vercel
```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول إلى Vercel
vercel login
```

#### 2. إعداد متغيرات البيئة على Vercel
```bash
# إضافة المتغيرات البيئية
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add OPENAI_API_KEY
```

#### 3. النشر
```bash
# نشر المشروع
vercel

# أو استخدام
npm run build
vercel --prod
```

#### 4. تهيئة قاعدة البيانات على الإنتاج
بعد النشر، قم بتهيئة حساب المدير على الإنتاج:

```bash
# استبدل your-domain.com بنطاقك الفعلي
curl -X POST https://your-domain.com/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your-secure-password",
    "name": "Admin User"
  }'
```

### النشر على استضافة z.ai

#### 1. ربط المشروع
```bash
# تأكد من أنك مسجل الدخول إلى z.ai
# قم برفع المشروع إلى مستودع Git
git add .
git commit -m "Initial setup"
git push origin main
```

#### 2. إعداد المتغيرات البيئية
في لوحة تحكم z.ai، أضف المتغيرات البيئية التالية:
- `DATABASE_URL`
- `JWT_SECRET`
- `OPENAI_API_KEY`

#### 3. تهيئة قاعدة البيانات
بعد النشر، استخدم نفس طريقة تهيئة حساب المدير المذكورة أعلاه.

## 🔗 ربط مفاتيح API

### OpenAI API
1. اذهب إلى [OpenAI Platform](https://platform.openai.com/)
2. سجل الدخول أو أنشئ حساباً جديداً
3. اذهب إلى API Keys section
4. أنشئ مفتاح API جديد
5. انسخ المفتاح وأضفه إلى متغيرات البيئة:
```env
OPENAI_API_KEY="sk-your-openai-api-key"
```

### مفاتيح API أخرى
في صفحة الإعدادات في لوحة التحكم، يمكنك إضافة مفاتيح API إضافية:
- Google Analytics
- Facebook Pixel
- Google Tag Manager
- أي خدمة API أخرى تحتاجها

## 🛡️ إجراءات الأمان

### تم تنفيذها
- ✅ تشفير كلمات المرور باستخدام bcryptjs
- ✅ JWT tokens مع انتهاء الصلاحية
- ✅ حماية ضد XSS باستخدام DOMPurify
- ✅ حماية ضد SQL Injection
- ✅ CSRF Protection
- ✅ Rate Limiting
- ✅ Security Headers
- ✅ Input Validation
- ✅ No user registration (admin only)

### توصيات إضافية
- استخدم كلمة مرور قوية لحساب المدير
- غيّر JWT SECRET إلى قيمة عشوائية وطويلة
- فعّل HTTPS في الإنتاج
- حدد الوصول بناءً على IP إذا لزم الأمر
- قم بعمل نسخ احتياطية منتظمة لقاعدة البيانات

## 🐛 المشاكل الشائعة والحلول

### مشكلة: "Admin already exists"
**الحل**: تم إنشاء حساب المدير مسبقاً. استخدم صفحة تسجيل الدخول مباشرة.

### مشكلة: "Database connection failed"
**الحل**: تأكد من صحة DATABASE_URL في متغيرات البيئة.

### مشكلة: "Invalid token"
**الحل**: امسح cookies المتصفح وأعد تسجيل الدخول.

### مشكلة: AI tools not working
**الحل**: تأكد من إضافة OPENAI_API_KEY في متغيرات البيئة.

## 📞 الدعم

إذا واجهت أي مشاكل أو تحتاج إلى مساعدة:
1. تحقق من سجلات الأخطاء في وحدة التحكم
2. تأكد من صحة جميع المتغيرات البيئية
3. تأكد من أن قاعدة البيانات مهيئة بشكل صحيح

## 📄 الترخيص

هذا المشروع مخصص للاستخدام الداخلي والتعليمي.

---

**ملاحظة**: تأكد من تغيير جميع القيم الافتراضية وكلمات المرور قبل استخدام النظام في الإنتاج.