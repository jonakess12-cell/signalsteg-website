/* Signalsteg Messtechnik – Übersichtsseite der Gruppe 7
   Inhalte: daten.json · Freigaben: Dateien freigabe_<ID>.json im Repository (ein Klick + Commit) · status.json für Sonderfälle */

const REPO = 'jonakess12-cell/signalsteg-website';
const BRANCH = 'main';
const GH = `https://github.com/${REPO}`;
const EDIT_STATUS = `${GH}/edit/${BRANCH}/status.json`;

const STATUS = {
  offen:    { kurz: 'offen' },
  pruefen:  { kurz: 'zu prüfen' },
  erledigt: { kurz: 'erledigt' },
  ruhend:   { kurz: 'ruht' }
};

let D = null;      // daten.json
let S = {};        // Status je ID (aus status.json und freigabe_*.json)
let FREI = {};     // freigabe-Dateien: id -> {von, datum}
let apiOk = true;

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const chip = st => `<span class="chip ${st}">${STATUS[st]?.kurz ?? st}</span>`;
const stOf = item => (S[item.id] && S[item.id].status) || item.status || 'offen';
const person = id => D.personen.find(p => p.id === id);
const heute = () => new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

async function laden() {
  const t = Date.now();
  const [d, s] = await Promise.all([
    fetch(`daten.json?t=${t}`).then(r => r.json()),
    fetch(`status.json?t=${t}`).then(r => r.json()).catch(() => ({}))
  ]);
  D = d; S = { ...((s && s.aufgaben) || {}) };
  await freigabenLaden();
  document.getElementById('stand').textContent = `Stand der Inhalte: ${D.stand} · nächste Sitzung: ${D.naechsteSitzung}`;
  nav(); route();
}

/* Freigaben: Dateien freigabe_<id>.json im Repository, gelesen über die öffentliche GitHub-API */
async function freigabenLaden() {
  try {
    const r = await fetch(`https://api.github.com/repos/${REPO}/contents/?ref=${BRANCH}&t=${Date.now()}`);
    if (!r.ok) throw new Error(r.status);
    const files = (await r.json()).filter(f => /^freigabe_.+\.json$/.test(f.name));
    await Promise.all(files.map(async f => {
      const id = f.name.replace(/^freigabe_/, '').replace(/\.json$/, '');
      let info = {};
      try { info = await fetch(f.download_url + '?t=' + Date.now()).then(x => x.json()); } catch { }
      FREI[id] = { ...info, datei: f.name };
      S[id] = { status: info.status || 'erledigt', von: info.von, datum: info.datum };
    }));
  } catch { apiOk = false; }
}

function freigabeLink(a) {
  const besitzer = a.besitzer === 'gemeinsam' ? (a.wer ? person(a.wer) : null) : person(a.besitzer);
  const von = besitzer ? besitzer.name.split(' ')[0] : 'Gruppe';
  const inhalt = JSON.stringify({ status: 'erledigt', von, datum: heute(), aufgabe: a.titel }, null, 2);
  return `${GH}/new/${BRANCH}?filename=${encodeURIComponent('freigabe_' + a.id + '.json')}&value=${encodeURIComponent(inhalt)}`;
}

function alleAufgaben() {
  const list = D.gemeinsam.aufgaben.map(a => ({ ...a, besitzer: 'gemeinsam' }));
  D.personen.forEach(p => p.aufgaben.forEach(a => list.push({ ...a, besitzer: p.id })));
  return list;
}
function zaehle(list) {
  const z = { offen: 0, pruefen: 0, erledigt: 0, ruhend: 0 };
  list.forEach(a => z[stOf(a)] = (z[stOf(a)] || 0) + 1);
  return z;
}
function chipsFuer(list) {
  const z = zaehle(list);
  return ['offen', 'pruefen', 'erledigt'].filter(k => z[k]).map(k => `<span class="chip ${k}">${z[k]} ${STATUS[k].kurz}</span>`).join('');
}

function nav() {
  const h = location.hash;
  const links = [['#/', 'Übersicht'], ['#/anleitung', 'So prüfst du'], ['#/person/gemeinsam', 'Gemeinsam'], ...D.personen.map(p => [`#/person/${p.id}`, p.name.split(' ')[0]])];
  document.getElementById('nav').innerHTML = links.map(([href, t]) =>
    `<a href="${href}" class="${(h === href || (href === '#/' && (h === '' || h === '#/'))) ? 'aktiv' : ''}">${t}</a>`).join('');
}

function route() {
  const h = location.hash.replace(/^#\/?/, '');
  const [teil, arg] = h.split('/');
  const app = document.getElementById('app');
  if (teil === 'person') app.innerHTML = seitePerson(arg);
  else if (teil === 'entwurf') { app.innerHTML = '<p class="laden">Lade Entwurf …</p>'; seiteEntwurf(arg); }
  else if (teil === 'anleitung') app.innerHTML = seiteAnleitung();
  else app.innerHTML = seiteStart();
  nav(); window.scrollTo(0, 0);
}

/* ---------- Übersicht ---------- */
function seiteStart() {
  const F = D.firma, alle = alleAufgaben(), z = zaehle(alle);
  const ges = z.offen + z.pruefen + z.erledigt || 1;
  const mappe = (href, nr, name, sub, list, cls = '') =>
    `<a class="mappe ${cls}" href="${href}"><div class="nr">${nr}</div><h3>${esc(name)}</h3><p>${esc(sub)}</p><div class="chips">${chipsFuer(list)}</div></a>`;

  return `
  <section class="hero">
    <div>
      <h1>${esc(F.name)}</h1>
      <p class="lead">${esc(F.kurz)}</p>
    </div>
    <div class="zaehler">
      <div class="zahl offen"><b>${z.offen}</b><span>zu erledigen</span></div>
      <div class="zahl pruefen"><b>${z.pruefen}</b><span>zu prüfen</span></div>
      <div class="zahl erledigt"><b>${z.erledigt}</b><span>erledigt</span></div>
      <div class="balken">
        <i style="width:${z.erledigt / ges * 100}%;background:var(--erledigt)"></i>
        <i style="width:${z.pruefen / ges * 100}%;background:var(--pruefen)"></i>
        <i style="width:${z.offen / ges * 100}%;background:var(--offen)"></i>
      </div>
    </div>
  </section>

  <div class="hinweis warn"><b>Bis zum ${esc(D.naechsteSitzung)}:</b> Keine Pflichtaufgabe. Die Aufgabenblätter der Figuren ruhen – Claude hat sie trotzdem schon vorbearbeitet, sie liegen in jedem Ordner unter „Vorbereitet“.</div>

  <div class="hinweis">
    <b>Prüfen und freigeben in drei Schritten</b> (<a href="#/anleitung">ausführlich</a>):
    <div class="ablauf drei">
      <div>Ordner öffnen → bei „Zu prüfen“ auf <b>Entwurf öffnen</b>.</div>
      <div>Die Stichproben unten im Entwurf an den <b>Prüf-Dateien</b> nachsehen.</div>
      <div>Passt alles: <b>Freigeben</b> → auf GitHub <b>Commit changes</b>. Fertig.</div>
    </div>
  </div>

  <h2>Ordner</h2>
  <div class="ordner">
    ${mappe('#/person/gemeinsam', 'Gruppe', 'Gemeinsam', 'Arbeitsplatz, Übungen, Sitzung', D.gemeinsam.aufgaben, 'gemeinsam')}
    ${D.personen.map(p => mappe(`#/person/${p.id}`, `Person ${p.nr}`, p.name, p.funktion, p.aufgaben)).join('')}
  </div>

  <h2>Die Firma</h2>
  <div class="raster2">
    <div class="karte"><h3>Steckbrief</h3><dl class="fakten">${F.fakten.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl></div>
    <div class="karte"><h3>Unser Mietvertrag</h3><dl class="fakten">${F.mietvertrag.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl></div>
    <div class="karte"><h3>Was wir anbieten</h3><ul class="knapp">${F.angebot.map(x => `<li>${esc(x)}</li>`).join('')}</ul><p style="font-size:.85rem;color:var(--grau)">${esc(F.saetze)}</p></div>
    <div class="karte"><h3>Was wir nicht zusagen</h3><ul class="knapp">${F.nichtAngebot.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
  </div>

  <h2>Mit wem wir zusammenarbeiten</h2>
  <div class="karte scroll"><table>
    <thead><tr><th>Firma</th><th>Rolle für uns</th><th>Ansprechpersonen</th></tr></thead>
    <tbody>${D.partner.map(p => `<tr><td><b>${esc(p.firma)}</b></td><td>${esc(p.rolle)}</td><td>${esc(p.personen)}</td></tr>`).join('')}</tbody>
  </table></div>

  <h2>Wo wir uns intern nicht einig sind</h2>
  <div class="karte scroll"><table><tbody>${F.streit.map(([k, v]) => `<tr><td style="width:180px"><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`).join('')}</tbody></table></div>`;
}

/* ---------- Anleitung ---------- */
function seiteAnleitung() {
  return `
  <a class="zurueck" href="#/">← Übersicht</a>
  <h1>So prüfst du und gibst frei</h1>
  <div class="karte schritte">
    <ol>
      <li><b>Deinen Ordner öffnen</b> (oben im Menü auf deinen Namen). In der Spalte <b>„Zu prüfen“</b> und unter <b>„Vorbereitet“</b> liegen die Aufgaben, die Claude schon bearbeitet hat.</li>
      <li><b>„Entwurf öffnen“</b> klicken. Du siehst das fertige Ergebnis – jede Zahl hat eine Fundstelle (Datei, Seite, Zeile).</li>
      <li>Oben im Entwurf stehen die <b>Prüf-Dateien</b>. Klick eine an: PDFs öffnen sich im Browser, Excel-Dateien werden heruntergeladen.</li>
      <li>Ganz unten im Entwurf steht <b>„Für die Prüfung“</b> mit 2–4 Stichproben. Schau genau diese Stellen im Original nach. Das ist die eigentliche Prüfung – sie dauert meist nur wenige Minuten.</li>
      <li>Stimmt etwas nicht? Auf <b>„Entwurf auf GitHub bearbeiten“</b> klicken, korrigieren, „Commit changes“ – oder Claude im Chat Bescheid geben.</li>
      <li>Passt alles: <b>„Freigeben“</b> klicken. GitHub öffnet eine fertig ausgefüllte Datei. Du klickst nur unten auf den grünen Knopf <b>„Commit changes“</b> (im Fenster danach noch einmal bestätigen).</li>
      <li>Website neu laden – die Aufgabe steht jetzt unter <b>„Erledigt“</b>, mit deinem Namen und Datum.</li>
    </ol>
  </div>
  <div class="hinweis"><b>Freigabe zurücknehmen:</b> Im Repository die Datei <code>freigabe_…json</code> öffnen, oben rechts „…“ → „Delete file“ → „Commit changes“.</div>
  <div class="hinweis warn"><b>Wer darf freigeben?</b> Jede Person, die im Repository Schreibrechte hat (Settings → Collaborators). Ohne Schreibrechte zeigt GitHub statt „Commit changes“ einen Vorschlag („Propose changes“) – dann muss der Besitzer des Repositorys ihn annehmen.</div>`;
}

/* ---------- Aufgabenkarte ---------- */
function quellenListe(q, offen = false) {
  if (!q || !q.length) return '';
  const name = f => f.replace(/^q_/, '').replace(/_/g, ' ');
  return `<details class="quellen" ${offen ? 'open' : ''}><summary>Prüf-Dateien (${q.length})</summary><ul>${q.map(f =>
    `<li><a href="${encodeURI(f)}" target="_blank" rel="noopener">${esc(name(f))}</a></li>`).join('')}</ul></details>`;
}

function aufgabeKarte(a) {
  const st = stOf(a), s = S[a.id];
  const wer = a.wer ? person(a.wer) : null;
  const kannFreigeben = st !== 'erledigt' && a.entwurf;
  return `<div class="aufgabe ${st}">
    ${a.entwurf ? `<div class="agent">● ${a.ruht ? 'vorbereitet vom KI-Agenten (Aufgabe ruht)' : 'Entwurf vom KI-Agenten'}</div>` : ''}
    <div class="titel">${esc(a.titel)}</div>
    <div class="info">${esc(a.info || '')}</div>
    ${st === 'offen' && a.braucht ? `<div class="braucht"><b>Claude braucht:</b> ${esc(a.braucht)}</div>` : ''}
    <div class="zeile">
      ${a.entwurf ? `<a class="knopf ${kannFreigeben ? '' : 'voll'}" href="#/entwurf/${encodeURIComponent(a.entwurf)}">Entwurf öffnen</a>` : ''}
      ${kannFreigeben ? `<a class="knopf voll" href="${freigabeLink(a)}" target="_blank" rel="noopener" title="Öffnet GitHub mit fertig ausgefüllter Freigabe – nur noch Commit changes klicken">✔ Freigeben</a>` : ''}
      ${wer ? `<span>federführend: <a href="#/person/${wer.id}">${esc(wer.name)}</a></span>` : ''}
      ${s && s.von ? `<span class="ok">✔ freigegeben von ${esc(s.von)}${s.datum ? ', ' + esc(s.datum) : ''}</span>` : ''}
    </div>
    ${quellenListe(a.quellen)}
  </div>`;
}

function seitePerson(id) {
  const istG = id === 'gemeinsam';
  const p = istG ? null : person(id);
  if (!istG && !p) return `<p>Ordner nicht gefunden. <a href="#/">Zur Übersicht</a></p>`;
  const aufgaben = (istG ? D.gemeinsam.aufgaben : p.aufgaben).map(a => ({ ...a, besitzer: istG ? 'gemeinsam' : p.id }));
  const aktuell = aufgaben.filter(a => !(a.ruht && stOf(a) !== 'erledigt'));
  const vorbereitet = aufgaben.filter(a => a.ruht && stOf(a) !== 'erledigt');
  const gruppen = { offen: [], pruefen: [], erledigt: [] }, ruhend = [];
  aktuell.forEach(a => { const st = stOf(a); (gruppen[st] || ruhend).push(a); });
  const spalte = (k, titel) => `<div class="spalte"><h3><span>${titel}</span><span class="anz">${gruppen[k].length}</span></h3>
    ${gruppen[k].length ? gruppen[k].map(aufgabeKarte).join('') : '<div class="leer">Nichts hier.</div>'}</div>`;

  const kopf = istG
    ? `<h1>Gemeinsame Aufgaben</h1><p class="meta">Arbeitsplatz der Gruppe, freiwillige Übungen, nächste Sitzung</p>`
    : `<h1>${esc(p.name)}</h1><p class="meta">Person ${p.nr} · ${esc(p.funktion)} · Kürzel ${esc(p.kuerzel)} · seit ${esc(p.seit)}<br>${esc(p.kontakt)}</p>`;

  let mehr = '';
  if (!istG) {
    const kontakte = p.kontakte.map(k => `<div class="k"><div><b>${esc(k.wer)}</b><small>${esc(k.worum)}</small></div><div>${chip(stOf(k))}</div></div>`).join('');
    mehr = `
    <h2>Mit wem Kontakt aufnehmen</h2>
    <div class="karte kontakte">${kontakte}
      <p style="font-size:.8rem;color:var(--grau);margin:.6rem 0 0">„ruht“ = Lieferung an andere Firmen gilt bis auf Weiteres nicht. Die Nachrichten dafür stehen schon in den vorbereiteten Entwürfen.</p>
    </div>
    <h2>Die Rolle</h2>
    <div class="raster2">
      <div class="karte"><h3>Wer ${esc(p.name.split(' ')[0])} ist</h3><p>${esc(p.profil)}</p></div>
      <div class="karte"><h3>Aktuelle Lage</h3><p>${esc(p.lage)}</p></div>
    </div>
    <div class="karte" style="margin-top:1.2rem"><h3>Entscheidet bis 2.12. (Firmenbriefing Abschn. 19)</h3><p>${esc(p.entscheidung)}</p></div>
    <details class="geheim"><summary>Was nur ${esc(p.name.split(' ')[0])} weiß (Personenbriefing – laut Spielregel nur für diese Figur)</summary><p>${esc(p.geheim)}</p></details>`;
  }

  return `
  <a class="zurueck" href="#/">← Übersicht</a>
  <div class="kopf"><div>${kopf}</div><a class="knopf" href="#/anleitung">So prüfst du</a></div>
  ${apiOk ? '' : '<div class="hinweis warn">Freigaben konnten gerade nicht von GitHub gelesen werden (zu viele Abrufe). In einer Stunde neu laden.</div>'}
  <h2>Aktuelle Aufgaben</h2>
  <div class="spalten">${spalte('offen', 'Zu erledigen')}${spalte('pruefen', 'Zu prüfen')}${spalte('erledigt', 'Erledigt')}</div>
  ${ruhend.length ? `<p style="color:var(--grau);font-size:.85rem">Ruhend: ${ruhend.map(a => esc(a.titel)).join(', ')}</p>` : ''}
  ${vorbereitet.length ? `<h2>Vorbereitet – Aufgabenblätter, die noch ruhen</h2>
    <p class="meta">Diese Blätter gelten erst wieder, wenn der Dozent sie freigibt. Claude hat sie schon bearbeitet – du kannst sie jetzt in Ruhe prüfen und freigeben.</p>
    <div class="vorbereitet">${vorbereitet.map(aufgabeKarte).join('')}</div>` : ''}
  ${mehr}`;
}

/* ---------- Entwurf (Markdown) ---------- */
async function seiteEntwurf(datei) {
  datei = decodeURIComponent(datei || '');
  const app = document.getElementById('app');
  if (!/^[\w.-]+\.md$/.test(datei)) { app.innerHTML = '<p>Ungültiger Entwurf.</p>'; return; }
  const a = alleAufgaben().find(x => x.entwurf === datei);
  try {
    const md = await fetch(`entwurf_${datei}?t=${Date.now()}`).then(r => { if (!r.ok) throw 0; return r.text(); });
    const zur = a ? `#/person/${a.besitzer}` : '#/';
    const st = a ? stOf(a) : null;
    app.innerHTML = `
      <a class="zurueck" href="${zur}">← zurück zum Ordner</a>
      <div class="leiste">
        ${a ? chip(st) : ''}
        ${a && st !== 'erledigt' ? `<a class="knopf voll" href="${freigabeLink(a)}" target="_blank" rel="noopener">✔ Freigeben</a>` : ''}
        <a class="knopf" href="${GH}/edit/${BRANCH}/entwurf_${datei}" target="_blank" rel="noopener">Entwurf auf GitHub bearbeiten</a>
      </div>
      ${a ? quellenListe(a.quellen, true) : ''}
      <article class="doc">${markdown(md)}</article>
      ${a && st !== 'erledigt' ? `<div class="leiste"><a class="knopf voll" href="${freigabeLink(a)}" target="_blank" rel="noopener">✔ Alles geprüft – freigeben</a></div>` : ''}`;
  } catch { app.innerHTML = `<p>Entwurf <code>${esc(datei)}</code> nicht gefunden.</p>`; }
}

/* Kleiner Markdown-Umwandler: Überschriften, Absätze, Listen, Checklisten, Tabellen, Zitate, Code, Bilder, fett/kursiv, Links */
function inline(t) {
  return esc(t)
    .replace(/!\[([^\]]*)\]\(([\w.\-]+\.(?:png|jpg|jpeg|svg))\)/g, '<img src="$2" alt="$1" loading="lazy">')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*]+)\*(?=[\s).,:;!?]|$)/g, '$1<em>$2</em>')
    .replace(/(^|[\s(])_([^_]+)_(?=[\s).,:;!?]|$)/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}
function markdown(src) {
  const z = src.replace(/\r/g, '').split('\n'); let html = '', i = 0;
  const block = /^(#|\||>|```|\s*([-*]|\d+\.)\s)/;
  while (i < z.length) {
    const l = z[i];
    if (!l.trim()) { i++; continue; }
    let m;
    if (l.startsWith('```')) { const c = []; i++; while (i < z.length && !z[i].startsWith('```')) c.push(z[i++]); i++; html += `<pre>${esc(c.join('\n'))}</pre>`; continue; }
    if ((m = l.match(/^(#{1,4})\s+(.*)/))) { const n = m[1].length; html += `<h${n}>${inline(m[2])}</h${n}>`; i++; continue; }
    if (/^---+$/.test(l.trim())) { html += '<hr>'; i++; continue; }
    if (l.startsWith('|')) {
      const rows = []; while (i < z.length && z[i].startsWith('|')) rows.push(z[i++]);
      const cells = r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      const body = rows.filter((r, k) => !(k === 1 && /^\|?\s*:?-+/.test(r)));
      html += '<div class="scroll"><table><thead><tr>' + cells(body[0]).map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' +
        body.slice(1).map(r => '<tr>' + cells(r).map(c => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>';
      continue;
    }
    if (l.startsWith('>')) { const q = []; while (i < z.length && z[i].startsWith('>')) q.push(z[i++].replace(/^>\s?/, '')); html += `<blockquote>${q.map(inline).join('<br>')}</blockquote>`; continue; }
    if (/^\s*([-*]|\d+\.)\s+/.test(l)) {
      const ord = /^\s*\d+\./.test(l); const items = [];
      while (i < z.length && /^\s*([-*]|\d+\.)\s+/.test(z[i])) items.push(z[i++].replace(/^\s*([-*]|\d+\.)\s+/, ''));
      html += `<${ord ? 'ol' : 'ul'}>` + items.map(t => {
        const c = t.match(/^\[( |x)\]\s*(.*)/i);
        return c ? `<li class="check">${c[1].trim() ? '☑' : '☐'} ${inline(c[2])}</li>` : `<li>${inline(t)}</li>`;
      }).join('') + `</${ord ? 'ol' : 'ul'}>`;
      continue;
    }
    const p = []; while (i < z.length && z[i].trim() && !block.test(z[i])) p.push(z[i++]);
    html += `<p>${p.map(inline).join('<br>')}</p>`;
  }
  return html;
}

window.addEventListener('hashchange', route);
laden().catch(e => {
  document.getElementById('app').innerHTML = `<div class="hinweis warn"><b>Die Daten konnten nicht geladen werden.</b><br>
  Wird die Seite direkt als Datei geöffnet (file://), blockiert der Browser das Laden. Online über GitHub Pages funktioniert es. (${esc(e.message || e)})</div>`;
});
