'use strict';
// ─────────────────────────────────────────────────────────────
    // EVENT CODE DICTIONARY  (NIEM v5.0)
    // ─────────────────────────────────────────────────────────────
    const EVENT_CODES = {
      // Receipt
      IAF: { name: 'Receipt Letter Emailed', desc: 'Application receipt notice generated and emailed. USCIS has officially accepted the case into the ELIS system and assigned a receipt number.', cat: 'receipt' },
      IAA: { name: 'Receipt Notice Sent (Mail)', desc: 'A physical receipt notice has been mailed, confirming USCIS received the application.', cat: 'receipt' },
      IAAA: { name: 'Receipt Notice with I-89 Request', desc: 'Receipt notice sent along with a request for I-89 processing.', cat: 'receipt' },
      IAB: { name: 'Modified Receipt Notice 1 Sent', desc: 'A modified receipt notice (type 1) has been sent to the applicant.', cat: 'receipt' },
      IAC: { name: 'Modified Receipt Notice 2 Sent', desc: 'A modified receipt notice (type 2) has been sent to the applicant.', cat: 'receipt' },
      IAD: { name: 'Fee Collected Elsewhere Receipt', desc: 'Receipt notice sent indicating the filing fee was collected at an alternate location.', cat: 'receipt' },
      AALB: { name: 'Received at Lockbox Facility', desc: 'Application package received and logged at the USCIS lockbox facility.', cat: 'receipt' },
      // Background checks
      FTA0: { name: 'Database Checks Received', desc: 'USCIS has received results from background database checks (FBI, biometrics, name checks, etc.). This is a routine and expected step in the adjudication pipeline.', cat: 'checks' },
      FTA1: { name: 'Database Checks Received', desc: 'Follow-up background database check results received — typically occurs as a part of supervisory final adjudication review. In addition, USCIS is actively reviewing your Form I-485, Application to Register Permanent Residence or Adjust Status. The record shows that nothing is outstanding at this time. USCIS will let you know if they need anything from you.', cat: 'checks' },
      FSA0: { name: 'Database Checks Requested', desc: 'USCIS has initiated a request for background database checks from relevant federal agencies.', cat: 'checks' },
      FN: { name: 'Fingerprint / Agency Checks Ordered', desc: 'Fingerprinting and background agency checks have been ordered as part of standard adjudication.', cat: 'checks' },
      FNA: { name: 'Fingerprint Appointment Notice Ordered', desc: 'A biometrics (fingerprint) appointment notice has been ordered and will be mailed to the applicant.', cat: 'checks' },
      FNB: { name: 'Fingerprints Taken at ASC', desc: 'The applicant\'s biometrics (fingerprints, photo, signature) have been collected at a USCIS Application Support Center.', cat: 'checks' },
      FNC: { name: 'FD-258 Sent to FBI', desc: 'The fingerprint card has been submitted to the FBI for background check processing.', cat: 'checks' },
      FNG: { name: 'Fingerprint Processing Complete — Match', desc: 'FBI fingerprint processing is complete; a matching record was identified in FBI databases.', cat: 'checks' },
      FNH: { name: 'Fingerprint Processing Complete — No Match', desc: 'FBI fingerprint processing is complete with no matching record found (clear result).', cat: 'checks' },
      QAA: { name: 'FBI Name Check — No Record', desc: 'FBI name check returned No Record (NR) — the background name check screening cleared with no derogatory information.', cat: 'checks' },
      QAB: { name: 'FBI Name Check — Pending', desc: 'FBI name check is currently In Process (IP) — awaiting results from the FBI.', cat: 'checks' },
      QAE: { name: 'FBI Name Check — Positive Response', desc: 'FBI name check returned a positive response (PR). Additional review or security procedures may be required before adjudication continues.', cat: 'checks' },
      HC: { name: 'Investigative Report Received', desc: 'USCIS has received an investigative report or results from agency background checks.', cat: 'checks' },
      // Interview
      FH: { name: 'Placed in Interview Queue', desc: 'The case has been placed in the interview scheduling queue for a future appointment.', cat: 'interview' },
      FHB: { name: 'Ready for Interview Scheduling', desc: 'The case is fully ready and marked eligible to be scheduled for an interview.', cat: 'interview' },
      FI: { name: 'Interview Force-Scheduled', desc: 'The interview has been force-scheduled outside the standard queue process.', cat: 'interview' },
      FJ: { name: 'Interview Scheduled / Notice Ordered', desc: 'An interview has been formally scheduled and the interview notice has been ordered to be sent to the applicant. This is a major milestone in the I-485 adjudication process.', cat: 'interview' },
      FM: { name: 'Interview Rescheduled', desc: 'The interview appointment has been rescheduled to a new date and time.', cat: 'interview' },
      FL: { name: 'Failed to Appear for Interview', desc: 'The applicant did not appear for the scheduled interview or ADIT processing appointment.', cat: 'interview' },
      HG: { name: 'Interview Conducted', desc: 'The interview has been formally conducted by a USCIS officer. The case is now in post-interview adjudication.', cat: 'interview' },
      IM: { name: 'Interview Notice Sent', desc: 'The official interview appointment notice has been sent to the applicant.', cat: 'interview' },
      FKA: { name: 'Interview Descheduled', desc: 'The interview has been removed from the schedule.', cat: 'interview' },
      FKB: { name: 'Interview Cancelled (per Request)', desc: 'The interview appointment was cancelled based on a formal request.', cat: 'interview' },
      // Processing
      FT0: { name: 'Officer Processing Begun', desc: 'An immigration officer has begun actively reviewing and adjudicating the case.', cat: 'processing' },
      TA: { name: 'Pre-Adjudicated — Under Review', desc: 'The case has been pre-adjudicated and is currently under supervisory or secondary review prior to final decision.', cat: 'processing' },
      FR: { name: 'Adjudication Hold Lifted', desc: 'An adjudication hold previously placed on the case has been lifted; processing has resumed.', cat: 'processing' },
      FT: { name: 'Processing Hold Lifted', desc: 'A processing hold on this case has been lifted.', cat: 'processing' },
      // Holds
      FS: { name: 'Adjudication Hold Placed', desc: 'An adjudication hold has been placed, temporarily pausing any decision-making on this case.', cat: 'hold' },
      KA: { name: 'Supervisory Hold Placed', desc: 'A supervisory hold has been placed on the case. A USCIS supervisor must review and clear this hold before any further action is taken.', cat: 'hold' },
      KBA: { name: 'Supervisory Hold Cleared — Confirmed', desc: 'The supervisory hold has been cleared and the proposed action has been confirmed by the supervisor. Processing can now continue.', cat: 'hold' },
      KBB: { name: 'Supervisory Hold Cleared — Cancelled', desc: 'The supervisory hold was cleared, but the originally proposed action was cancelled.', cat: 'hold' },
      KC: { name: 'Quality Review Hold Placed', desc: 'A quality review hold has been placed to ensure accuracy before the case moves forward.', cat: 'hold' },
      KDA: { name: 'Quality Review Hold Cleared — Confirmed', desc: 'Quality review hold has been cleared and the action confirmed.', cat: 'hold' },
      FLS: { name: 'Sent to Law Enforcement Support Center', desc: 'The case has been referred to the Law Enforcement Support Center (LESC) for law enforcement verification.', cat: 'hold' },
      FLR: { name: 'Returned from Law Enforcement Support Center', desc: 'The case has been returned from LESC following their review. Processing can now resume.', cat: 'hold' },
      // Approved
      DA: { name: 'Application APPROVED / Notice Ordered', desc: 'The application has been APPROVED by USCIS. An official approval notice has been ordered.', cat: 'approved' },
      DH: { name: 'Approved on Service Motion', desc: 'The application has been approved by USCIS on an internal service motion.', cat: 'approved' },
      IEA: { name: 'Approval Notice Sent', desc: 'An official approval notice has been mailed to the applicant.', cat: 'approved' },
      IEE: { name: 'Approval Letter Emailed', desc: 'An approval letter has been emailed to the applicant. The case has been successfully approved.', cat: 'approved' },
      IEC: { name: 'Welcome Notice Sent', desc: 'A welcome notice has been sent — this typically confirms that Lawful Permanent Resident (LPR / Green Card) status has been officially granted.', cat: 'approved' },
      H008: { name: 'Case Approved', desc: 'The USCIS event code H008 signifies that a case, particularly Form I-485 (Application to Register Permanent Residence or Adjust Status), has been approved. The case has been adjudicated and the green card is being processed.', cat: 'approved' },
      // Green card production
      LAA: { name: 'Card Request Sent to Production', desc: 'A Green Card production request has been transmitted to the ICPS card print server.', cat: 'card' },
      LDA: { name: 'Green Card Produced', desc: 'The Permanent Resident Card (Green Card) has been successfully produced.', cat: 'card' },
      LEA: { name: 'Green Card Mailed to Applicant', desc: 'The Green Card has been mailed to the address on file. Expected delivery within 7–10 business days.', cat: 'card' },
      MO: { name: 'EAD Not Produced — Adjustment Granted', desc: 'An Employment Authorization Document was not produced because the Adjustment of Status has been granted. The Green Card replaces EAD authorization.', cat: 'card' },
      // RFE
      IKA: { name: 'Initial Evidence Request Ordered', desc: 'IKA event refers to that USCIS has sent a request for initial evidence (RFE) for your Form I-485, Application to Register Permanent Residence or Adjust Status.  USCIS requires additional supporting documentation before a decision can be issued. Once you submit the response to this RFE, USCIS will resume the case processing to progress further.', cat: 'rfe' },
      FBA: { name: 'Initial Evidence Request Ordered', desc: 'A Request for Evidence (RFE) has been ordered. USCIS requires additional supporting documentation before a decision can be issued.', cat: 'rfe' },
      FBB: { name: 'Additional Evidence Request Ordered', desc: 'A second or additional Request for Evidence has been ordered.', cat: 'rfe' },
      IK: { name: 'Request for Additional Evidence Sent', desc: 'A Request for Evidence (RFE) has been sent by mail. You must respond with the required documentation by the stated deadline.', cat: 'rfe' },
      HA: { name: 'RFE Response Received by USCIS', desc: 'USCIS has received and recorded your response to the Request for Evidence. Adjudication will now continue.', cat: 'rfe' },
      // Denied / Adverse
      EA: { name: 'Denial Notice Ordered', desc: 'A denial notice has been formally ordered for this case.', cat: 'denied' },
      IFA: { name: 'Denial Notice Sent', desc: 'An official denial notice has been mailed to the applicant.', cat: 'denied' },
      FE: { name: 'Intent to Deny Ordered (NOID)', desc: 'A Notice of Intent to Deny (NOID) has been ordered. The applicant will have an opportunity to respond before a final denial is issued.', cat: 'denied' },
      II: { name: 'Notice of Intent to Deny Sent (NOID)', desc: 'A Notice of Intent to Deny (NOID) has been sent. You should carefully review and respond within the stated time period.', cat: 'denied' },
      // Closed
      EX: { name: 'System Closure', desc: 'The case record has been closed in the USCIS ELIS system.', cat: 'closed' },
      EN: { name: 'Case Terminated', desc: 'The case has been terminated; the applicant may have acquired immigration status through other means.', cat: 'closed' },
      EZ: { name: 'Administrative Close', desc: 'The case has been administratively closed by USCIS.', cat: 'closed' },
    };

    const CAT_STYLE = {
      receipt: { cls: 'badge-blue', dot: '#58a6ff', label: 'Receipt' },
      checks: { cls: 'badge-purple', dot: '#bc8cff', label: 'Bg Checks' },
      interview: { cls: 'badge-gold', dot: '#d4a843', label: 'Interview' },
      approved: { cls: 'badge-green', dot: '#3fb950', label: 'Approved' },
      denied: { cls: 'badge-red', dot: '#f85149', label: 'Denied' },
      hold: { cls: 'badge-orange', dot: '#f0883e', label: 'Hold' },
      processing: { cls: 'badge-blue', dot: '#58a6ff', label: 'Processing' },
      card: { cls: 'badge-green', dot: '#3fb950', label: 'Green Card' },
      rfe: { cls: 'badge-red', dot: '#f85149', label: 'RFE' },
      closed: { cls: 'badge-gray', dot: '#8b949e', label: 'Closed' },
      default: { cls: 'badge-gray', dot: '#8b949e', label: 'Event' },
    };

    // ─────────────────────────────────────────────────────────────
    // STATE
    // ─────────────────────────────────────────────────────────────
    let selectedTZ = 'America/Chicago'; // default: Central Time (CT) — CST/CDT
    let currentData = null;
    let themeAuto = true;

    // ─────────────────────────────────────────────────────────────
    // TIMEZONE UTILITIES  (use Intl API — DST-aware)
    // ─────────────────────────────────────────────────────────────
    function getTZAbbr(date, tz) {
      try {
        const parts = new Intl.DateTimeFormat('en-US', {
          timeZone: tz, timeZoneName: 'short'
        }).formatToParts(date instanceof Date ? date : new Date(date));
        return parts.find(p => p.type === 'timeZoneName')?.value || '';
      } catch { return ''; }
    }

    function fmtDateInTZ(ts, tz) {
      if (!ts) return '—';
      try {
        const d = new Date(ts);
        if (isNaN(d)) return '—';
        return d.toLocaleDateString('en-US', {
          timeZone: tz, year: 'numeric', month: 'short', day: 'numeric'
        });
      } catch { return '—'; }
    }

    function fmtTimeInTZ(ts, tz) {
      if (!ts) return '';
      try {
        const d = new Date(ts);
        if (isNaN(d)) return '';
        return d.toLocaleTimeString('en-US', {
          timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: true
        }) + ' ' + getTZAbbr(d, tz);
      } catch { return ''; }
    }

    function fmtFullInTZ(ts, tz) {
      if (!ts) return '—';
      try {
        const d = new Date(ts);
        if (isNaN(d)) return '—';
        return fmtDateInTZ(ts, tz) + ' · ' + fmtTimeInTZ(ts, tz);
      } catch { return '—'; }
    }

    function daysBetween(a, b) {
      return Math.round(Math.abs(new Date(b) - new Date(a)) / 86400000);
    }

    function getInfo(code) {
      return EVENT_CODES[code] || {
        name: `Event: ${code}`,
        desc: `USCIS internal event code "${code}". Refer to NIEM scr:BenefitDocumentStatusCategoryCodeSimpleType v5.0 schema for the full definition.`,
        cat: 'default'
      };
    }
    function getCatStyle(cat) { return CAT_STYLE[cat] || CAT_STYLE.default; }

    // ─────────────────────────────────────────────────────────────
    // LIVE CLOCK  (updates header every 10s)
    // ─────────────────────────────────────────────────────────────
    function updateClock() {
      const now = new Date();
      document.getElementById('liveTimeDisplay').textContent = fmtFullInTZ(now, selectedTZ);
      document.getElementById('liveTZName').textContent = getTZAbbr(now, selectedTZ);
    }

    // ─────────────────────────────────────────────────────────────
    // TIMEZONE DETECTION & CHANGE
    // ─────────────────────────────────────────────────────────────
    function detectUserTZ() {
      const select = document.getElementById('tzSelect');
      select.value = 'America/Chicago';
      selectedTZ = 'America/Chicago';
    }

    function onTZChange() {
      selectedTZ = document.getElementById('tzSelect').value;
      updateClock();
      if (themeAuto) applyAutoTheme();
      if (currentData) renderAll(currentData);
    }

    // ─────────────────────────────────────────────────────────────
    // THEME MANAGEMENT
    // ─────────────────────────────────────────────────────────────
    function applyAutoTheme() {
      try {
        const nowInTZ = new Date().toLocaleString('en-US', { timeZone: selectedTZ, hour12: false, hour: '2-digit', minute: '2-digit' });
        const [h, m] = nowInTZ.split(':').map(Number);
        const nowH = h + m / 60;
        const isDaytime = (nowH >= 7 && nowH < 19);
        setTheme(isDaytime ? 'light' : 'dark');
      } catch {
        const nowH = new Date().getHours() + new Date().getMinutes() / 60;
        setTheme((nowH >= 7 && nowH < 19) ? 'light' : 'dark');
      }
    }

    function setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      updateThumbIcon();
    }

    function updateThumbIcon() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const thumb = document.getElementById('toggleThumb');
      if (thumb) thumb.textContent = isDark ? '🌙' : '☀️';
    }

    function toggleThemeManual() {
      themeAuto = false;
      document.getElementById('autoBadge').classList.remove('active');
      localStorage.setItem('uscis-theme-auto', '0');
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      setTheme(next);
      localStorage.setItem('uscis-theme', next);
    }

    function toggleAutoTheme() {
      themeAuto = !themeAuto;
      const badge = document.getElementById('autoBadge');
      badge.classList.toggle('active', themeAuto);
      if (themeAuto) {
        localStorage.setItem('uscis-theme-auto', '1');
        localStorage.removeItem('uscis-theme');
        applyAutoTheme();
      } else {
        localStorage.setItem('uscis-theme-auto', '0');
      }
    }

    function initTheme() {
      const savedAuto = localStorage.getItem('uscis-theme-auto');
      const savedTheme = localStorage.getItem('uscis-theme');

      if (savedAuto === '0') {
        themeAuto = false;
        document.getElementById('autoBadge').classList.remove('active');
        if (savedTheme) setTheme(savedTheme);
      } else {
        themeAuto = true;
        document.getElementById('autoBadge').classList.add('active');
        applyAutoTheme();
      }
      updateThumbIcon();
    }

    // ─────────────────────────────────────────────────────────────
    // FILE HANDLING
    // ─────────────────────────────────────────────────────────────
    function handleFile(evt) {
      const file = evt.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        document.getElementById('jsonInput').value = e.target.result;
        parseJSON();
      };
      reader.readAsText(file);
    }

    function clearAll() {
      document.getElementById('jsonInput').value = '';
      document.getElementById('output').style.display = 'none';
      document.getElementById('emptyState').style.display = 'block';
      document.getElementById('errorBar').classList.remove('show');
      document.getElementById('fileInput').value = '';
      currentData = null;
    }

    function showErr(msg) {
      const e = document.getElementById('errorBar');
      e.innerHTML = '<strong>⚠ Error:</strong> ' + msg;
      e.classList.add('show');
    }

    // ─────────────────────────────────────────────────────────────
    // PARSE & RENDER ORCHESTRATOR
    // ─────────────────────────────────────────────────────────────
    function parseJSON() {
      const raw = document.getElementById('jsonInput').value.trim();
      document.getElementById('errorBar').classList.remove('show');
      if (!raw) { showErr('Please paste or upload a JSON file first.'); return; }

      let parsed;
      try { parsed = JSON.parse(raw); }
      catch (e) { showErr('Invalid JSON — ' + e.message); return; }

      const d = parsed.data || parsed;
      if (!d.receiptNumber && !d.formType && !d.events) {
        showErr('This does not appear to be a USCIS API JSON. Expected fields like "receiptNumber", "formType", or "events".');
        return;
      }

      currentData = d;
      document.getElementById('emptyState').style.display = 'none';
      document.getElementById('output').style.display = 'block';
      renderAll(d);
      window.scrollTo({ top: document.getElementById('statBar').offsetTop - 20, behavior: 'smooth' });
    }

    function renderAll(d) {
      const tz = selectedTZ;
      const events = d.events || [];
      const notices = d.notices || [];
      const subTs = d.submissionTimestamp || d.submissionDate;
      const updTs = d.updatedAtTimestamp || d.updatedAt;
      const today = new Date();
      const codes = events.map(e => e.eventCode);

      const isClosed = d.closed === true;
      const isApproved = codes.some(c => ['DA', 'DH', 'IEA', 'IEE', 'IEC', 'H008'].includes(c));
      const isDenied = codes.some(c => ['EA', 'IFA'].includes(c));
      const caseEnded = isClosed || isApproved || isDenied;

      let daysSub, daysLabel, daysTitle;
      if (caseEnded && updTs) {
        daysSub = daysBetween(subTs, updTs);
        daysLabel = 'Days (Filing → Close)';
        daysTitle = `Calculated from submission date to last case update (${fmtDateInTZ(updTs, tz)}) — case is closed/decided.`;
      } else {
        daysSub = daysBetween(subTs, today);
        daysLabel = 'Days Since Filing';
        daysTitle = `Calculated from submission date to today (${fmtDateInTZ(today, tz)}) — case is still in progress.`;
      }

      document.getElementById('statBar').innerHTML = [
        { val: daysSub, lbl: daysLabel, title: daysTitle },
        { val: events.length, lbl: 'System Events', title: 'Total ELIS event codes recorded for this case' },
        { val: notices.length, lbl: 'Official Notices', title: 'Official USCIS notices issued (interview, approval, etc.)' },
        { val: d.formType || '—', lbl: 'Form Type', title: d.formName || '' },
      ].map(s => `<div class="stat-pill" title="${s.title || ''}"><div class="stat-pill-val">${s.val}</div><div class="stat-pill-label">${s.lbl}</div></div>`).join('');

      const f = ts => fmtFullInTZ(ts, tz);
      const badge = (cls, dot, txt) => `<span class="badge ${cls}"><span class="dot"></span>${txt}</span>`;
      const openBadge = d.closed === false ? badge('badge-green', '', 'Open &amp; Active') : badge('badge-gray', '', 'Closed');
      const adjBadge = d.ackedByAdjudicatorAndCms ? badge('badge-gold', '', 'Ack\'d by Adjudicator &amp; CMS') : badge('badge-gray', '', 'Pending');
      const premBadge = d.isPremiumProcessed ? badge('badge-purple', '', 'Premium Processing') : badge('badge-gray', '', 'Standard Processing');
      const grpBadge = d.areAllGroupStatusesComplete ? badge('badge-green', '', 'All Complete') : badge('badge-orange', '', 'Pending');
      const travelBadge = d.areAllGroupMembersAuthorizedForTravel ? badge('badge-green', '', 'Authorized') : badge('badge-gray', '', 'Not Yet Authorized');
      const actionBadge = d.actionRequired ? badge('badge-red', '', 'Action Required!') : badge('badge-green', '', 'No Action Needed');
      const rfeBadge = (d.evidenceRequests || []).length > 0 ? badge('badge-red', '', 'Evidence Requested') : badge('badge-green', '', 'None Pending');

      document.getElementById('caseDetailsGrid').innerHTML = `
    <div class="card">
      <div class="card-title"><span class="card-title-icon" style="background:var(--gold-dim)">📋</span>Application Information</div>
      <div class="detail-row"><span class="detail-key">Receipt Number</span><span class="detail-val mono" style="color:var(--gold);font-size:14px">${d.receiptNumber || '—'}</span></div>
      <div class="detail-row"><span class="detail-key">Form Type</span><span class="detail-val">${d.formType || '—'}</span></div>
      <div class="detail-row"><span class="detail-key">Form Name</span><span class="detail-val" style="font-size:12px">${d.formName || '—'}</span></div>
      <div class="detail-row"><span class="detail-key">Applicant Name</span><span class="detail-val">${d.applicantName || '—'}</span></div>
      <div class="detail-row"><span class="detail-key">Filed</span><span class="detail-val mono" style="font-size:12px">${fmtFullInTZ(subTs, 'UTC')}</span></div>
      <div class="detail-row"><span class="detail-key">Last Updated</span><span class="detail-val mono" style="font-size:12px">${f(updTs)}</span></div>
      <div class="detail-row"><span class="detail-key">Filing Channel</span><span class="detail-val">${d.elisChannelType || '—'}</span></div>
    </div>
    <div class="card">
      <div class="card-title"><span class="card-title-icon" style="background:var(--green-dim)">✅</span>Case Flags &amp; Status</div>
      <div class="detail-row"><span class="detail-key">Case Status</span><span class="detail-val">${openBadge}</span></div>
      <div class="detail-row"><span class="detail-key">Adjudicator Status</span><span class="detail-val">${adjBadge}</span></div>
      <div class="detail-row"><span class="detail-key">Processing Type</span><span class="detail-val">${premBadge}</span></div>
      <div class="detail-row"><span class="detail-key">Group Status</span><span class="detail-val">${grpBadge}</span></div>
      <div class="detail-row"><span class="detail-key">Travel Authorization</span><span class="detail-val">${travelBadge}</span></div>
      <div class="detail-row"><span class="detail-key">Action Required</span><span class="detail-val">${actionBadge}</span></div>
      <div class="detail-row"><span class="detail-key">Evidence Requests</span><span class="detail-val">${rfeBadge}</span></div>
    </div>`;

      if (notices.length > 0) {
        document.getElementById('noticesSection').style.display = 'block';
        const sorted = [...notices].sort((a, b) => new Date(b.generationDate) - new Date(a.generationDate));
        document.getElementById('noticesList').innerHTML = sorted.map(n => `
      <div class="notice-item">
        <div class="notice-top">
          <span class="notice-type">${n.actionType || 'Notice'}</span>
          <span class="notice-date">Generated: ${f(n.generationDate)}</span>
        </div>
        ${n.appointmentDateTime ? `<div class="notice-appt">📅 Appointment: <strong>${f(n.appointmentDateTime)}</strong></div>` : ''}
        <div class="notice-meta">Receipt: ${n.receiptNumber} &nbsp;·&nbsp; Letter ID: ${n.letterId}</div>
      </div>`).join('');
      } else {
        document.getElementById('noticesSection').style.display = 'none';
      }

      const submitEvent = events.find(ev => ev.eventCode === 'IAF' || ev.eventCode === 'IAA' || ev.eventCode === 'AALB');
      const submissionDisplayTs = submitEvent ? (submitEvent.eventTimestamp || submitEvent.eventDateTime || subTs) : subTs;

      const allItems = [
        ...events.map(ev => ({
          type: 'event',
          sortTs: ev.createdAtTimestamp || ev.eventTimestamp,
          displayTs: ev.createdAtTimestamp || ev.eventTimestamp,
          code: ev.eventCode,
          eventId: ev.eventId,
          rawEventDateTime: ev.eventDateTime || '',
          rawEventTimestamp: ev.eventTimestamp || '',
        })),
        {
          type: 'submission',
          sortTs: subTs,
          displayTs: submissionDisplayTs,
          code: 'SUBMIT',
        },
      ];

      if (updTs) {
        const updTime = new Date(updTs);
        const maxEvTime = events.reduce((m, ev) => {
          const t = new Date(ev.eventTimestamp || ev.createdAtTimestamp);
          return t > m ? t : m;
        }, new Date(0));
        if (updTime > maxEvTime) {
          allItems.push({
            type: 'silent-update',
            sortTs: updTs,
            displayTs: updTs,
            code: 'SILENT-UPDATE',
          });
        }
      }

      allItems.sort((a, b) => new Date(b.sortTs) - new Date(a.sortTs));

      const tlHTML = allItems.map((item, i) => {
        const isLast = i === allItems.length - 1;
        const dateStr = fmtDateInTZ(item.displayTs, tz);
        const timeStr = fmtTimeInTZ(item.displayTs, tz);

        if (item.type === 'submission') {
          const subDateStr = fmtDateInTZ(item.displayTs, 'UTC');
          const subTimeStr = fmtTimeInTZ(item.displayTs, 'UTC');
          return `<div class="timeline-item"><div class="tl-date"><div class="tl-date-main">${subDateStr}</div><div class="tl-date-time">${subTimeStr}</div></div><div class="tl-spine"><div class="tl-dot" style="border-color:var(--blue);background:var(--blue)"></div>${isLast ? '' : '<div class="tl-line"></div>'}</div><div class="tl-content"><div class="tl-content-top"><div class="tl-event-name">Application Filed &amp; Submitted</div><span class="tl-event-code">SUBMIT</span></div><div class="tl-badges"><span class="badge badge-blue">Filing</span></div><div class="tl-event-desc">The <strong>${d.formType || 'I-485'}</strong> application was submitted to USCIS via <strong>${d.elisChannelType || 'Lockbox'}</strong> and entered into the ELIS system. Receipt number assigned: <strong>${d.receiptNumber || '—'}</strong>.</div><div class="tl-event-id">Filing date shown in UTC (Zulu time) — fixed submission date regardless of timezone</div></div></div>`;
        }

        if (item.type === 'silent-update') {
          return `<div class="timeline-item"><div class="tl-date"><div class="tl-date-main">${dateStr}</div><div class="tl-date-time">${timeStr}</div></div><div class="tl-spine"><div class="tl-dot" style="border-color:var(--purple);background:var(--purple)"></div>${isLast ? '' : '<div class="tl-line"></div>'}</div><div class="tl-content"><div class="tl-content-top"><div><div class="tl-event-name">Silent Case Update</div><div class="tl-badges"><span class="badge badge-purple">Officer Touch</span></div></div><span class="tl-silent-code">SILENT-UPDATE</span></div><div class="tl-event-desc">The case record was updated by USCIS without a formal recorded event code. This typically indicates an officer touched or reviewed the case — such as a supervisory update, internal system note, or case reassignment — that did not generate a standard ELIS event entry.</div><div class="tl-event-id">Source: updatedAtTimestamp field in case record</div></div></div>`;
        }

        const info = getInfo(item.code);
        const style = getCatStyle(info.cat);
        return `<div class="timeline-item"><div class="tl-date"><div class="tl-date-main">${dateStr}</div><div class="tl-date-time">${timeStr}</div></div><div class="tl-spine"><div class="tl-dot" style="border-color:${style.dot}"></div>${isLast ? '' : '<div class="tl-line"></div>'}</div><div class="tl-content"><div class="tl-content-top"><div class="tl-event-name">${info.name}</div><span class="tl-event-code">${item.code}</span></div><div class="tl-badges"><span class="badge ${style.cls}">${style.label}</span></div><div class="tl-event-desc">${info.desc}</div>${item.eventId ? `<div class="tl-event-id">Event ID: ${item.eventId} · Date/time based on createdAtTimestamp${item.rawEventDateTime ? ` · eventDateTime: ${fmtFullInTZ(item.rawEventTimestamp || item.rawEventDateTime, tz)}` : ''}</div>` : `<div class="tl-event-id">Date/time based on createdAtTimestamp${item.rawEventDateTime ? ` · eventDateTime: ${fmtFullInTZ(item.rawEventTimestamp || item.rawEventDateTime, tz)}` : ''}</div>`}</div></div>`;
      }).join('');

      document.getElementById('timeline').innerHTML = tlHTML;
      renderSummary(d, events, notices, codes, daysSub, tz);
    }

    function renderSummary(d, events, notices, codes, daysSub, tz) {
      const f = ts => fmtFullInTZ(ts, tz);
      const applicant = d.applicantName || 'the applicant';
      const form = d.formType || 'I-485';

      const isApproved = codes.some(c => ['DA', 'DH', 'IEA', 'IEE', 'IEC', 'H008'].includes(c));
      const isDenied = codes.some(c => ['EA', 'IFA'].includes(c));
      const hasInterview = codes.some(c => ['FJ', 'HG'].includes(c));
      const hasPostIvChk = codes.includes('FTA1');
      const hasBgChecks = codes.some(c => ['FTA0', 'FTA1'].includes(c));
      const hasRFE = codes.some(c => ['FBA', 'FBB', 'IK'].includes(c));
      const hasCardProduced = codes.includes('LDA');
      const hasCardMailed = codes.includes('LEA');
      const hasCardRequested = codes.includes('LAA');
      const hasDecision = isApproved || isDenied || codes.includes('H008') || hasCardProduced;
      const isAdjAcked = d.ackedByAdjudicatorAndCms;
      const isClosed = d.closed === true;

      const interviewWaived = hasDecision && !hasInterview;

      let stageIdx = 0;
      if (codes.some(c => ['IAF', 'IAA', 'AALB'].includes(c))) stageIdx = 1;
      if (hasBgChecks) stageIdx = 2;
      if (hasInterview) stageIdx = 3;
      if (hasInterview && hasPostIvChk) stageIdx = 4;
      if (interviewWaived) stageIdx = 5;
      if (hasDecision) stageIdx = 5;

      let stages;
      if (interviewWaived) {
        stages = [
          { name: 'Filed', done: stageIdx >= 1 },
          { name: 'Receipt', done: stageIdx >= 1 },
          { name: 'Bg Checks', done: stageIdx >= 2 },
          { name: 'Interview Waived', done: true },
          { name: 'Decision', done: stageIdx >= 5 },
        ];
      } else {
        stages = [
          { name: 'Filed', done: stageIdx >= 1 },
          { name: 'Receipt', done: stageIdx >= 1 },
          { name: 'Bg Checks', done: stageIdx >= 2 },
          { name: 'Interview', done: stageIdx >= 3 },
          { name: 'Post-Interview', done: stageIdx >= 4, active: stageIdx === 4 },
          { name: 'Decision', done: stageIdx >= 5, active: stageIdx === 4 },
        ];
      }

      const stepsHTML = stages.map((s, i) => {
        let cls = 'pending', icon = (i + 1).toString();
        if (s.done && !s.active) { cls = 'done'; icon = '✓'; }
        else if (s.active) { cls = 'active'; icon = '●'; }

        const connCls = i < stages.length - 1
          ? (stages[i + 1].done ? 'filled' : (s.done ? 'active' : 'pending'))
          : '';
        return `<div class="progress-step"><div class="progress-step-inner"><div class="progress-step-dot ${cls}">${icon}</div><div class="progress-step-name">${s.name}</div></div></div>${i < stages.length - 1 ? `<div class="progress-connector ${connCls}"></div>` : ''}`;
      }).join('');

      const updTs = d.updatedAtTimestamp || d.updatedAt;
      const lastUpdStr = updTs ? f(updTs) : '—';

      document.getElementById('summaryCard').innerHTML = `<div class="sum-header"><div class="sum-icon">🗽</div><div><div class="sum-title">Case Overview — ${d.receiptNumber || 'Unknown'}</div><div class="sum-sub">${d.formName || form} &nbsp;·&nbsp; Applicant: <strong>${applicant}</strong></div></div></div><div class="sum-stats"><div class="sum-stat"><div class="sum-stat-val">${daysSub}</div><div class="sum-stat-lbl">Days since filing</div></div><div class="sum-stat"><div class="sum-stat-val">${events.length}</div><div class="sum-stat-lbl">System events logged</div></div><div class="sum-stat"><div class="sum-stat-val">${notices.length}</div><div class="sum-stat-lbl">Official notices issued</div></div></div><div class="progress-track"><div class="progress-label">Adjudication Progress</div><div class="progress-steps">${stepsHTML}</div></div><div class="sum-body"><p><strong>Your case analysis:</strong> Case is currently in progress. Stay tuned for updates.</p><p>Case record last updated: <strong>${lastUpdStr}</strong>.</p><p style="color:var(--green)">✓ Continue monitoring your USCIS online account for updates.</p></div>`;
    }

    // ─────────────────────────────────────────────────────────────
    // QUICK FETCH — Receipt number → USCIS API URL opener
    // ─────────────────────────────────────────────────────────────
    const USCIS_API_BASE = 'https://my.uscis.gov/account/case-service/api/cases/';

    function onQFInput() {
      const raw = document.getElementById('qfReceiptInput').value.trim().toUpperCase();
      const btn = document.getElementById('qfOpenBtn');
      const urlDisplay = document.getElementById('qfUrlDisplay');

      const valid = /^IOE[0-9]{7,11}$/.test(raw);
      btn.disabled = !valid;

      if (raw.length > 2) {
        const url = USCIS_API_BASE + raw;
        urlDisplay.textContent = url;
        urlDisplay.classList.toggle('visible', raw.length >= 5);
      } else {
        urlDisplay.classList.remove('visible');
      }

      document.getElementById('qfReceiptInput').value = raw;
    }

    function openUSCISAPI() {
      const raw = document.getElementById('qfReceiptInput').value.trim().toUpperCase();
      if (!raw) return;
      const url = USCIS_API_BASE + raw;
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    // ─────────────────────────────────────────────────────────────
    // INITIALIZE
    // ─────────────────────────────────────────────────────────────
    window.addEventListener('DOMContentLoaded', () => {
      detectUserTZ();
      initTheme();
      updateClock();
      setInterval(updateClock, 10000);
      setInterval(() => { if (themeAuto) applyAutoTheme(); }, 5 * 60 * 1000);
    });
