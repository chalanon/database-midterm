import type { StudySection } from "../types";

export const studySections: StudySection[] = [
  {
    id: "basics",
    title: "คีย์และแนวคิดพื้นฐาน",
    icon: "🔑",
    intro: "รากฐานของ Database ที่ต้องรู้ก่อนทำข้อ 1–6",
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
    ],
  },
  {
    id: "er",
    title: "ER Diagram และ Crow's Foot",
    icon: "🗺️",
    intro: "วิธีวาดและอ่านความสัมพันธ์แบบมืออาชีพ",
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
    ],
  },
  {
    id: "normalization",
    title: "Normalization 1NF–4NF",
    icon: "🧩",
    intro: "หัวใจหลักของข้อสอบ — ต้องไล่ระดับให้ได้",
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
      { type: "h3", text: "สูตรลัดสอบ" },
      {
        type: "ol",
        items: [
          "1NF: ห้ามค่าซับซ้อน/ซ้ำในช่องเดียว → เจอให้แยกแถว",
          "2NF: เจอ PK ผสม แล้วมี attribute ขึ้นกับ PK บางตัว → แยกตาราง",
          "3NF: เจอ non-key ขึ้นกับ non-key อีกตัว → แยกตาราง",
          "BCNF: เจอ FD ที่ตัวตั้งไม่ใช่ candidate key → แยกตาราง",
          "โจทย์หลายข้อตอบ “ผ่าน 3NF = ผ่าน BCNF” เพราะไม่มี transitive dependency — บอกเหตุผลให้ครบ",
        ],
      },
    ],
  },
  {
    id: "datadict",
    title: "Data Dictionary",
    icon: "📖",
    intro: "เอกสารบอกโครงสร้างตารางทุกคอลัมน์",
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
    ],
  },
  {
    id: "sql",
    title: "SQL และชนิดข้อมูล",
    icon: "⚡",
    intro: "เตรียมสอบข้อเติมคำและสร้างตาราง",
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
    ],
  },
];
