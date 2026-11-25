/*
 * Daten der Plattform.
 * DEPARTMENTS: die Departemente der BFH (Farbe = Akzent im UI).
 * EVENTS: Beispiel-Events. `day` = Tage ab heute, damit der Prototyp nie veraltet.
 * Später durch echte Daten ersetzen (z.B. JSON aus einer API oder einem CMS)
 * und dann `date: "2026-12-03"` statt `day` verwenden.
 */
window.DEPARTMENTS = [
  { id: "wirtschaft", short: "W",    name: "Wirtschaft",                         place: "Bern, Brückenstrasse",  color: "#d9480f" },
  { id: "ti",         short: "TI",   name: "Technik und Informatik",             place: "Biel, Bern, Burgdorf", color: "#1c7ed6" },
  { id: "gesundheit", short: "G",    name: "Gesundheit",                         place: "Bern, Murtenstrasse",  color: "#0ca678" },
  { id: "soziale",    short: "S",    name: "Soziale Arbeit",                     place: "Bern, Hallerstrasse",  color: "#ae3ec9" },
  { id: "hkb",        short: "HKB",  name: "Hochschule der Künste Bern",         place: "Bern, Fellerstrasse",  color: "#e64980" },
  { id: "ahb",        short: "AHB",  name: "Architektur, Holz und Bau",          place: "Biel, Burgdorf",       color: "#a07a2c" },
  { id: "hafl",       short: "HAFL", name: "Agrar-, Forst- und Lebensmittelwissenschaften", place: "Zollikofen", color: "#5c940d" }
];

window.CATEGORIES = [
  { id: "party",    label: "Party & Apéro" },
  { id: "karriere", label: "Karriere" },
  { id: "workshop", label: "Workshop" },
  { id: "vortrag",  label: "Vortrag" },
  { id: "sport",    label: "Sport" },
  { id: "kultur",   label: "Kultur" },
  { id: "info",     label: "Info-Anlass" }
];

window.EVENTS = [
  { id: 1,  dept: "wirtschaft", cat: "karriere", day: 1,  start: "17:30", end: "19:30", title: "Career Talk: Einstieg ins Consulting", location: "Brückenstrasse 73, Raum 201", organizer: "Fachschaft Wirtschaft", price: "gratis", desc: "Drei Alumni erzählen, wie sie den Einstieg in Beratungsfirmen geschafft haben. Danach Q&A und Apéro." },
  { id: 2,  dept: "wirtschaft", cat: "party",    day: 4,  start: "20:00", end: "02:00", title: "Wirtschafts-Semesterparty", location: "Dachstock Reitschule", organizer: "Fachschaft Wirtschaft", price: "CHF 10", desc: "Die Party zum Semesterende. Vorverkauf an der Cafeteria, Abendkasse CHF 15." },
  { id: 3,  dept: "wirtschaft", cat: "workshop", day: 9,  start: "13:00", end: "16:00", title: "Excel & Power BI Crashkurs", location: "Brückenstrasse 73, PC-Raum", organizer: "Tutoring-Team", price: "gratis", desc: "Pivot, XLOOKUP und erste Dashboards. Eigener Laptop mitbringen. Max. 25 Plätze." },
  { id: 4,  dept: "ti",         cat: "workshop", day: 2,  start: "18:00", end: "22:00", title: "Hack Night: KI-Agents bauen", location: "Biel, Quellgasse 21, Makerspace", organizer: "Studierendenverein TI", price: "gratis", desc: "Gemeinsam Prototypen bauen, Pizza inklusive. Alle Skill-Levels willkommen." },
  { id: 5,  dept: "ti",         cat: "vortrag",  day: 7,  start: "12:15", end: "13:00", title: "Lunch Talk: Cybersecurity in der Praxis", location: "Bern, Wankdorffeldstrasse 102", organizer: "Departement TI", price: "gratis", desc: "Ein Security-Engineer zeigt echte Angriffe und wie man sie erkennt. Sandwiches für die ersten 50." },
  { id: 6,  dept: "ti",         cat: "sport",    day: 12, start: "19:00", end: "21:00", title: "Unihockey-Turnier TI vs. AHB", location: "Sporthalle Burgdorf", organizer: "Sportkommission", price: "gratis", desc: "Teams à 5 Personen, Anmeldung bis 3 Tage vorher. Zuschauende willkommen." },
  { id: 7,  dept: "gesundheit", cat: "info",     day: 3,  start: "16:00", end: "17:00", title: "Info-Anlass Praktikum im Ausland", location: "Murtenstrasse 10, Aula", organizer: "International Office", price: "gratis", desc: "Möglichkeiten, Fristen und Finanzierung für Auslandpraktika in Pflege, Physio und Ernährung." },
  { id: 8,  dept: "gesundheit", cat: "workshop", day: 8,  start: "09:00", end: "12:00", title: "Erste-Hilfe-Refresher", location: "Murtenstrasse 10, Skills-Lab", organizer: "Fachschaft Gesundheit", price: "CHF 5", desc: "BLS-AED Auffrischung mit Zertifikat. Anmeldung erforderlich." },
  { id: 9,  dept: "soziale",    cat: "vortrag",  day: 5,  start: "18:30", end: "20:00", title: "Podium: Wohnungsnot in Bern", location: "Hallerstrasse 10, Raum 104", organizer: "Departement Soziale Arbeit", price: "gratis", desc: "Fachleute aus Verwaltung, Gassenarbeit und Politik diskutieren. Offen für alle Studierenden." },
  { id: 10, dept: "soziale",    cat: "party",    day: 11, start: "18:00", end: "23:00", title: "Glühwein-Apéro im Innenhof", location: "Hallerstrasse 10, Innenhof", organizer: "Fachschaft S", price: "gratis", desc: "Warm anziehen! Glühwein, Punsch und Lebkuchen." },
  { id: 11, dept: "hkb",        cat: "kultur",   day: 2,  start: "19:30", end: "21:30", title: "Masterkonzert Jazz", location: "HKB Grosser Konzertsaal, Papiermühlestrasse 13d", organizer: "HKB Musik", price: "gratis", desc: "Abschlusskonzerte des Master Jazz Performance. Freie Platzwahl." },
  { id: 12, dept: "hkb",        cat: "kultur",   day: 6,  start: "17:00", end: "21:00", title: "Vernissage: Werkschau Visuelle Kommunikation", location: "HKB Fellerstrasse 11", organizer: "HKB Gestaltung", price: "gratis", desc: "Arbeiten aus dem Herbstsemester. Mit Bar und DJ ab 19 Uhr." },
  { id: 13, dept: "ahb",        cat: "vortrag",  day: 4,  start: "17:15", end: "18:45", title: "Gastvortrag: Hochhäuser aus Holz", location: "Biel, Solothurnstrasse 102", organizer: "Departement AHB", price: "gratis", desc: "Ein Ingenieurbüro zeigt aktuelle Projekte im mehrgeschossigen Holzbau." },
  { id: 14, dept: "ahb",        cat: "karriere", day: 14, start: "10:00", end: "16:00", title: "Firmenkontaktmesse Bau & Holz", location: "Burgdorf, Pestalozzistrasse 20", organizer: "Career Services", price: "gratis", desc: "Über 30 Firmen suchen Praktikant:innen und Absolvent:innen. CV-Check am Stand der Career Services." },
  { id: 15, dept: "hafl",       cat: "kultur",   day: 5,  start: "17:00", end: "20:00", title: "Hofmarkt & Degustation", location: "Zollikofen, Länggasse 85", organizer: "Fachschaft HAFL", price: "gratis", desc: "Produkte aus den Studierendenprojekten: Käse, Brot, Most. Bargeld oder Twint." },
  { id: 16, dept: "hafl",       cat: "sport",    day: 10, start: "08:00", end: "16:00", title: "Exkursion: Waldtag im Bremgartenwald", location: "Treffpunkt Bahnhof Zollikofen", organizer: "Forstclub", price: "gratis", desc: "Geführte Wanderung mit Förster:innen. Gutes Schuhwerk und Lunch mitnehmen." },
  { id: 17, dept: "wirtschaft", cat: "info",     day: 0,  start: "12:00", end: "13:00", title: "Bachelor Thesis: Q&A zur Themenwahl", location: "Online (Teams)", organizer: "Studiengangleitung BBA", price: "gratis", desc: "Fragen zu Proposal, Betreuung und Fristen. Link wird im Moodle-Kurs publiziert." },
  { id: 18, dept: "ti",         cat: "party",    day: 15, start: "19:00", end: "01:00", title: "TI Christmas Party", location: "Biel, Mensa Quellgasse", organizer: "Studierendenverein TI", price: "CHF 5", desc: "Ugly-Sweater-Contest, Raclette und DJ." }
];
