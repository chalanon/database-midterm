import type { Question, QuizSet } from "../types";

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

/* ------------------------------------------------------------------ */
/* ชุดที่ 1 : Python พื้นฐาน                                            */
/* ------------------------------------------------------------------ */

const p1Questions: Question[] = [
  mc({
    id: "p1-1",
    title: "ตัวแปร",
    prompt: "ข้อใดถูกต้องเกี่ยวกับตัวแปรใน Python",
    points: 4,
    options: [
      "ต้องประกาศชนิดก่อนใช้ เช่น int x = 5",
      "ไม่ต้องประกาศชนิด ชนิดถูกกำหนดจากค่าที่กำหนด (dynamic typing)",
      "ตัวแปรทุกตัวต้องเป็นตัวพิมพ์ใหญ่เท่านั้น",
      "เปลี่ยนชนิดของตัวแปรไม่ได้เมื่อกำหนดแล้ว",
    ],
    correct: 1,
    explanation: "Python เป็น dynamic typing — กำหนดชนิดเองจากค่า เช่น x = 5 เป็น int แล้วเปลี่ยนเป็น x = \"สวัสดี\" ได้",
  }),
  mc({
    id: "p1-2",
    title: "ชนิดข้อมูล",
    prompt: "ค่า `False` ใน Python เป็นชนิดข้อมูลใด",
    points: 3,
    options: ["bool", "str", "int", "float"],
    correct: 0,
    explanation: "True/False เป็น bool — ต้องพิมพ์ตัวใหญ่ตัวแรก ถ้าพิมพ์ false จะ error",
  }),
  mc({
    id: "p1-3",
    title: "list",
    prompt: 'กำหนด `x = [10, 20, 30]` แล้ว `x[-1]` มีค่าเท่าไร',
    points: 3,
    options: ["10", "20", "30", "Error (index ติดลบไม่ได้)"],
    correct: 2,
    explanation: "index ติดลบนับจากท้าย — x[-1] คือตัวสุดท้าย (30)",
  }),
  mc({
    id: "p1-4",
    title: "input()",
    prompt: "ถ้า `age = input(\"อายุ: \")` แล้วผู้ใช้พิมพ์ `20` — ชนิดของ age คืออะไร",
    points: 3,
    options: ["int", "str", "float", "bool"],
    correct: 1,
    explanation: "input() คืนค่าเป็น string เสมอ ต้อง int(input()) ก่อนนำไปคำนวณ",
  }),
  fill({
    id: "p1-5",
    title: "ฟังก์ชัน",
    prompt: "คำสั่งที่ใช้ประกาศฟังก์ชันใน Python คือ __________",
    points: 3,
    accept: ["def"],
    answer: "def",
    explanation: "เช่น def add(a, b): return a + b",
  }),
  fill({
    id: "p1-6",
    title: "dict",
    prompt: 'กำหนด `d = {\"ชื่อ\": \"สมชาย\"}` — เข้าถึงชื่อโดยเขียน `d[__________]`',
    points: 2,
    accept: ['"ชื่อ"'],
    answer: 'd["ชื่อ"]',
    explanation: "เข้าถึง dict ด้วยคีย์ ไม่ใช่ index",
  }),
  mc({
    id: "p1-7",
    title: "for loop",
    prompt: "`for i in range(3)` จะวนซ้ำกี่รอบ",
    points: 2,
    options: ["2", "3", "4", "ไม่มีที่สิ้นสุด"],
    correct: 1,
    explanation: "range(3) ให้ค่า 0, 1, 2 = 3 รอบ",
  }),
];

export const setPythonBasics: QuizSet = {
  id: "set-p1",
  no: 1,
  title: "Python พื้นฐาน",
  subtitle: "ตัวแปร, ชนิดข้อมูล, list, dict, input, ฟังก์ชัน",
  total: 20,
  variants: [{ label: "แบบฝึกหัดพื้นฐาน", questions: p1Questions }],
};

/* ------------------------------------------------------------------ */
/* ชุดที่ 2 : Anaconda · Jupyter · Spyder                               */
/* ------------------------------------------------------------------ */

const p2Questions: Question[] = [
  mc({
    id: "p2-1",
    title: "Anaconda",
    prompt: "Anaconda คืออะไร",
    points: 4,
    options: [
      "ตัวจัดการฐานข้อมูล",
      "ชุดแจกจ่ายที่รวม Python + เครื่องมือ Data Science ไว้ด้วยกัน",
      "ไลบรารีวาดกราฟอย่างเดียว",
      "เว็บเบราว์เซอร์สำหรับเขียนโค้ด",
    ],
    correct: 1,
    explanation: "Anaconda รวม Python + ไลบรารี + เครื่องมือ (Jupyter, Spyder) ไว้ครบชุด",
  }),
  mc({
    id: "p2-2",
    title: "conda",
    prompt: "คำสั่งใดใช้สร้างสภาพแวดล้อม (environment) ใหม่ชื่อ ml",
    points: 4,
    options: [
      "conda create -n ml python=3.10",
      "conda activate ml",
      "conda install ml",
      "conda list ml",
    ],
    correct: 0,
    explanation: "create -n ใช้สร้าง env ใหม่ ส่วน activate ใช้เปิดใช้ env",
  }),
  mc({
    id: "p2-3",
    title: "Jupyter",
    prompt: "ใน Jupyter Notebook ปุ่มสั้น (shortcut) ที่ใช้รัน cell ปัจจุบันคือ",
    points: 3,
    options: ["Ctrl + S", "Shift + Enter", "Alt + F4", "F5"],
    correct: 1,
    explanation: "Shift + Enter = รัน cell แล้วเลื่อนไป cell ถัดไป",
  }),
  mc({
    id: "p2-4",
    title: "Jupyter",
    prompt: "ไฟล์ Jupyter Notebook มีนามสกุลอะไร",
    points: 3,
    options: [".py", ".ipynb", ".notebook", ".nb"],
    correct: 1,
    explanation: ".ipynb = Interactive Python Notebook",
  }),
  fill({
    id: "p2-5",
    title: "Spyder",
    prompt: "ใน Spyder มีเครื่องมือที่ใช้ดูค่าตัวแปรเป็นตารางชื่อ __________ Explorer",
    points: 3,
    accept: ["variable", "ตัวแปร"],
    answer: "Variable Explorer",
    explanation: "Variable Explorer แสดงค่าตัวแปรทุกตัวที่รันไว้",
  }),
  mc({
    id: "p2-6",
    title: "Jupyter cell",
    prompt: "cell แบบใดที่ใช้เขียนข้อความอธิบาย (ไม่ใช่โค้ด)",
    points: 3,
    options: ["Code", "Markdown", "Text", "Comment"],
    correct: 1,
    explanation: "Markdown cell ใช้เขียนข้อความ/หัวข้อ/ตารางประกอบคำอธิบาย",
  }),
];

export const setPythonTools: QuizSet = {
  id: "set-p2",
  no: 2,
  title: "Anaconda · Jupyter · Spyder",
  subtitle: "เครื่องมือทำงาน + คำสั่ง conda ที่ต้องจำ",
  total: 20,
  variants: [{ label: "แบบฝึกหัดเครื่องมือ", questions: p2Questions }],
};

/* ------------------------------------------------------------------ */
/* ชุดที่ 3 : matplotlib                                                */
/* ------------------------------------------------------------------ */

const p3Questions: Question[] = [
  mc({
    id: "p3-1",
    title: "import",
    prompt: "คำสั่งมาตรฐานในการเรียกใช้ matplotlib คือข้อใด",
    points: 3,
    options: [
      "import matplotlib as mpl",
      "import matplotlib.pyplot as plt",
      "from matplotlib import show",
      "import pyplot",
    ],
    correct: 1,
    explanation: "ต้อง import submodule pyplot แล้วเรียกย่อว่า plt",
  }),
  mc({
    id: "p3-2",
    title: "ชนิดกราฟ",
    prompt: "ฟังก์ชันใดใช้วาดกราฟแท่ง",
    points: 3,
    options: ["plt.plot()", "plt.bar()", "plt.hist()", "plt.scatter()"],
    correct: 1,
    explanation: "plot = เส้น, bar = แท่ง, hist = ฮิสโทแกรม, scatter = จุดกระจาย",
  }),
  mc({
    id: "p3-3",
    title: "ฮิสโทแกรม",
    prompt: "พล็อตแบบใดที่เหมาะกับแสดงการกระจายความถี่ของข้อมูลชุดเดียว",
    points: 3,
    options: ["plt.plot()", "plt.hist()", "plt.scatter(x, y)", "plt.bar()"],
    correct: 1,
    explanation: "hist ใช้กับข้อมูล 1 ชุด เพื่อดูการกระจาย เช่น คะแนนสอบทั้งห้อง",
  }),
  mc({
    id: "p3-4",
    title: "legend",
    prompt: "หลังวาดกราฟหลายชุดพร้อม label ต้องเรียกฟังก์ชันใดเพื่อแสดงกล่องอธิบาย",
    points: 3,
    options: ["plt.title()", "plt.legend()", "plt.show()", "plt.grid()"],
    correct: 1,
    explanation: "plt.legend() แสดงกล่อง label ของแต่ละชุดที่ตั้งไว้ตอนวาด",
  }),
  fill({
    id: "p3-5",
    title: "บันทึกรูป",
    prompt: "ฟังก์ชันที่ใช้บันทึกกราฟเป็นไฟล์รูปคือ plt.__________()",
    points: 4,
    accept: ["savefig"],
    answer: "savefig",
    explanation: "plt.savefig(\"graph.png\", dpi=300) — ระวังอย่าเรียกหลัง plt.show()",
  }),
  mc({
    id: "p3-6",
    title: "แกน",
    prompt: "ฟังก์ชันใดใช้ตั้งชื่อแกน X",
    points: 2,
    options: ["plt.xlabel(\"ปี\")", "plt.title(\"ปี\")", "plt.ylabel(\"ปี\")", "plt.legend(\"ปี\")"],
    correct: 0,
    explanation: "xlabel = ชื่อแกน X, ylabel = ชื่อแกน Y",
  }),
  mc({
    id: "p3-7",
    title: "ข้อควรระวัง",
    prompt: "ถ้าต้องการทั้งแสดงกราฟบนจอและบันทึกไฟล์ ควรทำอย่างไร",
    points: 2,
    options: [
      "เรียก plt.savefig() แล้วตามด้วย plt.show()",
      "เรียก plt.show() แล้วตามด้วย plt.savefig()",
      "เรียก plt.savefig() อย่างเดียวพอ",
      "เรียก plt.show() สองครั้ง",
    ],
    correct: 0,
    explanation: "ถ้า show ก่อน ฟิกเกอร์จะว่างเปล่าตอนบันทึก — savefig ต้องมาก่อน show",
  }),
];

export const setPythonMatplotlib: QuizSet = {
  id: "set-p3",
  no: 3,
  title: "matplotlib",
  subtitle: "กราฟเส้น/แท่ง/กระจาย/ฮิสโทแกรม + ป้ายกำกับ",
  total: 20,
  variants: [{ label: "แบบฝึกหัด matplotlib", questions: p3Questions }],
};

/* ------------------------------------------------------------------ */
/* ชุดที่ 4 : OpenCV · Image Processing                                 */
/* ------------------------------------------------------------------ */

const p4Questions: Question[] = [
  mc({
    id: "p4-1",
    title: "อ่านภาพ",
    prompt: "ฟังก์ชันใดใช้โหลดภาพจากไฟล์",
    points: 3,
    options: ["cv2.load()", "cv2.imread()", "cv2.open()", "cv2.read()"],
    correct: 1,
    explanation: "cv2.imread(\"cat.jpg\") คืนค่าภาพเป็น numpy array",
  }),
  mc({
    id: "p4-2",
    title: "สีภาพ",
    prompt: "ภาพสีที่อ่านด้วย cv2.imread() เรียงช่องสีเป็นลำดับใด",
    points: 3,
    options: ["RGB", "BGR", "GRB", "CMYK"],
    correct: 1,
    explanation: "OpenCV เก็บเป็น BGR (Blue-Green-Red) ต่างจากปกติ — จำไว้ตอน cvtColor",
  }),
  mc({
    id: "p4-3",
    title: "ขาวดำ",
    prompt: "คำสั่งใดแปลงภาพเป็นขาวดำ",
    points: 3,
    options: [
      "cv2.gray(img)",
      "cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)",
      "cv2.toGray(img)",
      "cv2.threshold(img, 0, 255, 0)",
    ],
    correct: 1,
    explanation: "cvtColor + flag COLOR_BGR2GRAY เป็นวิธีแปลงเป็น grayscale",
  }),
  mc({
    id: "p4-4",
    title: "ปรับขนาด",
    prompt: "กำหนดให้ภาพใหม่กว้าง 150 สูง 150 — คำสั่งใดถูกต้อง",
    points: 3,
    options: [
      "cv2.resize(img, 150, 150)",
      "cv2.resize(img, (150, 150))",
      "cv2.resize(img, (150), (150))",
      "cv2.resize(img, size=150)",
    ],
    correct: 1,
    explanation: "cv2.resize รับขนาดเป็น tuple (กว้าง, สูง)",
  }),
  mc({
    id: "p4-5",
    title: "ตรวจจับขอบ",
    prompt: "ฟังก์ชันใดใช้ตรวจจับขอบภาพ",
    points: 3,
    options: ["cv2.Canny()", "cv2.GaussianBlur()", "cv2.erode()", "cv2.threshold()"],
    correct: 0,
    explanation: "cv2.Canny(img, 50, 150) หาเส้นขอบด้วยอัลกอริทึม Canny",
  }),
  fill({
    id: "p4-6",
    title: "บันทึกภาพ",
    prompt: "ฟังก์ชันที่ใช้บันทึกภาพคือ cv2.__________()",
    points: 3,
    accept: ["imwrite"],
    answer: "imwrite",
    explanation: "cv2.imwrite(\"out.jpg\", img)",
  }),
  mc({
    id: "p4-7",
    title: "เบลอ",
    prompt: "cv2.GaussianBlur(img, (5,5), 0) ใช้ทำอะไร",
    points: 2,
    options: [
      "ตรวจจับขอบให้คมชัดขึ้น",
      "ละลายขอบ ลดสัญญาณรบกวน",
      "ทำให้ภาพเป็นสี",
      "หมุนภาพ",
    ],
    correct: 1,
    explanation: "Gaussian blur ทำให้ภาพเบลอ ใช้ลด noise ก่อนขั้นตอนอื่น",
  }),
];

export const setPythonOpenCV: QuizSet = {
  id: "set-p4",
  no: 4,
  title: "OpenCV · Image Processing",
  subtitle: "อ่าน/แสดง/บันทึกภาพ, ขาวดำ, resize, blur, Canny",
  total: 20,
  variants: [{ label: "แบบฝึกหัด OpenCV", questions: p4Questions }],
};

/* ------------------------------------------------------------------ */
/* ชุดที่ 5 : TensorFlow + Keras (หมา vs แมว)                           */
/* ------------------------------------------------------------------ */

const p5Questions: Question[] = [
  mc({
    id: "p5-1",
    title: "normalize",
    prompt: "ใน ImageDataGenerator ค่า rescale=1./255 มีไว้ทำอะไร",
    points: 4,
    options: [
      "แปลงภาพเป็นขาวดำ",
      "ปรับค่าพิกเซลจาก 0-255 ให้เป็น 0-1 (normalize)",
      "สุ่มหมุนภาพ",
      "ปรับขนาดภาพเป็น 255x255",
    ],
    correct: 1,
    explanation: "หารด้วย 255 ให้พิกเซลอยู่ในช่วง 0-1 ช่วยให้โมเดลเรียนรู้เร็วและแม่นขึ้น",
  }),
  mc({
    id: "p5-2",
    title: "flow_from_directory",
    prompt: "เวลาใช้ flow_from_directory ต้องจัดโฟลเดอร์ข้อมูลอย่างไร",
    points: 3,
    options: [
      "รูปทั้งหมดรวมในโฟลเดอร์เดียว",
      "แยกโฟลเดอร์ย่อยตาม class เช่น cat/ และ dog/",
      "ต้องเป็นไฟล์ .npy เท่านั้น",
      "ต้องใส่ label ในชื่อไฟล์ทุกไฟล์",
    ],
    correct: 1,
    explanation: "flow_from_directory อ่าน class จากชื่อโฟลเดอร์ย่อย — สร้าง cat/ และ dog/ แยกกัน",
  }),
  mc({
    id: "p5-3",
    title: "CNN layer",
    prompt: "ชั้นใดใช้สกัดคุณลักษณะ (feature) จากภาพ เช่น ขอบ เส้น ใบหน้า",
    points: 3,
    options: ["Flatten", "Dense", "Conv2D", "Dropout"],
    correct: 2,
    explanation: "Conv2D เป็น convolutional layer สกัด feature ส่วน Flatten/Dense เป็นขั้นปลาย",
  }),
  mc({
    id: "p5-4",
    title: "ชั้นสุดท้าย",
    prompt: "การแยกหมากับแมว (2 กลุ่ม) ชั้นสุดท้ายควรใช้ activation อะไร",
    points: 3,
    options: [
      "softmax กับ Dense(2)",
      "sigmoid กับ Dense(1)",
      "relu กับ Dense(128)",
      "linear กับ Dense(1)",
    ],
    correct: 1,
    explanation: "binary classification = Dense(1, activation=\"sigmoid\") + loss=\"binary_crossentropy\"",
  }),
  fill({
    id: "p5-5",
    title: "loss",
    prompt: "การแยก 2 กลุ่ม ใช้ loss ชื่อ __________crossentropy",
    points: 3,
    accept: ["binary"],
    answer: "binary_crossentropy",
    explanation: "2 กลุ่ม = binary_crossentropy, หลายกลุ่ม = categorical_crossentropy",
  }),
  mc({
    id: "p5-6",
    title: "ทำนาย",
    prompt: "model.predict() คืนค่า [[0.87]] สำหรับภาพแมว/หมา — ข้อสรุปใดถูกต้อง (0=แมว, 1=หมา)",
    points: 2,
    options: [
      "แมว (เพราะ 0.87 < 1)",
      "หมา (เพราะ 0.87 ≥ 0.5)",
      "ผลเสมอ",
      "ต้องทำนายซ้ำใหม่",
    ],
    correct: 1,
    explanation: "sigmoid เปรียบเทียบกับ 0.5 — ค่า ≥ 0.5 = กลุ่มที่ 1 (หมา)",
  }),
  mc({
    id: "p5-7",
    title: "epochs / batch",
    prompt: "model.fit(train_ds, epochs=10, batch_size=32) หมายถึงอะไร",
    points: 2,
    options: [
      "วนเทรนทั้งชุด 10 รอบ แต่ละรอบใช้ทีละ 32 ภาพ",
      "เทรนแค่ 10 ภาพ 32 รอบ",
      "เทรน 32 รอบ ใช้ 10 ภาพ",
      "บันทึกโมเดล 10 ครั้ง",
    ],
    correct: 0,
    explanation: "epochs = จำนวนรอบที่วนทั้งชุด, batch_size = จำนวนภาพต่อการอัปเดตครั้ง",
  }),
];

export const setPythonKeras: QuizSet = {
  id: "set-p5",
  no: 5,
  title: "TensorFlow + Keras (หมา vs แมว)",
  subtitle: "CNN, ImageDataGenerator, sigmoid, ทำนายผล",
  total: 20,
  variants: [{ label: "แบบฝึกหัด Keras", questions: p5Questions }],
};

export const pythonSets: QuizSet[] = [
  setPythonBasics,
  setPythonTools,
  setPythonMatplotlib,
  setPythonOpenCV,
  setPythonKeras,
];
