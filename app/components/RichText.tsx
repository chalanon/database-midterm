"use client";

import type { Block } from "@/lib/types";
import Mermaid from "./Mermaid";

function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i}>{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

export default function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i}>
                {b.text.split("\n").map((ln, j) => (
                  <span key={j}>
                    {j > 0 && <br />}
                    {inline(ln)}
                  </span>
                ))}
              </p>
            );
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div style={{ overflowX: "auto" }} key={i}>
                <table>
                  <thead>
                    <tr>
                      {b.headers.map((h, j) => (
                        <th key={j}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, k) => (
                          <td key={k}>{inline(c)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "code":
            return (
              <pre key={i}>
                <code>{b.text}</code>
              </pre>
            );
          case "callout":
            return (
              <div className={`callout ${b.tone}`} key={i}>
                <b>{b.title}</b>
                {inline(b.text)}
              </div>
            );
          case "er":
            return <Mermaid key={i} code={b.code} caption={b.caption} />;
          case "h3":
            return (
              <h3 className="sub" key={i}>
                {b.text}
              </h3>
            );
        }
      })}
    </>
  );
}
