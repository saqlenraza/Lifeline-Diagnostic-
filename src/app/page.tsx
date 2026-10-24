'use client';

import { useMemo, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, Clock3,
  FileCheck2, FileDown, FlaskConical, HeartPulse, Home, MapPin, Menu, Microscope,
  Minus, MoveRight, Plus, Search, ShieldCheck, Sparkles,
  TestTube2, Users, X, MessageCircle, UploadCloud, ClipboardList, Activity,
  Droplets, BadgeCheck, LockKeyhole, CircleHelp, CheckCircle2
} from 'lucide-react';

type Test = { name: string; detail: string; price: number; preparation: string; turnaround: string; category: string; popular?: boolean };
type Package = { name: string; subtitle: string; tests: number; price: number; oldPrice: number; prep: string; tag: string; tint: string; features: string[] };

const tests: Test[] = [
  { name: 'Complete Blood Count (CBC)', detail: 'Blood · 21 parameters', price: 349, preparation: 'Usually no fasting required. Follow your clinician’s advice.', turnaround: 'Typically within 24 hours*', category: 'Blood', popular: true },
  { name: 'Thyroid Profile (T3, T4, TSH)', detail: 'Blood · Thyroid function', price: 549, preparation: 'Preparation can vary with medicines and your doctor’s advice.', turnaround: 'Typically within 24 hours*', category: 'Thyroid', popular: true },
  { name: 'HbA1c (Glycated Haemoglobin)', detail: 'Blood · Average blood sugar', price: 449, preparation: 'Fasting is generally not required.', turnaround: 'Typically within 24 hours*', category: 'Diabetes', popular: true },
  { name: 'Vitamin D (25-OH)', detail: 'Blood · Vitamin profile', price: 899, preparation: 'Ask your clinician about supplements before testing.', turnaround: 'Typically within 24–48 hours*', category: 'Vitamins' },
  { name: 'Vitamin B12', detail: 'Blood · Vitamin profile', price: 699, preparation: 'Tell the lab about supplements or medicines you take.', turnaround: 'Typically within 24–48 hours*', category: 'Vitamins' },
  { name: 'Lipid Profile', detail: 'Blood · Cholesterol & triglycerides', price: 499, preparation: 'Fasting requirements depend on the test order. Confirm before collection.', turnaround: 'Typically within 24 hours*', category: 'Heart health', popular: true },
  { name: 'Liver Function Test (LFT)', detail: 'Blood · Liver markers', price: 599, preparation: 'Follow any preparation instructions on your prescription.', turnaround: 'Typically within 24 hours*', category: 'Organ health' },
  { name: 'Kidney Function Test (KFT)', detail: 'Blood · Renal markers', price: 599, preparation: 'Preparation may vary depending on your test order.', turnaround: 'Typically within 24 hours*', category: 'Organ health' },
  { name: 'Fasting Blood Sugar (FBS)', detail: 'Blood · Glucose', price: 99, preparation: 'An overnight fast may be required. Confirm exact duration with us.', turnaround: 'Typically within 24 hours*', category: 'Diabetes' },
  { name: 'Iron Studies', detail: 'Blood · Iron & binding capacity', price: 799, preparation: 'Timing, food and supplements may affect results; ask before testing.', turnaround: 'Typically within 24–48 hours*', category: 'Vitamins' },
  { name: 'Urine Routine & Microscopy', detail: 'Urine · Routine analysis', price: 199, preparation: 'Follow the sample-collection instructions provided by the lab.', turnaround: 'Typically within 24 hours*', category: 'Urine' },
  { name: 'CRP (C-Reactive Protein)', detail: 'Blood · Inflammation marker', price: 499, preparation: 'No special preparation is commonly needed; confirm for your order.', turnaround: 'Typically within 24 hours*', category: 'Blood' },
];

const packages: Package[] = [
  { name: 'Essential Health Screen', subtitle: 'A considered starting point for routine checks', tests: 32, price: 999, oldPrice: 1499, prep: 'Preparation varies', tag: 'Everyday wellness', tint: 'mint', features: ['Blood count & sugar markers', 'Liver and kidney markers', 'Lipid profile'] },
  { name: 'Complete Body Checkup', subtitle: 'A broader snapshot of common health markers', tests: 68, price: 1799, oldPrice: 2599, prep: 'Fasting may be needed', tag: 'Popular choice', tint: 'blue', features: ['Includes Essential Screen', 'Thyroid profile', 'Vitamin D & B12'] },
  { name: 'Advanced Health Screen', subtitle: 'Expanded testing for a wider health overview', tests: 86, price: 2499, oldPrice: 3599, prep: 'Fasting may be needed', tag: 'Expanded profile', tint: 'peach', features: ['Includes Complete Checkup', 'Additional health markers', 'Detailed digital report'] },
];

const concerns = [
  { name: 'Diabetes', text: 'Blood sugar & HbA1c', icon: Droplets, color: 'lavender' },
  { name: 'Thyroid', text: 'T3, T4 & TSH profiles', icon: Activity, color: 'sky' },
  { name: 'Vitamins', text: 'Vitamin D, B12 & more', icon: Sparkles, color: 'butter' },
  { name: 'Heart health', text: 'Cholesterol & lipids', icon: HeartPulse, color: 'rose' },
  { name: 'Organ health', text: 'Liver & kidney tests', icon: Microscope, color: 'mint' },
  { name: 'Blood tests', text: 'CBC & routine testing', icon: TestTube2, color: 'blue' },
];

const faqs = [
  { q: 'Do I need to fast before a blood test?', a: 'It depends on the test. Some tests, such as fasting blood sugar, require a fast; many others do not. Please follow your clinician’s instructions and confirm exact preparation with the lab before your appointment. Do not stop prescribed medication unless your clinician tells you to.' },
  { q: 'Can I book a home sample collection in Mumbai?', a: 'Use the booking request form and provide your area and PIN code. Our team should confirm service availability, the collection window and any applicable fee before your appointment is finalised.' },
  { q: 'How will I receive my reports?', a: 'The finished service should deliver reports through a secure patient channel and notify you when they are ready. This starter website does not yet connect to a laboratory information system; report access needs to be integrated with your lab’s verified system before launch.' },
  { q: 'Can I upload a doctor’s prescription?', a: 'Yes, this prototype lets you attach a prescription in the booking request. Files are not uploaded to a server in this demo. Production uploads need encrypted storage, access controls, retention rules and a clear privacy notice.' },
  { q: 'Are the prices and packages final?', a: 'No. The prices and package contents shown here are illustrative demo values for designing the experience. Confirm the actual catalogue, inclusions, prices, discounts and preparation instructions with Lifeline Diagnostic before publishing.' },
];

function formatPrice(price: number) { return `₹${price.toLocaleString('en-IN')}`; }

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All tests');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportPhone, setReportPhone] = useState('');
  const [reportId, setReportId] = useState('');
  const [reportMessage, setReportMessage] = useState('');

  const filteredTests = useMemo(() => tests.filter((test) => {
    const matchesSearch = `${test.name} ${test.detail} ${test.category}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All tests' || test.category === activeCategory;
    return matchesSearch && matchesCategory;
  }), [search, activeCategory]);

  const startBooking = (testName?: string) => { setSelectedTest(testName ?? null); setBookingOpen(true); };
  const handleReportLookup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReportMessage('This demo is not connected to a live report system. Connect Lifeline Diagnostic’s verified LIS/patient portal before enabling report lookup.');
  };

  return (
    <main>
      <div className="announcement"><span className="announcement-dot" /> Thoughtful testing. Clearer answers. <span className="announcement-divider">·</span> Built around you.</div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Lifeline Diagnostic home">
          <span className="brand-mark"><Plus size={24} strokeWidth={3} /></span>
          <span className="brand-name">lifeline<span>diagnostic</span></span>
        </a>
        <nav className={`desktop-nav ${mobileMenu ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#tests" onClick={() => setMobileMenu(false)}>Lab tests</a>
          <a href="#packages" onClick={() => setMobileMenu(false)}>Health packages</a>
          <a href="#how-it-works" onClick={() => setMobileMenu(false)}>How it works</a>
          <a href="#about" onClick={() => setMobileMenu(false)}>Our lab</a>
          <a href="#faq" onClick={() => setMobileMenu(false)}>FAQs</a>
          <div className="mobile-nav-actions"><button className="button button-primary" onClick={() => startBooking()}>Book a test <ArrowRight size={16} /></button></div>
        </nav>
        <div className="header-actions"><button className="report-link" onClick={() => setReportOpen(true)}><FileDown size={17} /> View reports</button><button className="button button-primary header-book" onClick={() => startBooking()}>Book a test <ArrowUpRight size={16} /></button><button className="menu-button" aria-label={mobileMenu ? 'Close menu' : 'Open menu'} onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button></div>
      </header>

      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> YOUR HEALTH, IN FOCUS</div>
          <h1>Good health starts with <span>clearer answers.</span></h1>
          <p className="hero-description">Reliable diagnostic testing, a little more clarity, and a care experience designed around real life.</p>
          <div className="hero-trust-points"><span><CheckCircle2 size={17} /> Simple test booking</span><span><CheckCircle2 size={17} /> Clear preparation guidance</span></div>
          <div className="hero-search-wrap">
            <Search size={21} className="hero-search-icon" />
            <input aria-label="Search lab tests" value={search} onChange={(e) => { setSearch(e.target.value); setActiveCategory('All tests'); }} onKeyDown={(e) => { if (e.key === 'Enter') document.getElementById('tests')?.scrollIntoView({ behavior: 'smooth' }); }} placeholder="Search blood tests, thyroid, vitamins…" />
            <button onClick={() => document.getElementById('tests')?.scrollIntoView({ behavior: 'smooth' })}>Find a test <ArrowRight size={17} /></button>
          </div>
          <div className="hero-search-caption"><span className="tiny-check"><Check size={12} /></span> Not sure what to choose? Ask your doctor or contact our team.</div>
          <div className="hero-cta-mobile"><button className="button button-primary" onClick={() => startBooking()}>Book a test <ArrowRight size={17} /></button><button className="button button-outline" onClick={() => setReportOpen(true)}>View reports</button></div>
        </div>
        <div className="hero-visual" aria-label="Illustration of a modern diagnostic lab">
          <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
          <div className="visual-note note-top"><span className="note-icon note-green"><ShieldCheck size={20} /></span><span><strong>Careful by design</strong><small>Every step, made clearer</small></span></div>
          <div className="lab-art-card">
            <div className="lab-art-top"><span className="lab-art-label"><span className="mini-dot" /> LAB NOTES / 001</span><span className="lab-art-cross">+</span></div>
            <div className="lab-illustration">
              <div className="back-shape" />
              <div className="tube tube-one"><div className="tube-cap" /><div className="tube-fluid" /></div>
              <div className="tube tube-two"><div className="tube-cap" /><div className="tube-fluid" /></div>
              <div className="tube tube-three"><div className="tube-cap" /><div className="tube-fluid" /></div>
              <div className="petri"><div className="petri-inner"><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
              <div className="art-spark spark-one">✳</div><div className="art-spark spark-two">✳</div>
              <div className="art-leaf leaf-one" /><div className="art-leaf leaf-two" />
            </div>
            <div className="lab-art-bottom"><span>Precision is a practice.</span><span>LL / MUM</span></div>
          </div>
          <div className="visual-note note-bottom"><span className="note-icon note-blue"><FileCheck2 size={20} /></span><span><strong>Reports, without the guesswork</strong><small>Clear next steps, from the start</small></span></div>
          <div className="visual-stamp"><span>TEST</span><span>·</span><span>CARE</span><span>·</span><span>CLARITY</span></div>
        </div>
        <div className="hero-footnote"><span>01 / PREVENTIVE CARE</span><span>MADE FOR MUMBAI, WITH CARE <MoveRight size={15} /></span></div>
      </section>

      <section className="quick-actions" aria-label="Quick actions">
        <button className="quick-action" onClick={() => { setSearch(''); document.getElementById('tests')?.scrollIntoView({ behavior: 'smooth' }); }}><span className="quick-icon quick-lilac"><TestTube2 size={21} /></span><span><strong>Find a lab test</strong><small>Search individual tests</small></span><ArrowUpRight size={17} className="quick-arrow" /></button>
        <button className="quick-action" onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}><span className="quick-icon quick-peach"><ClipboardList size={21} /></span><span><strong>Health checkups</strong><small>Explore bundled packages</small></span><ArrowUpRight size={17} className="quick-arrow" /></button>
        <button className="quick-action" onClick={() => startBooking()}><span className="quick-icon quick-sky"><Home size={21} /></span><span><strong>Home collection</strong><small>Request a time slot</small></span><ArrowUpRight size={17} className="quick-arrow" /></button>
        <button className="quick-action" onClick={() => setReportOpen(true)}><span className="quick-icon quick-green"><FileCheck2 size={21} /></span><span><strong>Get your reports</strong><small>Access report portal</small></span><ArrowUpRight size={17} className="quick-arrow" /></button>
      </section>

      <section className="section section-tests" id="tests">
        <div className="section-heading heading-row"><div><div className="eyebrow"><span className="eyebrow-line" /> THE RIGHT TEST, MADE SIMPLE</div><h2>Start with what<br className="desktop-break" /> you need.</h2><p>Search everyday tests or explore by health concern. Unsure? Your clinician can help identify the right test.</p></div><a className="text-link" href="#all-tests" onClick={() => { setSearch(''); setActiveCategory('All tests'); }}>Explore all tests <ArrowRight size={17} /></a></div>
        <div className="concern-list" aria-label="Filter by health concern">{concerns.map((item) => { const Icon = item.icon; return <button key={item.name} className={`concern-card ${item.color} ${activeCategory === item.name ? 'selected' : ''}`} onClick={() => { const category = item.name === 'Blood tests' ? 'Blood' : item.name; setActiveCategory(activeCategory === category ? 'All tests' : category); setSearch(''); }}><span className="concern-icon"><Icon size={21} /></span><span className="concern-title">{item.name}</span><span className="concern-detail">{item.text}</span><span className="concern-arrow"><ArrowUpRight size={16} /></span></button>; })}</div>
        <div className="test-list-heading" id="all-tests"><div><span className="section-kicker">A FEW PLACES TO START</span><h3>{activeCategory === 'All tests' ? 'Frequently requested tests' : `${activeCategory} tests`}</h3></div><div className="test-list-controls"><label className="inline-search"><Search size={16} /><input aria-label="Filter tests" placeholder="Search tests" value={search} onChange={(e) => setSearch(e.target.value)} /><button aria-label="Clear search" onClick={() => setSearch('')}><X size={14} /></button></label><button className="filter-reset" onClick={() => { setActiveCategory('All tests'); setSearch(''); }}>Reset filters</button></div></div>
        <div className="tests-grid">{filteredTests.slice(0, 6).map((test) => <article className="test-card" key={test.name}><div className="test-card-top"><span className="test-symbol"><TestTube2 size={20} /></span>{test.popular && <span className="popular-pill">Frequently chosen</span>}</div><span className="test-category">{test.category.toUpperCase()}</span><h4>{test.name}</h4><p>{test.detail}</p><div className="test-meta"><span><Clock3 size={14} /> {test.turnaround}</span><button className="info-link" onClick={() => setSelectedTest(selectedTest === test.name ? null : test.name)}>Prep info <ArrowUpRight size={13} /></button></div>{selectedTest === test.name && <div className="test-prep"><strong>Before your test</strong><p>{test.preparation}</p></div>}<div className="test-card-bottom"><div><span className="starting-label">Indicative price</span><strong>{formatPrice(test.price)}</strong></div><button className="add-test" onClick={() => startBooking(test.name)}>Book test <ArrowRight size={16} /></button></div></article>)}</div>
        {filteredTests.length === 0 && <div className="empty-results"><Search size={28} /><h4>No matching tests found</h4><p>Try a different name or clear the current filter.</p><button className="button button-outline" onClick={() => { setSearch(''); setActiveCategory('All tests'); }}>Clear search</button></div>}
        <div className="price-disclaimer">*All test names, availability, prices and indicative turnaround times in this prototype must be verified by Lifeline Diagnostic before publication. A listed turnaround time is not a medical guarantee.</div>
      </section>

      <section className="package-section" id="packages"><div className="package-inner"><div className="section-heading package-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> A BIGGER PICTURE</div><h2>Health checkups,<br /> thoughtfully grouped.</h2><p>Explore illustrative bundles for routine wellness. Choose based on your clinician’s advice and the markers you actually need.</p></div><div className="package-side-note"><span className="package-sun">✳</span><p>More tests aren’t always better. The right panel is the one that fits your health needs.</p></div></div>
        <div className="packages-grid">{packages.map((pkg, i) => <article className={`package-card package-${pkg.tint}`} key={pkg.name}><div className="package-card-art"><span className="package-label">{pkg.tag}</span><span className={`package-illustration illustration-${i}`}><span className="ill-ring ring-a" /><span className="ill-ring ring-b" /><span className="ill-pulse"><Activity size={32} /></span><span className="ill-cross">+</span></span><span className="package-numeral">0{i + 1}</span></div><div className="package-content"><h3>{pkg.name}</h3><p className="package-subtitle">{pkg.subtitle}</p><div className="package-test-count"><FlaskConical size={16} /> {pkg.tests} listed parameters <span>·</span> {pkg.prep}</div><ul>{pkg.features.map((feature) => <li key={feature}><Check size={15} /> {feature}</li>)}</ul><div className="package-price-row"><div><span className="old-price">{formatPrice(pkg.oldPrice)}</span><strong>{formatPrice(pkg.price)}</strong><small>Illustrative price</small></div><button className="package-book" onClick={() => startBooking(pkg.name)} aria-label={`Request ${pkg.name}` }><ArrowRight size={18} /></button></div></div></article>)}</div>
        <div classNam
