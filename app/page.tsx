import { quizSets } from "@/lib/data/sets";
import { studySections } from "@/lib/data/study";
import Quiz from "@/app/components/Quiz";
import Leaderboard from "@/app/components/Leaderboard";
import RichText from "@/app/components/RichText";
import type { QuizSet } from "@/lib/types";

const GRAND_TOTAL = quizSets.reduce((s, x) => s + x.total, 0);

const setById: Record<string, QuizSet> = Object.fromEntries(quizSets.map((s) => [s.id, s]));

export default function Home() {
  return (
    <>
      <nav className="topnav">
        <div className="inner">
          <a href="#top" className="brand">
            <span className="logo">DB</span>
            ติว Database กลางภาค
          </a>
          <div className="nav-links">
            <a href="#study">📖 เนื้อหา</a>
            <a href="#practice">✍️ แบบฝึกหัด</a>
            <a href="#rank">🏆 อันดับ</a>
          </div>
        </div>
      </nav>

      <main id="top">
        <div className="container">
          {/* Hero */}
          <header className="hero">
            <span className="badge">📚 สรุป + แบบฝึกหัดสุ่มข้อ · ตรวจเฉลยได้ · จัดอันดับ</span>
            <h1>เตรียมสอบกลางภาค Database แบบ onepage</h1>
            <p className="sub">
              เนื้อหาครบ: Normalization 1NF–4NF, ER Diagram / Crow's Foot, Data Dictionary, SQL
              + แบบฝึกหัด 6 ชุด ที่สุ่มโจทย์ให้ไม่ซ้ำกันในแต่ละรอบ พร้อมตรวจคำตอบและดูเฉลย
            </p>
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
                <b>{studySections.length}</b>
                <span>บทเนื้อหา</span>
              </div>
              <div className="stat">
                <b>6</b>
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

          {/* Study content */}
          <section id="study">
            <div className="section-head">
              <div className="icon">📖</div>
              <div>
                <h2>เนื้อหาสรุปก่อนสอบ</h2>
                <p>อ่านเนื้อหาแต่ละบทให้จบ แล้วลองทำแบบฝึกหัดท้ายบทเฉพาะเรื่องของบทนั้น</p>
              </div>
            </div>
            {studySections.map((s) => (
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
                    {s.practice.map((id) => {
                      const set = setById[id];
                      return set ? <Quiz key={set.id} set={set} /> : null;
                    })}
                  </div>
                )}
              </article>
            ))}
          </section>

          {/* Practice */}
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
            {quizSets.map((set) => (
              <Quiz key={set.id} set={set} />
            ))}
          </section>

          {/* Leaderboard */}
          <section id="rank">
            <div className="section-head">
              <div className="icon">🏆</div>
              <div>
                <h2>จัดอันดับ</h2>
                <p>นับเฉพาะคะแนนรอบแรกของแต่ละคน (รอบอื่นไม่นับ) — บันทึกอยู่บนเบราว์เซอร์เครื่องนี้</p>
              </div>
            </div>
            <Leaderboard />
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          ทำไว้ติวสอบกลางภาค Database · ใช้ประโยชน์ได้ฟรี (MIT) · <a href="#top">กลับขึ้นบน ↑</a>
        </div>
      </footer>
    </>
  );
}
