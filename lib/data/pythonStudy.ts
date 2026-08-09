import type { StudySection } from "../types";

export const pythonStudySections: StudySection[] = [
  {
    id: "py-basics",
    title: "Python พื้นฐาน",
    icon: "🐍",
    intro: "ตัวแปร, ชนิดข้อมูล, list/dict, if, for และฟังก์ชัน — พื้นฐานที่ต้องใช้ทุกข้อ",
    practice: ["set-p1"],
    blocks: [
      {
        type: "p",
        text: "**Python** เป็นภาษาโปรแกรมแบบ interpret (รันทีละบรรทัด) ไม่ต้อง compile — ตัวแปร**ไม่ต้องประกาศชนิด** เพราะเป็น **dynamic typing** เช่น `name = \"สมชาย\"` แล้วเปลี่ยนเป็น `age = 20` ได้เลย\n**Indent (การย่อหน้า) สำคัญมาก** — โค้ดที่อยู่ใน if/for/def ต้องย่อหน้าเท่ากัน (ปกติ 4 ช่องว่าง) ถ้าย่อหน้าก็คืออยู่นอกบล็อก",
      },
      { type: "h3", text: "ชนิดข้อมูลที่ต้องจำ" },
      {
        type: "table",
        headers: ["ชนิด", "ตัวอย่าง", "หมายเหตุ"],
        rows: [
          ["int", "10, -3, 0", "จำนวนเต็ม"],
          ["float", "3.14, 0.5", "ทศนิยม"],
          ["str", '\"สวัสดี\", \'A\'', "ข้อความ ต้องมี quote"],
          ["bool", "True, False", "พิมพ์ใหญ่ตัวแรก (ไม่ใช่ true)"],
          ["list", "[10, 20, 30]", "ลำดับ เปลี่ยนได้ (mutable)"],
          ["dict", '{\"ชื่อ\": \"สมชาย\"}', "คู่ key: value"],
        ],
      },
      { type: "h3", text: "list (ลิสต์)" },
      {
        type: "ul",
        items: [
          "`x = [10, 20, 30]` → index เริ่มที่ 0 → `x[0]` คือ 10",
          "`x[-1]` คือ **ตัวสุดท้าย** (30) — index ติดลบนับจากท้าย",
          "`x.append(40)` → เพิ่มท้าย → `[10, 20, 30, 40]`",
          "`len(x)` → จำนวนสมาชิก (3)",
          "slice: `x[1:3]` → [20, 30] (ตัดจาก index 1 ถึงก่อน index 3)",
        ],
      },
      { type: "h3", text: "dict (ดิกชันนารี)" },
      {
        type: "ul",
        items: [
          "`d = {\"ชื่อ\": \"สมชาย\", \"คะแนน\": 85}`",
          "เข้าถึงด้วยคีย์: `d[\"คะแนน\"]` → 85",
          "เพิ่ม/แก้: `d[\"เกรด\"] = \"A\"`",
          "ลูป dict: `for k in d:` ได้คีย์, `for k, v in d.items():` ได้คีย์+ค่า",
        ],
      },
      { type: "h3", text: "if / for / while" },
      {
        type: "code",
        lang: "python",
        text: 'age = 20\nif age >= 18:\n    print("ผู้ใหญ่")\nelif age >= 13:\n    print("วัยรุ่น")\nelse:\n    print("เด็ก")\n\nfor i in range(5):      # 0,1,2,3,4\n    print(i)\n\ntotal = 0\nn = 0\nwhile n < 5:\n    total += n\n    n += 1',
      },
      { type: "h3", text: "ฟังก์ชัน (def)" },
      {
        type: "code",
        lang: "python",
        text: 'def add(a, b):\n    return a + b\n\nprint(add(2, 3))    # 5\n\n# รับค่าจากคีย์บอร์ด — input() คืนค่าเป็น str เสมอ\nname = input("ชื่อ: ")\nage = int(input("อายุ: "))   # ต้องแปลงเป็น int ก่อนนับเลข',
      },
      {
        type: "callout",
        tone: "warn",
        title: "กับดักที่เจอบ่อยในข้อสอบ",
        text: "`input()` คืนค่าเป็น **string เสมอ** — ถ้าใส่ `input()` เข้าไปคำนวณ เช่น `age + 1` จะ error ต้อง `int(input(...))` ก่อน และการรวม string กับ number ต้องแปลง `str(age)` เช่น `\"อายุ \" + str(age)`",
      },
      { type: "h3", text: "print() เบื้องต้น" },
      {
        type: "code",
        lang: "python",
        text: 'x = 10\nprint("ค่า =", x)        # ค่า = 10 (เว้นวรรคให้เอง)\nprint(f"ค่า = {x}")     # f-string: แทรกตัวแปรด้วย {}\nprint("บรรทัด1\\nบรรทัด2")  # \\n = ขึ้นบรรทัดใหม่',
      },
    ],
  },
  {
    id: "py-tools",
    title: "Anaconda · Jupyter · Spyder",
    icon: "🛠️",
    intro: "เครื่องมือทำงานของนัก Data Science — ต้องรู้ว่าแต่ละตัวใช้ทำอะไร",
    practice: ["set-p2"],
    blocks: [
      {
        type: "p",
        text: "**Anaconda** คือชุดแจกจ่าย (distribution) ที่รวม **Python + เครื่องมือ Data Science + ไลบรารีหลัก** มาให้พร้อม (matplotlib, numpy, opencv, tensorflow ฯลฯ) — ติดตั้งครั้งเดียวได้ทุกอย่าง ไม่ต้องลงทีละตัว\n**conda** เป็นตัวจัดการแพ็กเกจและสภาพแวดล้อม (environment) ที่มาพร้อม Anaconda",
      },
      { type: "h3", text: "คำสั่ง conda ที่ต้องจำ" },
      {
        type: "code",
        lang: "bash",
        text: "conda create -n ml python=3.10   # สร้าง env ชื่อ ml\nconda activate ml                  # เปิดใช้ env\nconda install opencv               # ติดตั้งแพ็กเกจ\nconda list                        # ดูแพ็กเกจที่ติดตั้ง",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Env คืออะไร",
        text: "Environment คือพื้นที่แยกแต่ละโปรเจกต์ ลงเวอร์ชันไลบรารีต่างกันได้โดยไม่ชนกัน เช่น งานหนึ่งใช้ Python 3.9 อีกงานใช้ 3.12 — เปิดใช้ด้วย conda activate",
      },
      { type: "h3", text: "Jupyter Notebook" },
      {
        type: "ul",
        items: [
          "เป็น**โน้ตบุ๊กแบบ cell** — รันโค้ดทีละกล่อง (cell) แล้วเห็นผลลัพธ์ข้างใต้",
          "**Shift + Enter** = รัน cell ปัจจุบัน แล้วเลื่อนไป cell ถัดไป",
          "cell มี 2 แบบ: **Code** (เขียนโค้ด) และ **Markdown** (เขียนข้อความ/อธิบาย)",
          "ตัวแปรที่รันใน cell ก่อนหน้าจะ**จำไว้ใช้ต่อได้** (ต้องรันตามลำดับ)",
          "ขึ้น notebook ด้วย `jupyter notebook` หรือ `jupyter lab`",
          "ไฟล์มีนามสกุล `.ipynb`",
        ],
      },
      { type: "h3", text: "Spyder IDE" },
      {
        type: "ul",
        items: [
          "IDE สำหรับเขียนโปรแกรมวิทยาศาสตร์ คล้าย MATLAB",
          "มี **Editor** (เขียนสคริปต์ .py), **Console** (รัน/ดูผล), **Variable Explorer** (ดูค่าตัวแปร), **IPython Console**",
          "รันทั้งไฟล์ด้วยปุ่ม Run (F5) — เหมาะกับงานยาว ๆ ไม่ใช่ cell แบบ Jupyter",
          "ข้อดี: เดบั๊กทีละบรรทัด, ดูตัวแปรเป็นตารางได้",
        ],
      },
      { type: "h3", text: "เลือกใช้ตัวไหนดี" },
      {
        type: "table",
        headers: ["งาน", "ตัวที่เหมาะ"],
        rows: [
          ["ทดลองทีละชิ้น + ทำรายงานผสมข้อความ/กราฟ", "Jupyter Notebook"],
          ["เขียนโปรแกรมยาว ๆ / debug ละเอียด", "Spyder"],
          ["เทรนโมเดล ML หลายขั้นตอน", "Jupyter (ขั้นละ cell)"],
        ],
      },
    ],
  },
  {
    id: "py-matplotlib",
    title: "matplotlib",
    icon: "📈",
    intro: "วาดกราฟเส้น/แท่ง/กระจาย/ฮิสโทแกรม ใส่ป้ายกำกับและบันทึกรูป",
    practice: ["set-p3"],
    blocks: [
      {
        type: "p",
        text: "**matplotlib** เป็นไลบรารีวาดกราฟยอดนิยม — เรียกใช้ด้วยคำย่อ `plt` แล้ววาดได้หลายแบบ หลัก ๆ คือสร้าง figure แล้วเรียกฟังก์ชันวาดทีละอัน สุดท้าย `plt.show()`",
      },
      { type: "h3", text: "โครงสร้างพื้นฐาน" },
      {
        type: "code",
        lang: "python",
        text: 'import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [10, 20, 15, 30]\n\nplt.plot(x, y, marker="o")      # เส้นเชื่อมจุด\nplt.xlabel("ปี")\nplt.ylabel("ยอดขาย")\nplt.title("ยอดขายรายปี")\nplt.grid(True)                  # ตารางกริด\nplt.show()                      # แสดงกราฟ\n\n# บันทึกรูปแทนการ show\nplt.savefig("graph.png", dpi=300)',
      },
      { type: "h3", text: "ชนิดกราฟที่ต้องรู้" },
      {
        type: "table",
        headers: ["ฟังก์ชัน", "ใช้ทำอะไร", "ตัวอย่าง"],
        rows: [
          ["plt.plot(x, y)", "กราฟเส้น (trend)", "ยอดขายตามปี"],
          ["plt.scatter(x, y)", "กราฟจุดกระจาย", "ความสัมพันธ์ 2 ตัวแปร"],
          ["plt.bar(x, y)", "กราฟแท่ง", "เปรียบเทียบหมวดหมู่"],
          ["plt.hist(data)", "ฮิสโทแกรม (ความถี่)", "การกระจายของข้อมูล"],
        ],
      },
      { type: "h3", text: "กราฟหลายชุด + legend" },
      {
        type: "code",
        lang: "python",
        text: 'import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\nsale = [10, 20, 15, 30]\ncost = [5, 8, 10, 12]\n\nplt.plot(x, sale, label="ยอดขาย")\nplt.plot(x, cost, label="ต้นทุน")\nplt.legend()                # แสดงกล่องคำอธิบาย\nplt.xlabel("เดือน")\nplt.ylabel("หมื่นบาท")\nplt.title("ยอดขาย vs ต้นทุน")\nplt.show()',
      },
      { type: "h3", text: "figure และ subplot" },
      {
        type: "ul",
        items: [
          "`plt.figure(figsize=(8, 5))` — ตั้งขนาดกราฟเป็นนิ้ว",
          "`fig, ax = plt.subplots(1, 2)` — วาด 2 กราฟในแถวเดียวกัน (1 แถว 2 คอลัมน์)",
          "เมื่อใช้ ax ให้วาดด้วย `ax.plot(...)`, `ax.set_title(...)` แทน plt",
          "`plt.style.use(\"ggplot\")` — เปลี่ยนธีมสีกราฟ",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "show() vs savefig()",
        text: "ถ้าเรียก `plt.show()` ก่อน `plt.savefig()` รูปที่บันทึกจะ**ว่างเปล่า** — ใช้อย่างใดอย่างหนึ่ง หรือ savefig ก่อน show",
      },
    ],
  },
  {
    id: "py-opencv",
    title: "OpenCV · Image Processing",
    icon: "🖼️",
    intro: "อ่าน แสดง แปลงภาพเป็นขาวดำ ปรับขนาด ละลายขอบ ตรวจจับขอบ — ต้นทางก่อนเข้าโมเดล AI",
    practice: ["set-p4"],
    blocks: [
      {
        type: "p",
        text: "**OpenCV** (cv2) เป็นไลบรารีประมวลผลภาพยอดนิยม — ข้อสอบมักให้อ่านภาพแล้วแปลงเป็นขาวดำ, ย่อขนาด, เบลอ หรือหาเส้นขอบ ก่อนนำเข้าโมเดล",
      },
      { type: "h3", text: "อ่าน / แสดง / บันทึกภาพ" },
      {
        type: "code",
        lang: "python",
        text: 'import cv2\n\nimg = cv2.imread("cat.jpg")          # อ่านภาพ → อาร์เรย์ numpy\ncv2.imshow("window", img)             # เปิดหน้าต่างแสดงภาพ\ncv2.waitKey(0)                        # รอจนกว่าจะกดปุ่มใดปุ่มหนึ่ง\ncv2.destroyAllWindows()               # ปิดหน้าต่าง\n\ncv2.imwrite("out.jpg", img)           # บันทึกภาพ',
      },
      {
        type: "callout",
        tone: "warn",
        title: "อาร์เรย์ภาพใน OpenCV",
        text: "ภาพสีที่ `cv2.imread` อ่านมาเรียงช่องเป็น **BGR** (Blue-Green-Red) ไม่ใช่ RGB — ต้องใช้ `cv2.cvtColor` ตอนแปลง ภาพขาวดำมี 1 ช่อง ภาพสีมี 3 ช่อง",
      },
      { type: "h3", text: "การแปลงที่เจอบ่อย" },
      {
        type: "code",
        lang: "python",
        text: 'import cv2\n\nimg = cv2.imread("dog.jpg")\n\n# ขาวดำ\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\n\n# ปรับขนาด (กว้าง, สูง)\nresized = cv2.resize(img, (150, 150))\n\n# ละลายขอบ / ลดสัญญาณรบกวน\nblur = cv2.GaussianBlur(img, (5, 5), 0)\n\n# ตรวจจับขอบ (Canny)\nedges = cv2.Canny(img, 50, 150)\n\n# ท้ายเป็น 0-255 → ค่า 127 เป็นจุดแบ่ง ขาว/ดำ\n_, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)',
      },
      { type: "h3", text: "สรุปฟังก์ชันที่ต้องจำ" },
      {
        type: "table",
        headers: ["ฟังก์ชัน", "หน้าที่"],
        rows: [
          ["cv2.imread(path)", "อ่านภาพเป็น numpy array (BGR)"],
          ["cv2.imshow(name, img) + waitKey(0)", "แสดงภาพในหน้าต่าง"],
          ["cv2.imwrite(path, img)", "บันทึกภาพ"],
          ["cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)", "แปลงเป็นขาวดำ"],
          ["cv2.resize(img, (w, h))", "ปรับขนาด (สังเกตลำดับ กว้าง, สูง)"],
          ["cv2.GaussianBlur(img, (5,5), 0)", "เบลอ ลด noise"],
          ["cv2.Canny(img, 50, 150)", "หาเส้นขอบ"],
          ["cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)", "แบ่งขาว-ดำด้วยค่า threshold"],
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "ทำไมต้อง preprocess",
        text: "โมเดลหมา/แมวต้องการภาพขนาดคงที่ (เช่น 150×150) และค่าพิกเซล 0–1 — resize ให้เท่ากัน + หาร 255 (normalize) ก่อนเข้าโมเดล ถ้าไม่ทำโมเดลเรียนรู้ยากและขนาดภาพบังคับไม่ได้",
      },
    ],
  },
  {
    id: "py-keras",
    title: "TensorFlow + Keras · หมา vs แมว",
    icon: "🧠",
    intro: "โครงข่ายประสาทเทียม CNN แยกหมากับแมว — ตั้งแต่โหลดข้อมูลจนถึงทำนาย",
    practice: ["set-p5"],
    blocks: [
      {
        type: "p",
        text: "**TensorFlow** เป็นไลบรารี Machine Learning ของ Google และ **Keras** เป็น API ระดับสูงที่อยู่ใน TensorFlow (`tf.keras`) ช่วยให้สร้างโมเดลได้ง่าย งานสุดคลาสสิกคือ **จำแนกภาพหมากับแมว** (binary classification) ด้วยโครงข่าย CNN",
      },
      { type: "h3", text: "เตรียมข้อมูล (ImageDataGenerator)" },
      {
        type: "code",
        lang: "python",
        text: 'from tensorflow.keras.preprocessing.image import ImageDataGenerator\n\ntrain_datagen = ImageDataGenerator(rescale=1./255)\n\ntrain_ds = train_datagen.flow_from_directory(\n    "data/train",          # มีโฟลเดอร์ย่อย cat/ และ dog/\n    target_size=(150, 150), # ปรับขนาดภาพ\n    batch_size=32,\n    class_mode="binary",   # แยก 2 กลุ่ม → ค่า 0/1\n)\n\nval_ds = val_datagen.flow_from_directory("data/validation", target_size=(150, 150), batch_size=32, class_mode="binary")',
      },
      {
        type: "callout",
        tone: "tip",
        title: "rescale = 1./255",
        text: "พิกเซลภาพมีค่า 0–255 → หารด้วย 255 ให้เหลือ 0–1 (normalize) เพื่อให้โมเดลเรียนรู้เร็วและแม่นขึ้น — จำไว้ขึ้นใจ",
      },
      { type: "h3", text: "สร้างโมเดล CNN" },
      {
        type: "code",
        lang: "python",
        text: 'from tensorflow import keras\nfrom tensorflow.keras import layers\n\nmodel = keras.Sequential([\n    layers.Conv2D(32, (3, 3), activation="relu", input_shape=(150, 150, 3)),\n    layers.MaxPooling2D(2, 2),\n    layers.Conv2D(64, (3, 3), activation="relu"),\n    layers.MaxPooling2D(2, 2),\n    layers.Flatten(),\n    layers.Dense(128, activation="relu"),\n    layers.Dense(1, activation="sigmoid"),   # ชั้นสุดท้าย 1 ค่า 0-1\n])\n\nmodel.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])\nmodel.fit(train_ds, epochs=10, validation_data=val_ds)',
      },
      { type: "h3", text: "ชั้น (Layer) ที่ต้องจำ" },
      {
        type: "table",
        headers: ["ชั้น", "หน้าที่"],
        rows: [
          ["Conv2D", "สกัดคุณลักษณะ (feature) จากภาพ เช่น เส้น, ขอบ, หู, ตา"],
          ["MaxPooling2D", "ย่อขนาดภาพลง ลดจำนวนพารามิเตอร์ (เลือกค่ามากสุดในบริเวณ)"],
          ["Flatten", "ทำให้ข้อมูล 2 มิติ กลายเป็น 1 มิติ (เส้นตรง) ก่อนเข้า Dense"],
          ["Dense", "ชั้นประสาทเต็มเชื่อมต่อทุกจุด (fully connected)"],
        ],
      },
      { type: "h3", text: "ชั้นสุดท้าย: sigmoid vs softmax" },
      {
        type: "ul",
        items: [
          "แยก **2 กลุ่ม** (หมา/แมว) → ใช้ `Dense(1, activation=\"sigmoid\")` + `loss=\"binary_crossentropy\"`",
          "แยก **หลายกลุ่ม** (เช่น หมา/แมว/นก) → ใช้ `Dense(3, activation=\"softmax\")` + `loss=\"categorical_crossentropy\"`",
          "**sigmoid** คืนค่า 0–1 (ความน่าจะเป็น) — ถ้าผล < 0.5 = กลุ่มแรก, ≥ 0.5 = กลุ่มสอง",
        ],
      },
      { type: "h3", text: "ทำนายผล" },
      {
        type: "code",
        lang: "python",
        text: 'import cv2\n\nimg = cv2.imread("test.jpg")\nimg = cv2.resize(img, (150, 150))\nimg = img.reshape(1, 150, 150, 3)   # เพิ่มมิติ batch (1 ภาพ)\nimg = img / 255.0                    # normalize\n\npred = model.predict(img)            # เช่น [[0.87]]\nif pred[0][0] >= 0.5:\n    print("หมา")\nelse:\n    print("แมว")',
      },
      {
        type: "callout",
        tone: "info",
        title: "ตัวเลขที่ต้องเดาได้",
        text: "`epochs=10` = วนเทรนทั้งชุด 10 รอบ · `batch_size=32` = เลือกทีละ 32 ภาพ · `model.fit` ใช้ข้อมูล train · `validation_data` ตรวจผลเทรน · `metrics=[\"accuracy\"]` วัดความแม่นยำ",
      },
    ],
  },
];
