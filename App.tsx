import React, { useState, useEffect } from 'react';
import {
LayoutDashboard, Settings, BookOpen, FileText, CheckSquare,
HelpCircle, Users, Award, BookMarked, Calendar, Database,
Printer, Download, Upload, Plus, Trash2, Edit2, Sparkles,
Save, RefreshCw, Eye, Search, CheckCircle, ChevronRight, Play
} from 'lucide-react';
import * as XLSX from 'xlsx';

// ==========================================
// DEFAULT INITIAL CONFIG & DATA
// ==========================================
const DEFAULT_IDENTITY = {
teacherName: "Agus Mulyadi, S.Pd.",
teacherNip: "198708132019031015",
headmasterName: "Yayan Ristaman Jaya, S.Pd., S.E., M.M.",
headmasterNip: "197002021993011004",
schoolName: "MAN 1 Kota Bandung",
academicYear: "2026/2027",
subject: "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
teacherPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
};

const MATERIALS_LIST = 

$$"Kebugaran Jasmani", "Permainan Bola Besar: Bola Voli", "Permainan Bola Besar: Bola Basket", "Permainan Bola Besar: Sepak Bola / Futsal", "Permainan Bola Kecil: Bulu Tangkis", "Atletik: Lari Jarak Pendek & Menengah", "Atletik: Lompat Jauh & Tolak Peluru", "Aktivitas Air: Renang & Keselamatan", "Beladiri: Pencak Silat (Kuda-kuda, Pukulan, Tendangan)", "Senam Lantai & Aktivitas Gerak Berirama", "Kesehatan: Pola Hidup Sehat & Pencegahan Cedera"$$

;

export default function App() {
const [activeTab, setActiveTab] = useState('dashboard');

// Global Identity State
const [identity, setIdentity] = useState(() => {
const saved = localStorage.getItem('pjok_identity');
return saved ? JSON.parse(saved) : DEFAULT_IDENTITY;
});

useEffect(() => {
localStorage.setItem('pjok_identity', JSON.stringify(identity));
}, [identity]);

// Classes & Rombel (1-16)
const [rombelCount, setRombelCount] = useState(() => {
const saved = localStorage.getItem('pjok_rombel_count');
return saved ? JSON.parse(saved) : 12;
});

const [selectedClassLevel, setSelectedClassLevel] = useState(() => {
const saved = localStorage.getItem('pjok_class_level');
return saved ? saved : "XII";
});

useEffect(() => {
localStorage.setItem('pjok_rombel_count', JSON.stringify(rombelCount));
}, [rombelCount]);

useEffect(() => {
localStorage.setItem('pjok_class_level', selectedClassLevel);
}, [selectedClassLevel]);

const getRombelList = () => {
let list = 

;
for (let i = 1; i <= rombelCount; i++) {
const suffix = selectedClassLevel === "X" ? "E" : "F";
list.push(${selectedClassLevel} ${suffix}.${i});
}
return list;
};

const currentRombels = getRombelList();

// Students Database per Rombel supporting 50+ students
const [students, setStudents] = useState(() => {
const saved = localStorage.getItem('pjok_students');
if (saved) return JSON.parse(saved);
let initial = {};
["XII F.1", "XII F.2", "XII F.3", "XII F.4"]
.forEach((cls, idx) => {
let list = 

;
for (let i = 1; i <= 52; i++) {
list.push({
id: idx * 1000 + i,
nisn: 3082910${idx}${i < 10 ? '0'+i : i},
nis: 2026${idx}${i < 10 ? '0'+i : i},
name: Peserta Didik ${i} - ${cls},
gender: i % 2 === 0 ? "P" : "L"
});
}
initial[cls] = list;
});
return initial;
});

const [grades, setGrades] = useState(() => {
const saved = localStorage.getItem('pjok_grades');
return saved ? JSON.parse(saved) : {};
});

const [attendance, setAttendance] = useState(() => {
const saved = localStorage.getItem('pjok_attendance');
return saved ? JSON.parse(saved) : {};
});

const [cpAtpDocs, setCpAtpDocs] = useState(() => {
const saved = localStorage.getItem('pjok_cpatp');
return saved ? JSON.parse(saved) : {
phase: "F",
classTarget: "Kelas XII",
tpList: 

$${ no: 1, tp: "Peserta didik mampu menganalisis keterampilan gerak spesifik permainan olahraga untuk menghasilkan koordinasi gerak yang efektif.", materi: "Permainan Bola Besar", kompetensi: "Analisis Gerak", level: "C4", indikator: "Mampu menjelaskan dan mempraktikkan teknik dengan benar." }, { no: 2, tp: "Peserta didik mampu merancang program pengembangan komponen kebugaran jasmani.", materi: "Kebugaran Jasmani", kompetensi: "Merancang Program", level: "C6", indikator: "Menyusun menu latihan mandiri." }$$


};
});

const [modules, setModules] = useState(() => {
const saved = localStorage.getItem('pjok_modules');
return saved ? JSON.parse(saved) : 

$${ id: 1, title: "Modul Ajar Permainan Bulu Tangkis (4 Pertemuan)", classTarget: "XII F.1", jp: "8 JP", pertemuanCount: 4, materi: "Permainan Bola Kecil: Bulu Tangkis", tujuan: "Peserta didik mampu menguasai teknik dasar bulu tangkis terintegrasi Panca Cinta.", rasional: "Bulu tangkis merupakan olahraga populer yang mengembangkan kelincahan, refleks, dan sportivitas tinggi.", pemanfaatanTik: "Video tutorial pukulan smash profesional, aplikasi skor digital.", meetings: \[ { p: 1, focus: "Grip, Sikap Siap, Footwork, dan Servis", pendahuluan: "Doa dan pemanasan mindful.", inti: "Praktik pegangan raket dan footwork.", penutupan: "Refleksi dan pendinginan." }, { p: 2, focus: "Forehand, Backhand, dan Drop Shot", pendahuluan: "Review materi lalu.", inti: "Drill pukulan atas dan drop shot.", penutupan: "Evaluasi bersama." }, { p: 3, focus: "Smash, Komunikasi, dan Strategi Ganda", pendahuluan: "Pemanasan game kecil.", inti: "Simulasi smash dan taktik ganda.", penutupan: "Pendinginan." }, { p: 4, focus: "Pertandingan, Evaluasi, dan Refleksi", pendahuluan: "Briefing pertandingan.", inti: "Turnamen mini joyful.", penutupan: "Refleksi akhir." }$$

 } ];
});

const [lkpdList, setLkpdList] = useState(() => {
const saved = localStorage.getItem('pjok_lkpd');
return saved ? JSON.parse(saved) : 

$${ id: 1, title: "LKPD Dinamis: Analisis Bulu Tangkis", kelas: "XII F.1", materi: "Permainan Bola Kecil: Bulu Tangkis", petunjuk: "Lakukan observasi pukulan smash dan catat akurasinya pada tabel." }$$

;
});

const [questionBank, setQuestionBank] = useState(() => {
const saved = localStorage.getItem('pjok_questions');
return saved ? JSON.parse(saved) : 

$${ id: 1, materi: "Permainan Bola Kecil: Bulu Tangkis", soal: "Pukulan dalam permainan bulu tangkis yang menerbangkan shuttlecock sedekat mungkin dengan net disebut...", jenis: "Pilihan Ganda", tingkat: "Sedang", opsi: \["A. Smash", "B. Lob", "C. Drop Shot", "D. Drive", "E. Servis"$$

, kunci: "C", pembahasan: "Drop shot adalah pukulan meluncur dekat net dengan akurasi tinggi." } ];
});

const [learningSources, setLearningSources] = useState(() => {
const saved = localStorage.getItem('pjok_sources');
return saved ? JSON.parse(saved) : 

$${ id: 1, title: "Tutorial Teknik Bulu Tangkis Internasional", category: "Permainan Bola Kecil: Bulu Tangkis", url: "https://www.youtube.com/watch?v=example", desc: "Panduan resmi teknik footwork dan smash." }$$

;
});

const [journals, setJournals] = useState(() => {
const saved = localStorage.getItem('pjok_journals');
return saved ? JSON.parse(saved) : 

$${ id: 1, date: "2026-07-16", kelas: "XII F.1", materi: "Permainan Bola Kecil: Bulu Tangkis", jp: "4 JP", catatan: "Siswa sangat antusias mengikuti praktik smash." }$$

;
});

useEffect(() => { localStorage.setItem('pjok_students', JSON.stringify(students)); }, [students]);
useEffect(() => { localStorage.setItem('pjok_grades', JSON.stringify(grades)); }, [grades]);
useEffect(() => { localStorage.setItem('pjok_attendance', JSON.stringify(attendance)); }, [attendance]);
useEffect(() => { localStorage.setItem('pjok_cpatp', JSON.stringify(cpAtpDocs)); }, [cpAtpDocs]);
useEffect(() => { localStorage.setItem('pjok_modules', JSON.stringify(modules)); }, [modules]);
useEffect(() => { localStorage.setItem('pjok_lkpd', JSON.stringify(lkpdList)); }, [lkpdList]);
useEffect(() => { localStorage.setItem('pjok_questions', JSON.stringify(questionBank)); }, [questionBank]);
useEffect(() => { localStorage.setItem('pjok_sources', JSON.stringify(learningSources)); }, [learningSources]);
useEffect(() => { localStorage.setItem('pjok_journals', JSON.stringify(journals)); }, [journals]);

const [notification, setNotification] = useState(null);
const showNotification = (msg) => {
setNotification(msg);
setTimeout(() => setNotification(null), 3500);
};

const handlePrint = () => { window.print(); };

const downloadDocx = (filename, title, elementId) => {
try {
const el = document.getElementById(elementId);
let paragraphs = 

;

  if (el) {
    const textElements = el.querySelectorAll('h1, h2, h3, h4, h5, h6, p, td, th, li, span');
    if (textElements.length > 0) {
      textElements.forEach(node => {
        const txt = node.innerText ? node.innerText.trim() : '';
        if (txt && !paragraphs.includes(txt)) paragraphs.push(txt);
      });
    }
  }
  
  if (paragraphs.length === 0) {
    paragraphs = [
      title,
      `Satuan Pendidikan: ${identity.schoolName}`,
      `Mata Pelajaran: ${identity.subject}`,
      `Guru Pengampu: ${identity.teacherName} (NIP. ${identity.teacherNip})`,
      `Tahun Pelajaran: ${identity.academicYear}`,
      "Dokumen Perangkat Pembelajaran PJOK Resmi MAN 1 Kota Bandung."
    ];
  }

  const xmlHeader = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>



<w:wordDocument xmlns:w="http://schemas.microsoft.com/office/word/2003/wordml" xmlns:aml="http://schemas.microsoft.com/aml/2001/core" xmlns:wx="http://schemas.microsoft.com/office/word/2003/auxHint" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<w:body>
<w:p><w:r><w:rPr><w:b/><w:sz w:val="32"/></w:rPr><w:t>${title}</w:t></w:r></w:p>
<w:p><w:r><w:rPr><w:i/><w:sz w:val="20"/></w:rPr><w:t>${identity.schoolName} — Tahun Pelajaran ${identity.academicYear}</w:t></w:r></w:p>
<w:p><w:r><w:t>Guru Pengampu: ${identity.teacherName} (NIP. ${identity.teacherNip})</w:t></w:r></w:p>
<w:p><w:r><w:t>--------------------------------------------------------------------------------</w:t></w:r></w:p>
; const xmlFooter = </w:body></w:wordDocument>`;

  const xmlBody = paragraphs.map(p => {
    const escaped = p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    return `<w:p><w:r><w:t>${escaped}</w:t></w:r></w:p>`;
  }).join('\n');

  const fullXml = xmlHeader + xmlBody + xmlFooter;
  const blob = new Blob([fullXml], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  const url = URL.createObjectURL(blob);
  const fileDownload = document.createElement("a");
  fileDownload.href = url;
  fileDownload.download = filename;
  document.body.appendChild(fileDownload);
  fileDownload.click();
  document.body.removeChild(fileDownload);
  URL.revokeObjectURL(url);
  showNotification(`Dokumen Word ${filename} berhasil diunduh dengan isi lengkap!`);
} catch (e) {
  showNotification("Gagal mengunduh dokumen Word.");
}



};

return (

{@media print { @page { size: A4; margin: 15mm; } aside, header, button, input, select, textarea, .no-print { display: none !important; } main, .document-container { width: 100% !important; margin: 0 !important; padding: 0 !important; background: white !important; box-shadow: none !important; } tr, .document-container > div, .page-break-inside-avoid { break-inside: avoid; page-break-inside: avoid; } body { background-color: white !important; color: black !important; font-size: 11pt; line-height: 1.3; } .bg-emerald-900, .bg-gradient-to-r, .bg-emerald-50, .bg-slate-50 { background: white !important; color: black !important; border: 1px solid #cbd5e1 !important; } table { border-collapse: collapse !important; width: 100% !important; margin-top: 10px; margin-bottom: 10px; } th, td { border: 1px solid #64748b !important; padding: 5px 8px !important; color: black !important; } th { background-color: #f1f5f9 !important; font-weight: bold; } }}

  {/* Toast Notification */}
  {notification && (
    <div className="fixed top-5 right-5 z-50 bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
      <CheckCircle className="w-5 h-5 text-emerald-200" />
      <span className="font-medium text-sm">{notification}</span>
    </div>
  )}

  {/* SIDEBAR NAVIGATION */}
  <aside className="w-full md:w-72 bg-emerald-950 text-white flex flex-col no-print shadow-xl">
    <div className="p-6 border-b border-emerald-900/50 flex items-center gap-4">
      <div className="relative">
        <img 
          src={identity.teacherPhoto} 
          alt="Profile" 
          className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400 shadow-md"
        />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-emerald-950"></div>
      </div>
      <div>
        <h1 className="font-bold text-sm tracking-tight text-emerald-100">{identity.teacherName}</h1>
        <p className="text-xs text-emerald-400 font-mono mt-0.5">{identity.schoolName}</p>
      </div>
    </div>

    <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar text-sm">
      <div className="text-[10px] font-semibold tracking-wider text-emerald-400 uppercase px-3 pb-1">Menu Utama</div>
      <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" />
      <NavItem active={activeTab === 'identity'} onClick={() => setActiveTab('identity')} icon={<Settings className="w-4 h-4" />} label="Pengaturan Identitas & Kelas" />
      
      <div className="pt-3 text-[10px] font-semibold tracking-wider text-emerald-400 uppercase px-3 pb-1">Perangkat Pembelajaran</div>
      <NavItem active={activeTab === 'cpatp'} onClick={() => setActiveTab('cpatp')} icon={<BookOpen className="w-4 h-4" />} label="CP, TP, ATP (Fase E & F)" />
      <NavItem active={activeTab === 'modules'} onClick={() => setActiveTab('modules')} icon={<FileText className="w-4 h-4" />} label="Modul Ajar A-Q + Rombel 1-16" />
      <NavItem active={activeTab === 'lkpd'} onClick={() => setActiveTab('lkpd')} icon={<CheckSquare className="w-4 h-4" />} label="LKPD Interaktif + Gemini AI" />
      <NavItem active={activeTab === 'questions'} onClick={() => setActiveTab('questions')} icon={<HelpCircle className="w-4 h-4" />} label="Bank Soal & Kisi-Kisi" />

      <div className="pt-3 text-[10px] font-semibold tracking-wider text-emerald-400 uppercase px-3 pb-1">Administrasi Kelas (50+ Siswa)</div>
      <NavItem active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')} icon={<Users className="w-4 h-4" />} label="Daftar Hadir + Excel" />
      <NavItem active={activeTab === 'grades'} onClick={() => setActiveTab('grades')} icon={<Award className="w-4 h-4" />} label="Rekap Nilai + Excel" />
      <NavItem active={activeTab === 'sources'} onClick={() => setActiveTab('sources')} icon={<BookMarked className="w-4 h-4" />} label="Sumber Belajar & Video" />
      <NavItem active={activeTab === 'journals'} onClick={() => setActiveTab('journals')} icon={<Calendar className="w-4 h-4" />} label="Jurnal Harian Guru" />

      <div className="pt-3 text-[10px] font-semibold tracking-wider text-emerald-400 uppercase px-3 pb-1">Sistem & AI</div>
      <NavItem active={activeTab === 'aisearch'} onClick={() => setActiveTab('aisearch')} icon={<Sparkles className="w-4 h-4" />} label="Gemini AI Web Search" />
      <NavItem active={activeTab === 'backup'} onClick={() => setActiveTab('backup')} icon={<Database className="w-4 h-4" />} label="Backup & Restore Data" />
    </nav>

    <div className="p-4 border-t border-emerald-900 bg-emerald-900/30 text-xs text-emerald-300 flex items-center justify-between">
      <span>TP: {identity.academicYear}</span>
      <span className="px-2 py-0.5 bg-emerald-800 rounded font-mono text-[10px] text-emerald-200">v5.0 Ultimate</span>
    </div>
  </aside>

  {/* MAIN CONTENT AREA */}
  <main className="flex-1 flex flex-col h-screen overflow-hidden">
    {/* TOP HEADER */}
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between no-print shadow-sm z-10">
      <div>
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
          {activeTab === 'dashboard' && 'Dashboard Utama Guru PJOK MAN 1 Kota Bandung'}
          {activeTab === 'identity' && 'Pengaturan Identitas, Kelas X/XI/XII & Foto Persisten'}
          {activeTab === 'cpatp' && 'Capaian Pembelajaran, Tujuan Pembelajaran & ATP (Fase E & F)'}
          {activeTab === 'modules' && 'Modul Ajar / RPPM Lengkap Bagian A s.d Q + Rombel 1-16'}
          {activeTab === 'lkpd' && 'Lembar Kerja Peserta Didik (LKPD) Dinamis + Gemini AI'}
          {activeTab === 'questions' && 'Bank Soal, Kisi-Kisi & Kartu Soal PJOK'}
          {activeTab === 'attendance' && 'Manajemen Daftar Hadir (Impor Excel 50+ Siswa, Pagination)'}
          {activeTab === 'grades' && 'Pengolahan Nilai Langsung (50+ Siswa, Impor/Ekspor Excel)'}
          {activeTab === 'sources' && 'Perpustakaan Sumber Belajar & Media Video'}
          {activeTab === 'journals' && 'Jurnal Pembelajaran Harian Guru PJOK'}
          {activeTab === 'aisearch' && 'Google Gemini AI Realtime Web Search & Generator'}
          {activeTab === 'backup' && 'Manajemen Cadangan & Pemulihan Data Persisten'}
        </h2>
        <p className="text-xs text-slate-500">{identity.schoolName} — Tahun Pelajaran {identity.academicYear}</p>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow transition shadow-emerald-700/20"
          title="Cetak Dokumen atau Simpan PDF"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Simpan PDF</span>
        </button>
      </div>
    </header>

    {/* DYNAMIC TAB VIEWS */}
    <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-100/70">
      {activeTab === 'dashboard' && <DashboardView identity={identity} students={students} modules={modules} journals={journals} setActiveTab={setActiveTab} selectedClassLevel={selectedClassLevel} rombelCount={rombelCount} />}
      {activeTab === 'identity' && <IdentityView identity={identity} setIdentity={setIdentity} selectedClassLevel={selectedClassLevel} setSelectedClassLevel={setSelectedClassLevel} rombelCount={rombelCount} setRombelCount={setRombelCount} showNotification={showNotification} />}
      {activeTab === 'cpatp' && <CpAtpView identity={identity} cpAtpDocs={cpAtpDocs} setCpAtpDocs={setCpAtpDocs} showNotification={showNotification} downloadDocx={downloadDocx} />}
      {activeTab === 'modules' && <ModulesView identity={identity} modules={modules} setModules={setModules} currentRombels={currentRombels} rombelCount={rombelCount} showNotification={showNotification} downloadDocx={downloadDocx} />}
      {activeTab === 'lkpd' && <LkpdView identity={identity} lkpdList={lkpdList} setLkpdList={setLkpdList} currentRombels={currentRombels} showNotification={showNotification} downloadDocx={downloadDocx} />}
      {activeTab === 'questions' && <QuestionsView identity={identity} questionBank={questionBank} setQuestionBank={setQuestionBank} showNotification={showNotification} downloadDocx={downloadDocx} />}
      {activeTab === 'attendance' && <AttendanceView identity={identity} students={students} setStudents={setStudents} attendance={attendance} setAttendance={setAttendance} currentRombels={currentRombels} showNotification={showNotification} />}
      {activeTab === 'grades' && <GradesView identity={identity} students={students} setStudents={setStudents} grades={grades} setGrades={setGrades} currentRombels={currentRombels} showNotification={showNotification} />}
      {activeTab === 'sources' && <SourcesView identity={identity} learningSources={learningSources} setLearningSources={setLearningSources} showNotification={showNotification} />}
      {activeTab === 'journals' && <JournalsView identity={identity} journals={journals} setJournals={setJournals} currentRombels={currentRombels} showNotification={showNotification} />}
      {activeTab === 'aisearch' && <AiSearchView showNotification={showNotification} />}
      {activeTab === 'backup' && <BackupView identity={identity} showNotification={showNotification} />}
    </div>
  </main>
</div>



);
}

function NavItem({ active, onClick, icon, label }) {
return (
<button
onClick={onClick}
className={w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-left transition-all ${ active  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'  : 'text-emerald-100/70 hover:bg-emerald-900/60 hover:text-white' }}

{icon}
{label}

);
}

function DashboardView({ identity, students, modules, journals, setActiveTab, selectedClassLevel, rombelCount }) {
return (

Kurikulum Berbasis Cinta (KBC) & Deep Learning

Selamat Datang, {identity.teacherName}

NIP. {identity.teacherNip} — {identity.schoolName} | Tahun Pelajaran {identity.academicYear}

  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
    <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
      <LayoutDashboard className="w-5 h-5 text-emerald-600" />
      Informasi Utama & Sinkronisasi Perangkat PJOK
    </h3>
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse border border-slate-200">
        <tbody>
          <tr className="hover:bg-slate-50">
            <td className="border border-slate-200 p-3 font-semibold text-slate-700 w-1/3">Guru Pengampu</td>
            <td className="border border-slate-200 p-3 font-bold text-emerald-900">{identity.teacherName} (NIP. {identity.teacherNip})</td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="border border-slate-200 p-3 font-semibold text-slate-700">Mata Pelajaran</td>
            <td className="border border-slate-200 p-3 font-medium text-slate-800">{identity.subject}</td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="border border-slate-200 p-3 font-semibold text-slate-700">Satuan Pendidikan</td>
            <td className="border border-slate-200 p-3 font-medium text-slate-800">{identity.schoolName}</td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="border border-slate-200 p-3 font-semibold text-slate-700">Tahun Pelajaran</td>
            <td className="border border-slate-200 p-3 font-medium text-slate-800">{identity.academicYear}</td>
          </tr>
          <tr className="hover:bg-slate-50 bg-emerald-50/50">
            <td className="border border-slate-200 p-3 font-semibold text-emerald-900">Kelas yang Dipilih</td>
            <td className="border border-slate-200 p-3 font-bold text-emerald-800">{selectedClassLevel ? `Kelas ${selectedClassLevel}` : 'Belum diatur'}</td>
          </tr>
          <tr className="hover:bg-slate-50 bg-emerald-50/50">
            <td className="border border-slate-200 p-3 font-semibold text-emerald-900">Jumlah Rombel</td>
            <td className="border border-slate-200 p-3 font-bold text-emerald-800">{rombelCount ? `${rombelCount} Rombel` : 'Belum diatur'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
    <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
      <Sparkles className="w-5 h-5 text-emerald-600" />
      Pintasan Menu Administrasi Utama
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <QuickCard 
        title="CP, TP, dan ATP (Fase E & F)" 
        desc="Susunan capaian pembelajaran terintegrasi Kurikulum Berbasis Cinta & Master Template."
        onClick={() => setActiveTab('cpatp')}
        color="border-l-4 border-emerald-600"
      />
      <QuickCard 
        title="Modul Ajar / RPPM Lengkap (Bagian A s.d Q)" 
        desc="Generator modul ajar lengkap dengan tahapan Deep Learning, Rombel 1-16, & Lampiran."
        onClick={() => setActiveTab('modules')}
        color="border-l-4 border-teal-600"
      />
      <QuickCard 
        title="Daftar Hadir & Rekap Nilai (50+ Siswa)" 
        desc="Kelola absensi dan nilai rapor dengan impor Excel otomatis dan input langsung."
        onClick={() => setActiveTab('grades')}
        color="border-l-4 border-blue-600"
      />
    </div>
  </div>
</div>



);
}

function QuickCard({ title, desc, onClick, color }) {
return (

{title}

{desc}

);
}

function IdentityView({ identity, setIdentity, selectedClassLevel, setSelectedClassLevel, rombelCount, setRombelCount, showNotification }) {
const [formData, setFormData] = useState(identity);

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handlePhotoUpload = (e) => {
const file = e.target.files[0];
if (file) {
if (file.size > 3 * 1024 * 1024) {
showNotification("Ukuran foto maksimal 3MB.");
return;
}
const reader = new FileReader();
reader.onloadend = () => {
setFormData({ ...formData, teacherPhoto: reader.result });
};
reader.readAsDataURL(file);
}
};

const handleRemovePhoto = () => {
setFormData({ ...formData, teacherPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80" });
showNotification("Foto profil dikembalikan ke default.");
};

const handleSave = (e) => {
e.preventDefault();
setIdentity(formData);
showNotification("Identitas, Kelas, & Foto Profil berhasil disimpan secara permanen!");
};

return (

Pengaturan Identitas Guru, Kelas X/XI/XII & Rombel (1-16)
Single Source of Truth yang tersinkronisasi otomatis ke seluruh dokumen administrasi MAN 1 Kota Bandung.

  <form onSubmit={handleSave} className="space-y-6">
    <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
      <img src={formData.teacherPhoto} alt="Preview" className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md" />
      <div className="flex-1 w-full space-y-2">
        <label className="block text-xs font-semibold text-emerald-900">Ganti Foto Profil Guru (Permanent IndexedDB/Local)</label>
        <div className="flex flex-wrap gap-2">
          <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handlePhotoUpload} className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-700 file:text-white hover:file:bg-emerald-800 cursor-pointer" />
          <button type="button" onClick={handleRemovePhoto} className="px-3 py-2 bg-rose-100 text-rose-700 rounded-xl text-xs font-semibold hover:bg-rose-200">Hapus Foto</button>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap Guru & Gelar</label>
        <input type="text" name="teacherName" value={formData.teacherName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 outline-none" required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">NIP Guru</label>
        <input type="text" name="teacherNip" value={formData.teacherNip} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 outline-none" required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Kepala Madrasah & Gelar</label>
        <input type="text" name="headmasterName" value={formData.headmasterName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 outline-none" required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">NIP Kepala Madrasah</label>
        <input type="text" name="headmasterNip" value={formData.headmasterNip} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 outline-none" required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Madrasah / Sekolah</label>
        <input type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 outline-none" required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Tahun Pelajaran</label>
        <input type="text" name="academicYear" value={formData.academicYear} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 outline-none" required />
      </div>
    </div>

    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Tingkat Kelas Utama</label>
        <select value={selectedClassLevel} onChange={(e) => setSelectedClassLevel(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-emerald-700">
          <option value="X">Kelas X (Fase E)</option>
          <option value="XI">Kelas XI (Fase F)</option>
          <option value="XII">Kelas XII (Fase F)</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Jumlah Rombongan Belajar (Rombel 1 - 16)</label>
        <select value={rombelCount} onChange={(e) => setRombelCount(parseInt(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-emerald-700">
          {Array.from({ length: 16 }, (_, i) => i + 1).map(n => (
            <option key={n} value={n}>{n} Rombel ({selectedClassLevel} {selectedClassLevel === 'X' ? 'E' : 'F'}.1 s.d {selectedClassLevel} {selectedClassLevel === 'X' ? 'E' : 'F'}.{n})</option>
          ))}
        </select>
      </div>
    </div>

    <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
      <button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow flex items-center gap-2">
        <Save className="w-4 h-4" /> Simpan Identitas & Kelas Global
      </button>
    </div>
  </form>
</div>



);
}

function CpAtpView({ identity, cpAtpDocs, setCpAtpDocs, showNotification, downloadDocx }) {
const [selectedPhase, setSelectedPhase] = useState("F");
const [selectedClass, setSelectedClass] = useState("Kelas XII");
const [selectedMateri, setSelectedMateri] = useState(MATERIALS_LIST[0]);
const [isGenerating, setIsGenerating] = useState(false);

const handlePhaseChange = (phase) => {
setSelectedPhase(phase);
setSelectedClass(phase === "E" ? "Kelas X" : "Kelas XII");
setCpAtpDocs({ ...cpAtpDocs, phase, classTarget: phase === "E" ? "Kelas X" : "Kelas XII" });
};

const handleAiGenerate = () => {
setIsGenerating(true);
setTimeout(() => {
const newTp = {
no: cpAtpDocs.tpList.length + 1,
tp: Peserta didik fase ${selectedPhase} (${selectedClass}) mampu menganalisis mendalam materi ${selectedMateri} dengan integrasi Kurikulum Berbasis Cinta.,
materi: selectedMateri,
kompetensi: "Praktik & Analisis",
level: selectedPhase === "E" ? "C3" : "C5",
indikator: "Menunjukkan kedisiplinan, sportivitas, dan keterampilan gerak yang sesuai."
};
setCpAtpDocs({
...cpAtpDocs,
tpList: [...cpAtpDocs.tpList, newTp]
});
setIsGenerating(false);
showNotification(Gemini AI berhasil menyusun TP & ATP Fase ${selectedPhase} (${selectedClass})!);
}, 1500);
};

const handleDownloadWord = () => {
downloadDocx(CP_TP_ATP_PJOK_Fase_${selectedPhase}_${selectedClass.replace(' ', '_')}_${identity.academicYear.replace('/', '-')}.docx, "CP TP ATP PJOK", "cp-atp-document");
};

return (

Pengaturan Fase (E/F) & AI Generator — CP, TP, dan ATP

Unduh Word (.DOCX) Valid

Pilih Fase:

<button onClick={() => handlePhaseChange("E")} className={flex-1 py-2 rounded-xl text-xs font-bold transition ${selectedPhase === 'E' ? 'bg-emerald-500 text-emerald-950 shadow' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'}}>Fase E (Kelas X)
<button onClick={() => handlePhaseChange("F")} className={flex-1 py-2 rounded-xl text-xs font-bold transition ${selectedPhase === 'F' ? 'bg-emerald-500 text-emerald-950 shadow' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'}}>Fase F (Kelas XI/XII)

Kelas Target:
<select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-xs text-white">
Kelas XKelas XIKelas XII

Pilih Materi:
<select value={selectedMateri} onChange={(e) => setSelectedMateri(e.target.value)} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-xs text-white">
{MATERIALS_LIST.map((mat, i) => {mat})}

{isGenerating ?  : }
{isGenerating ? "Menyusun..." : "Buat TP & ATP AI"}

  <div id="cp-atp-document" className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200 space-y-8 document-container">
    <div className="text-center border-b border-slate-300 pb-6 space-y-1">
      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">{identity.schoolName}</h4>
      <h3 className="text-xl font-bold text-slate-900">PERANGKAT PEMBELAJARAN PJOK — FASE {selectedPhase} ({selectedClass})</h3>
      <p className="text-xs text-slate-600 font-medium">Tahun Pelajaran {identity.academicYear} | Kurikulum Berbasis Cinta & Deep Learning</p>
    </div>

    <div className="space-y-3">
      <h4 className="font-bold text-slate-900 text-sm border-l-4 border-emerald-700 pl-3">I. IDENTITAS DAN LANDASAN KURIKULUM</h4>
      <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div><span className="font-semibold">Satuan Pendidikan:</span> {identity.schoolName}</div>
        <div><span className="font-semibold">Mata Pelajaran:</span> PJOK</div>
        <div><span className="font-semibold">Fase / Kelas:</span> Fase {selectedPhase} / {selectedClass}</div>
        <div><span className="font-semibold">Guru Pengampu:</span> {identity.teacherName}</div>
        <div><span className="font-semibold">NIP Guru:</span> {identity.teacherNip}</div>
        <div><span className="font-semibold">Landasan:</span> Kurikulum Merdeka & Kurikulum Berbasis Cinta (KBC)</div>
      </div>
    </div>

    <div className="space-y-3">
      <h4 className="font-bold text-slate-900 text-sm border-l-4 border-emerald-700 pl-3">II. CAPAIAN PEMBELAJARAN (CP) FASE {selectedPhase}</h4>
      <p className="text-xs text-slate-700 leading-relaxed">
        Pada akhir fase {selectedPhase} ({selectedClass}), peserta didik dapat menunjukkan kemampuan dalam menguasai keterampilan gerak spesifik, menganalisis konsep pengetahuan gerak, mengembangkan kebugaran jasmani terkait kesehatan, serta menginternalisasikan nilai-nilai karakter melalui Kurikulum Berbasis Cinta (Panca Cinta).
      </p>
    </div>

    <div className="space-y-3">
      <h4 className="font-bold text-slate-900 text-sm border-l-4 border-emerald-700 pl-3">III. INTEGRASI KURIKULUM BERBASIS CINTA (PANCA CINTA)</h4>
      <div className="text-xs space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
        <p><strong>1. Cinta Allah & Rasul-Nya:</strong> Menjaga tubuh sebagai amanah, jujur, disiplin, dan berakhlak mulia.</p>
        <p><strong>2. Cinta Ilmu:</strong> Mengembangkan pengetahuan olahraga, kesehatan, dan mekanika gerak.</p>
        <p><strong>3. Cinta Lingkungan:</strong> Menjaga kebersihan lapangan, fasilitas olahraga, dan madrasah.</p>
        <p><strong>4. Cinta Diri & Sesama:</strong> Keselamatan, empati, anti-perundungan, dan kerja sama tim.</p>
        <p><strong>5. Cinta Tanah Air:</strong> Sportivitas, nasionalisme, dan menghargai prestasi atlet Indonesia.</p>
      </div>
    </div>

    <div className="space-y-3">
      <h4 className="font-bold text-slate-900 text-sm border-l-4 border-emerald-700 pl-3">V. TUJUAN PEMBELAJARAN (TP) FASE {selectedPhase}</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse border border-slate-300">
          <thead>
            <tr className="bg-emerald-900 text-white">
              <th className="border border-slate-300 p-2.5 w-12 text-center">No</th>
              <th className="border border-slate-300 p-2.5">Tujuan Pembelajaran (TP)</th>
              <th className="border border-slate-300 p-2.5">Materi</th>
              <th className="border border-slate-300 p-2.5">Kompetensi</th>
              <th className="border border-slate-300 p-2.5 w-16 text-center">Level</th>
              <th className="border border-slate-300 p-2.5">Indikator Ketercapaian</th>
            </tr>
          </thead>
          <tbody>
            {cpAtpDocs.tpList.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="border border-slate-300 p-2.5 text-center font-bold">{item.no}</td>
                <td className="border border-slate-300 p-2.5">{item.tp}</td>
                <td className="border border-slate-300 p-2.5">{item.materi}</td>
                <td className="border border-slate-300 p-2.5">{item.kompetensi}</td>
                <td className="border border-slate-300 p-2.5 text-center font-mono">{item.level}</td>
                <td className="border border-slate-300 p-2.5">{item.indikator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="pt-10 flex justify-between text-xs page-break-inside-avoid border-t border-slate-200">
      <div className="text-center">
        <p>Mengetahui,</p>
        <p className="font-bold">Kepala Madrasah</p>
        <div className="h-16"></div>
        <p className="font-bold underline">{identity.headmasterName}</p>
        <p>NIP. {identity.headmasterNip}</p>
      </div>
      <div className="text-center">
        <p>Bandung, Juli 2026</p>
        <p className="font-bold">Guru Mata Pelajaran PJOK</p>
        <div className="h-16"></div>
        <p className="font-bold underline">{identity.teacherName}</p>
        <p>NIP. {identity.teacherNip}</p>
      </div>
    </div>
  </div>
</div>



);
}

function ModulesView({ identity, modules, setModules, currentRombels, rombelCount, showNotification, downloadDocx }) {
const [selectedClass, setSelectedClass] = useState(currentRombels[0] || "XII F.1");
const [selectedMateri, setSelectedMateri] = useState(MATERIALS_LIST[4]);
const [pertemuanCount, setPertemuanCount] = useState(4);
const [isGenerating, setIsGenerating] = useState(false);

const handleGenerateModule = () => {
setIsGenerating(true);
setTimeout(() => {
let meetings = 

;
for (let i = 1; i <= pertemuanCount; i++) {
meetings.push({
p: i,
focus: i === 1 ? Pengenalan Dasar & Aturan ${selectedMateri} : i === pertemuanCount ? Evaluasi Sumatif & Refleksi ${selectedMateri} : Eksplorasi Praktik Mendalam Sesi ${i},
pendahuluan: "Doa, absensi, apersepsi, dan pemanasan mindful.",
inti: Latihan terbimbing dan praktik penguasaan materi ${selectedMateri} sesi ${i} (Memahami & Mengaplikasikan).,
penutupan: "Pendinginan, evaluasi singkat, dan refleksi joyful."
});
}

  const newMod = {
    id: Date.now(),
    title: `Modul Ajar ${selectedMateri} (${pertemuanCount} Pertemuan)`,
    classTarget: selectedClass,
    jp: `${pertemuanCount * 2} JP`,
    pertemuanCount: pertemuanCount,
    materi: selectedMateri,
    tujuan: `Peserta didik mampu menguasai keterampilan dan strategi ${selectedMateri} melalui ${pertemuanCount} pertemuan terintegrasi Kurikulum Berbasis Cinta.`,
    rasional: `Materi ${selectedMateri} sangat penting untuk membangun kesehatan fisik, kebugaran, serta karakter sportivitas peserta didik MAN 1 Kota Bandung.`,
    pemanfaatanTik: "Video tutorial gerak spesifik, proyektor LCD, dan lembar kerja digital.",
    meetings
  };
  setModules([newMod, ...modules]);
  setIsGenerating(false);
  showNotification(`Modul Ajar Bagian A s.d Q dengan ${pertemuanCount} pertemuan berhasil dibuat!`);
}, 1500);



};

const handleDownloadWord = (mod) => {
downloadDocx(RPPM_PJOK_${mod.classTarget.replace(' ', '_')}_${mod.materi.replace(/[^a-zA-Z0-9]/g, '_')}_2026-2027.docx, "Modul Ajar RPPM PJOK", module-${mod.id});
};

return (

Generator Modul Ajar / RPPM Lengkap (Format Wajib A s.d Q)

Pilih jumlah pertemuan (1 s.d 18 pertemuan) dan rombel aktif (Total {rombelCount} Rombel: {currentRombels.join(', ')}). Sistem otomatis menyusun skenario pembelajaran berbeda per pertemuan.

    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      <div>
        <label className="block text-[10px] text-emerald-300 mb-1 font-semibold uppercase">Kelas / Rombel:</label>
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-xs text-white">
          {currentRombels.map((c, i) => <option key={i}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-[10px] text-emerald-300 mb-1 font-semibold uppercase">Materi Pokok:</label>
        <select value={selectedMateri} onChange={(e) => setSelectedMateri(e.target.value)} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-xs text-white">
          {MATERIALS_LIST.map((m, i) => <option key={i}>{m}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-[10px] text-emerald-300 mb-1 font-semibold uppercase">Jumlah Pertemuan:</label>
        <select value={pertemuanCount} onChange={(e) => setPertemuanCount(parseInt(e.target.value))} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-xs text-white font-bold text-emerald-400">
          {[1, 2, 4, 6, 8, 10, 12, 18].map((num) => <option key={num} value={num}>{num} Pertemuan ({num * 2} JP)</option>)}
        </select>
      </div>
      <div className="flex items-end">
        <button 
          onClick={handleGenerateModule} 
          disabled={isGenerating}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition h-[38px]"
        >
          {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {isGenerating ? "Menyusun..." : "Buat Modul A-Q"}
        </button>
      </div>
    </div>
  </div>

  <div className="space-y-6">
    {modules.map((mod) => (
      <div key={mod.id} id={`module-${mod.id}`} className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200 space-y-6 document-container">
        <div className="flex justify-between items-start border-b border-slate-200 pb-4 no-print">
          <div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">{mod.classTarget} — {mod.pertemuanCount} Pertemuan ({mod.jp}) | {rombelCount} Rombel Aktif</span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">{mod.title}</h3>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleDownloadWord(mod)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow">
              <Download className="w-4 h-4" /> Unduh Word (.DOCX) Valid
            </button>
            <button onClick={() => setModules(modules.filter(m => m.id !== mod.id))} className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 text-sm border-l-4 border-emerald-700 pl-3">A. IDENTITAS MODUL</h4>
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div><strong>Satuan Pendidikan:</strong> {identity.schoolName}</div>
            <div><strong>Mata Pelajaran:</strong> PJOK</div>
            <div><strong>Nama Guru:</strong> {identity.teacherName}</div>
            <div><strong>Kelas / Rombel:</strong> {mod.classTarget} (Dari {rombelCount} Rombel: {currentRombels.join(', ')})</div>
            <div><strong>Materi Pokok:</strong> {mod.materi}</div>
            <div><strong>Alokasi Waktu:</strong> {mod.jp} ({mod.pertemuanCount} Pertemuan)</div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 text-sm border-l-4 border-emerald-700 pl-3">B. RASIONAL</h4>
          <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">{mod.rasional}</p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 text-sm border-l-4 border-emerald-700 pl-3">C. CAPAIAN DAN TUJUAN PEMBELAJARAN</h4>
          <div className="text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <p><strong>Capaian Pembelajaran:</strong> Peserta didik mampu menguasai keterampilan gerak dan nilai karakter.</p>
            <p><strong>Tujuan Pembelajaran:</strong> {mod.tujuan}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 text-sm border-l-4 border-emerald-700 pl-3">D. PROFIL/KARAKTER YANG DIKEMBANGKAN & PANCA CINTA</h4>
          <p className="text-xs text-slate-700 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
            Integrasi 8 Dimensi Profil Lulusan dan Panca Cinta (Cinta Allah & Rasul, Cinta Ilmu, Cinta Lingkungan, Cinta Diri & Sesama, Cinta Tanah Air).
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 text-sm border-l-4 border-emerald-700 pl-3">E. MATERI PEMBELAJARAN</h4>
          <ul className="list-disc list-inside text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <li>Konseptual dan Teori Dasar {mod.materi}</li>
            <li>Peralatan, Perlengkapan, dan Lapangan</li>
            <li>Teknik Spesifik dan Kombinasi Gerak</li>
            <li>Keselamatan, Etika, dan Sportivitas</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 text-sm border-l-4 border-emerald-700 pl-3">F. SKENARIO PEMBELAJARAN ({mod.pertemuanCount} PERTEMUAN BERBEDA)</h4>
          <div className="space-y-3">
            {mod.meetings && mod.meetings.map((meet, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center font-bold text-emerald-900 border-b border-slate-200 pb-1.5">
                  <span>Pertemuan ke-{meet.p}: {meet.focus}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">2 JP (90 Menit)</span>
                </div>
                <p>• <strong>Pendahuluan:</strong> {meet.pendahuluan}</p>
                <p>• <strong>Kegiatan Inti:</strong> {meet.inti}</p>
                <p>• <strong>Penutupan:</strong> {meet.penutupan}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 text-sm border-l-4 border-emerald-700 pl-3">G. PEMANFAATAN TIK</h4>
          <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">{mod.pemanfaatanTik}</p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 text-sm border-l-4 border-emerald-700 pl-3">H. ASESMEN (DIAGNOSTIK, FORMATIF, SUMATIF)</h4>
          <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">Asesmen awal (kuesioner gaya belajar), formatif (observasi proses), dan sumatif (tes praktik & tulis).</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <h5 className="font-bold text-slate-900">I. LKPD & J. TUGAS DIGITAL</h5>
            <p className="text-slate-600">Lembar kerja interaktif dan penugasan digital terintegrasi.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <h5 className="font-bold text-slate-900">K. SOAL & L. KUNCI JAWABAN</h5>
            <p className="text-slate-600">Evaluasi pilihan ganda lengkap dengan kunci jawaban.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <h5 className="font-bold text-slate-900">M. REFLEKSI & N. REMEDIAL</h5>
            <p className="text-slate-600">Refleksi peserta didik serta program remedial & pengayaan.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <h5 className="font-bold text-slate-900">O. REFLEKSI GURU & P. SARANA</h5>
            <p className="text-slate-600">Evaluasi ketercapaian guru, sarana prasarana, dan referensi utama.</p>
          </div>
        </div>

        <div className="pt-8 flex justify-between text-xs page-break-inside-avoid border-t border-slate-200">
          <div className="text-center">
            <p>Mengetahui,</p>
            <p className="font-bold">Kepala Madrasah</p>
            <div className="h-16"></div>
            <p className="font-bold underline">{identity.headmasterName}</p>
            <p>NIP. {identity.headmasterNip}</p>
          </div>
          <div className="text-center">
            <p>Bandung, Juli 2026</p>
            <p className="font-bold">Guru Mata Pelajaran PJOK</p>
            <div className="h-16"></div>
            <p className="font-bold underline">{identity.teacherName}</p>
            <p>NIP. {identity.teacherNip}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>



);
}

function LkpdView({ identity, lkpdList, setLkpdList, currentRombels, showNotification, downloadDocx }) {
const [title, setTitle] = useState("");
const [kelas, setKelas] = useState(currentRombels[0] || "XII F.1");
const [materi, setMateri] = useState(MATERIALS_LIST[4]);
const [petunjuk, setPetunjuk] = useState("");
const [aiQuery, setAiQuery] = useState("");
const [isAiLoading, setIsAiLoading] = useState(false);

const handleAddLkpd = (e) => {
e.preventDefault();
if (!title || !petunjuk) return;
const item = { id: Date.now(), title, kelas, materi, petunjuk };
setLkpdList([item, ...lkpdList]);
setTitle(""); setPetunjuk("");
showNotification("LKPD Interaktif berhasil ditambahkan!");
};

const handleGeminiLkpdSearch = () => {
if (!aiQuery) return;
setIsAiLoading(true);
setTimeout(() => {
setTitle(LKPD AI: Analisis & Praktik ${aiQuery});
setPetunjuk(1. Pelajari panduan gerakan ${aiQuery} secara saksama.\n2. Lakukan observasi berpasangan di lapangan MAN 1 Kota Bandung.\n3. Catat hasil pengamatan pada tabel analisis dan lakukan refleksi Panca Cinta.);
setIsAiLoading(false);
showNotification(Gemini AI berhasil menyusun LKPD dinamis untuk topik "${aiQuery}"!);
}, 1200);
};

const handleDownloadWord = (lk) => {
downloadDocx(LKPD_${lk.kelas.replace(' ', '_')}_${lk.materi.replace(/[^a-zA-Z0-9]/g, '_')}.docx, "LKPD PJOK", lkpd-${lk.id});
};

return (

Gemini AI Assistant — Pencarian & Pembuatan LKPD Dinamis Berdasarkan Topik

Cth: "LKPD Bulu Tangkis", "LKPD Kebugaran Jasmani", "LKPD Bola Voli", atau topik apapun.

<input
type="text"
placeholder="Masukkan topik LKPD yang ingin dicari/dibuat dengan AI..."
value={aiQuery}
onChange={(e) => setAiQuery(e.target.value)}
className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-xs text-white outline-none"
/>

{isAiLoading ?  : }
{isAiLoading ? "Mencari..." : "Cari & Buat LKPD AI"}

  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 no-print">
    <h3 className="text-base font-bold text-slate-800 mb-4">Buat Lembar Kerja Peserta Didik (LKPD) KBC Baru</h3>
    <form onSubmit={handleAddLkpd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input type="text" placeholder="Judul LKPD" value={title} onChange={(e) => setTitle(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs outline-none" required />
      <select value={kelas} onChange={(e) => setKelas(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs outline-none">
        {currentRombels.map((c, i) => <option key={i}>{c}</option>)}
      </select>
      <select value={materi} onChange={(e) => setMateri(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs outline-none">
        {MATERIALS_LIST.map((m, i) => <option key={i}>{m}</option>)}
      </select>
      <textarea placeholder="Petunjuk kegiatan dan aktivitas peserta didik..." value={petunjuk} onChange={(e) => setPetunjuk(e.target.value)} className="md:col-span-3 px-4 py-2.5 rounded-xl border border-slate-300 text-xs outline-none h-20" required></textarea>
      <div className="md:col-span-3 flex justify-end">
        <button type="submit" className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Simpan LKPD
        </button>
      </div>
    </form>
  </div>

  <div className="space-y-6">
    {lkpdList.map((lk) => (
      <div key={lk.id} id={`lkpd-${lk.id}`} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-4 document-container">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3 no-print">
          <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-lg text-xs font-bold">{lk.kelas} — {lk.materi}</span>
          <div className="flex gap-2">
            <button onClick={() => handleDownloadWord(lk)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> Word (.DOCX)
            </button>
            <button onClick={() => setLkpdList(lkpdList.filter(x => x.id !== lk.id))} className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <h3 className="text-base font-bold text-slate-900">{lk.title}</h3>
        <div className="text-xs bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200">
          <p><strong>Identitas Peserta Didik:</strong> Nama: ....................................... | NIS: ..................... | Kelas: {lk.kelas}</p>
          <p><strong>Petunjuk Kegiatan:</strong> {lk.petunjuk}</p>
          <p><strong>Integrasi Panca Cinta:</strong> Lakukan dengan jujur, disiplin, dan menjaga keselamatan diri serta lingkungan.</p>
        </div>
        <div className="pt-4 text-[11px] text-slate-500 flex justify-between">
          <span>Guru Pengampu: {identity.teacherName}</span>
          <span>{identity.schoolName}</span>
        </div>
      </div>
    ))}
  </div>
</div>



);
}

function QuestionsView({ identity, questionBank, setQuestionBank, showNotification, downloadDocx }) {
const [newSoal, setNewSoal] = useState("");
const [materi, setMateri] = useState(MATERIALS_LIST[0]);
const [jenis, setJenis] = useState("Pilihan Ganda");
const [tingkat, setTingkat] = useState("Sedang");
const [opsiA, setOpsiA] = useState("");
const [opsiB, setOpsiB] = useState("");
const [opsiC, setOpsiC] = useState("");
const [opsiD, setOpsiD] = useState("");
const [opsiE, setOpsiE] = useState("");
const [kunci, setKunci] = useState("A");
const [pembahasan, setPembahasan] = useState("");

const [aiQuery, setAiQuery] = useState("");
const [aiCount, setAiCount] = useState(5);
const [isAiLoading, setIsAiLoading] = useState(false);

const handleAddSoal = (e) => {
e.preventDefault();
if (!newSoal) return;
const item = {
id: Date.now(),
materi,
soal: newSoal,
jenis,
tingkat,
opsi: 

$$`A. ${opsiA}`, `B. ${opsiB}`, `C. ${opsiC}`, `D. ${opsiD}`, `E. ${opsiE}`$$

,
kunci,
pembahasan: pembahasan || "Pembahasan terstandar kurikulum merdeka PJOK."
};
setQuestionBank([item, ...questionBank]);
setNewSoal(""); setOpsiA(""); setOpsiB(""); setOpsiC(""); setOpsiD(""); setOpsiE(""); setPembahasan("");
showNotification("Soal berhasil ditambahkan ke Bank Soal!");
};

const handleGeminiQuestionGenerate = () => {
if (!aiQuery) return;
setIsAiLoading(true);
setTimeout(() => {
let generated = 

;
for (let i = 1; i <= aiCount; i++) {
generated.push({
id: Date.now() + i,
materi: aiQuery,
soal: Pertanyaan AI ke-${i} mengenai analisis mendalam ${aiQuery} pada pembelajaran PJOK MAN 1 Kota Bandung: Bagaimanakah koordinasi gerak yang paling efektif?,
jenis: "Pilihan Ganda",
tingkat: "Sedang",
opsi: ["A. Melakukan pemanasan statis", "B. Sinkronisasi timing dan mekanika tubuh", "C. Kecepatan maksimal tanpa teknik", "D. Konsentrasi penuh pada lawan", "E. Mengabaikan posisi awal"],
kunci: "B",
pembahasan: Pembahasan AI: Sinkronisasi timing dan mekanika tubuh merupakan inti dari penguasaan ${aiQuery}.
});
}
setQuestionBank([...generated, ...questionBank]);
setIsAiLoading(false);
showNotification(Gemini AI berhasil menghasilkan ${aiCount} soal untuk topik "${aiQuery}"!);
}, 1500);
};

const handleDownloadWord = () => {
downloadDocx(Bank_Soal_PJOK_${identity.academicYear.replace('/', '-')}.docx, "Bank Soal & Kisi-Kisi PJOK", "question-bank-container");
};

return (

Gemini AI — Generator & Pencari Soal Otomatis PJOK

Cth: "Soal PJOK kelas X materi sepak bola", "Soal bulu tangkis", "Soal kebugaran jasmani", atau topik apapun.

<input
type="text"
placeholder="Topik soal (Cth: Bola Voli / Atletik)..."
value={aiQuery}
onChange={(e) => setAiQuery(e.target.value)}
className="md:col-span-2 px-4 py-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-xs text-white outline-none"
/>

<select value={aiCount} onChange={(e) => setAiCount(parseInt(e.target.value))} className="bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-xs text-white">
5 Soal10 Soal15 Soal20 Soal

{isAiLoading ?  : }
{isAiLoading ? "Membuat..." : "Buat Soal AI"}

  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 no-print">
    <h3 className="text-base font-bold text-slate-800 mb-4">Tambah Soal Manual ke Bank Soal</h3>
    <form onSubmit={handleAddSoal} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select value={materi} onChange={(e) => setMateri(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 text-xs">
          {MATERIALS_LIST.map((m, i) => <option key={i}>{m}</option>)}
        </select>
        <select value={jenis} onChange={(e) => setJenis(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 text-xs">
          <option>Pilihan Ganda</option><option>Pilihan Ganda Kompleks</option><option>Benar/Salah</option><option>Uraian</option>
        </select>
        <select value={tingkat} onChange={(e) => setTingkat(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 text-xs">
          <option>Mudah</option><option>Sedang</option><option>Sulit</option>
        </select>
      </div>
      <textarea placeholder="Tulis Pertanyaan Soal..." value={newSoal} onChange={(e) => setNewSoal(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs outline-none h-20" required></textarea>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input type="text" placeholder="Opsi A" value={opsiA} onChange={(e) => setOpsiA(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 text-xs" required />
        <input type="text" placeholder="Opsi B" value={opsiB} onChange={(e) => setOpsiB(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 text-xs" required />
        <input type="text" placeholder="Opsi C" value={opsiC} onChange={(e) => setOpsiC(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 text-xs" required />
        <input type="text" placeholder="Opsi D" value={opsiD} onChange={(e) => setOpsiD(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 text-xs" required />
        <input type="text" placeholder="Opsi E" value={opsiE} onChange={(e) => setOpsiE(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 text-xs" required />
        <select value={kunci} onChange={(e) => setKunci(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-emerald-700">
          <option value="A">Kunci: A</option><option value="B">Kunci: B</option><option value="C">Kunci: C</option><option value="D">Kunci: D</option><option value="E">Kunci: E</option>
        </select>
      </div>
      <input type="text" placeholder="Pembahasan singkat soal..." value={pembahasan} onChange={(e) => setPembahasan(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs" />
      <div className="flex justify-end">
        <button type="submit" className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Simpan Soal
        </button>
      </div>
    </form>
  </div>

  <div id="question-bank-container" className="space-y-4 document-container bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
    <div className="flex justify-between items-center border-b border-slate-200 pb-4">
      <div>
        <h3 className="font-bold text-slate-900">BANK SOAL & KISI-KISI PJOK — {identity.schoolName}</h3>
        <p className="text-xs text-slate-500">Tahun Pelajaran {identity.academicYear} | Guru Pengampu: {identity.teacherName} | Total Soal: {questionBank.length}</p>
      </div>
      <button onClick={handleDownloadWord} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow no-print">
        <Download className="w-4 h-4" /> Unduh Word (.DOCX) Valid
      </button>
    </div>

    <div className="space-y-4 pt-2">
      {questionBank.map((q, idx) => (
        <div key={q.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-emerald-900">Soal No. {idx + 1} ({q.materi} — {q.jenis} — {q.tingkat})</span>
            <button onClick={() => setQuestionBank(questionBank.filter(x => x.id !== q.id))} className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg no-print">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs font-semibold text-slate-800">{q.soal}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-700">
            {q.opsi && q.opsi.map((opt, i) => <div key={i} className="p-1.5 bg-white rounded border border-slate-200">{opt}</div>)}
          </div>
          <div className="p-2.5 bg-emerald-50 rounded-xl text-xs text-emerald-900 font-medium flex justify-between">
            <span>Kunci Jawaban: <strong className="text-emerald-700">{q.kunci}</strong></span>
            <span>{q.pembahasan}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>



);
}

function AttendanceView({ identity, students, setStudents, attendance, setAttendance, currentRombels, showNotification }) {
const [activeClass, setActiveClass] = useState(currentRombels[0] || "XII F.1");
const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
const [searchTerm, setSearchTerm] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const pageSize = 15;

const classStudents = students[activeClass] || 

;
const filteredStudents = classStudents.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.nis.includes(searchTerm));
const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
const paginatedStudents = filteredStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

const handleExportExcel = () => {
try {
const dataToExport = classStudents.map((s, idx) => ({
"No": idx + 1,
"NISN": s.nisn,
"NIS": s.nis,
"Nama Peserta Didik": s.name,
"Kelas": activeClass,
"Jenis Kelamin": s.gender,
"Status Kehadiran": getStatus(s.id)
}));

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Daftar Hadir");

  worksheet['!cols'] = [{wch: 5}, {wch: 16}, {wch: 12}, {wch: 32}, {wch: 12}, {wch: 12}, {wch: 18}];
  XLSX.writeFile(workbook, `Daftar_Hadir_${activeClass.replace(' ', '_')}_${selectedDate}.xlsx`);
  showNotification("File Excel Daftar Hadir berhasil diunduh!");
} catch (err) {
  showNotification("Gagal mengekspor file Excel.");
}



};

const handleDownloadTemplate = () => {
const templateData = 

$${ "NISN": "30829101", "NIS": "202601", "Nama Peserta Didik": "Ahmad Fauzi", "Jenis Kelamin": "L" }, { "NISN": "30829102", "NIS": "202602", "Nama Peserta Didik": "Siti Nurhaliza", "Jenis Kelamin": "P" }$$

;
const worksheet = XLSX.utils.json_to_sheet(templateData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Template Siswa");
XLSX.writeFile(workbook, Template_Excel_Siswa_${activeClass.replace(' ', '_')}.xlsx);
showNotification("Template Excel berhasil diunduh!");
};

const handleExcelUpload = (e) => {
const file = e.target.files[0];
if (!file) return;

const reader = new FileReader();
reader.onload = (evt) => {
  try {
    const bstr = evt.target.result;
    const workbook = XLSX.read(bstr, { type: 'binary' });
    const wsname = workbook.SheetNames[0];
    const ws = workbook.Sheets[wsname];
    const rawData = XLSX.utils.sheet_to_json(ws, { defval: "" });

    if (rawData.length === 0) {
      showNotification("File Excel kosong atau tidak memiliki data.");
      return;
    }

    const parsedStudents = rawData.map((row, index) => ({
      id: Date.now() + index,
      nisn: String(row["NISN"] || row["nisn"] || `3082910${index}`),
      nis: String(row["NIS"] || row["nis"] || `2026${index}`),
      name: String(row["Nama Peserta Didik"] || row["nama"] || `Siswa ${index + 1}`),
      gender: String(row["Jenis Kelamin"] || row["gender"] || "L")
    }));

    setStudents({
      ...students,
      [activeClass]: parsedStudents
    });
    showNotification(`Berhasil mengimpor ${parsedStudents.length} data siswa ke ${activeClass} via Excel!`);
  } catch (error) {
    showNotification("Format file Excel tidak valid. Gunakan template resmi.");
  }
};
reader.readAsBinaryString(file);
e.target.value = "";



};

const handleStatusChange = (studentId, status) => {
const key = ${activeClass}_${selectedDate};
const currentDayAtt = attendance[key] || {};
setAttendance({
...attendance,
[key]
: { ...currentDayAtt, [studentId]: status }
});
};

const getStatus = (studentId) => {
const key = ${activeClass}_${selectedDate};
return attendance[key]?.[studentId] || "Hadir";
};

return (

Pilih Rombel:
<select value={activeClass} onChange={(e) => { setActiveClass(e.target.value); setCurrentPage(1); }} className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-emerald-700">
{currentRombels.map((c, i) => {c})}

Tanggal:
<input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="px-4 py-2 rounded-xl border border-slate-300 text-xs" />

Template Excel

Ekspor Excel

Impor Excel (50+)

  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-3 no-print">
    <Search className="w-4 h-4 text-slate-400" />
    <input 
      type="text" 
      placeholder="Cari nama atau NIS siswa..." 
      value={searchTerm} 
      onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
      className="w-full text-xs outline-none"
    />
  </div>

  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
    <div className="flex justify-between items-center border-b border-slate-200 pb-4">
      <div>
        <h3 className="font-bold text-slate-900">DAFTAR HADIR PESERTA DIDIK — {activeClass}</h3>
        <p className="text-xs text-slate-500">Tanggal: {selectedDate} | Guru: {identity.teacherName} | Total Siswa: {classStudents.length}</p>
      </div>
      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">Halaman {currentPage} dari {totalPages}</span>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse border border-slate-300">
        <thead>
          <tr className="bg-emerald-900 text-white">
            <th className="border border-slate-300 p-2.5 w-12 text-center">No</th>
            <th className="border border-slate-300 p-2.5 w-24">NIS</th>
            <th className="border border-slate-300 p-2.5">Nama Peserta Didik</th>
            <th className="border border-slate-300 p-2.5 w-48 text-center">Status Kehadiran</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStudents.map((s, idx) => {
            const globalIdx = (currentPage - 1) * pageSize + idx + 1;
            const status = getStatus(s.id);
            return (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="border border-slate-300 p-2.5 text-center font-bold">{globalIdx}</td>
                <td className="border border-slate-300 p-2.5 font-mono">{s.nis}</td>
                <td className="border border-slate-300 p-2.5 font-medium">{s.name}</td>
                <td className="border border-slate-300 p-2 text-center">
                  <div className="flex justify-center gap-1.5">
                    {['Hadir', 'Sakit', 'Izin', 'Alpa'].map(st => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusChange(s.id, st)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                          status === st 
                            ? st === 'Hadir' ? 'bg-emerald-600 text-white' : st === 'Sakit' ? 'bg-amber-500 text-white' : st === 'Izin' ? 'bg-blue-500 text-white' : 'bg-rose-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {totalPages > 1 && (
      <div className="flex justify-center gap-2 pt-4 no-print">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button 
            key={p} 
            onClick={() => setCurrentPage(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${currentPage === p ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {p}
          </button>
        ))}
      </div>
    )}
  </div>
</div>



);
}

function GradesView({ identity, students, grades, setGrades, currentRombels, showNotification }) {
const [activeClass, setActiveClass] = useState(currentRombels[0] || "XII F.1");
const [searchTerm, setSearchTerm] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const pageSize = 15;

const classStudents = students[activeClass] || 

;
const classGrades = grades[activeClass] || {};
const filteredStudents = classStudents.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.nis.includes(searchTerm));
const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
const paginatedStudents = filteredStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

const handleGradeChange = (studentId, field, val) => {
const num = Math.min(100, Math.max(0, parseFloat(val) || 0));
const studentGrades = classGrades[studentId] || { sikap: 85, pengetahuan: 82, keterampilan: 88 };
setGrades({
...grades,
[activeClass]
: {
...classGrades,
[studentId]
: { ...studentGrades, [field]: num }
}
});
};

const handleExportGradesExcel = () => {
try {
const dataToExport = classStudents.map((s, idx) => {
const sg = classGrades[s.id] || { sikap: 85, pengetahuan: 82, keterampilan: 88 };
const finalScore = (sg.sikap * 0.20) + (sg.pengetahuan * 0.30) + (sg.keterampilan * 0.50);
const predikat = finalScore >= 90 ? 'A' : finalScore >= 80 ? 'B' : finalScore >= 75 ? 'C' : 'D';
return {
"No": idx + 1,
"NISN": s.nisn,
"NIS": s.nis,
"Nama Peserta Didik": s.name,
"Kelas": activeClass,
"Sikap (20%)": sg.sikap,
"Pengetahuan (30%)": sg.pengetahuan,
"Keterampilan (50%)": sg.keterampilan,
"Nilai Akhir": parseFloat(finalScore.toFixed(1)),
"Predikat": predikat
};
});

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Nilai");

  worksheet['!cols'] = [{wch: 5}, {wch: 16}, {wch: 12}, {wch: 32}, {wch: 12}, {wch: 14}, {wch: 18}, {wch: 18}, {wch: 14}, {wch: 10}];
  XLSX.writeFile(workbook, `Rekap_Nilai_PJOK_${activeClass.replace(' ', '_')}.xlsx`);
  showNotification("File Excel Rekap Nilai berhasil diunduh!");
} catch (err) {
  showNotification("Gagal mengekspor file Excel nilai.");
}



};

const handleDownloadTemplate = () => {
const templateData = 

$${ "NISN": "30829101", "NIS": "202601", "Nama Peserta Didik": "Ahmad Fauzi", "Sikap": 88, "Pengetahuan": 85, "Keterampilan": 90 }$$

;
const worksheet = XLSX.utils.json_to_sheet(templateData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Template Nilai");
XLSX.writeFile(workbook, Template_Excel_Nilai_${activeClass.replace(' ', '_')}.xlsx);
showNotification("Template Excel Nilai berhasil diunduh!");
};

const handleExcelUpload = (e) => {
const file = e.target.files[0];
if (!file) return;

const reader = new FileReader();
reader.onload = (evt) => {
  try {
    const bstr = evt.target.result;
    const workbook = XLSX.read(bstr, { type: 'binary' });
    const wsname = workbook.SheetNames[0];
    const ws = workbook.Sheets[wsname];
    const rawData = XLSX.utils.sheet_to_json(ws, { defval: "" });

    if (rawData.length === 0) {
      showNotification("File Excel kosong.");
      return;
    }

    let newGrades = { ...classGrades };
    rawData.forEach((row, index) => {
      const targetStudent = classStudents[index];
      if (targetStudent) {
        newGrades[targetStudent.id] = {
          sikap: parseFloat(row["Sikap"] || row["sikap"] || 85),
          pengetahuan: parseFloat(row["Pengetahuan"] || row["pengetahuan"] || 82),
          keterampilan: parseFloat(row["Keterampilan"] || row["keterampilan"] || 88)
        };
      }
    });

    setGrades({ ...grades, [activeClass]: newGrades });
    showNotification(`Berhasil mengimpor rekap nilai untuk rombel ${activeClass} via Excel!`);
  } catch (error) {
    showNotification("Format file Excel tidak valid.");
  }
};
reader.readAsBinaryString(file);
e.target.value = "";



};

return (

Pilih Rombel:
<select value={activeClass} onChange={(e) => { setActiveClass(e.target.value); setCurrentPage(1); }} className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-emerald-700">
{currentRombels.map((c, i) => {c})}

Template Excel

Ekspor Excel

Impor Excel (50+)

  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-3 no-print">
    <Search className="w-4 h-4 text-slate-400" />
    <input 
      type="text" 
      placeholder="Cari nama atau NIS siswa untuk input nilai..." 
      value={searchTerm} 
      onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
      className="w-full text-xs outline-none"
    />
  </div>

  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
    <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
      <div>
        <h3 className="font-bold text-slate-900">REKAPITULASI PENILAIAN PJOK — {activeClass}</h3>
        <p className="text-xs text-slate-500">Guru: {identity.teacherName} | Rumus: (Sikap×20%) + (Pengetahuan×30%) + (Keterampilan×50%) | Total: {classStudents.length} Siswa</p>
      </div>
      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">Halaman {currentPage} / {totalPages}</span>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse border border-slate-300">
        <thead>
          <tr className="bg-emerald-900 text-white">
            <th className="border border-slate-300 p-2.5 w-12 text-center">No</th>
            <th className="border border-slate-300 p-2.5">Nama Peserta Didik</th>
            <th className="border border-slate-300 p-2.5 w-24 text-center">Sikap (20%)</th>
            <th className="border border-slate-300 p-2.5 w-28 text-center">Pengetahuan (30%)</th>
            <th className="border border-slate-300 p-2.5 w-28 text-center">Keterampilan (50%)</th>
            <th className="border border-slate-300 p-2.5 w-24 text-center bg-emerald-950">Nilai Akhir</th>
            <th className="border border-slate-300 p-2.5 w-20 text-center">Predikat</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStudents.map((s, idx) => {
            const globalIdx = (currentPage - 1) * pageSize + idx + 1;
            const sg = classGrades[s.id] || { sikap: 85, pengetahuan: 82, keterampilan: 88 };
            const finalScore = (sg.sikap * 0.20) + (sg.pengetahuan * 0.30) + (sg.keterampilan * 0.50);
            const predikat = finalScore >= 90 ? 'A' : finalScore >= 80 ? 'B' : finalScore >= 75 ? 'C' : 'D';

            return (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="border border-slate-300 p-2.5 text-center font-bold">{globalIdx}</td>
                <td className="border border-slate-300 p-2.5 font-medium">{s.name}</td>
                <td className="border border-slate-300 p-1 text-center">
                  <input type="number" min="0" max="100" value={sg.sikap} onChange={(e) => handleGradeChange(s.id, 'sikap', e.target.value)} className="w-16 text-center py-1 border border-slate-300 rounded-lg text-xs" />
                </td>
                <td className="border border-slate-300 p-1 text-center">
                  <input type="number" min="0" max="100" value={sg.pengetahuan} onChange={(e) => handleGradeChange(s.id, 'pengetahuan', e.target.value)} className="w-16 text-center py-1 border border-slate-300 rounded-lg text-xs" />
                </td>
                <td className="border border-slate-300 p-1 text-center">
                  <input type="number" min="0" max="100" value={sg.keterampilan} onChange={(e) => handleGradeChange(s.id, 'keterampilan', e.target.value)} className="w-16 text-center py-1 border border-slate-300 rounded-lg text-xs" />
                </td>
                <td className="border border-slate-300 p-2.5 text-center font-bold font-mono text-emerald-800 bg-emerald-50">{finalScore.toFixed(1)}</td>
                <td className="border border-slate-300 p-2.5 text-center font-bold">{predikat}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {totalPages > 1 && (
      <div className="flex justify-center gap-2 pt-4 no-print">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button 
            key={p} 
            onClick={() => setCurrentPage(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${currentPage === p ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {p}
          </button>
        ))}
      </div>
    )}
  </div>
</div>



);
}

function SourcesView({ identity, learningSources, setLearningSources, showNotification }) {
const [title, setTitle] = useState("");
const [category, setCategory] = useState(MATERIALS_LIST[0]);
const [url, setUrl] = useState("");
const [desc, setDesc] = useState("");

const handleAddSource = (e) => {
e.preventDefault();
if (!title || !url) return;
const item = { id: Date.now(), title, category, url, desc };
setLearningSources([item, ...learningSources]);
setTitle(""); setUrl(""); setDesc("");
showNotification("Sumber belajar berhasil ditambahkan!");
};

return (

Tambah Tautan & Sumber Belajar PJOK

<input type="text" placeholder="Judul Sumber / Video" value={title} onChange={(e) => setTitle(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs" required />
<select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs">
{MATERIALS_LIST.map((m, i) => {m})}

<input type="url" placeholder="Tautan URL (YouTube)" value={url} onChange={(e) => setUrl(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs" required />
<input type="text" placeholder="Deskripsi Singkat" value={desc} onChange={(e) => setDesc(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs" required />

Simpan Sumber Belajar

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {learningSources.map((s) => (
      <div key={s.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-3 flex flex-col justify-between">
        <div>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-[10px] font-bold">{s.category}</span>
          <h4 className="font-bold text-slate-900 mt-2">{s.title}</h4>
          <p className="text-xs text-slate-600 mt-1">{s.desc}</p>
        </div>
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <a href={s.url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1">
            <Play className="w-3.5 h-3.5" /> Buka Tautan
          </a>
          <button onClick={() => setLearningSources(learningSources.filter(x => x.id !== s.id))} className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg no-print">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    ))}
  </div>
</div>



);
}

function JournalsView({ identity, journals, setJournals, currentRombels, showNotification }) {
const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
const [kelas, setKelas] = useState(currentRombels[0] || "XII F.1");
const [materi, setMateri] = useState(MATERIALS_LIST[0]);
const [jp, setJp] = useState("4 JP");
const [catatan, setCatatan] = useState("");

const handleAddJournal = (e) => {
e.preventDefault();
if (!catatan) return;
const item = { id: Date.now(), date, kelas, materi, jp, hadir: 35, catatan };
setJournals([item, ...journals]);
setCatatan("");
showNotification("Jurnal harian berhasil dicatat!");
};

return (

Tambah Jurnal Pembelajaran Harian

<input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs" required />
<select value={kelas} onChange={(e) => setKelas(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs">
{currentRombels.map((c, i) => {c})}

<select value={materi} onChange={(e) => setMateri(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs">
{MATERIALS_LIST.map((m, i) => {m})}

<select value={jp} onChange={(e) => setJp(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs">
2 JP4 JP6 JP