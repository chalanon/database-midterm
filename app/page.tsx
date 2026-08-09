import Link from "next/link";
import { subjects } from "@/lib/data/subjects";

export default function Home() {
  const totalSections = subjects.reduce((s, x) => s + x.sections.length, 0);
  const totalSets = subjects.reduce((s, x) => s + x.sets.length, 0);
  const totalPoints = subjects.reduce((s, x) => s + x.sets.reduce((a, b) => a + b.total, 0), 0);

  return (
    <>
      <nav className="topnav">
        <div className="inner">
          <Link href="/" className="brand">
            <span className="logo">📚</span>
            ศูนย์ติวออนไลน์
          </Link>
          <div className="nav-links">
            <a href="#subjects">📖 วิชาที่เปิดสอน</a>
            <a href="#howto">ℹ️ วิธีใช้งาน</a>
          </div>
        </div>
      </nav>

      <main id="top">
        <div className="container">
          <header className="hero">
            <span className="badge">📚 รวมบทสรุป + แบบฝึกหัดสุ่มข้อ หลายวิชา ในที่เดียว</span>
            <h1>เลือกวิชาที่อยากติว แล้วเริ่มได้เลย</h1>
            <p className="sub">
              แต่ละวิชาเป็นหน้า onepage มีเนื้อหาอ่านเป็นบท แบบฝึกหัดท้ายบท และชุดจำลองสอบที่สุ่มโจทย์
              ให้ใหม่ทุกครั้ง พร้อมตรวจคำตอบ ดูเฉลย และจัดอันดับคะแนน (นับรอบแรก)
            </p>
            <div className="stat-row">
              <div className="stat">
                <b>{subjects.length}</b>
                <span>วิชาที่เปิด</span>
              </div>
              <div className="stat">
                <b>{totalSections}</b>
                <span>บทเนื้อหา</span>
              </div>
              <div className="stat">
                <b>{totalSets}</b>
                <span>ชุดแบบฝึกหัด</span>
              </div>
              <div className="stat">
                <b>{totalPoints}</b>
                <span>คะแนนรวม</span>
              </div>
            </div>
          </header>

          <section id="subjects">
            <div className="subject-grid">
              {subjects.map((s) => {
                const points = s.sets.reduce((a, b) => a + b.total, 0);
                return (
                  <Link key={s.id} href={`/${s.id}`} className="subject-card">
                    <div className="subject-icon">{s.icon}</div>
                    <h3>{s.name}</h3>
                    <span className="subject-tagline">{s.tagline}</span>
                    <p>{s.description}</p>
                    <div className="subject-meta">
                      <span>📖 {s.sections.length} บท</span>
                      <span>✍️ {s.sets.length} ชุด</span>
                      <span>🎯 {points} คะแนน</span>
                    </div>
                    <span className="subject-enter">เข้าเรียน →</span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section id="howto" className="card pad howto-card">
            <div className="section-head center">
              <div className="icon">ℹ️</div>
              <div>
                <h2>วิธีใช้งาน</h2>
                <p>ทีละขั้นตอน เริ่มติวได้ในไม่กี่นาที</p>
              </div>
            </div>
            <ol className="howto-list">
              <li>
                <b>เลือกวิชา</b> จากด้านบน เพื่อเข้าหน้าติวของวิชานั้น
              </li>
              <li>
                <b>อ่านเนื้อหาเป็นบท</b> (📖) แล้วลองทำแบบฝึกหัดท้ายบทของบทนั้นโดยตรง
              </li>
              <li>
                <b>ทำแบบฝึกหัดจำลองสอบ</b> (✍️) — โจทย์สุ่มใหม่ทุกครั้ง กด “ตรวจคำตอบ” เพื่อดูคะแนนและเฉลย
              </li>
              <li>
                <b>บันทึกชื่อเข้าอันดับ</b> (🏆) — คะแนนรอบแรกเท่านั้นที่นับ เขียนทับไม่ได้
              </li>
              <li>
                กลับมาทำซ้ำได้เรื่อย ๆ จนกว่าจะได้คะแนนเต็มทุกชุด
              </li>
            </ol>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          ศูนย์ติวออนไลน์ · ทำไว้ติวสอบกลางภาค · ใช้ประโยชน์ได้ฟรี (MIT) ·{" "}
          <a href="#top">กลับขึ้นบน ↑</a>
        </div>
      </footer>
    </>
  );
}
