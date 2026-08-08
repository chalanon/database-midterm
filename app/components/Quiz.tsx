"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Question, QuizSet } from "@/lib/types";
import { matchesAnswer, pickRandom, shuffle } from "@/lib/normalize";
import { saveFirstAttempt } from "@/lib/leaderboard";
import RichText from "./RichText";

interface QuizProps {
  set: QuizSet;
}

interface Round {
  variant: string;
  questions: Question[];
}

export default function Quiz({ set }: QuizProps) {
  const buildRound = useCallback((): Round => {
    const variant = pickRandom(set.variants);
    const qs = shuffle(variant.questions);
    const picked = set.pick && qs.length > set.pick ? qs.slice(0, set.pick) : qs;
    return { variant: variant.label, questions: picked };
  }, [set]);

  const [round, setRound] = useState<Round | null>(null);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [selfMarks, setSelfMarks] = useState<Record<string, "ok" | "no">>({});
  const [checked, setChecked] = useState(false);
  const [savedName, setSavedName] = useState("");
  const [saveMsg, setSaveMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    if (!round) setRound(buildRound());
  }, [round, buildRound]);

  const { variant, questions } = round ?? { variant: "", questions: [] };

  const score = useMemo(() => {
    let s = 0;
    for (const q of questions) {
      if (q.type === "mc" && answers[q.id] === q.correct) s += q.points;
      else if ((q.type === "fill" || q.type === "fix") && typeof answers[q.id] === "string" && matchesAnswer(String(answers[q.id]), q.accept || [])) s += q.points;
      else if (q.type === "long" && selfMarks[q.id] === "ok") s += q.points;
    }
    return s;
  }, [questions, answers, selfMarks]);

  const reset = () => {
    setRound(buildRound());
    setAnswers({});
    setSelfMarks({});
    setChecked(false);
    setSavedName("");
    setSaveMsg(null);
  };

  const handleSave = () => {
    const saved = saveFirstAttempt(savedName, set.id, score, set.total);
    setSaveMsg(
      saved
        ? { ok: true, text: `บันทึก ${savedName} (รอบแรก) ไว้ในอันดับแล้ว` }
        : { ok: false, text: "รอบแรกของคุณถูกบันทึกไว้แล้วในอันดับ — รอบนี้ไม่นับ" }
    );
  };

  const variantIntro = set.variants.find((v) => v.label === variant)?.intro;

  if (!round) {
    return (
      <div className="quiz-set-card">
        <div className="quiz-set-head">
          <div className="quiz-no">{set.no}</div>
          <div>
            <h3>{set.title}</h3>
            <p className="sub">{set.subtitle}</p>
          </div>
          <div className="quiz-meta">
            <span className="pill neutral">กำลังสุ่มข้อ...</span>
          </div>
        </div>
        <div className="quiz-body">
          <div className="empty">กำลังเตรียมโจทย์สำหรับชุดนี้…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-set-card">
      <div className="quiz-set-head">
        <div className="quiz-no">{set.no}</div>
        <div>
          <h3>{set.title}</h3>
          <p className="sub">{set.subtitle}</p>
        </div>
        <div className="quiz-meta">
          <span className="pill">{variant}</span>
          <span className="pill neutral">
            {questions.length} ข้อ · {set.total} คะแนน
          </span>
          <span className="pill amber">
            คะแนน: {score}/{set.total}
          </span>
        </div>
      </div>

      <div className="quiz-body">
        {variantIntro && <RichText blocks={variantIntro} />}

        <div className="quiz-toolbar">
          <button className="btn" onClick={reset}>
            🎲 สุ่มข้อใหม่
          </button>
          <span className="progress">
            คำอธิบาย: {set.no === 5 ? "กรอกคำศัพท์ที่หายไป" : set.no === 6 ? "แก้ประโยคให้ถูกต้อง (พิมพ์แก้เอง)" : "พิมพ์คำตอบในช่อง → กดตรวจเพื่อดูเฉลย → ประเมินตัวเอง"}
          </span>
        </div>

        {questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            q={q}
            index={i}
            answers={answers}
            setAnswers={setAnswers}
            selfMarks={selfMarks}
            setSelfMarks={setSelfMarks}
            checked={checked}
          />
        ))}

        {!checked ? (
          <div style={{ marginTop: 8 }}>
            <button className="btn primary" onClick={() => setChecked(true)}>
              ✅ ตรวจคำตอบ / ดูเฉลย
            </button>
          </div>
        ) : (
          <>
            <ResultBanner score={score} total={set.total} />
            <div className="save-box">
              <input
                className="q-input"
                placeholder="พิมพ์ชื่อ (สำหรับจัดอันดับ)"
                value={savedName}
                onChange={(e) => setSavedName(e.target.value)}
              />
              <button className="btn primary" onClick={handleSave} disabled={!savedName.trim()}>
                🏆 บันทึกคะแนนลงอันดับ
              </button>
              <button className="btn" onClick={reset}>
                🎲 เริ่มรอบใหม่
              </button>
            </div>
            {saveMsg && (
              <div className={`feedback ${saveMsg.ok ? "ok" : "mid"}`} style={{ marginTop: 10 }}>
                {saveMsg.text}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

interface QCardProps {
  q: Question;
  index: number;
  answers: Record<string, string | number>;
  setAnswers: (a: Record<string, string | number>) => void;
  selfMarks: Record<string, "ok" | "no">;
  setSelfMarks: (a: Record<string, "ok" | "no">) => void;
  checked: boolean;
}

function QuestionCard({ q, index, answers, setAnswers, selfMarks, setSelfMarks, checked }: QCardProps) {
  const update = (val: string | number) => setAnswers({ ...answers, [q.id]: val });

  const autoCorrect =
    q.type === "mc"
      ? answers[q.id] === q.correct
      : (q.type === "fill" || q.type === "fix") && typeof answers[q.id] === "string" && matchesAnswer(String(answers[q.id]), q.accept || []);

  let fb: "ok" | "err" | null = null;
  if (checked) {
    if (q.type === "mc" || q.type === "fill" || q.type === "fix") fb = autoCorrect ? "ok" : "err";
  }

  return (
    <div className="q-card">
      <div className="q-head">
        <div className="q-num">{index + 1}</div>
        <div className="q-title">{q.title}</div>
        <div className="q-pts">{q.points} คะแนน</div>
      </div>

      <div className="prompt">{q.prompt}</div>
      {q.hint && <div className="feedback mid" style={{ marginBottom: 10 }}>💡 {q.hint}</div>}

      {q.type === "mc" && q.options && (
        <div>
          {q.options.map((opt, oi) => {
            const sel = answers[q.id] === oi;
            const isCorrect = q.correct === oi;
            let cls = "option";
            if (checked) {
              if (isCorrect) cls += " ok";
              else if (sel) cls += " bad";
            } else if (sel) cls += " sel";
            return (
              <label key={oi} className={cls}>
                <input
                  type="radio"
                  name={q.id}
                  disabled={checked}
                  checked={sel}
                  onChange={() => update(oi)}
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
      )}

      {(q.type === "fill" || q.type === "fix") && (
        <textarea
          className="q-input"
          placeholder={q.type === "fill" ? "พิมพ์คำตอบ..." : "พิมพ์ประโยคที่แก้แล้ว..."}
          value={typeof answers[q.id] === "string" ? (answers[q.id] as string) : ""}
          disabled={checked}
          onChange={(e) => update(e.target.value)}
        />
      )}

      {q.type === "long" && (
        <textarea
          className="q-input"
          placeholder="พิมพ์คำตอบของคุณที่นี่… ตรวจกับเฉลยแล้วกด “ตอบถูก / ตอบผิด”"
          value={typeof answers[q.id] === "string" ? (answers[q.id] as string) : ""}
          onChange={(e) => update(e.target.value)}
        />
      )}

      {checked && fb === "ok" && (
        <div className="feedback ok">
          <b>✓ ถูกต้อง</b> {q.explanation}
        </div>
      )}
      {checked && fb === "err" && (
        <div className="feedback err">
          <b>✗ ยังไม่ถูก</b> เฉลย: <span className="ans">{q.answer}</span>
          {q.explanation && <div>{q.explanation}</div>}
        </div>
      )}

      {checked && q.type === "long" && (
        <div>
          <div className="feedback mid">
            <b>เฉลย</b>
          </div>
          <RichText blocks={q.model || [{ type: "p", text: q.answer || "" }]} />
          <div className="selfmark">
            <button
              className={`btn ok-btn small ${selfMarks[q.id] === "ok" ? "active" : ""}`}
              onClick={() => setSelfMarks({ ...selfMarks, [q.id]: "ok" })}
            >
              ✅ ตอบถูก (ได้ {q.points} คะแนน)
            </button>
            <button
              className={`btn no-btn small ${selfMarks[q.id] === "no" ? "active" : ""}`}
              onClick={() => setSelfMarks({ ...selfMarks, [q.id]: "no" })}
            >
              ❌ ตอบผิด (ไม่ได้คะแนน)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function ResultBanner({ score, total }: { score: number; total: number }) {
  const ratio = score / total;
  const cls = ratio >= 0.8 ? "win" : ratio >= 0.5 ? "ok" : "mid";
  const msg =
    ratio >= 0.8
      ? "เก่งมาก! พร้อมสอบแน่นอน"
      : ratio >= 0.5
        ? "พอใช้ได้ ลองทบทวนเนื้อหาที่ผิดแล้วทำใหม่"
        : "ยังไม่ผ่านเกณฑ์ กลับไปอ่านเนื้อหาแล้วลองใหม่ได้";
  return (
    <div className={`result-banner ${cls}`}>
      <div className="big">
        {score}/{total}
      </div>
      <div className="txt">
        <b>{msg}</b>
        <p>ตรวจคำตอบจากเฉลยแล้วคะแนนของชุดนี้ สุ่มข้อใหม่ได้เรื่อย ๆ เพื่อฝึกซ้ำ</p>
      </div>
    </div>
  );
}
