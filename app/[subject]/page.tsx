import Link from "next/link";
import { notFound } from "next/navigation";
import { subjects } from "@/lib/data/subjects";
import Quiz from "@/app/components/Quiz";
import Leaderboard from "@/app/components/Leaderboard";
import RichText from "@/app/components/RichText";
import PyNotebook from "@/app/components/PyNotebook";
import type { QuizSet } from "@/lib/types";

export function generateStaticParams() {
  return subjects.map((s) => ({ subject: s.id }));
}

export const dynamicParams = false;

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: id } = await params;
  const subject = subjects.find((s) => s.id === id);
  if (!subject) notFound();

  const GRAND_TOTAL = subject.sets.reduce((s, x) => s + x.total, 0);
  const setById: Record<string, QuizSet> = Object.fromEntries(subject.sets.map((s) => [s.id, s]));

  return (
    <>
      <nav className="topnav">
        <div className="inner">
          <Link href="/" className="brand">
            <span className="logo">{subject.icon}</span>
            ติวสอบ {subject.name}
          </Link>
          <div className="nav-links">
            <a href="#study">📖 เนื้อหา</a>
            {subject.id === "python" && <a href="#playground">🐍 ลองรัน</a>}
            <a href="#practice">✍️ แบบฝึกหัด</a>
            <a href="#rank">🏆 อันดับ</a>
            <Link href="/" className="subject-link">
              🗂️ เลือกวิชา
            </Link>
          </div>
        </div>
      </nav>

      <main id="top">
        <div className="container">
          <header className="hero">
            <span className="badge">
              {subject.icon} {subject.name} · {subject.tagline}
            </span>
            <h1>เตรียมสอบกลางภาค {subject.name} แบบ onepage</h1>
            <p className="sub">{subject.description}</p>
            <div className="hero-actions">
              <a className="btn primary" href="#practice">
                ✍️ เริ่มทำแบบฝึกหัด
              </a>
              <a className="btn" href="#study">
                📖 อ่านเนื้อหา
              </a>
            </div>
            <div className="stat-row">
              <div className="stat">
                <b>{subject.sections.length}</b>
                <span>บทเนื้อหา</span>
              </div>
              <div className="stat">
                <b>{subject.sets.length}</b>
                <span>ชุดแบบฝึกหัด</span>
              </div>
              <div className="stat">
                <b>{GRAND_TOTAL}</b>
                <span>คะแนนรวมทั้งหมด</span>
              </div>
              <div className="stat">
                <b>🎲</b>
                <span>สุ่มโจทย์ไม่ซ้ำทุกรอบ</span>
              </div>
            </div>
          </header>

          <section id="study">
            <div className="section-head">
              <div className="icon">📖</div>
              <div>
                <h2>เนื้อหาสรุปก่อนสอบ</h2>
                <p>อ่านเนื้อหาแต่ละบทให้จบ แล้วลองทำแบบฝึกหัดท้ายบทเฉพาะเรื่องของบทนั้น</p>
              </div>
            </div>
            {subject.sections.map((s) => (
              <article className="study-card" key={s.id}>
                <header>
                  <div className="icon">{s.icon}</div>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.intro}</p>
                  </div>
                  {s.practice && s.practice.length > 0 && (
                    <span className="practice-chip">
                      📝 มีแบบฝึกหัดท้ายบท {s.practice.length} ชุด
                    </span>
                  )}
                </header>
                <div className="study-body">
                  <RichText blocks={s.blocks} />
                </div>
                {s.practice && s.practice.length > 0 && (
                  <div className="study-practice">
                    <div className="practice-label">
                      📝 แบบฝึกหัดท้ายบท — ทำได้เลย มีคะแนน + ตรวจ + เข้าอันดับ (นับรอบแรก)
                    </div>
                    {s.practice.map((setId) => {
                      const set = setById[setId];
                      return set ? <Quiz key={set.id} set={set} ns={subject.id} /> : null;
                    })}
                  </div>
                )}
              </article>
            ))}
          </section>

          {subject.id === "python" && (
            <section id="playground">
              <div className="section-head">
                <div className="icon">🐍</div>
                <div>
                  <h2>ลองรัน Python กันจริง ๆ</h2>
                  <p>
                    รันโค้ด Python สดบนเว็บ (Pyodide รันบนเครื่องคุณ ไม่ส่งไปเซิร์ฟเวอร์) — รันทีละ cell ตัวแปรจำไว้ข้าม
                    cell ได้เหมือน Jupyter Notebook
                  </p>
                </div>
              </div>
              <PyNotebook />
            </section>
          )}

          <section id="practice">
            <div className="section-head">
              <div className="icon">✍️</div>
              <div>
                <h2>แบบฝึกหัดจำลองสอบ</h2>
                <p>
                  แต่ละชุดสุ่มโจทย์ให้ใหม่ทุกครั้ง · กด “ตรวจคำตอบ/ดูเฉลย” แล้วประเมินตัวเอง · คะแนนรอบแรก
                  เท่านั้นที่เข้าการจัดอันดับ
                </p>
              </div>
            </div>
            {subject.sets.map((set) => (
              <Quiz key={set.id} set={set} ns={subject.id} />
            ))}
          </section>

          <section id="rank">
            <div className="section-head">
              <div className="icon">🏆</div>
              <div>
                <h2>จัดอันดับ</h2>
                <p>นับเฉพาะคะแนนรอบแรกของแต่ละคน (รอบอื่นไม่นับ) — บันทึกอยู่บนเบราว์เซอร์เครื่องนี้</p>
              </div>
            </div>
            <Leaderboard sets={subject.sets} ns={subject.id} />
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          ทำไว้ติวสอบกลางภาค {subject.name} · ใช้ประโยชน์ได้ฟรี (MIT) · <a href="#top">กลับขึ้นบน ↑</a>
        </div>
      </footer>
    </>
  );
}
