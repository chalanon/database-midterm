import type { StudySection } from "../types";

export const studySections: StudySection[] = [
  {
    id: "overview",
    title: "ภาพรวมข้อสอบกลางภาค",
    icon: "🎯",
    intro: "ดูโครงสร้างข้อสอบก่อน — รู้ว่าออกอะไรเท่าไหร่ แล้ววางแผนอ่านให้ถูกที่",
    blocks: [
      { type: "p", text: "ข้อสอบกลางภาค Database ครอบคลุม **6 ชุด** รวม **135 คะแนน** — ทุกชุดจะสุ่มโจทย์ให้ใหม่ทุกครั้งที่เข้าแบบฝึกหัด เรื่องที่ออกมีดังนี้:" },
      {
        type: "table",
        headers: ["ชุด", "หัวข้อ", "คะแนน", "ลักษณะโจทย์"],
        rows: [
          ["1", "Normalization (1NF–4NF)", "20", "เขียนแยกตาราง + บอกเหตุผล (โจทย์ยาวสุด)"],
          ["2", "Crow's Foot ER Diagram", "20", "วาดแผนภาพ + ระบุ PK/FK + แก้ M:N"],
          ["3", "Data Dictionary", "15", "เขียนโครงสร้างทุกตาราง + แทนค่าข้อมูลจริง"],
          ["4", "แทนค่าข้อมูลจริง (ตรวจ FK)", "15", "เลือก ถูก/ผิด + เขียนข้อมูลให้ FK เชื่อมกันถูก"],
          ["5", "Fill in the gaps", "35", "เติมคำศัพท์ 7 ข้อ (สุ่มจาก 27 คำ)"],
          ["6", "แก้ประโยคให้ถูกต้อง", "30", "แก้ประโยคภาษาอังกฤษ 6 ข้อ (สุ่มจาก 15 ประโยค)"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "กลยุทธ์การทำข้อสอบ",
        text: "ทำชุด 1–4 ก่อน เพราะเป็นโจทย์ใหญ่รวม 70 คะแนน แล้วค่อยเก็บชุด 5–6 ซึ่งตอบสั้น/เร็ว (65 คะแนน) — อ่านบทที่ตรงกับแต่ละชุด แล้วปิดด้วยแบบฝึกหัดท้ายบทของบทนั้นทันที",
      },
      { type: "h3", text: "แผนอ่าน 3 วัน" },
      {
        type: "ol",
        items: [
          "**วันแรก:** บท คีย์และแนวคิดพื้นฐาน + บท ER Diagram/Crow's Foot (ปูฐานให้ครบ)",
          "**วันที่สอง:** บท Normalization 1NF–4NF (หัวใจข้อสอบ — อ่านให้แม่น แล้วทำชุด 1 ทันที)",
          "**วันที่สาม:** บท Data Dictionary + บท SQL แล้วทำแบบฝึกหัดจำลองสอบทั้ง 6 ชุด เก็บคะแนนลงอันดับ",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "อย่าลืมเรื่องอันดับ",
        text: "คะแนนที่เข้าอันดับคือ **รอบแรกเท่านั้น** (ต่อชื่อ 1 ชื่อใน 1 เบราว์เซอร์) — ถ้าทำแบบฝึกหัดท้ายบทแล้ว จะไม่นับซ้ำอีกในหน้าแบบฝึกหัด ให้เก็บรอบแรกไว้ทำตอนที่พร้อมจริง",
      },
    ],
  },
  {
    id: "basics",
    title: "คีย์และแนวคิดพื้นฐาน",
    icon: "🔑",
    intro: "รากฐานของ Database ที่ต้องรู้ก่อนทำข้อ 1–6",
    practice: ["set6"],
    blocks: [
      {
        type: "p",
        text: "**Entity** คือ สิ่งของ หรือ เหตุการณ์ ที่เราสนใจเก็บข้อมูล เช่น ลูกค้า, สนาม, การจอง (แทนตารางในฐานข้อมูล)\n**Attribute** คือ คุณสมบัติของ Entity เช่น ชื่อ, เบอร์โทร (แทนคอลัมน์ในตาราง)\n**Tuple** คือ ข้อมูล 1 แถว (เรคคอร์ด)\n**Domain** คือ ชุดของค่าที่เป็นไปได้ของ Attribute เช่น เพศ ต้องเป็น ชาย/หญิง",
      },
      { type: "h3", text: "คำศัพท์ที่เจอบ่อยในข้อเติมคำ" },
      {
        type: "table",
        headers: ["คำศัพท์", "ความหมาย", "ตัวอย่าง"],
        rows: [
          ["Entity", "สิ่งของ/เหตุการณ์ที่เก็บข้อมูล", "ลูกค้า, การจอง, การชำระเงิน"],
          ["Attribute", "คุณสมบัติของ Entity", "ชื่อลูกค้า, เบอร์โทร"],
          ["Tuple", "ข้อมูล 1 แถว", "(1, สมชาย, 0811111111)"],
          ["Degree", "จำนวน Attribute ในตาราง", "ตาราง 3 คอลัมน์ = Degree 3"],
          ["Cardinality", "จำนวนของความสัมพันธ์ 1:1, 1:N, M:N", "ลูกค้า 1 คน : ออเดอร์ N ใบ"],
          ["Domain", "ชุดค่าที่เป็นไปได้ของ Attribute", "เพศ ∈ {ชาย, หญิง}"],
          ["Weak Entity", "อยู่ได้ต่อเมื่อมี Entity หลัก", "ใบสั่งยา ต้องมี การจอง"],
          ["Strong Entity", "อยู่ได้ด้วยตัวเอง", "ลูกค้า"],
          ["Optional Relationship", "มีหรือไม่มีก็ได้ (วงกลม o)", "ลูกค้าอาจยังไม่เคยจอง"],
          ["Mandatory Relationship", "ต้องมีเสมอ (เส้นขีด |)", "การจอง ต้องมี ลูกค้า"],
        ],
      },
      { type: "h3", text: "ประเภทของ Key" },
      {
        type: "table",
        headers: ["Key", "ความหมาย", "ข้อควรจำ"],
        rows: [
          ["Super Key", "เซตของ Attribute ที่ใช้ระบุแถวได้ไม่ซ้ำ", "ซูเปอร์คีย์ 1 ตัว อาจมีหลายคีย์"],
          ["Candidate Key", "Super Key ที่เล็กที่สุด (ตัด attribute ออกไม่ได้)", "เลือกมาเป็น PK ได้"],
          ["Primary Key", "Candidate Key ที่เลือกเป็นคีย์หลัก", "ห้าม NULL, ห้ามซ้ำ, มีได้ 1 ตัวต่อตาราง"],
          ["Composite Key", "PK ที่ประกอบด้วยหลาย Attribute", "เช่น (OrderID, BookID)"],
          ["Foreign Key", "อ้างอิง PK ของอีกตาราง", "ค่าซ้ำได้, NULL ได้ (ถ้า Optional)"],
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "กฎ Foreign Key ที่ต้องจำ",
        text: "FK ต้องอ้างอิง PK (คีย์หลัก) ของอีกตารางเท่านั้น — ไม่ใช่อ้าง non-key attribute ค่าใน FK ซ้ำกันได้ (ต่างจาก PK ที่ห้ามซ้ำ)",
      },
      { type: "h3", text: "ความสัมพันธ์ระหว่าง Entity" },
      {
        type: "table",
        headers: ["ความสัมพันธ์", "ความหมาย", "ตัวอย่าง"],
        rows: [
          ["1 : 1", "หนึ่งต่อหนึ่ง", "การจอง 1 ครั้ง → การชำระเงิน 1 ครั้ง"],
          ["1 : N", "หนึ่งต่อหลาย", "ลูกค้า 1 คน → ออเดอร์ หลายใบ"],
          ["M : N", "หลายต่อหลาย", "เมนู หลายรายการ ↔ ออเดอร์ หลายใบ (ต้องมีตารางเชื่อม)"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "เทคนิคอ่านโจทย์",
        text: "คำว่า “1 คน / 1 ครั้ง / 1 แผนก” อยู่ด้าน ‘หนึ่ง’ และ “หลาย / ได้หลาย” อยู่ด้าน ‘หลาย’ เสมอ เช่น “พนักงานรับหลายออเดอร์” = พนักงาน 1 : N ออเดอร์",
      },
      { type: "h3", text: "ตัวอย่างตารางที่มี FK (ร้านกาแฟ)" },
      { type: "p", text: "ตาราง **ORDERS** ในข้อสอบชุด 4 มีทั้ง PK และ FK ในตารางเดียว — ให้สังเกตว่าคอลัมน์ไหนคือคีย์อะไร:" },
      {
        type: "table",
        headers: ["คอลัมน์", "คีย์", "ความหมาย"],
        rows: [
          ["order_id", "PK", "รหัสออเดอร์ — ห้ามซ้ำ ห้าม NULL"],
          ["customer_id", "FK → CUSTOMER", "ลูกค้าที่สั่ง — ต้องมีค่าอยู่ในตาราง CUSTOMER"],
          ["employee_id", "FK → EMPLOYEE", "พนักงานที่รับออเดอร์ — ต้องมีค่าอยู่ในตาราง EMPLOYEE"],
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "วิธีตรวจ FK ให้ถูก",
        text: "เปิดตารางแม่ (เช่น CUSTOMER) แล้วดูว่า PK มีค่าอะไรบ้าง — ทุกค่าที่อยู่ในคอลัมน์ FK ต้องตรงกับค่าใน PK นั้นหมด ถ้ามีค่าที่ไม่มีอยู่จริง (เช่น menu_id=999) = **ผิดกฎ FK**",
      },
      { type: "h3", text: "สรุปต้องจำ (บทที่ 1)" },
      {
        type: "ul",
        items: [
          "**PK** = ระบุแถวได้ไม่ซ้ำ, ห้าม NULL, มีได้ 1 ตัวต่อตาราง / **Composite Key** = PK หลายคอลัมน์",
          "**FK** = อ้าง PK ของอีกตาราง, ค่าซ้ำได้, NULL ได้ (ถ้าเป็น optional)",
          "**Super Key** ⊃ **Candidate Key** ⊃ **PK** (Candidate คือ Super Key ที่เล็กที่สุด)",
          "ความสัมพันธ์: **1:1**, **1:N**, **M:N** (M:N ต้องแยกตารางเชื่อม)",
          "**วงกลม o** = optional (มีหรือไม่มีก็ได้) / **ขีด |** = mandatory (ต้องมี)",
          "คำศัพท์ประจำบท: Entity, Attribute, Tuple, Degree, Cardinality, Domain, Weak/Strong Entity",
        ],
      },
    ],
  },
  {
    id: "er",
    title: "ER Diagram และ Crow's Foot",
    icon: "🗺️",
    intro: "วิธีวาดและอ่านความสัมพันธ์แบบมืออาชีพ",
    practice: ["set2"],
    blocks: [
      { type: "p", text: "**ER Diagram (Entity-Relationship Diagram)** คือ แผนภาพที่ใช้แสดง Entity และความสัมพันธ์ระหว่าง Entity ก่อนสร้างตารางจริง **Crow's Foot** คือ สัญลักษณ์เท้าอีกาที่ปลายเส้นความสัมพันธ์ เพื่อบอก Cardinality และบอกว่าความสัมพันธ์เป็นแบบมี/ไม่มีก็ได้ (Optional) หรือต้องมีเสมอ (Mandatory)" },
      { type: "h3", text: "สัญลักษณ์ Crow's Foot" },
      {
        type: "table",
        headers: ["สัญลักษณ์", "ความหมาย", "ใช้ในข้อสอบว่า"],
        rows: [
          ["|| (เส้นขีด 1 ขีด)", "ต้องมี 1 ตัวพอดี (exactly one)", "การจองต้องมีลูกค้า 1 คน"],
          ["o (วงกลม)", "มีได้ 0 หรือ 1 ตัว (optional)", "ลูกค้าอาจมีแฟน 0-1 คน"],
          [" crow's foot (มากกว่า 1)", "มีได้หลายตัว (many)", "ลูกค้ามีออเดอร์หลายใบ"],
          ["o + crow's foot", "มีได้ 0 หรือหลายตัว", "ลูกค้าอาจยังไม่เคยจองก็ได้"],
          ["|| + crow's foot", "มีอย่างน้อย 1 ตัวขึ้นไป", "ออเดอร์ต้องมีรายการอย่างน้อย 1"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "สำคัญ",
        text: "วงกลม (o) = optional (มีหรือไม่มีก็ได้) / เส้นขีด (|) = mandatory (ต้องมี) / เท้าอีกา = หลายตัว",
      },
      { type: "h3", text: "ตัวอย่างระบบจองสนามฟุตบอล (ข้อสอบข้อ 4)" },
      {
        type: "er",
        code: `erDiagram
    CUSTOMER ||--o{ BOOKING : "จองได้หลายครั้ง"
    FIELD ||--o{ SLOT : "มีหลายช่วงเวลา"
    BOOKING }o--|| FIELD : "เลือกสนาม 1 สนาม"
    BOOKING }o--|| SLOT : "เลือกช่วง 1 ช่วง"
    BOOKING ||--|| PAYMENT : "ชำระเงิน 1 ครั้ง"`,
        caption: "ลูกค้า 1:N การจอง / สนาม 1:N ช่วงเวลา / การจอง 1:1 การชำระเงิน",
      },
      { type: "h3", text: "M : N ต้องแยกด้วยตารางเชื่อม (Junction Table)" },
      { type: "p", text: "ถ้าเป็นความสัมพันธ์ **M:N** เช่น “ออเดอร์มีหลายเมนู และเมนูอยู่ในหลายออเดอร์” จะสร้างตารางตรง ๆ ไม่ได้ ต้องแยกเป็นตารางเชื่อม (เช่น ORDER_DETAIL) ที่เก็บ PK ของทั้งสองฝั่งเป็น FK" },
      {
        type: "table",
        headers: ["ตาราง", "คีย์", "หมายเหตุ"],
        rows: [
          ["ORDERS", "order_id (PK)", "ออเดอร์ 1 ใบ"],
          ["MENU", "menu_id (PK)", "เมนู 1 รายการ"],
          ["ORDER_DETAIL", "(order_id, menu_id) PK / FK", "ตารางเชื่อม + qty"],
        ],
      },
      { type: "h3", text: "วิธีหา PK / FK ในโจทย์ ER" },
      {
        type: "ol",
        items: [
          "PK = คอลัมน์ที่ระบุ Entity ได้ไม่ซ้ำ เช่น customer_id, booking_id",
          "FK = คอลัมน์ที่อ้างถึง PK ของอีกตาราง ตามความสัมพันธ์ (เช่น ฝั่ง หลาย เก็บ PK ของฝั่ง หนึ่ง)",
          "ถ้าฝั่ง M:N ให้สร้างตารางเชื่อมที่เอา PK ทั้งสองฝั่งมาเป็น FK (และเป็น PK รวม)",
        ],
      },
      { type: "h3", text: "วิธีวาด Crow's Foot ทีละขั้น (ร้านกาแฟ)" },
      { type: "p", text: "ขั้นตอนเดียวกันนี้ใช้กับข้อสอบชุด 2 ได้เลย:" },
      {
        type: "ol",
        items: [
          "**ขั้นที่ 1** ระบุ Entity ทั้งหมดจากโจทย์: ลูกค้า, เมนู, พนักงาน, ออเดอร์, รายการสินค้า, การชำระเงิน",
          "**ขั้นที่ 2** อ่านความสัมพันธ์ทีละประโยค เช่น “ลูกค้า 1 คน มีหลายออเดอร์” = **1:N**",
          "**ขั้นที่ 3** เขียนเส้น: ฝั่ง ‘หนึ่ง’ ใช้ขีด (|) ฝั่ง ‘หลาย’ ใช้เท้าอีกา — แล้วเติมวงกลมถ้าโจทย์บอก “อาจจะ/มีหรือไม่มีก็ได้”",
          "**ขั้นที่ 4** เจอ M:N (ออเดอร์–เมนู) ให้สร้างตารางเชื่อม **ORDER_DETAIL** แยกออกมา",
          "**ขั้นที่ 5** ตรวจทุกเส้นครบทั้ง 6 Entity และดูว่าความสัมพันธ์เป็น 1:1, 1:N หรือผ่านตารางเชื่อม",
        ],
      },
      {
        type: "er",
        code: `erDiagram
    CUSTOMER ||--o{ ORDERS : "สั่ง/มีหลายออเดอร์"
    EMPLOYEE ||--o{ ORDERS : "รับหลายออเดอร์"
    ORDERS ||--|{ ORDER_DETAIL : "มีหลายรายการ"
    MENU ||--o{ ORDER_DETAIL : "ถูกสั่งในหลายออเดอร์"
    ORDERS ||--|| PAYMENT : "ชำระเงิน 1 ครั้ง"`,
        caption: "คำตอบชุด 2: ออเดอร์–เมนู M:N ถูกแยกด้วย ORDER_DETAIL (กลายเป็น 1:N สองชุด)",
      },
      { type: "h3", text: "สรุปต้องจำ (บทที่ 2)" },
      {
        type: "ul",
        items: [
          "อ่านสัญลักษณ์: ขีด = หนึ่ง / เท้าอีกา = หลาย / วงกลม = optional",
          "M:N ต้องแยกตารางเชื่อม (PK ทั้งสองฝั่งมาเป็น FK และเป็น PK รวม)",
          "ฝั่ง ‘หลาย’ เก็บ PK ของฝั่ง ‘หนึ่ง’ เป็น FK",
          "รายการที่ต้องส่งในข้อสอบ: แผนภาพครบทุกความสัมพันธ์ + ตาราง PK/FK + cardinality ทุกเส้น",
        ],
      },
    ],
  },
  {
    id: "normalization",
    title: "Normalization 1NF–4NF",
    icon: "🧩",
    intro: "หัวใจหลักของข้อสอบ — ต้องไล่ระดับให้ได้",
    practice: ["set1"],
    blocks: [
      { type: "p", text: "**Normalization** คือ กระบวนการจัดโครงสร้างตารางให้ลดความซ้ำซ้อน (redundancy) และลดความผิดปกติของข้อมูล (anomaly) โดยแบ่งตารางออกเป็นตารางย่อยตาม Functional Dependency" },
      { type: "h3", text: "Functional Dependency (FD) คืออะไร" },
      { type: "p", text: "เขียนว่า **X → Y** แปลว่า “ถ้ารู้ค่า X จะรู้ค่า Y ได้แน่นอน” เช่น **BookID → BookName** (รหัสหนังสือตัวเดียว กำหนดชื่อหนังสือได้) หรือ **OrderID → CustomerName** (ออเดอร์เดียวกัน ต้องเป็นลูกค้าคนเดียวกัน)" },
      { type: "h3", text: "ทำไมต้อง Normalize" },
      {
        type: "table",
        headers: ["ปัญหา (Anomaly)", "ตัวอย่าง"],
        rows: [
          ["Insert Anomaly", "แทรกลูกค้าใหม่ไม่ได้ เพราะยังไม่มีออเดอร์ (PK ซ้ำไม่ได้)"],
          ["Update Anomaly", "แก้ชื่อหนังสือ 1 ครั้ง ต้องแก้ทั้งหลายแถวที่ซ้ำ"],
          ["Delete Anomaly", "ลบออเดอร์สุดท้าย = ลบข้อมูลหนังสือหายไปด้วย"],
        ],
      },
      { type: "h3", text: "1NF — First Normal Form" },
      { type: "p", text: "✅ ทุก Attribute ต้องมีค่าเดียว (Atomic) ❌ ห้าม **Repeating Group** / คอลัมน์ซ้ำ ๆ / เก็บหลายค่าคั่นด้วยเครื่องหมาย" },
      {
        type: "table",
        headers: ["❌ ยังไม่ผ่าน 1NF", "✅ ผ่าน 1NF"],
        rows: [
          ["OrderID=1001, Phone={081, 082}", "OrderID=1001, Phone=081"],
          ["รายการสินค้า: Keyboard, Mouse (2 ค่าในช่องเดียว)", "แยกเป็น 2 แถว"],
        ],
      },
      { type: "h3", text: "2NF — Second Normal Form" },
      { type: "p", text: "✅ ผ่าน 1NF + ❌ ห้าม **Partial Dependency** (Attribute ที่ขึ้นกับ PK แค่บางตัวของ PK ผสม) ให้แยก attribute ที่ขึ้นกับ PK บางส่วนออกไปเป็นตารางใหม่" },
      { type: "p", text: "ตัวอย่าง (ร้านคอม): PK คือ (OrderID, ProductID) แต่ OrderID → CustomerName, Phone, Employee และ ProductID → ProductName, Category, Price — เป็น partial dependency ทั้งคู่ จึงแยกเป็น 3 ตาราง" },
      {
        type: "code",
        lang: "text",
        text: "ORDER(OrderID PK, CustomerName, Phone, Employee)\nBOOK/ORDER_DETAIL... → แยกตาม FD:\n\nORDER      : OrderID(PK), CustomerName, Phone, Employee\nPRODUCT    : ProductID(PK), ProductName, Category, Price\nORDER_DETAIL: (OrderID, ProductID)(PK), Qty",
      },
      { type: "h3", text: "3NF — Third Normal Form" },
      { type: "p", text: "✅ ผ่าน 2NF + ❌ ห้าม **Transitive Dependency** (Non-key attribute → Non-key attribute เช่น EmployeeID → DepartmentID → DepartmentName) ให้แยก attribute ตัวกลางออกเป็นตารางใหม่" },
      {
        type: "code",
        lang: "text",
        text: "❌ EMP(EMP_ID PK, Name, Dept_ID, Dept_Name)   →  Dept_ID → Dept_Name\n✅ EMP(EMP_ID PK, Name, Dept_ID)\n   DEPARTMENT(Dept_ID PK, Dept_Name)",
      },
      { type: "h3", text: "BCNF — Boyce-Codd Normal Form" },
      { type: "p", text: "✅ ผ่าน 3NF + **ทุก Determinant (ตัวตั้งของ FD) ต้องเป็น Candidate Key** — เป็น 3NF เวอร์ชันเข้มขึ้น ใช้ตอนที่ 3NF ผ่านแต่ยังมี FD ที่ตัวตั้งไม่ใช่คีย์" },
      { type: "p", text: "ตัวอย่างคลาสสิก: R(A, B, C) มี FD **AB → C** และ **C → B**\nCandidate Keys คือ AB และ AC → ผ่าน 3NF (B กับ C เป็น prime) แต่ **ไม่ผ่าน BCNF** เพราะ C → B โดยที่ C ไม่ใช่ Candidate Key" },
      { type: "h3", text: "4NF — Fourth Normal Form (รู้ไว้)" },
      { type: "p", text: "✅ ผ่าน BCNF + ❌ ห้าม **Multivalued Dependency** (ค่าใน Attribute ที่เป็นอิสระหลายค่า เช่น วิชาที่เรียน กับ กิจกรรมที่ทำ เก็บในตารางเดียวกัน) ต้องแยกออกเป็นตารางตามกลุ่ม" },
      { type: "h3", text: "ตัวอย่างทำโจทย์จริง (ร้านขายหนังสือ — ข้อสอบชุด 1)" },
      { type: "p", text: "โจทย์ให้ตารางเดียวพร้อม FD: **OrderID → CustomerName, CustomerPhone, Employee** และ **BookID → BookName, Author, Price**" },
      {
        type: "code",
        lang: "text",
        text: "OrderID | CustomerName | CustomerPhone | BookID | BookName | Author  | Price | Qty | Employee\n1001    | สมชาย        | 0812345678     | B001   | Python   | อาจารย์ A | 350   | 2   | นัท\n1001    | สมชาย        | 0812345678     | B005   | Database | อาจารย์ B | 420   | 1   | นัท\n1002    | สมหญิง       | 0899999999     | B001   | Python   | อาจารย์ A | 350   | 1   | ตาล",
      },
      {
        type: "ol",
        items: [
          "**1NF:** ทุกเซลล์มีค่าเดียวอยู่แล้ว → ผ่าน (ไม่ต้องแก้)",
          "**2NF:** PK ผสมคือ (OrderID, BookID) แต่มี partial dependency (OrderID → Customer… และ BookID → BookName…) → แยกเป็น 3 ตาราง: ORDER, BOOK, ORDER_DETAIL",
          "**3NF:** ตรวจแล้วไม่มี transitive dependency (non-key ไม่กำหนด non-key ตัวอื่น) → ผลลัพธ์เท่ากับ 2NF",
          "**BCNF:** ทุก determinant (OrderID, BookID, (OrderID,BookID)) เป็น candidate key → ผ่าน",
          "**ระบุ PK:** ORDER: OrderID / BOOK: BookID / ORDER_DETAIL: (OrderID, BookID) PK รวม",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "วิธีตอบให้ได้เต็มคะแนน",
        text: "ทุกข้อต้องบอกเหตุผลด้วย เช่น “แยกเพราะ OrderID → CustomerName เป็น partial dependency” — การบอกแค่ผลลัพธ์ไม่พอ ต้องอธิบายว่าแยกเพราะ dependency แบบไหน",
      },
      { type: "h3", text: "สรุปต้องจำ (บทที่ 3)" },
      {
        type: "ul",
        items: [
          "1NF: ห้ามค่าซับซ้อน/ซ้ำในช่องเดียว → เจอให้แยกแถว",
          "2NF: เจอ PK ผสม แล้วมี attribute ขึ้นกับ PK บางตัว → แยกตาราง",
          "3NF: เจอ non-key ขึ้นกับ non-key อีกตัว → แยกตาราง",
          "BCNF: เจอ FD ที่ตัวตั้งไม่ใช่ candidate key → แยกตาราง",
          "โจทย์หลายข้อตอบ “ผ่าน 3NF = ผ่าน BCNF” เพราะไม่มี transitive dependency — บอกเหตุผลให้ครบ",
          "M:N เกี่ยวข้องกับ Normalization ด้วย — มักเจอพร้อมกันในข้อ 1–4",
        ],
      },
    ],
  },
  {
    id: "datadict",
    title: "Data Dictionary",
    icon: "📖",
    intro: "เอกสารบอกโครงสร้างตารางทุกคอลัมน์",
    practice: ["set3", "set4"],
    blocks: [
      { type: "p", text: "**Data Dictionary** คือ เอกสาร/ตารางที่อธิบายโครงสร้างของแต่ละตารางว่า มีคอลัมน์อะไรบ้าง ชนิดข้อมูลอะไร ยาวเท่าไหร่ เป็นคีย์หรือไม่ อนุญาตให้ NULL ได้ไหม และใช้เก็บอะไร" },
      { type: "p", text: "**ข้อสอบจะให้เขียน:** Field, Data Type, Length, PK, FK, Null, Description (พร้อมแทนค่าข้อมูลจริงอย่างน้อย 2 แถว)" },
      { type: "h3", text: "ตัวอย่าง (ระบบจองสนามฟุตบอล)" },
      {
        type: "table",
        headers: ["Field", "Data Type", "Length", "PK", "FK", "Null", "Description"],
        rows: [
          ["customer_id", "INT", "-", "PK", "-", "No", "รหัสลูกค้า"],
          ["name", "VARCHAR", "100", "-", "-", "No", "ชื่อลูกค้า"],
          ["phone", "VARCHAR", "10", "-", "-", "No", "เบอร์โทร"],
          ["booking_id", "INT", "-", "PK", "-", "No", "รหัสการจอง"],
          ["booking_date", "DATE", "-", "-", "-", "No", "วันที่จอง"],
          ["customer_id", "INT", "-", "-", "FK", "No", "รหัสลูกค้าที่จอง"],
          ["field_id", "INT", "-", "-", "FK", "No", "รหัสสนามที่เลือก"],
          ["slot_id", "INT", "-", "-", "FK", "No", "รหัสช่วงเวลาที่เลือก"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "วิธีเลือก Data Type ให้ถูก",
        text: "ข้อความสั้น → VARCHAR(n) / จำนวนเต็ม → INT / ตัวเลขทศนิยม → DECIMAL(10,2) / วันที่ → DATE / เวลา → TIME / วันที่และเวลา → DATETIME / ใช่-ไม่ใช่ → BOOLEAN",
      },
      { type: "h3", text: "ตารางที่ต้องระวัง: คอลัมน์ที่ทั้ง PK และ FK (ร้านกาแฟ)" },
      { type: "p", text: "ตารางเชื่อม **ORDER_DETAIL** ใช้ (order_id, menu_id) เป็น PK รวม — แต่คอลัมน์ทั้งสองก็เป็น FK ไปหา ORDERS และ MENU ด้วย ใน Data Dictionary ต้องเขียนว่าเป็น **PK + FK** พร้อมกัน:" },
      {
        type: "table",
        headers: ["Field", "Data Type", "PK", "FK", "Null", "Description"],
        rows: [
          ["order_id", "INT", "PK", "FK → ORDERS", "No", "รหัสออเดอร์ (จากตาราง ORDERS)"],
          ["menu_id", "INT", "PK", "FK → MENU", "No", "รหัสเมนู (จากตาราง MENU)"],
          ["qty", "INT", "-", "-", "No", "จำนวนที่สั่ง"],
        ],
      },
      { type: "h3", text: "แทนค่าข้อมูลจริง + ตรวจ FK (ข้อสอบชุด 3–4)" },
      { type: "p", text: "หลังเขียนโครงสร้างต้องใส่ข้อมูลจริงอย่างน้อย 2 แถวต่อตาราง และ **FK ทุกค่าต้องอ้างอิง PK ที่มีอยู่จริง** — ตัวอย่างที่ถูกต้อง:" },
      {
        type: "table",
        headers: ["ตาราง", "ตัวอย่างข้อมูล"],
        rows: [
          ["CUSTOMER", "(1, สมชาย, 0811111111), (2, สมหญิง, 0822222222)"],
          ["ORDERS", "(1001, 2025-06-01, 175.00, customer_id=1, employee_id=2)"],
          ["ORDER_DETAIL", "(1001, 101, 2), (1001, 102, 1)"],
          ["PAYMENT", "(P01, cash, 175.00, order_id=1001)"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "ดักจุดพลาดที่บ่อยที่สุด",
        text: "ห้ามใส่ค่าที่ไม่มีอยู่จริงในตารางแม่ เช่น ORDER_DETAIL มี order_id=999 แต่ ORDERS ไม่มี 999, หรือ PAYMENT อ้าง order_id=1003 ทั้งที่ไม่มีออเดอร์นี้ — ตรวจลำดับด้วย: ต้องมีแถวแม่ก่อนถึงใส่แถวลูกได้",
      },
      { type: "h3", text: "สรุปต้องจำ (บทที่ 4)" },
      {
        type: "ul",
        items: [
          "คอลัมน์มาตรฐาน: Field, Data Type, Length/Size, PK, FK, Null, Description",
          "เลือก Data Type ให้ตรง: INT / VARCHAR(n) / DECIMAL(10,2) / DATE / DATETIME",
          "คอลัมน์ PK รวมที่อ้างอีกตาราง → เขียน PK + FK ในช่องเดียวกัน",
          "ข้อมูลจริง 2 แถวขึ้นไป + FK ต้องเชื่อมกันถูกทุกตัว (ลำดับ: แม่ก่อน ลูกทีหลัง)",
        ],
      },
    ],
  },
  {
    id: "sql",
    title: "SQL และชนิดข้อมูล",
    icon: "⚡",
    intro: "เตรียมสอบข้อเติมคำและสร้างตาราง",
    practice: ["set5"],
    blocks: [
      { type: "p", text: "**SQL ย่อมาจาก Structured Query Language** เป็นภาษาที่ใช้จัดการฐานข้อมูลเชิงสัมพันธ์ แบ่งเป็น **DDL** (สร้างโครงสร้าง: CREATE, ALTER, DROP) และ **DML** (จัดการข้อมูล: INSERT, UPDATE, DELETE, SELECT)" },
      { type: "h3", text: "ชนิดข้อมูลที่ต้องจำ" },
      {
        type: "table",
        headers: ["ชนิดข้อมูล", "ใช้เก็บ"],
        rows: [
          ["INT", "จำนวนเต็ม เช่น รหัส, qty"],
          ["VARCHAR(n)", "ข้อความความยาวแปรผัน (สูงสุด n ตัว) เช่น ชื่อ, เบอร์"],
          ["CHAR(n)", "ข้อความความยาวคงที่ n ตัว"],
          ["TEXT", "ข้อความยาวมาก เช่น รายละเอียด"],
          ["DECIMAL(p,s)", "ตัวเลขทศนิยม เช่น ราคา 590.00"],
          ["DATE", "วันที่ เช่น 2025-06-01"],
          ["TIME", "เวลา เช่น 16:00:00"],
          ["DATETIME", "วันที่ + เวลา"],
          ["BOOLEAN", "จริง/เท็จ (TRUE/FALSE)"],
        ],
      },
      { type: "h3", text: "ตัวอย่าง CREATE TABLE (ระบบจองสนาม)" },
      {
        type: "code",
        lang: "sql",
        text: `CREATE TABLE customer (
  customer_id  INT PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  phone        VARCHAR(10)  NOT NULL
);

CREATE TABLE booking (
  booking_id   INT PRIMARY KEY,
  booking_date DATE NOT NULL,
  total_price  DECIMAL(10,2) NOT NULL,
  customer_id  INT NOT NULL,
  field_id     INT NOT NULL,
  slot_id      INT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);`,
      },
      { type: "h3", text: "คำสั่ง DML ที่ต้องจำ" },
      {
        type: "code",
        lang: "sql",
        text: `-- เพิ่มข้อมูล (INSERT)
INSERT INTO customer (customer_id, name, phone)
VALUES (1, 'สมชาย', '0811111111');

-- ค้นหาข้อมูล (SELECT)
SELECT name, phone FROM customer WHERE customer_id = 1;

-- แก้ไขข้อมูล (UPDATE)
UPDATE customer SET phone = '0899999999' WHERE customer_id = 1;

-- ลบข้อมูล (DELETE)
DELETE FROM customer WHERE customer_id = 1;`,
      },
      { type: "h3", text: "จาก ER → Data Dictionary → SQL (ของจริง)" },
      { type: "p", text: "ความสัมพันธ์ 1:N ที่วาดไว้ใน ER จะกลายเป็น **FOREIGN KEY ... REFERENCES** ใน SQL — เช่น ลูกค้า 1:N ออเดอร์ → ตาราง ORDERS ต้องมี customer_id ที่อ้างตาราง CUSTOMER" },
      {
        type: "code",
        lang: "sql",
        text: `CREATE TABLE orders (
  order_id    INT PRIMARY KEY,
  order_date  DATE NOT NULL,
  total       DECIMAL(10,2) NOT NULL,
  customer_id INT NOT NULL,
  employee_id INT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);`,
      },
      {
        type: "callout",
        tone: "info",
        title: "หลักการแปลง ER → SQL",
        text: "Entity → ตาราง (CREATE TABLE) / Attribute → คอลัมน์ (พร้อม Data Type ตามบทที่ 4) / ความสัมพันธ์ 1:N → ฝั่งหลายมี FK อ้างฝั่งหนึ่ง / M:N → ตารางเชื่อม + FK ไปทั้งสองฝั่ง",
      },
      { type: "h3", text: "สรุปต้องจำ (บทที่ 5)" },
      {
        type: "ul",
        items: [
          "DDL = CREATE/ALTER/DROP (สร้าง/แก้โครงสร้าง) · DML = INSERT/UPDATE/DELETE/SELECT (จัดการข้อมูล)",
          "ชนิดข้อมูล: INT / VARCHAR(n) / CHAR(n) / TEXT / DECIMAL(p,s) / DATE / TIME / DATETIME / BOOLEAN",
          "FK ใน SQL: FOREIGN KEY (คอลัมน์) REFERENCES ตารางแม่(คอลัมน์ PK)",
          "SELECT ... FROM ... WHERE ... คือพื้นฐานของทุกคำสั่งค้นหา",
        ],
      },
    ],
  },
];
