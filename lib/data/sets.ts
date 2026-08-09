import type { Block, Question, QuizSet } from "../types";

const t = (headers: string[], rows: string[][]): Block => ({ type: "table", headers, rows });

const long = (q: {
  id: string;
  title: string;
  prompt: string;
  points: number;
  answer?: string;
  explanation?: string;
  model: Block[];
}): Question => ({ type: "long", ...q });

const mc = (q: {
  id: string;
  title: string;
  prompt: string;
  points: number;
  options: string[];
  correct: number;
  explanation?: string;
}): Question => ({ type: "mc", ...q });

const fill = (q: {
  id: string;
  title: string;
  prompt: string;
  points: number;
  accept: string[];
  answer: string;
  explanation?: string;
}): Question => ({ type: "fill", ...q });

const fix = (q: {
  id: string;
  title: string;
  prompt: string;
  points: number;
  accept: string[];
  answer: string;
  explanation?: string;
}): Question => ({ type: "fix", ...q });

/* ------------------------------------------------------------------ */
/* ชุดที่ 1 : Normalization                                             */
/* ------------------------------------------------------------------ */

const normQuestions = (tag: "book" | "comp"): Question[] => {
  const orderId = tag === "book" ? "OrderID" : "OrderID";
  const pkA = tag === "book" ? "BookID" : "ProductID";
  const pkB = "OrderID";
  const nameA = tag === "book" ? "BookName" : "ProductName";
  const descA = tag === "book" ? "Author, Price" : "Category, Price";
  const aLabel = tag === "book" ? "หนังสือ" : "สินค้า";
  const tableName = tag === "book" ? "BOOK" : "PRODUCT";
  const detailName = tag === "book" ? "ORDER_DETAIL" : "ORDER_DETAIL";

  return [
    long({
      id: `${tag}-1nf`,
      title: "ทำ 1NF",
      prompt: `ให้แปลงข้อมูล ${aLabel}ชุดนี้ให้ผ่าน 1NF (ถ้าผ่านอยู่แล้วให้บอกว่าเพราะอะไร)`,
      points: 4,
      explanation:
        "1NF ห้าม attribute ที่มีหลายค่า (repeating group) และทุกช่องต้องเป็น atomic value (ค่าเดียว)",
      model: [
        { type: "p", text: "ข้อมูลชุดนี้ **ผ่าน 1NF อยู่แล้ว** เพราะทุกเซลล์มีค่าเดียว (atomic) ไม่มี repeating group" },
        { type: "p", text: `PK คือ (${pkB}, ${pkA}) และผลลัพธ์คือตารางเดิมทั้ง 3 แถว` },
      ],
    }),
    long({
      id: `${tag}-2nf`,
      title: "ทำ 2NF",
      prompt: `แยกตารางให้ผ่าน 2NF (ตัด Partial Dependency ออก) พร้อมบอกเหตุผล`,
      points: 4,
      explanation:
        "PK คือ (OrderID, BookID/ProductID) แต่ OrderID → ข้อมูลลูกค้า/พนักงาน และ BookID/ProductID → ข้อมูลสินค้า เป็น partial dependency",
      model: [
        { type: "p", text: `PK ผสม (${pkB}, ${pkA}) ยังมี **partial dependency**:` },
        { type: "ul", items: [`${pkB} → CustomerName, CustomerPhone/Phone, Employee`, `${pkA} → ${nameA}, ${descA}`, `(${pkB}, ${pkA}) → Qty`] },
        { type: "p", text: "จึงแยกเป็น 3 ตาราง:" },
        {
          type: "code",
          lang: "text",
          text: `ORDER(${pkB} PK, CustomerName, CustomerPhone, Employee)\n${tableName}(${pkA} PK, ${nameA}, ${descA})\n${detailName}((${pkB}, ${pkA}) PK, Qty)`,
        },
      ],
    }),
    long({
      id: `${tag}-3nf`,
      title: "ทำ 3NF",
      prompt: "แยกตารางให้ผ่าน 3NF (ตัด Transitive Dependency) พร้อมบอกเหตุผล",
      points: 4,
      explanation: "3NF ตัด transitive dependency (non-key ขึ้นกับ non-key)",
      model: [
        { type: "p", text: "ตรวจพบว่า **ไม่มี transitive dependency** (ไม่มี non-key attribute ที่กำหนด non-key ตัวอื่น)" },
        { type: "p", text: "ผลลัพธ์จึงเท่ากับ 2NF: ORDER, BOOK/PRODUCT, ORDER_DETAIL" },
        { type: "p", text: "⚠️ ถ้าอยากเห็นการแยก 3NF จริง ให้คิดว่า Employee มีแผนก ตัวอย่าง: EMP → DEPT (แยก DEPARTMENT ออกไปต่างหาก)" },
      ],
    }),
    long({
      id: `${tag}-bcnf`,
      title: "ทำ BCNF",
      prompt: "ตรวจว่าโครงสร้างผ่าน BCNF หรือไม่ พร้อมบอกเหตุผล",
      points: 4,
      explanation: "BCNF ต้องการทุก determinant เป็น candidate key",
      model: [
        { type: "p", text: "ทุก FD ที่มีตัวตั้ง (determinant) เป็น candidate key อยู่แล้ว:" },
        { type: "ul", items: [`${pkB} → ... , ${pkA} → ... , (${pkB}, ${pkA}) → Qty`] },
        { type: "p", text: "→ **ผ่าน BCNF** (ผลลัพธ์เท่ากับ 3NF)" },
      ],
    }),
    long({
      id: `${tag}-pk`,
      title: "ระบุ Primary Key ทุกตาราง",
      prompt: "เขียน PK ของทุกตารางที่ได้จากขั้นตอน BCNF",
      points: 4,
      model: [
        {
          type: "ul",
          items: [
            `ORDER : ${pkB} (PK)`,
            `${tableName} : ${pkA} (PK)`,
            `${detailName} : (${pkB}, ${pkA}) — PK รวม (Composite)`,
          ],
        },
      ],
    }),
  ];
};

export const setNormalization: QuizSet = {
  id: "set1",
  no: 1,
  title: "Normalization",
  subtitle: "หนังสือ / คอมพิวเตอร์ (สุ่มข้อมูลให้)",
  total: 20,
  variants: [
    {
      label: "ร้านขายหนังสือ",
      intro: [
        { type: "p", text: "ร้านขายหนังสือแห่งหนึ่งเก็บข้อมูลออเดอร์ไว้ในตารางเดียวดังนี้ (มี FD: OrderID → CustomerName, CustomerPhone, Employee และ BookID → BookName, Author, Price)" },
        t(
          ["OrderID", "CustomerName", "CustomerPhone", "BookID", "BookName", "Author", "Price", "Qty", "Employee"],
          [
            ["1001", "สมชาย", "0812345678", "B001", "Python", "อาจารย์ A", "350", "2", "นัท"],
            ["1001", "สมชาย", "0812345678", "B005", "Database", "อาจารย์ B", "420", "1", "นัท"],
            ["1002", "สมหญิง", "0899999999", "B001", "Python", "อาจารย์ A", "350", "1", "ตาล"],
          ]
        ),
      ],
      questions: normQuestions("book"),
    },
    {
      label: "ร้านขายคอมพิวเตอร์",
      intro: [
        { type: "p", text: "ร้านขายคอมพิวเตอร์มีข้อมูลดังนี้ (มี FD: OrderID → CustomerName, Phone, Employee และ ProductID → ProductName, Category, Price)" },
        t(
          ["OrderID", "CustomerName", "Phone", "ProductID", "ProductName", "Category", "Price", "Qty", "Employee"],
          [
            ["1001", "สมชาย", "0811111111", "P001", "Keyboard", "Accessory", "590", "2", "A"],
            ["1001", "สมชาย", "0811111111", "P003", "Mouse", "Accessory", "390", "1", "A"],
            ["1002", "สมหญิง", "0899999999", "P005", "SSD 1TB", "Storage", "2890", "1", "B"],
          ]
        ),
      ],
      questions: normQuestions("comp"),
    },
  ],
};

/* ------------------------------------------------------------------ */
/* ชุดที่ 2 : Crow's Foot ER Diagram (ร้านกาแฟ)                         */
/* ------------------------------------------------------------------ */

export const setEr: QuizSet = {
  id: "set2",
  no: 2,
  title: "Crow's Foot ER Diagram",
  subtitle: "ระบบร้านกาแฟ",
  total: 20,
  variants: [
    {
      label: "ระบบร้านกาแฟ",
      intro: [
        { type: "p", text: "ระบบร้านกาแฟ มี Entity: **ลูกค้า, เมนู, พนักงาน, ออเดอร์, รายการสินค้า, การชำระเงิน**" },
        {
          type: "ul",
          items: [
            "ลูกค้า 1 คน มีหลายออเดอร์",
            "ออเดอร์มีหลายเมนู และเมนูอยู่ได้หลายออเดอร์ (M:N)",
            "พนักงานรับหลายออเดอร์",
            "ออเดอร์มีการชำระเงิน 1 ครั้ง",
          ],
        },
      ],
      questions: [
        long({
          id: "er-diagram",
          title: "เขียนความสัมพันธ์ (Crow's Foot)",
          prompt:
            "พิมพ์ความสัมพันธ์ของทุกตารางแบบ Crow's Foot พร้อม Cardinality (เช่น CUSTOMER 1:N ORDERS — ลูกค้า 1 คนสั่งได้หลายออเดอร์)",
          points: 8,
          answer: "CUSTOMER 1–N ORDERS, EMPLOYEE 1–N ORDERS, ORDERS 1–N ORDER_DETAIL, MENU 1–N ORDER_DETAIL, ORDERS 1–1 PAYMENT",
          explanation: "M:N ของ ออเดอร์-เมนู ต้องแยกด้วยตารางเชื่อม ORDER_DETAIL",
          model: [
            { type: "er", code: `erDiagram
    CUSTOMER ||--o{ ORDERS : "สั่ง/มีหลายออเดอร์"
    EMPLOYEE ||--o{ ORDERS : "รับหลายออเดอร์"
    ORDERS ||--|{ ORDER_DETAIL : "มีหลายรายการ"
    MENU ||--o{ ORDER_DETAIL : "ถูกสั่งในหลายออเดอร์"
    ORDERS ||--|| PAYMENT : "ชำระเงิน 1 ครั้ง"` },
            { type: "p", text: "อ่านแบบนี้: เส้น | ใกล้ตารางฝั่ง ‘หนึ่ง’ (CUSTOMER, EMPLOYEE, ORDERS, MENU, ORDERS) และ เท้าอีกา (หลาย) อยู่ฝั่ง ‘หลาย’" },
          ],
        }),
        long({
          id: "er-pkfk",
          title: "ระบุ PK และ FK ของทุกตาราง",
          prompt: "ระบุ Primary Key และ Foreign Key ของทั้ง 6 ตาราง",
          points: 5,
          model: [
            t(
              ["ตาราง", "PK", "FK (อ้างถึง)"],
              [
                ["CUSTOMER", "customer_id", "-"],
                ["MENU", "menu_id", "-"],
                ["EMPLOYEE", "employee_id", "-"],
                ["ORDERS", "order_id", "customer_id → CUSTOMER, employee_id → EMPLOYEE"],
                ["ORDER_DETAIL", "(order_id, menu_id)", "order_id → ORDERS, menu_id → MENU"],
                ["PAYMENT", "payment_id", "order_id → ORDERS"],
              ]
            )
          ],
        }),
        long({
          id: "er-card",
          title: "เขียน Cardinality",
          prompt: "เขียน Cardinality ของทุกความสัมพันธ์ (เช่น 1:1, 1:N, M:N)",
          points: 4,
          model: [
            {
              type: "ul",
              items: [
                "ลูกค้า 1 คน : ออเดอร์หลายใบ → **1:N**",
                "พนักงาน 1 คน : ออเดอร์หลายใบ → **1:N**",
                "ออเดอร์ 1 ใบ : รายการสินค้าหลายรายการ → **1:N**",
                "เมนู 1 รายการ : ถูกสั่งในหลายออเดอร์ → **1:N** (ผ่านตารางเชื่อม)",
                "ออเดอร์ 1 ใบ : การชำระเงิน 1 ครั้ง → **1:1**",
              ],
            }
          ],
        }),
        long({
          id: "er-mn",
          title: "แก้ปัญหา M:N",
          prompt: "ความสัมพันธ์ M:N ระหว่าง ออเดอร์-เมนู ต้องแก้ไขอย่างไร (อธิบาย + ระบุคีย์)",
          points: 3,
          model: [
            { type: "p", text: "สร้าง **ตารางเชื่อม (Junction/Bridge Table)** ชื่อ ORDER_DETAIL โดยนำ PK ของทั้งสองฝั่งมาเป็นคอลัมน์" },
            t(
              ["ตาราง", "คีย์"],
              [
                ["ORDER_DETAIL", "(order_id, menu_id) — PK รวม และ FK ไปทั้ง ORDERS และ MENU"],
                ["เพิ่ม", "qty (จำนวนที่สั่ง)"],
              ]
            ),
            { type: "p", text: "ผลลัพธ์: ORDERS 1–N ORDER_DETAIL และ MENU 1–N ORDER_DETAIL (M:N ถูกแปลงเป็น 1:N สองชุด)" },
          ],
        }),
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* ชุดที่ 3 : Data Dictionary (จากชุดที่ 2)                              */
/* ------------------------------------------------------------------ */

export const setDataDict: QuizSet = {
  id: "set3",
  no: 3,
  title: "Data Dictionary",
  subtitle: "จากระบบร้านกาแฟ (ชุดที่ 2)",
  total: 15,
  variants: [
    {
      label: "ระบบร้านกาแฟ",
      intro: [
        { type: "p", text: "จากระบบร้านกาแฟ ให้เขียน Data Dictionary ทุกตาราง โดยมีคอลัมน์ Field, Data Type, Size, PK, FK, Null, Description" },
      ],
      questions: [
        long({
          id: "dd-tables",
          title: "เขียน Data Dictionary ทุกตาราง",
          prompt: "เขียนโครงสร้างทุกตาราง: CUSTOMER, MENU, EMPLOYEE, ORDERS, ORDER_DETAIL, PAYMENT",
          points: 8,
          model: [
            t(
              ["Field", "Data Type", "Size", "PK", "FK", "Null", "Description"],
              [
                ["customer_id", "INT", "-", "PK", "-", "No", "รหัสลูกค้า"],
                ["name", "VARCHAR", "100", "-", "-", "No", "ชื่อลูกค้า"],
                ["phone", "VARCHAR", "10", "-", "-", "Yes", "เบอร์โทร"],
              ]
            ),
            t(
              ["Field", "Data Type", "Size", "PK", "FK", "Null", "Description"],
              [
                ["menu_id", "INT", "-", "PK", "-", "No", "รหัสเมนู"],
                ["name", "VARCHAR", "100", "-", "-", "No", "ชื่อเมนู"],
                ["price", "DECIMAL(10,2)", "-", "-", "-", "No", "ราคาเมนู"],
              ]
            ),
            t(
              ["Field", "Data Type", "Size", "PK", "FK", "Null", "Description"],
              [
                ["employee_id", "INT", "-", "PK", "-", "No", "รหัสพนักงาน"],
                ["name", "VARCHAR", "100", "-", "-", "No", "ชื่อพนักงาน"],
                ["role", "VARCHAR", "50", "-", "-", "Yes", "ตำแหน่ง"],
              ]
            ),
            t(
              ["Field", "Data Type", "Size", "PK", "FK", "Null", "Description"],
              [
                ["order_id", "INT", "-", "PK", "-", "No", "รหัสออเดอร์"],
                ["order_date", "DATE", "-", "-", "-", "No", "วันที่สั่ง"],
                ["total", "DECIMAL(10,2)", "-", "-", "-", "No", "ยอดรวม"],
                ["customer_id", "INT", "-", "-", "FK", "No", "ลูกค้าที่สั่ง"],
                ["employee_id", "INT", "-", "-", "FK", "No", "พนักงานรับออเดอร์"],
              ]
            ),
            t(
              ["Field", "Data Type", "Size", "PK", "FK", "Null", "Description"],
              [
                ["order_id", "INT", "-", "PK", "FK", "No", "รหัสออเดอร์"],
                ["menu_id", "INT", "-", "PK", "FK", "No", "รหัสเมนู"],
                ["qty", "INT", "-", "-", "-", "No", "จำนวนที่สั่ง"],
              ]
            ),
            t(
              ["Field", "Data Type", "Size", "PK", "FK", "Null", "Description"],
              [
                ["payment_id", "INT", "-", "PK", "-", "No", "รหัสการชำระเงิน"],
                ["payment_method", "VARCHAR", "50", "-", "-", "No", "ช่องทางชำระเงิน"],
                ["amount", "DECIMAL(10,2)", "-", "-", "-", "No", "ยอดเงินที่จ่าย"],
                ["order_id", "INT", "-", "-", "FK", "No", "ออเดอร์ที่ชำระ"],
              ]
            ),
          ],
        }),
        long({
          id: "dd-rows",
          title: "แทนค่าข้อมูลจริง",
          prompt: "ใส่ข้อมูลจริงอย่างน้อย 2 แถวต่อตาราง และ FK ต้องเชื่อมกันถูกต้องทั้งหมด",
          points: 7,
          model: [
            t(
              ["customer_id", "name", "phone"],
              [["1", "สมชาย", "0811111111"], ["2", "สมหญิง", "0822222222"]]
            ),
            t(
              ["menu_id", "name", "price"],
              [["101", "อเมริกาโน", "55.00"], ["102", "ลาเต้", "60.00"]]
            ),
            t(
              ["employee_id", "name", "role"],
              [["1", "นัท", "Barista"], ["2", "ตาล", "Cashier"]]
            ),
            t(
              ["order_id", "order_date", "total", "customer_id", "employee_id"],
              [["1001", "2025-06-01", "175.00", "1", "2"], ["1002", "2025-06-02", "60.00", "2", "1"]]
            ),
            t(
              ["order_id", "menu_id", "qty"],
              [["1001", "101", "2"], ["1001", "102", "1"], ["1002", "102", "1"]]
            ),
            t(
              ["payment_id", "payment_method", "amount", "order_id"],
              [["P01", "cash", "175.00", "1001"], ["P02", "promptpay", "60.00", "1002"]]
            ),
            { type: "callout", tone: "info", title: "ตรวจ FK", text: "ค่า order_id ใน ORDER_DETAIL และ PAYMENT ทุกค่าต้องมีอยู่จริงในตาราง ORDERS เช่น 1001, 1002 — ไม่งั้นถือว่าผิด" },
          ],
        }),
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* ชุดที่ 4 : แทนค่าข้อมูลจริง (ตรวจ FK)                                 */
/* ------------------------------------------------------------------ */

const substituteIntro = [
  { type: "p", text: "กำหนดโครงสร้างตาราง (ร้านกาแฟ) และข้อมูลตัวอย่างดังนี้ — ให้ตรวจว่า FK เชื่อมถูกต้องหรือไม่" },
  t(
    ["CUSTOMER", "MENU", "EMPLOYEE"],
    [
      ["customer_id: 1, 2", "menu_id: 101, 102", "employee_id: 1, 2"],
      ["name: สมชาย, สมหญิง", "name: อเมริกาโน, ลาเต้", "name: นัท, ตาล"],
    ]
  ),
  t(
    ["ORDERS", "ORDER_DETAIL", "PAYMENT"],
    [
      ["order_id: 1001, 1002", "order_id: 1001, 1002", "payment_id: P01, P02"],
      ["customer_id: 1, 2", "menu_id: 101, 102, 999", "order_id: 1001, 1003"],
      ["employee_id: 1, 2", "qty: 2, 1, 2", "amount: 175.00, 60.00"],
    ]
  ),
] as Block[];

export const setSubstitute: QuizSet = {
  id: "set4",
  no: 4,
  title: "แทนค่าข้อมูลจริง (ตรวจ FK)",
  subtitle: "FK ต้องเชื่อมกันถูกทั้งหมด",
  total: 15,
  variants: [
    {
      label: "ตรวจ FK",
      intro: substituteIntro,
      questions: [
        mc({
          id: "fk-1",
          title: "ตรวจแถว ORDERS",
          prompt: "แถว ORDERS: (1001, customer_id=1, employee_id=2) — ถูกต้องหรือไม่ เมื่อ CUSTOMER มี {1,2} และ EMPLOYEE มี {1,2}",
          points: 3,
          options: ["ถูกต้อง (FK ครบ อ้างอิงมีอยู่จริง)", "ผิด (มี FK อ้างถึงค่าที่ไม่มีอยู่จริง)"],
          correct: 0,
          explanation: "customer_id=1 มีอยู่ใน CUSTOMER และ employee_id=2 มีอยู่ใน EMPLOYEE → FK ถูกต้อง",
        }),
        mc({
          id: "fk-2",
          title: "ตรวจแถว ORDER_DETAIL",
          prompt: "แถว ORDER_DETAIL: (order_id=1001, menu_id=999, qty=2) — ถูกต้องหรือไม่ เมื่อ MENU มี menu_id {101, 102}",
          points: 3,
          options: ["ถูกต้อง", "ผิด (menu_id=999 ไม่มีอยู่ในตาราง MENU)"],
          correct: 1,
          explanation: "menu_id=999 ไม่มีอยู่ใน MENU → ละเมิดกฎ FK (FK ต้องอ้างอิง PK ที่มีอยู่จริง)",
        }),
        mc({
          id: "fk-3",
          title: "ตรวจแถว PAYMENT",
          prompt: "แถว PAYMENT: (P01, cash, 175.00, order_id=1003) — ถูกต้องหรือไม่ เมื่อ ORDERS มี order_id {1001, 1002}",
          points: 3,
          options: ["ถูกต้อง", "ผิด (order_id=1003 ไม่มีอยู่ในตาราง ORDERS)"],
          correct: 1,
          explanation: "order_id=1003 ไม่มีอยู่ใน ORDERS → ผิดกฎ FK เช่นเดียวกับข้อที่แล้ว",
        }),
        long({
          id: "fk-write",
          title: "เขียนข้อมูลให้ FK ถูก",
          prompt: "เขียนข้อมูลจริงเพิ่ม 1 แถวในแต่ละตาราง ให้ FK เชื่อมกันถูกทั้งหมด (อ้างอิง PK ที่มีอยู่จริง)",
          points: 6,
          model: [
            { type: "p", text: "หลักการ: ทุก FK ต้องอ้างถึง PK ที่มีอยู่จริงในตารางแม่ เช่น" },
            t(
              ["ตาราง", "ตัวอย่างข้อมูลใหม่"],
              [
                ["CUSTOMER", "3, ใจดี, 0833333333"],
                ["ORDERS", "1003, 2025-06-03, 55.00, 3, 2"],
                ["ORDER_DETAIL", "1003, 101, 1"],
                ["PAYMENT", "P03, cash, 55.00, 1003"],
              ]
            ),
            { type: "callout", tone: "tip", title: "เช็ค", text: "order_id=1003 ต้องมีใน ORDERS ก่อน → ถึงใส่ใน ORDER_DETAIL / PAYMENT ได้ (ใส่ตามลำดับ: ตารางแม่ก่อน ตารางลูกทีหลัง)" },
          ],
        }),
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* ชุดที่ 5 : Fill in the gaps (ธนาคารคำถาม 27 ข้อ)                     */
/* ------------------------------------------------------------------ */

const fillBank: Question[] = [
  fill({ id: "fg-1", title: "คำศัพท์คีย์", prompt: "__________ คือคีย์หลักของตาราง", points: 5, accept: ["primary key", "คีย์หลัก", "กุญแจหลัก"], answer: "Primary Key", explanation: "PK ใช้ระบุแถวได้ไม่ซ้ำ ห้าม NULL" }),
  fill({ id: "fg-2", title: "คำศัพท์คีย์", prompt: "__________ ใช้อ้างอิงข้อมูลจากอีกตาราง", points: 5, accept: ["foreign key", "fk", "คีย์นอก"], answer: "Foreign Key", explanation: "FK อ้าง PK ของอีกตาราง ค่าซ้ำได้" }),
  fill({ id: "fg-3", title: "ความสัมพันธ์", prompt: "ความสัมพันธ์ One-to-Many เขียนเป็น __________", points: 5, accept: ["1:n", "1n", "1:m", "1m", "one to many", "onetonmany", "หนึ่งต่อหลาย", "หนึ่งต่อหลายความสัมพันธ์"], answer: "1 : N (1:M)", explanation: "เช่น ลูกค้า 1 : ออเดอร์หลายใบ" }),
  fill({ id: "fg-4", title: "ความสัมพันธ์", prompt: "ตารางที่ใช้เก็บความสัมพันธ์ Many-to-Many คือ __________", points: 5, accept: ["junction table", "junction", "bridge table", "ตารางเชื่อม", "associative table", "linking table", "ตารางเชื่อมโยง"], answer: "Junction Table (ตารางเชื่อม)", explanation: "เก็บ PK ของทั้ง 2 ฝั่งเป็น FK" }),
  fill({ id: "fg-5", title: "Normalization", prompt: "การลดข้อมูลซ้ำเรียกว่า __________", points: 5, accept: ["normalization", "การทำให้เป็นบรรทัดฐาน", "normalization form"], answer: "Normalization", explanation: "ลด redundancy และ anomaly" }),
  fill({ id: "fg-6", title: "Normalization", prompt: "1NF ห้ามมี __________", points: 5, accept: ["repeating group", "repeatinggroup", "กลุ่มข้อมูลซ้ำ", "multivalued attribute", "หลายค่าในช่องเดียว"], answer: "Repeating Group / หลายค่าในช่องเดียว", explanation: "ทุกเซลล์ต้องเป็นค่าเดียว (atomic)" }),
  fill({ id: "fg-7", title: "Normalization", prompt: "2NF แก้ปัญหา __________", points: 5, accept: ["partial dependency", "partialdependency", "การพึ่งพาบางส่วน", "partial key dependency"], answer: "Partial Dependency", explanation: "attribute ขึ้นกับ PK แค่บางตัวของ PK ผสม" }),
  fill({ id: "fg-8", title: "Normalization", prompt: "3NF แก้ปัญหา __________", points: 5, accept: ["transitive dependency", "transitivedependency", "การพึ่งพาอ้อม", "การพึ่งพาโดยอ้อม"], answer: "Transitive Dependency", explanation: "non-key ขึ้นกับ non-key อีกตัว" }),
  fill({ id: "fg-9", title: "Normalization", prompt: "BCNF ย่อมาจาก __________", points: 5, accept: ["boyce codd normal form", "boycecodd normal form", "boyce codd"], answer: "Boyce-Codd Normal Form", explanation: "3NF เวอร์ชันเข้ม ทุก determinant ต้องเป็น candidate key" }),
  fill({ id: "fg-10", title: "คำศัพท์คีย์", prompt: "Candidate Key คือ __________", points: 5, accept: ["candidate key", "คีย์ผู้สมัคร", "super key ที่เล็กที่สุด", "minimal super key"], answer: "Candidate Key (Super Key ที่เล็กที่สุด)", explanation: "เลือกมาเป็น PK ได้" }),
  fill({ id: "fg-11", title: "คำศัพท์คีย์", prompt: "Composite Key คือ __________", points: 5, accept: ["composite key", "คีย์ผสม", "primary key ที่มีหลาย attribute"], answer: "Composite Key (PK ที่มีหลาย Attribute)", explanation: "เช่น (OrderID, BookID)" }),
  fill({ id: "fg-12", title: "คำศัพท์คีย์", prompt: "Super Key คือ __________", points: 5, accept: ["super key", "superkey", "ซูเปอร์คีย์"], answer: "Super Key (เซต attribute ที่ระบุแถวไม่ซ้ำ)", explanation: "มีหลายชุดได้ แต่ Candidate Key คือเวอร์ชันเล็กที่สุด" }),
  fill({ id: "fg-13", title: "คำศัพท์พื้นฐาน", prompt: "Entity คือ __________", points: 5, accept: ["entity", "เอนทิตี้", "สิ่งของหรือเหตุการณ์ที่เก็บข้อมูล"], answer: "Entity (สิ่งของ/เหตุการณ์ที่สนใจเก็บข้อมูล)", explanation: "แทนด้วยตาราง เช่น ลูกค้า" }),
  fill({ id: "fg-14", title: "คำศัพท์พื้นฐาน", prompt: "Attribute คือ __________", points: 5, accept: ["attribute", "แอตทริบิวต์", "คุณสมบัติของ entity"], answer: "Attribute (คุณสมบัติของ Entity)", explanation: "แทนด้วยคอลัมน์ เช่น ชื่อลูกค้า" }),
  fill({ id: "fg-15", title: "คำศัพท์พื้นฐาน", prompt: "Cardinality คือ __________", points: 5, accept: ["cardinality", "คาร์ดินัลลิตี้", "จำนวนความสัมพันธ์"], answer: "Cardinality (จำนวนของความสัมพันธ์)", explanation: "เช่น 1:1, 1:N, M:N" }),
  fill({ id: "fg-16", title: "คำศัพท์พื้นฐาน", prompt: "Domain คือ __________", points: 5, accept: ["domain", "โดเมน", "ชุดของค่าที่เป็นไปได้"], answer: "Domain (ชุดค่าที่เป็นไปได้ของ Attribute)", explanation: "เช่น เพศ ∈ {ชาย, หญิง}" }),
  fill({ id: "fg-17", title: "คำศัพท์พื้นฐาน", prompt: "Tuple คือ __________", points: 5, accept: ["tuple", "ทูเพิล", "แถวข้อมูล", "เรคคอร์ด", "record"], answer: "Tuple (ข้อมูล 1 แถว / เรคคอร์ด)", explanation: "แทนแถวในตาราง" }),
  fill({ id: "fg-18", title: "คำศัพท์พื้นฐาน", prompt: "Degree คือ __________", points: 5, accept: ["degree", "ดีกรี", "จำนวน attribute ในตาราง"], answer: "Degree (จำนวน Attribute ในตาราง)", explanation: "ตาราง 3 คอลัมน์ = Degree 3" }),
  fill({ id: "fg-19", title: "คำศัพท์พื้นฐาน", prompt: "Weak Entity คือ __________", points: 5, accept: ["weak entity", "weakentity", "เอนทิตีที่ต้องพึ่งเอนทิตีอื่น"], answer: "Weak Entity (เอนทิตีที่ต้องพึ่งเอนทิตีอื่น)", explanation: "เช่น ใบสั่งยา ต้องมี การจอง" }),
  fill({ id: "fg-20", title: "คำศัพท์พื้นฐาน", prompt: "Strong Entity คือ __________", points: 5, accept: ["strong entity", "strongentity", "เอนทิตีที่อยู่ได้ด้วยตัวเอง"], answer: "Strong Entity (อยู่ได้ด้วยตัวเอง)", explanation: "เช่น ลูกค้า" }),
  fill({ id: "fg-21", title: "ความสัมพันธ์", prompt: "Optional Relationship คือ __________", points: 5, accept: ["optional relationship", "ความสัมพันธ์แบบมีหรือไม่มีก็ได้", "มีหรือไม่มีก็ได้"], answer: "Optional Relationship (มีหรือไม่มีก็ได้)", explanation: "วาดด้วยวงกลม (o)" }),
  fill({ id: "fg-22", title: "ความสัมพันธ์", prompt: "Mandatory Relationship คือ __________", points: 5, accept: ["mandatory relationship", "ความสัมพันธ์ที่ต้องมีเสมอ", "ต้องมีเสมอ"], answer: "Mandatory Relationship (ต้องมีเสมอ)", explanation: "วาดด้วยเส้นขีด (|)" }),
  fill({ id: "fg-23", title: "SQL", prompt: "SQL ย่อมาจาก __________", points: 5, accept: ["structured query language", "structuredquerylanguage", "structured query langauge"], answer: "Structured Query Language", explanation: "ภาษาในการจัดการฐานข้อมูล" }),
  fill({ id: "fg-24", title: "ชนิดข้อมูล", prompt: "VARCHAR ใช้เก็บ __________", points: 5, accept: ["ข้อความ", "ข้อความความยาวแปรผัน", "string", "ข้อความยาวแปรผัน", "ตัวอักษร"], answer: "ข้อความ (ความยาวแปรผัน)", explanation: "เช่น ชื่อ, เบอร์โทร" }),
  fill({ id: "fg-25", title: "ชนิดข้อมูล", prompt: "DATE ใช้เก็บ __________", points: 5, accept: ["วันที่", "วันเดือนปี", "date"], answer: "วันที่", explanation: "เช่น 2025-06-01" }),
  fill({ id: "fg-26", title: "ชนิดข้อมูล", prompt: "DECIMAL ใช้เก็บ __________", points: 5, accept: ["เลขทศนิยม", "ตัวเลขทศนิยม", "ทศนิยม", "decimal"], answer: "ตัวเลขทศนิยม", explanation: "เช่น ราคา 590.00" }),
  fill({ id: "fg-27", title: "ชนิดข้อมูล", prompt: "DATETIME ใช้เก็บ __________", points: 5, accept: ["วันที่และเวลา", "datetime", "วันที่และเวลารวมกัน"], answer: "วันที่และเวลา", explanation: "เช่น 2025-06-01 16:00:00" }),
];

export const setFillGaps: QuizSet = {
  id: "set5",
  no: 5,
  title: "Fill in the gaps",
  subtitle: "สุ่ม 7 ข้อ จาก 27 คำศัพท์ (ข้อละ 5 คะแนน)",
  total: 35,
  pick: 7,
  variants: [{ label: "ธนาคารคำถาม", questions: fillBank }],
};

/* ------------------------------------------------------------------ */
/* ชุดที่ 6 : แก้ประโยค (ธนาคาร 15 ข้อ)                                  */
/* ------------------------------------------------------------------ */

const fixBank: Question[] = [
  fix({ id: "fx-1", title: "Foreign Key", prompt: "Every Foreign Key must be unique.", points: 5, accept: ["foreign keys are not required to be unique", "foreign key can be repeated", "foreign key need not be unique", "foreign key is not unique"], answer: "Foreign Keys do not have to be unique (ค่าซ้ำได้) แต่ต้องอ้างอิง PK ที่มีอยู่จริง", explanation: "FK ใช้ค่าซ้ำได้หลายแถว ต่างจาก PK ที่ห้ามซ้ำ" }),
  fix({ id: "fx-2", title: "Primary Key", prompt: "Primary Key can contain NULL values.", points: 5, accept: ["primary key cannot contain null", "primary key cannot be null", "primary key must not be null"], answer: "Primary Key cannot contain NULL values.", explanation: "PK ห้าม NULL และห้ามซ้ำ (UNIQUE + NOT NULL)" }),
  fix({ id: "fx-3", title: "ความสัมพันธ์", prompt: "One customer can place only one order.", points: 5, accept: ["one customer can place many orders", "one customer can have many orders", "a customer can place multiple orders"], answer: "One customer can place many orders (1:N).", explanation: "ความสัมพันธ์เป็น 1:N" }),
  fix({ id: "fx-4", title: "Primary Key", prompt: "Every table must have two Primary Keys.", points: 5, accept: ["every table has only one primary key", "a table has one primary key", "every table must have one primary key"], answer: "Every table must have only one Primary Key.", explanation: "1 ตารางมี PK ได้แค่ 1 ตัว (แต่อาจเป็น composite ที่มีหลายคอลัมน์)" }),
  fix({ id: "fx-5", title: "Composite Key", prompt: "Composite Key contains only one attribute.", points: 5, accept: ["composite key contains two or more attributes", "composite key has many attributes", "composite key contains multiple attributes"], answer: "Composite Key contains two or more attributes.", explanation: "Composite = PK ที่รวมหลายคอลัมน์ เช่น (OrderID, BookID)" }),
  fix({ id: "fx-6", title: "Crow's Foot", prompt: "Crow's Foot Diagram is used to create SQL commands.", points: 5, accept: ["crow's foot diagram is used to show relationships", "crow's foot shows database relationships", "crow's foot diagram models relationships"], answer: "Crow's Foot Diagram is used to model/describe relationships between entities.", explanation: "เป็นเครื่องมือออกแบบ ไม่ใช่ตัวสร้าง SQL โดยตรง" }),
  fix({ id: "fx-7", title: "Functional Dependency", prompt: "Functional Dependency exists only in 3NF.", points: 5, accept: ["functional dependency exists in every normal form", "functional dependency exists in 1nf 2nf 3nf", "fd exists in all normal forms"], answer: "Functional Dependency exists in every normal form (1NF–3NF/BCNF).", explanation: "FD เป็นพื้นฐานที่ใช้วิเคราะห์ในทุกระดับ" }),
  fix({ id: "fx-8", title: "Candidate Key", prompt: "Candidate Key cannot become Primary Key.", points: 5, accept: ["candidate key can become primary key", "candidate key can be chosen as primary key", "candidate key may be the primary key"], answer: "Candidate Key CAN be chosen as the Primary Key.", explanation: "PK คือ Candidate Key ตัวหนึ่งที่ถูกเลือกขึ้นมา" }),
  fix({ id: "fx-9", title: "Normalization", prompt: "Normalization increases data redundancy.", points: 5, accept: ["normalization reduces data redundancy", "normalization decreases data redundancy"], answer: "Normalization reduces data redundancy.", explanation: "จุดประสงค์หลักคือลดความซ้ำซ้อน" }),
  fix({ id: "fx-10", title: "ความสัมพันธ์", prompt: "One movie has only one showtime.", points: 5, accept: ["one movie has many showtimes", "a movie can have many showtimes"], answer: "One movie can have many showtimes (1:N).", explanation: "ภาพยนตร์ 1 เรื่องฉายได้หลายรอบ" }),
  fix({ id: "fx-11", title: "ความสัมพันธ์", prompt: "One seat can belong to many cinemas.", points: 5, accept: ["one seat belongs to only one cinema", "one seat can belong to one cinema", "a seat belongs to a single cinema"], answer: "One seat belongs to only one cinema (1:N จาก cinema → seat).", explanation: "ที่นั่งแต่ละตัวอยู่ในโรงเพียงแห่งเดียว" }),
  fix({ id: "fx-12", title: "ความสัมพันธ์", prompt: "Payment can exist without Booking.", points: 5, accept: ["payment cannot exist without booking", "payment must have a booking", "payment depends on booking"], answer: "Payment cannot exist without a Booking.", explanation: "การชำระเงินต้องผูกกับการจอง (FK ไปหา booking)" }),
  fix({ id: "fx-13", title: "Data Dictionary", prompt: "Data Dictionary stores customer data.", points: 5, accept: ["data dictionary stores metadata", "data dictionary stores table structure", "data dictionary describes the structure"], answer: "Data Dictionary stores metadata (structure of tables, not the actual data).", explanation: "เก็บคำอธิบายโครงสร้าง ไม่ใช่ข้อมูลจริง" }),
  fix({ id: "fx-14", title: "Foreign Key", prompt: "Foreign Key must reference a non-key attribute.", points: 5, accept: ["foreign key must reference the primary key", "foreign key references the primary key", "fk must reference a primary key"], answer: "Foreign Key must reference the Primary Key of another table.", explanation: "FK อ้าง PK ของตารางอ้างอิงเท่านั้น" }),
  fix({ id: "fx-15", title: "BCNF", prompt: "BCNF is lower than 3NF.", points: 5, accept: ["bcnf is higher than 3nf", "bcnf is stricter than 3nf", "bcnf is above 3nf"], answer: "BCNF is higher (stricter) than 3NF.", explanation: "BCNF เข้มกว่า 3NF (ทุก 3NF ผ่านทุกอย่างของ BCNF เท่านั้นที่เข้มกว่า)" }),
];

export const setFixSentences: QuizSet = {
  id: "set6",
  no: 6,
  title: "แก้ประโยคให้ถูกต้อง",
  subtitle: "สุ่ม 6 ข้อ จาก 15 ประโยค (ข้อละ 5 คะแนน)",
  total: 30,
  pick: 6,
  variants: [{ label: "ธนาคารประโยค", questions: fixBank }],
};

export const quizSets: QuizSet[] = [
  setNormalization,
  setEr,
  setDataDict,
  setSubstitute,
  setFillGaps,
  setFixSentences,
];
