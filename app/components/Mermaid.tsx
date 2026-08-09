"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    mermaid?: {
      initialize: (opts: Record<string, unknown>) => void;
      render: (id: string, code: string) => Promise<{ svg: string }>;
      [key: string]: unknown;
    };
  }
}

export default function Mermaid({ code, caption }: { code: string; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let raf = 0;

    const render = async () => {
      const m = window.mermaid;
      if (!m) {
        raf = window.setTimeout(render, 250);
        return;
      }
      try {
        if (!(m as unknown as { done?: boolean }).done) {
          m.initialize({
            startOnLoad: false,
            securityLevel: "loose",
            theme: "base",
            fontFamily: '"Noto Sans Thai", sans-serif',
            themeVariables: {
              background: "#ffffff",
              primaryColor: "#eef1ff",
              primaryBorderColor: "#c7ccff",
              primaryTextColor: "#101828",
              lineColor: "#4f46e5",
              textColor: "#101828",
              fontSize: "15px",
            },
          });
          (m as unknown as { done: boolean }).done = true;
        }
        const id = "mmd-" + Math.random().toString(36).slice(2);
        const { svg } = await m.render(id, code);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          // ตั้งความกว้างตามขนาดจริง (viewBox) แทน width=100% ของ mermaid
          // เพื่อให้อ่านได้บนมือถือ (เลื่อนแนวนอน) ไม่หดจนตัวหนังสือเล็กลง
          const el = ref.current.querySelector("svg");
          const vb = el?.getAttribute("viewBox");
          if (el && vb) {
            const w = parseFloat(vb.split(" ")[2]);
            if (Number.isFinite(w) && w > 0) {
              el.style.width = `${w}px`;
              el.style.maxWidth = "none";
            }
          }
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    raf = window.setTimeout(render, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(raf);
    };
  }, [code]);

  return (
    <>
      <div className="mermaid-wrap" ref={ref}>
        {failed && (
          <pre style={{ textAlign: "left", fontSize: 12, whiteSpace: "pre-wrap" }}>{code}</pre>
        )}
      </div>
      {caption && <div className="er-caption">{caption}</div>}
    </>
  );
}
