import { FormEvent, ReactNode, useState } from "react";

type Page =
  | "dashboard"
  | "students"
  | "student-form"
  | "teachers"
  | "teacher-form"
  | "absences"
  | "certificate";

type IconName =
  | "grid"
  | "students"
  | "teacher"
  | "calendar"
  | "file"
  | "logout"
  | "search"
  | "plus"
  | "edit"
  | "trash"
  | "chevron"
  | "menu"
  | "close"
  | "eye"
  | "eyeOff"
  | "upload"
  | "camera"
  | "check"
  | "alert"
  | "more";

const icons: Record<IconName, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  students: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  teacher: <><path d="m3 10 9-5 9 5-9 5-9-5Z" /><path d="M7 12.5V17c3 2 7 2 10 0v-4.5M21 10v6" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></>,
  search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></>,
  trash: <><path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff: <><path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 4.3A10.5 10.5 0 0 1 12 4c6.5 0 10 8 10 8a18 18 0 0 1-2 3.1M6.6 6.6C3.8 8.4 2 12 2 12s3.5 8 10 8c1.5 0 2.8-.4 4-1" /></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5M5 20h14" /></>,
  camera: <><path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3Z" /><circle cx="12" cy="13" r="3" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  alert: <><circle cx="12" cy="12" r="10" /><path d="M12 8v5M12 16h.01" /></>,
  more: <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icons[name]}</svg>;
}

function Button({
  children,
  variant = "primary",
  loading = false,
  icon,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  loading?: boolean;
  icon?: IconName;
}) {
  return (
    <button className={`btn btn-${variant} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading ? <span className="spinner" /> : icon ? <Icon name={icon} size={18} /> : null}
      {children}
    </button>
  );
}

function Field({
  label,
  error,
  hint,
  right,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string; right?: ReactNode }) {
  return (
    <label className="field">
      <span className="label">{label}</span>
      <span className="input-wrap">
        <input className={`input ${error ? "input-error" : ""}`} {...props} />
        {right && <span className="input-action">{right}</span>}
      </span>
      {error ? <span className="error-text"><Icon name="alert" size={14} />{error}</span> : hint ? <span className="hint">{hint}</span> : null}
    </label>
  );
}

function SelectField({ label, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: ReactNode }) {
  return <label className="field"><span className="label">{label}</span><select className="input select" {...props}>{children}</select></label>;
}

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "success" | "warning" | "danger" | "info" | "neutral" }) {
  return <span className={`badge badge-${tone}`}><span className="badge-dot" />{children}</span>;
}

function Alert({ children, tone = "success" }: { children: ReactNode; tone?: "success" | "danger" }) {
  return <div className={`alert alert-${tone}`} role="alert"><Icon name={tone === "success" ? "check" : "alert"} size={19} /><span>{children}</span></div>;
}

const navItems: { page: Page; label: string; icon: IconName }[] = [
  { page: "dashboard", label: "Tableau de bord", icon: "grid" },
  { page: "students", label: "Étudiants", icon: "students" },
  { page: "teachers", label: "Enseignants", icon: "teacher" },
  { page: "absences", label: "Absences", icon: "calendar" },
  { page: "certificate", label: "Certificats", icon: "file" },
];

function UniversityMark({ compact = false }: { compact?: boolean }) {
  return <div className={`brand ${compact ? "brand-compact" : ""}`}><span className="brand-mark"><span>U</span></span>{!compact && <span><strong>UniAbsence</strong><small>Administration universitaire</small></span>}</div>;
}

function Sidebar({ page, onPage, open, onClose }: { page: Page; onPage: (page: Page) => void; open: boolean; onClose: () => void }) {
  return (
    <>
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-head"><UniversityMark /><button className="icon-btn close-menu" onClick={onClose} aria-label="Fermer le menu"><Icon name="close" /></button></div>
        <nav className="nav" aria-label="Navigation principale">
          <span className="nav-label">MENU PRINCIPAL</span>
          {navItems.map((item) => <button key={item.page} className={`nav-item ${page === item.page || (page === "student-form" && item.page === "students") || (page === "teacher-form" && item.page === "teachers") ? "active" : ""}`} onClick={() => { onPage(item.page); onClose(); }}><Icon name={item.icon} /><span>{item.label}</span>{item.page === "certificate" && <span className="nav-count">8</span>}</button>)}
        </nav>
        <div className="sidebar-foot"><div className="avatar">AD</div><div><strong>Administrateur</strong><span>admin@univ.fr</span></div></div>
      </aside>
      {open && <button className="scrim" onClick={onClose} aria-label="Fermer le menu" />}
    </>
  );
}

function Topbar({ title, onMenu, onLogout }: { title: string; onMenu: () => void; onLogout: () => void }) {
  return <header className="topbar"><div className="topbar-left"><button className="icon-btn mobile-menu" onClick={onMenu} aria-label="Ouvrir le menu"><Icon name="menu" /></button><div><span className="eyebrow">ESPACE ADMINISTRATEUR</span><h1>{title}</h1></div></div><div className="topbar-user"><div className="avatar avatar-light">AD</div><div className="user-copy"><strong>admin@universite.fr</strong><span>Administrateur</span></div><Button variant="ghost" icon="logout" onClick={onLogout}>Déconnexion</Button></div></header>;
}

function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return <div className="page-heading"><div><h2>{title}</h2><p>{subtitle}</p></div>{action}</div>;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function ActionButtons({ onEdit, onDelete }: { onEdit?: () => void; onDelete?: () => void }) {
  return <div className="actions"><button className="icon-btn edit" onClick={onEdit} aria-label="Modifier"><Icon name="edit" size={17} /></button><button className="icon-btn delete" onClick={onDelete} aria-label="Supprimer"><Icon name="trash" size={17} /></button></div>;
}

const filieres = [
  "Licence en Science Informatique - Big Data et Analyse de Données",
  "Master Recherche en Science Informatique - Data Science",
  "Master Recherche en Automatique & Informatique Industrielle",
  "Master Professionnel en Gestion Maintenance des Systèmes Industriels",
  "Master Professionnel en Génie Mécanique",
  "Master Professionnel en Commandes des Systèmes Industriels",
  "Licence en EEA - Système Electrique",
  "Licence en EEA - Automatique et Informatique Industrielle",
  "Licence en Electonique Electrotecnique & Automatique - EEA Tronc commun",
  "Licence en Génie Informatique - Systèmes Embarqués et Internet des Objets",
  "Licence en Génie Mécanique - Conception et Production Intégrée",
  "Licence en Energétique Nouvelles et Renouvelables",
];

const groupes = ["G1", "G2", "G3"];

const niveaux = ["1ère année", "2ème année", "3ème année"];

const students = [
  ["Benali", "Lina", "20240018", filieres[9], "2ème année", "G1"],
  ["Martin", "Hugo", "20240031", filieres[0], "3ème année", "G2"],
  ["El Amrani", "Sara", "20240044", filieres[6], "1ère année", "G1"],
  ["Dubois", "Théo", "20240052", filieres[9], "1ère année", "G3"],
  ["Alaoui", "Nora", "20240067", filieres[10], "2ème année", "G2"],
];

const teachers = [
  ["Dr. Amine Larbi", "a.larbi@universite.fr", "Algorithmique, Base de données", "Actif"],
  ["Pr. Claire Moreau", "c.moreau@universite.fr", "Microéconomie", "Actif"],
  ["Dr. Youssef Haddad", "y.haddad@universite.fr", "Droit civil, Droit public", "Désactivé"],
  ["Mme. Julie André", "j.andre@universite.fr", "Comptabilité", "Actif"],
];

const absences = [
  ["Lina Benali", "18 juin 2025", "Algorithmique", "Dr. Amine Larbi", "Justifiée"],
  ["Hugo Martin", "17 juin 2025", "Microéconomie", "Pr. Claire Moreau", "En attente"],
  ["Sara El Amrani", "16 juin 2025", "Droit civil", "Dr. Youssef Haddad", "Non justifiée"],
  ["Théo Dubois", "14 juin 2025", "Base de données", "Dr. Amine Larbi", "Justifiée"],
  ["Nora Alaoui", "13 juin 2025", "Comptabilité", "Mme. Julie André", "En attente"],
];

function StatusBadge({ status }: { status: string }) {
  const tone = ["Justifiée", "Accepté", "Actif"].includes(status) ? "success" : status === "En attente" ? "warning" : "danger";
  return <Badge tone={tone}>{status}</Badge>;
}

function Filters({ type, query, onQuery }: { type: "students" | "absences"; query?: string; onQuery?: (value: string) => void }) {
  return <div className="filters"><div className="search"><Icon name="search" size={18} /><input aria-label="Rechercher" placeholder="Rechercher un étudiant..." value={query} onChange={(event) => onQuery?.(event.target.value)} /></div>{type === "students" ? <><SelectField label="Filière"><option>Toutes les filières</option>{filieres.map((f) => <option key={f}>{f}</option>)}</SelectField><SelectField label="Niveau"><option>Tous les niveaux</option>{niveaux.map((n) => <option key={n}>{n}</option>)}</SelectField><SelectField label="Groupe"><option>Tous les groupes</option>{groupes.map((g) => <option key={g}>{g}</option>)}</SelectField></> : <><Field label="Date" type="date" /><SelectField label="Matière"><option>Toutes les matières</option><option>Algorithmique</option><option>Droit civil</option></SelectField><SelectField label="Statut"><option>Tous les statuts</option><option>Justifiée</option><option>En attente</option></SelectField></>}</div>;
}

function Pagination() {
  return <div className="pagination"><span>Affichage de 1 à 5 sur 48 résultats</span><div><Button variant="secondary" disabled>Précédent</Button><button className="page-number active">1</button><button className="page-number">2</button><button className="page-number">3</button><Button variant="secondary">Suivant</Button></div></div>;
}

function Dashboard() {
  const bars = [42, 58, 45, 72, 65, 82, 55, 68, 48, 76, 62, 38];
  return <><PageHeader title="Tableau de bord" subtitle="Vue d’ensemble de l’activité universitaire" /><div className="stats"><StatCard label="Étudiants" value="1 248" detail="+12 ce mois" icon="students" tone="indigo" /><StatCard label="Enseignants" value="86" detail="+3 ce mois" icon="teacher" tone="blue" /><StatCard label="Certificats en attente" value="8" detail="À traiter aujourd’hui" icon="file" tone="orange" /></div><div className="dashboard-grid"><Card className="chart-card"><div className="card-title"><div><h3>Absences par mois</h3><p>Année universitaire 2024–2025</p></div><SelectField label="Période"><option>Cette année</option></SelectField></div><div className="chart-area"><div className="y-axis"><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span></div><div className="bars">{bars.map((height, i) => <div className="bar-column" key={i}><div className="bar-track"><div className="bar" style={{ height: `${height}%` }} /></div><span>{["Sep", "Oct", "Nov", "Déc", "Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août"][i]}</span></div>)}</div></div></Card><Card className="activity-card"><div className="card-title"><div><h3>Activité récente</h3><p>Dernières mises à jour</p></div></div>{[["Certificat validé", "Lina Benali · il y a 12 min", "check"], ["Nouvel étudiant", "Hugo Martin · il y a 1 h", "students"], ["Absence signalée", "Sara El Amrani · il y a 2 h", "calendar"]].map(([title, detail, icon]) => <div className="activity" key={title}><span className="activity-icon"><Icon name={icon as IconName} size={17} /></span><div><strong>{title}</strong><span>{detail}</span></div></div>)}</Card></div><Card><div className="card-title"><div><h3>Dernières absences</h3><p>Les absences enregistrées récemment</p></div><Button variant="ghost">Voir toutes <Icon name="chevron" size={16} /></Button></div><AbsenceTable rows={absences.slice(0, 4)} /></Card></>;
}

function StatCard({ label, value, detail, icon, tone }: { label: string; value: string; detail: string; icon: IconName; tone: string }) {
  return <Card className="stat-card"><div><p>{label}</p><strong>{value}</strong><span>{detail}</span></div><div className={`stat-icon stat-${tone}`}><Icon name={icon} size={24} /></div></Card>;
}

function Students({ onAdd, onEdit }: { onAdd: () => void; onEdit: () => void }) {
  const [query, setQuery] = useState("");
  const visibleStudents = students.filter((row) => row.join(" ").toLocaleLowerCase("fr").includes(query.toLocaleLowerCase("fr")));
  return <><PageHeader title="Étudiants" subtitle="Gérez les étudiants et leurs informations" action={<Button icon="plus" onClick={onAdd}>Ajouter un étudiant</Button>} /><Card><Filters type="students" query={query} onQuery={setQuery} />{visibleStudents.length ? <><div className="table-wrap"><table><thead><tr><th>Nom</th><th>Prénom</th><th>N° d’inscription</th><th>Filière</th><th>Niveau</th><th>Groupe</th><th>Actions</th></tr></thead><tbody>{visibleStudents.map((row) => <tr key={row[2]}>{row.map((cell, i) => <td key={cell} data-label={["Nom", "Prénom", "N° d’inscription", "Filière", "Niveau", "Groupe"][i]}>{i === 0 ? <span className="person"><span className="mini-avatar">{row[1][0]}{row[0][0]}</span>{cell}</span> : cell}</td>)}<td data-label="Actions"><ActionButtons onEdit={onEdit} /></td></tr>)}</tbody></table></div><Pagination /></> : <div className="empty-state"><span><Icon name="search" size={24} /></span><h3>Aucun étudiant trouvé.</h3><p>Modifiez votre recherche ou réinitialisez les filtres.</p><Button variant="secondary" onClick={() => setQuery("")}>Réinitialiser la recherche</Button></div>}</Card></>;
}

function FormLayout({ teacher = false, onCancel }: { teacher?: boolean; onCancel: () => void }) {
  const [saved, setSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [password, setPassword] = useState("Univ-7K9P-X2");
  const submit = (event: FormEvent) => { event.preventDefault(); setSubmitted(true); window.setTimeout(() => setSaved(true), 350); };
  return <><PageHeader title={teacher ? "Créer un compte enseignant" : "Ajouter un étudiant"} subtitle={teacher ? "Créez les accès d’un nouvel enseignant" : "Renseignez les informations du nouvel étudiant"} /><Card className="form-card">{saved && <Alert>{teacher ? "Le compte enseignant a été créé avec succès." : "L’étudiant a été ajouté avec succès."}</Alert>}<form onSubmit={submit}><div className="form-section"><div className="section-title"><span>1</span><div><h3>Informations personnelles</h3><p>Informations d’identité et de contact</p></div></div><div className="form-grid"><Field label="Nom" placeholder="Ex. Benali" error={submitted ? "Le nom est requis." : undefined} /><Field label="Prénom" placeholder="Ex. Lina" />{teacher ? <Field label="Email universitaire" type="email" placeholder="prenom.nom@universite.fr" /> : <><Field label="N° d’inscription (CIN)" placeholder="Ex. 20240018" /><Field label="Email" type="email" placeholder="lina.benali@etudiant.fr" /></>}</div></div><div className="form-section"><div className="section-title"><span>2</span><div><h3>{teacher ? "Accès et enseignement" : "Parcours académique"}</h3><p>{teacher ? "Matières et accès temporaire" : "Affectation de l’étudiant"}</p></div></div><div className="form-grid">{teacher ? <><SelectField label="Matières (sélection multiple)" multiple><option>Algorithmique</option><option>Base de données</option><option>Réseaux</option></SelectField><Field label="Mot de passe temporaire" value={password} onChange={(e) => setPassword(e.target.value)} right={<button type="button" className="generate" onClick={() => setPassword("Univ-" + Math.random().toString(36).slice(2, 8).toUpperCase())}>Générer</button>} /></> : <><SelectField label="Filière"><option value="">Sélectionner une filière</option>{filieres.map((f) => <option key={f}>{f}</option>)}</SelectField><SelectField label="Niveau"><option value="">Sélectionner un niveau</option>{niveaux.map((n) => <option key={n}>{n}</option>)}</SelectField><SelectField label="Groupe"><option value="">Sélectionner un groupe</option>{groupes.map((g) => <option key={g}>{g}</option>)}</SelectField></>}</div></div><div className="form-actions"><Button type="button" variant="secondary" onClick={onCancel}>Annuler</Button><Button type="submit" loading={submitted && !saved}>{teacher ? "Créer le compte" : "Enregistrer"}</Button></div></form></Card></>;
}

function Teachers({ onAdd, onEdit }: { onAdd: () => void; onEdit: () => void }) {
  return <><PageHeader title="Enseignants" subtitle="Gérez les comptes et accès des enseignants" action={<Button icon="plus" onClick={onAdd}>Créer un compte enseignant</Button>} /><Card><div className="filters teacher-filters"><div className="search"><Icon name="search" size={18} /><input aria-label="Rechercher" placeholder="Rechercher un enseignant..." /></div><SelectField label="Statut"><option>Tous les statuts</option><option>Actif</option><option>Désactivé</option></SelectField></div><div className="table-wrap"><table><thead><tr><th>Nom</th><th>Email</th><th>Matières</th><th>Statut</th><th>Actions</th></tr></thead><tbody>{teachers.map((row) => <tr key={row[1]}>{row.map((cell, i) => <td key={cell} data-label={["Nom", "Email", "Matières", "Statut"][i]}>{i === 0 ? <span className="person"><span className="mini-avatar">{cell.split(" ").slice(-1)[0][0]}</span>{cell}</span> : i === 3 ? <StatusBadge status={cell} /> : cell}</td>)}<td data-label="Actions"><ActionButtons onEdit={onEdit} /></td></tr>)}</tbody></table></div><Pagination /></Card></>;
}

function AbsenceTable({ rows, onDetail }: { rows: string[][]; onDetail?: () => void }) {
  return <div className="table-wrap"><table><thead><tr><th>Étudiant</th><th>Date</th><th>Matière</th><th>Enseignant</th><th>Statut</th>{onDetail && <th />}</tr></thead><tbody>{rows.map((row) => <tr key={row[0] + row[1]}>{row.map((cell, i) => <td key={cell} data-label={["Étudiant", "Date", "Matière", "Enseignant", "Statut"][i]}>{i === 0 ? <span className="person"><span className="mini-avatar">{cell.split(" ").map((v) => v[0]).join("")}</span>{cell}</span> : i === 4 ? <StatusBadge status={cell} /> : cell}</td>)}{onDetail && <td className="row-action"><button className="icon-btn" onClick={onDetail} aria-label="Voir le détail"><Icon name="more" /></button></td>}</tr>)}</tbody></table></div>;
}

function Absences({ onAdd, onDetail }: { onAdd: () => void; onDetail: () => void }) {
  return <><PageHeader title="Absences" subtitle="Consultez et traitez les absences signalées" action={<Button icon="plus" onClick={onAdd}>Ajouter un certificat</Button>} /><Card><Filters type="absences" /><AbsenceTable rows={absences} onDetail={onDetail} /><Pagination /></Card></>;
}

function CertificateUpload({ onDetail }: { onDetail: () => void }) {
  const [uploaded, setUploaded] = useState(false);
  const [progress, setProgress] = useState(false);
  const upload = () => { setProgress(true); window.setTimeout(() => { setProgress(false); setUploaded(true); }, 900); };
  return <><PageHeader title="Ajouter un certificat" subtitle="Téléversez et associez un justificatif médical" /><div className="certificate-grid"><Card className="upload-card"><div className="step-label"><span>1</span>Associer le certificat</div><div className="form-grid"><div className="field"><span className="label">Étudiant</span><div className="search select-search"><Icon name="search" size={18} /><input aria-label="Rechercher un étudiant" placeholder="Rechercher par nom ou numéro..." /></div></div><SelectField label="Absence concernée"><option>Sélectionner une absence</option><option>18 juin 2025 · Algorithmique</option></SelectField></div><div className="step-label"><span>2</span>Document justificatif</div>{uploaded ? <div className="file-preview"><div className="file-thumb"><Icon name="file" size={30} /></div><div><strong>certificat_medical_lina.pdf</strong><span>PDF · 1,8 Mo · Téléversement terminé</span></div><Badge tone="success">Prêt</Badge><button className="icon-btn" onClick={() => setUploaded(false)} aria-label="Retirer le fichier"><Icon name="trash" size={17} /></button></div> : <button className="dropzone" onClick={upload}><span className="upload-icon"><Icon name="upload" size={28} /></span><strong>Glissez le certificat ici ou cliquez pour téléverser</strong><span>PDF, JPG ou PNG · 5 Mo maximum</span>{progress && <span className="progress"><span /></span>}</button>}<div className="or"><span>ou</span></div><Button variant="secondary" icon="camera" className="camera-btn">Prendre une photo</Button><div className="form-grid date-fields"><Field label="Date de début" type="date" /><Field label="Date de fin" type="date" /></div><div className="form-actions"><Button variant="danger">Refuser</Button><Button disabled={!uploaded} onClick={onDetail}>Valider le certificat</Button></div></Card><Card className="help-card"><span className="help-icon"><Icon name="file" size={22} /></span><h3>Avant de téléverser</h3><ul><li>Le document doit être lisible et complet.</li><li>Les dates doivent correspondre à l’absence.</li><li>Le fichier ne doit pas dépasser 5 Mo.</li></ul></Card></div></>;
}

function CertificateModal({ onClose }: { onClose: () => void }) {
  return <div className="modal-layer" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-scrim" onClick={onClose} aria-label="Fermer" /><div className="modal"><div className="modal-head"><div><span className="eyebrow">CERTIFICAT MÉDICAL</span><h2 id="modal-title">Détail du justificatif</h2></div><button className="icon-btn" onClick={onClose} aria-label="Fermer"><Icon name="close" /></button></div><div className="modal-body"><div className="document-preview"><div className="paper"><div className="paper-logo">CENTRE MÉDICAL</div><h3>Certificat médical</h3><div className="paper-lines"><span /><span /><span /><span /><span className="short" /></div><div className="stamp">CERTIFIÉ</div></div><div className="preview-controls"><Button variant="secondary">–</Button><span>100 %</span><Button variant="secondary">+</Button></div></div><div className="certificate-info"><div className="info-title"><div><span className="mini-avatar large">LB</span><div><span>Étudiante</span><strong>Lina Benali</strong><small>N° 20240018 · GI-2A</small></div></div><Badge tone="warning">En attente</Badge></div><div className="info-list"><div><span>Absence concernée</span><strong>Algorithmique</strong></div><div><span>Date de l’absence</span><strong>18 juin 2025</strong></div><div><span>Période du certificat</span><strong>Du 18 au 20 juin 2025</strong></div><div><span>Document</span><strong>certificat_medical_lina.pdf</strong></div></div><div className="modal-actions"><Button variant="danger">Refuser</Button><Button icon="check" onClick={onClose}>Valider</Button></div></div></div></div></div>;
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); if (!email || !password) { setError(true); return; } setError(false); setLoading(true); window.setTimeout(onLogin, 700); };
  return <main className="login-page"><div className="login-decoration decoration-one" /><div className="login-decoration decoration-two" /><section className="login-card"><UniversityMark compact /><div className="login-copy"><span className="eyebrow">PORTAIL UNIVERSITAIRE</span><h1>Connexion administrateur</h1><p>Accédez à votre espace de gestion des absences.</p></div>{error && <Alert tone="danger">Email ou mot de passe incorrect.</Alert>}<form onSubmit={submit}><Field label="Email" type="email" placeholder="admin@universite.fr" value={email} onChange={(e) => setEmail(e.target.value)} error={error && !email ? "Veuillez saisir votre email." : undefined} /><Field label="Mot de passe" type={show ? "text" : "password"} placeholder="Saisissez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} error={error && !password ? "Veuillez saisir votre mot de passe." : undefined} right={<button type="button" className="input-icon" onClick={() => setShow(!show)} aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}><Icon name={show ? "eyeOff" : "eye"} size={19} /></button>} /><Button type="submit" loading={loading} className="login-button">{loading ? "Connexion..." : "Se connecter"}</Button></form><p className="secure-note">Accès sécurisé réservé au personnel autorisé</p></section><p className="login-footer">© 2025 Université · Service de gestion académique</p></main>;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;
  const titles: Record<Page, string> = { dashboard: "Tableau de bord", students: "Étudiants", "student-form": "Étudiants", teachers: "Enseignants", "teacher-form": "Enseignants", absences: "Absences", certificate: "Certificats" };
  return <div className="app-shell"><Sidebar page={page} onPage={setPage} open={menuOpen} onClose={() => setMenuOpen(false)} /><div className="main-shell"><Topbar title={titles[page]} onMenu={() => setMenuOpen(true)} onLogout={() => setLoggedIn(false)} /><main className="content">{page === "dashboard" && <Dashboard />}{page === "students" && <Students onAdd={() => setPage("student-form")} onEdit={() => setPage("student-form")} />}{page === "student-form" && <FormLayout onCancel={() => setPage("students")} />}{page === "teachers" && <Teachers onAdd={() => setPage("teacher-form")} onEdit={() => setPage("teacher-form")} />}{page === "teacher-form" && <FormLayout teacher onCancel={() => setPage("teachers")} />}{page === "absences" && <Absences onAdd={() => setPage("certificate")} onDetail={() => setModalOpen(true)} />}{page === "certificate" && <CertificateUpload onDetail={() => setModalOpen(true)} />}</main></div>{modalOpen && <CertificateModal onClose={() => setModalOpen(false)} />}</div>;
}

export default App;