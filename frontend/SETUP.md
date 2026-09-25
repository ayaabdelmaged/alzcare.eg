# تعليمات التشغيل السريع

## إذا كانت الصفحة بيضاء، اتبع الخطوات التالية:

### 1. تأكد من تثبيت الحزم:
```bash
cd frontend
npm install
```

### 2. شغّل التطبيق:
```bash
npm run dev
```

### 3. افتح المتصفح على:
```
http://localhost:5173
```

### 4. إذا كانت المشكلة مستمرة:

#### تحقق من الكونسول:
- افتح Developer Tools (F12)
- انظر إلى Console للأخطاء
- انظر إلى Network tab

#### تأكد من أن الحزم مثبتة:
```bash
npm list react react-dom react-router-dom tailwindcss
```

#### حاول إعادة البناء:
```bash
npm run build
npm run preview
```

## الأخطاء الشائعة:

### خطأ: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### خطأ: "Port already in use"
غير البورت في vite.config.js أو أغلق العملية المستخدمة للبورت
