# Supabase User Registration Fix

## المشكلة
عندما ينشئ شخص حساباً جديداً، لا تظهر بياناته في جدول `user_profiles` في Supabase بسبب قيود RLS (Row Level Security).

## السبب الجذري
RLS policies تتطلب JWT token صحيح من المستخدم المسجل الدخول، لكن عند التسجيل للمرة الأولى، قد يكون JWT token غير جاهز بعد.

## الحل
تم إنشاء endpoint على الخادم (`/api/users/create-profile`) يستخدم `SUPABASE_SERVICE_ROLE_KEY` (مفتاح admin) للتجاوز آمن من RLS policies.

## خطوات التكوين

### 1. الحصول على Service Role Key من Supabase
1. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
2. اختر project
3. اذهب إلى **Settings** → **API**
4. ابحث عن **Service Role** (احذر: هذا مفتاح حساس!)
5. انسخ الـ key

### 2. إضافة المتغيرات البيئية
أنشئ ملف `.env` في جذر المشروع (أو حدّث `.env.local`):

```bash
# Supabase Public Key (موجود في Admin UI)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Service Role Key (حساس جداً - لا تشاركه أبداً)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

⚠️ **تحذير أمني**: 
- لا تضع `SUPABASE_SERVICE_ROLE_KEY` في متغيرات بادئتها `VITE_` (ستظهر في المتصفح)
- يتم قراءة على الخادم فقط عبر `process.env`
- أضف `.env` و `.env.local` إلى `.gitignore`

### 3. إعادة تشغيل الخادم
```bash
pnpm dev
```

## كيفية التدفق الجديد

1. المستخدم يسجل عبر `signUpWithPassword()` → ينشئ auth user
2. بعدها مباشرة، يتم استدعاء `/api/users/create-profile` من العميل
3. الخادم (backend) يستخدم `SUPABASE_SERVICE_ROLE_KEY` لإنشاء profile في database
4. يتم:
   - إنشاء صف في جدول `user_profiles` 
   - إنشاء صف فارغ في جدول `user_habits`
5. البيانات تظهر فوراً في Supabase! ✅

## اختبار
1. افتح المتصفح → console
2. سجل حساباً جديداً
3. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
4. اختر project → **Editor** → جدول `user_profiles`
5. يجب أن تظهر البيانات الجديدة!

## للعرض في الإنتاج (Production)

اعتماداً على منصة النشر:

### Netlify
في `netlify.toml` أو Netlify UI:
```toml
[env.production]
  SUPABASE_SERVICE_ROLE_KEY = "your-service-role-key"
```

### Vercel
في project settings:
- اذهب إلى **Settings** → **Environment Variables**
- أضف `SUPABASE_SERVICE_ROLE_KEY`
- اختر scopes: Production, Preview, Development

### Firebase Hosting / AWS
اتبع نفس النمط - أضف `SUPABASE_SERVICE_ROLE_KEY` كـ environment variable

## الأمان
- Service Role Key يجب أن يبقى على الخادم فقط
- لا تكشفه في أي عرض public (GitHub, console, logs)
- إذا تعرض للخطر، regenerate من Supabase Dashboard
