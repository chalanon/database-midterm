# ติวสอบ Database กลางภาค (onepage)

เว็บสรุปเนื้อหา + แบบฝึกหัดสุ่มข้อ สำหรับสอบกลางภาควิชา Database สร้างด้วย Next.js (static export) จัดเต็มในหน้าเดียว ธีมสว่าง อ่านง่าย

## ✨ ฟีเจอร์

- **เนื้อหาสรุป** — Normalization (1NF–4NF), ER Diagram / Crow's Foot, Data Dictionary, SQL และชนิดข้อมูล
- **แบบฝึกหัด 6 ชุด** ตรงตามรูปแบบข้อสอบ
  1. Normalization (20 คะแนน) — สุ่มข้อมูลให้ 2 ชุด (ร้านหนังสือ/ร้านคอม)
  2. Crow's Foot ER Diagram (20 คะแนน) — ร้านกาแฟ
  3. Data Dictionary (15 คะแนน)
  4. แทนค่าข้อมูลจริง / ตรวจ FK (15 คะแนน)
  5. Fill in the gaps (35 คะแนน) — สุ่ม 7 ข้อจาก 27 คำศัพท์
  6. แก้ประโยค (30 คะแนน) — สุ่ม 6 ข้อจาก 15 ประโยค
- **สุ่มโจทย์ใหม่ทุกครั้ง** กดปุ่ม 🎲 เพื่อไม่ให้เจอข้อซ้ำกันในการฝึกซ้ำ
- **ตรวจคำตอบ + เฉลย** ทั้งแบบอัตโนมัติ (เติมคำ / แก้ประโยค / choice) และแบบให้ประเมินตัวเอง (ทำ ER, Normalization)
- **จัดอันดับ** บันทึกเฉพาะคะแนน **รอบแรก** เท่านั้น (รอบอื่นไม่นับ) — เก็บใน localStorage ของเบราว์เซอร์

## 🚀 วิธีรันในเครื่อง

```bash
npm install
npm run dev      # http://localhost:3000
```

Build static:

```bash
npm run build    # output อยู่ที่ ./out
```

## 🌐 Deploy ขึ้น GitHub Pages

1. สร้าง repo บน GitHub แล้ว push โค้ดขึ้นสาขา `main`
2. ไปที่ **Settings → Pages → Source: GitHub Actions**
3. workflow ใน `.github/workflows/deploy.yml` จะ build และ deploy ให้อัตโนมัติทุกครั้งที่ push
4. เว็บจะอยู่ที่ `https://<username>.github.io/<repo-name>/`

> path ของเว็บ (basePath) ถูกตั้งอัตโนมัติจากชื่อ repo ผ่านตัวแปร `NEXT_PUBLIC_BASE_PATH`

## 📁 โครงสร้าง

```
lib/
  types.ts          # types ที่ใช้ร่วมกัน
  normalize.ts      # สุ่มข้อ + ตรวจคำตอบ
  leaderboard.ts    # จัดอันดับ (localStorage)
  data/study.ts     # เนื้อหาสรุป
  data/sets.ts      # แบบฝึกหัด 6 ชุด + เฉลย
app/
  components/       # UI (Quiz, Leaderboard, RichText, Mermaid)
  page.tsx          # หน้าเดียวทั้งหมด
```
