"use client";

import { useRef, useState } from "react";

declare global {
  interface Window {
    loadPyodide?: (opts?: Record<string, unknown>) => Promise<any>;
  }
}

const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
const PYODIDE_INDEX = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

type CellOut = { kind: "stdout" | "stderr" | "out"; text: string };
type Cell = { id: number; code: string; outputs: CellOut[]; idx?: number; running?: boolean };
type Status = "idle" | "loading" | "ready" | "error";

const EXAMPLES: { label: string; code: string }[] = [
  {
    label: "👋 Hello + ตัวแปร",
    code: 'name = "สมชาย"\nprint("สวัสดี", name)\nage = 20\nprint(f"อายุ {age} ปี")',
  },
  {
    label: "🧮 for + list + sum",
    code: 'scores = [80, 90, 75, 60]\nfor s in scores:\n    print("ได้", s)\nprint("รวม =", sum(scores))\nprint("เฉลี่ย =", sum(scores) / len(scores))',
  },
  {
    label: "🔁 dict + วนลูป",
    code: 'menu = {"ชื่อ": "ข้าวผัด", "ราคา": 50}\nfor k, v in menu.items():\n    print(k, "=", v)',
  },
  {
    label: "🎯 ฟังก์ชัน",
    code: "def add(a, b):\n    return a + b\n\nprint(add(3, 4))",
  },
];

let nextId = 1;
const freshCell = (): Cell => ({ id: nextId++, code: "", outputs: [] });

export default function PyNotebook() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cells, setCells] = useState<Cell[]>([freshCell()]);
  const pyodideRef = useRef<any>(null);
  const execRef = useRef(0);
  const cellRefs = useRef<Map<number, HTMLTextAreaElement>>(new Map());
  const loadingRef = useRef<Promise<any> | null>(null);

  const ensurePyodide = (): Promise<any> => {
    if (pyodideRef.current) return Promise.resolve(pyodideRef.current);
    if (loadingRef.current) return loadingRef.current;
    setStatus("loading");
    loadingRef.current = (async () => {
      try {
        if (!window.loadPyodide) {
          await new Promise<void>((res, rej) => {
            const s = document.createElement("script");
            s.src = PYODIDE_CDN;
            s.onload = () => res();
            s.onerror = () => rej(new Error("โหลด Pyodide ไม่สำเร็จ (เช็คอินเทอร์เน็ต)"));
            document.head.appendChild(s);
          });
        }
        const py = await window.loadPyodide!({ indexURL: PYODIDE_INDEX });
        try {
          py.setStdin({ stdin: () => window.prompt("input() — พิมพ์ค่า (Enter = ว่าง):") ?? "" });
        } catch {
          /* ไม่มี input() ก็ยังใช้ได้ */
        }
        pyodideRef.current = py;
        setStatus("ready");
        return py;
      } catch (e: unknown) {
        setErrorMsg(String((e as Error)?.message || e));
        setStatus("error");
        return null;
      }
    })();
    return loadingRef.current;
  };

  const runCell = async (id: number, code: string) => {
    const pyodide = pyodideRef.current;
    if (!pyodide || !code.trim()) return;
    const idx = ++execRef.current;
    setCells((prev) => prev.map((c) => (c.id === id ? { ...c, running: true, outputs: [] } : c)));

    const chunks: CellOut[] = [];
    try {
      pyodide.setStdout({ batched: (s: string) => { if (s) chunks.push({ kind: "stdout", text: s }); } });
      pyodide.setStderr({ batched: (s: string) => { if (s) chunks.push({ kind: "stderr", text: s }); } });
      const r = await pyodide.runPythonAsync(code);
      const isProxy =
        r && typeof r === "object" && typeof r.type === "string" && typeof r.destroy === "function";
      if (isProxy) {
        if (r.type !== "NoneType") chunks.push({ kind: "out", text: r.toString() });
        r.destroy();
      } else if (r !== undefined && r !== null) {
        chunks.push({ kind: "out", text: String(r) });
      }
    } catch (e: unknown) {
      let msg = String((e as Error)?.message || e);
      if (msg.startsWith("PythonError: ")) msg = msg.slice("PythonError: ".length);
      chunks.push({ kind: "stderr", text: msg });
    } finally {
      try { pyodide.setStdout(); } catch { /* noop */ }
      try { pyodide.setStderr(); } catch { /* noop */ }
    }
    setCells((prev) => prev.map((c) => (c.id === id ? { ...c, running: false, outputs: chunks, idx } : c)));
  };

  const resetKernel = async () => {
    const pyodide = pyodideRef.current;
    if (pyodide) {
      try {
        await pyodide.runPythonAsync(
          "for _k in list(globals()):\n    if _k != '__builtins__':\n        del globals()[_k]\n"
        );
      } catch { /* noop */ }
    }
    execRef.current = 0;
    setCells([freshCell()]);
  };

  const addCell = () => setCells((prev) => [...prev, freshCell()]);
  const removeCell = (id: number) => {
    cellRefs.current.delete(id);
    setCells((prev) => (prev.length > 1 ? prev.filter((c) => c.id !== id) : prev));
  };

  const addExample = async (code: string) => {
    const py = await ensurePyodide();
    if (!py) return;
    const id = nextId++;
    setCells((prev) => [...prev, { id, code, outputs: [] }]);
    await runCell(id, code);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, id: number, code: string) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = cellRefs.current.get(id);
      if (!ta) return;
      const s = ta.selectionStart;
      const en = ta.selectionEnd;
      const nv = code.slice(0, s) + "    " + code.slice(en);
      setCells((prev) => prev.map((x) => (x.id === id ? { ...x, code: nv } : x)));
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = s + 4;
      });
    }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runCell(id, code);
    }
  };

  return (
    <div className="pynb">
      {status !== "ready" ? (
        <div className="pynb-gate card pad">
          {status === "idle" && (
            <>
              <p className="pynb-desc">
                ลองรัน <b>Python จริง ๆ ในเว็บนี้</b> ได้เลย — ใช้ Pyodide (Python รันบนเบราว์เซอร์ของคุณ ไม่ต้องส่งไปเซิร์ฟเวอร์)
                กดโหลดครั้งแรกใช้เน็ตประมาณ 10 MB และเวลา 30 วิ – 1 นาที ครั้งต่อไปเปิดทันที
              </p>
              <div className="pynb-actions">
                <button className="btn primary" onClick={() => ensurePyodide()}>
                  ▶ เริ่มใช้ Python
                </button>
              </div>
              <div className="pynb-examples">
                <span>หรือกดตัวอย่างเลย:</span>
                {EXAMPLES.map((ex) => (
                  <button key={ex.label} className="btn small" onClick={() => addExample(ex.code)}>
                    {ex.label}
                  </button>
                ))}
              </div>
            </>
          )}
          {status === "loading" && (
            <div className="pynb-loading">
              ⏳ กำลังโหลด Python … (ครั้งแรกโหลดจากเน็ต ~10 MB อาจใช้เวลา 30 วิ – 1 นาที ครั้งต่อไปเปิดทันที)
            </div>
          )}
          {status === "error" && <div className="feedback err">โหลด Python ไม่สำเร็จ: {errorMsg}</div>}
        </div>
      ) : (
        <div className="pynb-body card pad">
          <div className="pynb-top">
            <div className="pynb-title">🐍 Python Notebook (ในเบราว์เซอร์)</div>
            <button className="btn small" onClick={resetKernel}>
              🔄 Restart kernel
            </button>
          </div>

          {cells.map((c) => (
            <div className="pynb-cell" key={c.id}>
              <div className="pynb-cell-head">
                <span className="pynb-in">In [{c.idx ?? "\u00A0"}]:</span>
                <span className="pynb-cell-actions">
                  <button
                    className="btn small"
                    disabled={c.running}
                    onClick={() => runCell(c.id, c.code)}
                  >
                    {c.running ? "⏳ …" : "▶ รัน"}
                  </button>
                  {cells.length > 1 && (
                    <button className="btn small ghost" onClick={() => removeCell(c.id)}>
                      🗑
                    </button>
                  )}
                </span>
              </div>
              <textarea
                ref={(el) => {
                  if (el) cellRefs.current.set(c.id, el);
                  else cellRefs.current.delete(c.id);
                }}
                className="pynb-code q-input"
                value={c.code}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                placeholder="# พิมพ์โค้ด Python ที่นี่ แล้วกด ▶ รัน หรือ Ctrl+Enter"
                onChange={(e) =>
                  setCells((prev) => prev.map((x) => (x.id === c.id ? { ...x, code: e.target.value } : x)))
                }
                onKeyDown={(e) => onKeyDown(e, c.id, c.code)}
              />
              {c.outputs.length > 0 && (
                <div className="pynb-out">
                  {c.outputs.map((o, i) =>
                    o.kind === "out" ? (
                      <div key={i} className="pynb-outline">
                        <b>Out [{c.idx}]:</b> {o.text}
                      </div>
                    ) : (
                      <pre key={i} className={o.kind === "stderr" ? "pynb-prev pynb-err" : "pynb-prev"}>
                        {o.text}
                      </pre>
                    )
                  )}
                </div>
              )}
            </div>
          ))}

          <div className="pynb-foot">
            <button className="btn" onClick={addCell}>
              + เพิ่ม cell
            </button>
            <span className="pynb-note">
              💡 รันด้วยปุ่ม ▶ หรือ <b>Ctrl+Enter</b> · <b>Tab</b> = ย่อหน้า 4 ช่อง · ตัวแปรจำไว้ข้าม cell ได้เหมือน
              Jupyter · อยากใช้ numpy/pandas/matplotlib พิมพ์ <code>await micropip.install("numpy")</code> แล้วรันก่อน
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
