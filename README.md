# Lifeline Diagnostic — Next.js website prototype

A responsive, patient-friendly diagnostic laboratory website concept for a Mumbai-based pathology lab. Built with Next.js App Router, React, TypeScript and plain CSS. Designed to deploy to Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build for production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this project to a Git repository.
2. Import the repository into Vercel.
3. Keep the framework preset as Next.js and deploy. No environment variables are required for the demo.

## What's implemented

- Responsive homepage with diagnostic-lab branding and clear pathways.
- Searchable test catalogue and health-concern filters.
- Illustrative test cards and health checkup package cards.
- Multi-step booking request UI with home collection/lab visit selection, patient details, date/time preference, PIN-code validation, preparation notes, optional prescription file selection and WhatsApp opt-in.
- Request review step and clear prototype-only confirmation state.
- Report lookup UI that explicitly explains it is not connected to a live laboratory system.
- FAQ accordions, service explanation, trust messaging and accessible mobile navigation.
- SEO metadata and Open Graph metadata.

## Important before launch

This is a polished front-end prototype, not a complete connected laboratory platform. It does not store or transmit bookings, upload prescriptions, send WhatsApp/SMS, take payment, validate actual Mumbai collection coverage, or retrieve patient reports. Those require server-side integrations and operational verification.

The displayed test catalogue, test counts, package inclusions, prices, turnaround times, and sample-preparation copy are illustrative placeholders. Replace them with the lab's approved catalogue. Do not claim NABL/CAP accreditation, certifications, patient counts, doctor consultation, or guaranteed report times unless verified and current. Add Lifeline Diagnostic's real registered address, phone number, hours, maps, policies, supported PIN codes, booking notifications and LIS/patient portal integrations before production launch.

### Suggested production integration plan

- Booking API + database with server-side validation, anti-spam and appointment status notifications.
- Secure prescription upload storage with strict access controls, data minimisation, retention and deletion policy.
- OTP authentication and an authorised patient-report integration with the lab's LIS; never expose report files by predictable URL.
- WhatsApp Business API or an approved provider for opt-in appointment and report-ready notifications.
- Consent, privacy notice, terms, clinician-approved preparation instructions and accurate local availability/pricing.
- If payment is required, connect a provider through server-side order creation and verified webhooks; do not trust client-side payment status.
