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
        <div className="package-footer-note"><ShieldCheck size={18} /><span>Package inclusions and preparation requirements vary. Confirm the final test list, medical suitability and price before booking.</span><a href="#faq">Read FAQs <ArrowRight size={15} /></a></div>
      </div></section>

      <section className="how-section section" id="how-it-works"><div className="section-heading how-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> NO SURPRISES, JUST NEXT STEPS</div><h2>From booking to<br className="desktop-break" /> report, made clearer.</h2></div><p>Good care is about more than a test. It’s also knowing what happens next, and who to contact if you have a question.</p></div><div className="steps-grid"><article className="step-card"><span className="step-number">01</span><span className="step-illustration step-illustration-one"><CalendarDays size={28} /><span className="step-spark">✳</span></span><h3>Choose your test</h3><p>Search the catalogue, explore a package, or share your prescription so the team can help confirm the test details.</p><span className="step-caption">CHOOSE WITH CLARITY</span></article><article className="step-card"><span className="step-number">02</span><span className="step-illustration step-illustration-two"><Home size={28} /><span className="step-spark">+</span></span><h3>Pick how to visit</h3><p>Request a home collection or ask for a lab visit. The team should confirm the PIN code, available slot and any fee.</p><span className="step-caption">YOUR ROUTINE, YOUR WAY</span></article><article className="step-card"><span className="step-number">03</span><span className="step-illustration step-illustration-three"><FileCheck2 size={28} /><span className="step-spark">✦</span></span><h3>Receive your report</h3><p>Access the verified report securely when it’s ready, with clear preparation notes and a channel for help.</p><span className="step-caption">CLEAR NEXT STEPS</span></article></div></section>

      <section className="collection-band"><div className="collection-copy"><div className="eyebrow"><span className="eyebrow-line" /> CARE THAT MEETS YOU WHERE YOU ARE</div><h2>Your morning,<br />without the extra trip.</h2><p>Ask about home sample collection across Mumbai. Share your PIN code to check coverage and request a convenient collection window.</p><div className="collection-features"><span><CheckCircle2 size={16} /> PIN-code availability check</span><span><CheckCircle2 size={16} /> Slot confirmation before booking</span><span><CheckCircle2 size={16} /> Preparation guidance up front</span></div><button className="button button-light" onClick={() => startBooking()}>Request home collection <ArrowRight size={17} /></button><small className="collection-note">Collection coverage and time slots require confirmation by the lab.</small></div><div className="collection-visual"><div className="collection-grid" /><div className="collection-sun" /><div className="collection-house"><div className="house-roof" /><div className="house-body"><div className="house-window" /><div className="house-door" /><div className="house-plant">♧</div></div><div className="house-path" /></div><div className="collection-floating"><span><MapPin size={18} /></span><div><b>At your doorstep</b><small>Subject to local availability</small></div></div><div className="collection-time"><Clock3 size={15} /> SLOT REQUEST</div><div className="collection-scribble">one less<br />thing to<br />worry about.</div></div></section>

      <section className="trust-section section" id="about"><div className="trust-visual"><div className="trust-orbit trust-orbit-1" /><div className="trust-orbit trust-orbit-2" /><div className="trust-center"><div className="trust-heart"><HeartPulse size={38} /></div><span>CARE, WITH CLARITY</span></div><span className="trust-tag trust-tag-a"><Microscope size={16} /> Thoughtful testing</span><span className="trust-tag trust-tag-b"><LockKeyhole size={16} /> Privacy matters</span><span className="trust-tag trust-tag-c"><Users size={16} /> Patient first</span></div><div className="trust-copy"><div className="eyebrow"><span className="eyebrow-line" /> WHY LIFELINE</div><h2>Trust isn’t a badge.<br /><span>It’s every detail.</span></h2><p>From accurate information before you book to careful handling of reports afterward, the experience should feel transparent at every step.</p><div className="trust-list"><div><span className="trust-list-icon"><BadgeCheck size={19} /></span><span><b>Verified credentials, made visible</b><small>We’ll show only current, verifiable accreditations and certificate details once confirmed.</small></span></div><div><span className="trust-list-icon"><ClipboardList size={19} /></span><span><b>Instructions you can understand</b><small>Clear, test-specific preparation advice—without guessing about fasting or medication.</small></span></div><div><span className="trust-list-icon"><LockKeyhole size={19} /></span><span><b>Your information handled carefully</b><small>Reports and prescriptions should be available only through secure, authorised access.</small></span></div></div><a className="text-link" href="#faq">How we approach your care <ArrowRight size={16} /></a></div></section>

      <section className="report-band"><div className="report-band-icon"><FileCheck2 size={26} /></div><div className="report-band-copy"><span className="section-kicker">YOUR HEALTH RECORD, YOURS TO ACCESS</span><h2>Need a previous report?</h2><p>Use the lab’s secure patient portal when it’s connected. Never share your report PIN or OTP with anyone.</p></div><button className="button button-light" onClick={() => setReportOpen(true)}>Access reports <ArrowRight size={17} /></button><div className="report-decoration">+</div></section>

      <section className="faq-section section" id="faq"><div className="faq-intro"><div className="eyebrow"><span className="eyebrow-line" /> GOOD TO KNOW</div><h2>Questions,<br />answered simply.</h2><p>Have a question that isn’t covered here? Contact the lab team for guidance about your booking.</p><button className="faq-contact" onClick={() => startBooking()}><MessageCircle size={17} /> Ask about a booking <ArrowUpRight size={15} /></button></div><div className="faq-list">{faqs.map((faq, i) => <div className={`faq-item ${activeFaq === i ? 'active' : ''}`} key={faq.q}><button onClick={() => setActiveFaq(activeFaq === i ? null : i)} aria-expanded={activeFaq === i}><span className="faq-index">0{i + 1}</span><span>{faq.q}</span><span className="faq-toggle">{activeFaq === i ? <Minus size={17} /> : <Plus size={17} />}</span></button>{activeFaq === i && <div className="faq-answer">{faq.a}</div>}</div>)}</div></section>

      <section className="final-cta"><div className="final-cta-shape" /><div><span className="eyebrow"><span className="eyebrow-line" /> WHEN YOU’RE READY</span><h2>Let’s take the<br />next step together.</h2><p>Start a booking request, and our team can help confirm the details.</p></div><button className="button button-primary" onClick={() => startBooking()}>Start a booking request <ArrowRight size={17} /></button></section>

      <footer className="footer"><div className="footer-top"><div className="footer-brand-col"><a className="brand" href="#home"><span className="brand-mark"><Plus size={24} strokeWidth={3} /></span><span className="brand-name">lifeline<span>diagnostic</span></span></a><p>A clearer, more thoughtful diagnostic experience—designed for people, not just test results.</p><div className="footer-mumbai"><MapPin size={16} /> Mumbai, Maharashtra, India</div></div><div className="footer-column"><h4>Explore</h4><a href="#tests">Lab tests</a><a href="#packages">Health packages</a><a href="#how-it-works">How it works</a><a href="#about">Our approach</a></div><div className="footer-column"><h4>Patient help</h4><button onClick={() => setReportOpen(true)}>Access reports</button><button onClick={() => startBooking()}>Booking requests</button><a href="#faq">Preparation FAQs</a><a href="#faq">Home collection</a></div><div className="footer-contact"><h4>Here to help</h4><p>For test availability, appointment slots, and report queries, please use the lab’s verified contact details.</p><button className="footer-contact-button" onClick={() => startBooking()}><MessageCircle size={16} /> Contact the team <ArrowUpRight size={15} /></button><span className="footer-detail-note">Phone, address and hours to be added before launch.</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Lifeline Diagnostic. All rights reserved.</span><div><a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Add your reviewed Privacy Policy URL before launch.'); }}>Privacy</a><a href="#terms" onClick={(e) => { e.preventDefault(); alert('Add your reviewed Terms of Service URL before launch.'); }}>Terms</a><a href="#faq">Patient information</a></div><span className="footer-built">BUILT AROUND CARE <span>✳</span></span></div><p className="medical-disclaimer">Information on this website is not medical advice and does not replace a clinician’s guidance. Test availability, preparation, turnaround times and prices must be confirmed with the lab. This prototype displays illustrative catalogue information and is not connected to real bookings, payments or patient reports.</p></footer>

      {bookingOpen && <BookingModal selectedTest={selectedTest} onClose={() => setBookingOpen(false)} />}
      {reportOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) { setReportOpen(false); setReportMessage(''); } }}><section className="modal report-modal" role="dialog" aria-modal="true" aria-labelledby="report-title"><button className="modal-close" aria-label="Close" onClick={() => { setReportOpen(false); setReportMessage(''); }}><X size={20} /></button><div className="modal-icon"><LockKeyhole size={23} /></div><span className="section-kicker">SECURE PATIENT ACCESS</span><h2 id="report-title">Find your report.</h2><p>Enter the details from your lab receipt to continue. Never share an OTP or report PIN with anyone.</p><form onSubmit={handleReportLookup} className="booking-form"><label>Registered mobile number<input required inputMode="numeric" minLength={10} maxLength={10} pattern="[0-9]{10}" value={reportPhone} onChange={(e) => setReportPhone(e.target.value)} placeholder="10-digit mobile number" /></label><label>Lab order / receipt number<input required value={reportId} onChange={(e) => setReportId(e.target.value)} placeholder="Enter your order ID" /></label><button className="button button-primary modal-submit" type="submit">Continue securely <ArrowRight size={17} /></button></form>{reportMessage && <div className="demo-message"><CircleHelp size={18} /><span>{reportMessage}</span></div>}<div className="modal-security-note"><ShieldCheck size={16} /> This page is a demo. No report data is accessed or retrieved.</div></section></div>}
    </main>
  );
}

function BookingModal({ selectedTest, onClose }: { selectedTest: string | null; onClose: () => void }) {
  const [method, setMethod] = useState('home');
  const [slotDate, setSlotDate] = useState('');
  const [slotTime, setSlotTime] = useState('Morning · 7 AM–10 AM');
  const [patientType, setPatientType] = useState('myself');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [notes, setNotes] = useState('');
  const [whatsapp, setWhatsapp] = useState(true);
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const submitRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      if (!name.trim() || !/^[6-9]\d{9}$/.test(phone)) { setErrors('Please enter the patient’s name and a valid 10-digit Indian mobile number.'); return; }
      if (method === 'home' && !/^[1-9][0-9]{5}$/.test(pincode)) { setErrors('Enter a valid 6-digit PIN code so the team can check collection coverage.'); return; }
      if (!slotDate) { setErrors('Choose a preferred date for your request.'); return; }
      setErrors(''); setStep(2); return;
    }
    setErrors(''); setSubmitted(true);
  };

  return <div className="modal-backdrop booking-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><section className="modal booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" aria-label="Close booking form" onClick={onClose}><X size={20} /></button>{submitted ? <div className="success-state"><span className="success-check"><Check size={31} /></span><span className="section-kicker">REQUEST CAPTURED IN THIS DEMO</span><h2>Thanks, {name.split(' ')[0] || 'there'}.</h2><p>Your booking request is ready in this prototype, but it has <strong>not been sent to Lifeline Diagnostic</strong>. A production version needs a secure server, booking database and staff notification workflow.</p><div className="request-summary"><div><span>Patient</span><b>{name}</b></div><div><span>Request</span><b>{selectedTest || 'Test / package to confirm'}</b></div><div><span>Visit type</span><b>{method === 'home' ? 'Home sample collection' : 'Lab visit'}</b></div><div><span>Preferred slot</span><b>{new Date(`${slotDate}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {slotTime}</b></div></div><button className="button button-primary modal-submit" onClick={onClose}>Done <Check size={17} /></button></div> : <><div className="booking-modal-top"><span className="modal-icon"><CalendarDays size={23} /></span><span className="section-kicker">BOOKING REQUEST / 01</span><h2 id="booking-title">Let’s arrange your test.</h2><p>Tell us what works. The team must confirm availability before any appointment is final.</p></div><div className="progress-steps"><span className={step >= 1 ? 'current' : ''}><i>1</i> Your details</span><span className="progress-line" /><span className={step >= 2 ? 'current' : ''}><i>2</i> Review request</span></div><form className="booking-form" onSubmit={submitRequest} noValidate>{step === 1 ? <><div className="form-section-title">How would you like to visit?</div><div className="visit-toggle"><button type="button" className={method === 'home' ? 'active' : ''} onClick={() => setMethod('home')}><Home size={18} /><span><b>Home collection</b><small>We check coverage</small></span>{method === 'home' && <Check size={17} />}</button><button type="button" className={method === 'lab' ? 'active' : ''} onClick={() => setMethod('lab')}><MapPin size={18} /><span><b>Visit the lab</b><small>Confirm the address</small></span>{method === 'lab' && <Check size={17} />}</button></div><div className="form-grid"><label>Patient’s full name<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="As on your ID / prescription" autoComplete="name" /></label><label>Mobile number<input required inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit mobile number" autoComplete="tel-national" /></label><label>Email address <span className="optional-label">OPTIONAL</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" /></label><label>Booking for<select value={patientType} onChange={(e) => setPatientType(e.target.value)}><option value="myself">Myself</option><option value="family">Family member</option><option value="other">Someone else</option></select></label></div>{method === 'home' ? <><div className="form-section-title form-title-spaced">Where should we collect?</div><div className="form-grid"><label>PIN code<input required inputMode="numeric" value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="6-digit PIN code" /></label><label>Area / neighbourhood<input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. Nagpada, Byculla" /></label><label className="full-field">Address and building details<input required value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder="Flat, building, street, landmark" /></label></div><div className="form-hint"><MapPin size={15} /> PIN code is collected for a coverage check only; the website cannot verify service availability yet.</div></> : <div className="form-hint lab-visit-hint"><MapPin size={16} /> The lab’s verified street address and operating hours need to be added here before launch. We’ll ask the team to confirm them.</div>}<div className="form-section-title form-title-spaced">Preferred date and time</div><div className="form-grid"><label>Preferred date<input required type="date" min={today} value={slotDate} onChange={(e) => setSlotDate(e.target.value)} /></label><label>Preferred collection window<select required value={slotTime} onChange={(e) => setSlotTime(e.target.value)}><option>Morning · 7 AM–10 AM</option><option>Late morning · 10 AM–12 PM</option><option>Afternoon · 12 PM–3 PM</option><option>Evening · 3 PM–6 PM</option></select></label></div><label className="full-field notes-label">Test names / doctor’s instructions <span className="optional-label">OPTIONAL</span><textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any test names, timing constraints, or questions" /></label><label className="upload-box"><UploadCloud size={20} /><span><b>{fileName || 'Attach prescription (optional)'}</b><small>PDF, JPG or PNG · file is not uploaded in this demo</small></span><input type="file" accept=".pdf,.jpg,.jpeg,.png,image/jpeg,image/png,application/pdf" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')} /></label><label className="checkbox-line"><input type="checkbox" checked={whatsapp} onChange={(e) => setWhatsapp(e.target.checked)} /><span>Contact me on WhatsApp about this booking request.</span></label><div className="consent-copy">By continuing, you’re asking the lab to contact you about this request. Avoid entering unnecessary sensitive medical information.</div></> : <><div className="review-card"><div className="review-card-heading"><span><ClipboardList size={17} /> REQUEST SUMMARY</span><button type="button" onClick={() => setStep(1)}>Edit details</button></div><div className="review-row"><span>Test / package</span><b>{selectedTest || 'To be confirmed by the team'}</b></div><div className="review-row"><span>Patient</span><b>{name} · {patientType === 'myself' ? 'Myself' : patientType === 'family' ? 'Family member' : 'Someone else'}</b></div><div className="review-row"><span>Phone</span><b>+91 {phone}</b></div>{email && <div className="review-row"><span>Email</span><b>{email}</b></div>}<div className="review-row"><span>Visit method</span><b>{method === 'home' ? 'Home sample collection' : 'Lab visit'}</b></div>{method === 'home' && <><div className="review-row"><span>PIN / area</span><b>{pincode} · {address}</b></div><div className="review-address">{landmark}</div></>}<div className="review-row"><span>Preferred slot</span><b>{new Date(`${slotDate}T12:00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</b></div><div className="review-row"><span>Time window</span><b>{slotTime}</b></div>{fileName && <div className="review-row"><span>Prescription</span><b>{fileName}</b></div>}{notes && <div className="review-row"><span>Notes</span><b>{notes}</b></div>}<div className="review-row"><span>WhatsApp contact</span><b>{whatsapp ? 'Requested' : 'Not requested'}</b></div></div><div className="confirmation-hint"><ShieldCheck size={19} /><span><b>Before we confirm</b><small>Availability, final pricing, test preparation and collection fees should be confirmed by the lab team.</small></span></div></>}{errors && <div className="form-error" role="alert">{errors}</div>}<div className="modal-form-actions">{step === 2 && <button type="button" className="button button-outline" onClick={() => { setStep(1); setErrors(''); }}><ArrowDown size={15} className="back-arrow" /> Back</button>}<button type="submit" className="button button-primary modal-submit">{step === 1 ? 'Review request' : 'Submit demo request'} <ArrowRight size={17} /></button></div><p className="modal-demo-disclaimer">Demo only — no booking, payment, message or file is sent or saved on a server.</p></form></>}</section></div>;
}
