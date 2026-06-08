/**
 * GetYourGuide-Widget-Konfiguration trier-reisen.de
 *
 * Pro Platzierung eine recherchierte Freitext-Suchanfrage (q), Ueberschrift und
 * Einleitung. Recherchiert gegen das echte GetYourGuide-Trier/Mosel-Inventar
 * (siehe Workflow trier-gyg-research). Keys folgen dem Muster
 * "<typ>:<slug>" bzw. "home" / "index:<bereich>".
 *
 * relevant=true  -> GetYourGuide hat konkret passende Aktivitaeten (spezifische q).
 * relevant=false -> nur eine generische Trier-Stadtfuehrung passt; die Anfrage faellt
 *                   dann auf "Trier" o. ae. zurueck. Copy ist trotzdem auf die Seite
 *                   zugeschnitten, daher wird auch hier gerendert.
 */

export type GygPlacement = {
  /** true, wenn GYG konkret passende Touren hat (sonst nicht rendern). */
  relevant: boolean;
  /** Freitext-Suchanfrage fuer data-gyg-q. */
  q: string;
  /** Sektion-Ueberschrift. */
  heading: string;
  /** Ein-Satz-Einleitung. */
  intro: string;
  /** Empfohlene Kartenanzahl (3 oder 4). */
  count: number;
};

export const gygPlacements: Record<string, GygPlacement> = {
  // === SEHENSWUERDIGKEITEN ===
  "sight:porta-nigra": { relevant: true, q: "Porta Nigra Trier Führung", heading: "Touren rund um die Porta Nigra", intro: "Geführte Erlebnistouren bringen euch die Geschichte des römischen Stadttors näher.", count: 4 },
  "sight:amphitheater": { relevant: true, q: "Trier Römer Führung Amphitheater", heading: "Auf den Spuren der Römer", intro: "Geführte Rundgänge erzählen vom Alltag der Römer und ihren Arenen.", count: 3 },
  "sight:kaiserthermen": { relevant: true, q: "Trier Römer Führung Kaiserthermen", heading: "Römisches Trier entdecken", intro: "Führungen durch die antike Kaiserstadt zeigen die Thermen und das Palastviertel.", count: 3 },
  "sight:barbarathermen": { relevant: true, q: "Trier Römer Stadtführung", heading: "Antikes Trier erleben", intro: "Geführte Touren verbinden die römischen Bäder mit weiteren Bauten der Antike.", count: 3 },
  "sight:roemerbruecke": { relevant: true, q: "Trier Römer Stadtrundgang", heading: "Trier zur Römerzeit", intro: "Stadtrundgänge führen entlang der römischen Bauwerke durch die alte Augusta Treverorum.", count: 3 },
  "sight:konstantinbasilika": { relevant: true, q: "Trier Stadtrundgang Highlights Führung", heading: "Highlights der Altstadt", intro: "Geführte Rundgänge zeigen die Konstantinbasilika und weitere Wahrzeichen der Stadt.", count: 3 },
  "sight:igeler-saeule": { relevant: false, q: "Trier", heading: "Aktivitäten in und um Trier", intro: "Geführte Touren und Ausflüge rund um Trier zum Buchen.", count: 3 },
  "sight:trierer-dom": { relevant: true, q: "Trier Stadtrundgang Dom Altstadt", heading: "Touren durch die Altstadt und zum Dom", intro: "Geführte Rundgänge bringen euch zum ältesten Dom Deutschlands und in die historische Altstadt.", count: 4 },
  "sight:liebfrauenkirche": { relevant: false, q: "Trier Stadtführung Altstadt", heading: "Stadtführungen durch Trier", intro: "Geführte Altstadtrundgänge zeigen die Kirchen und Wahrzeichen der Innenstadt.", count: 3 },
  "sight:rheinisches-landesmuseum": { relevant: false, q: "Trier", heading: "Trier entdecken auf einer Stadtführung", intro: "Wer das Römische Trier verstehen will, kombiniert den Museumsbesuch am besten mit einer geführten Tour durch die Altstadt.", count: 3 },
  "sight:stadtmuseum-simeonstift": { relevant: false, q: "Trier", heading: "Stadtgeschichte hautnah erleben", intro: "Geführte Rundgänge durch Triers Altstadt ergänzen den Besuch im Stadtmuseum ideal.", count: 3 },
  "sight:museum-am-dom": { relevant: false, q: "Trier", heading: "Mehr von Trier sehen", intro: "Rund um den Dom lohnt sich eine geführte Tour durch die historische Altstadt.", count: 3 },
  "sight:karl-marx-haus": { relevant: false, q: "Trier", heading: "Trier rund um Karl Marx erkunden", intro: "Den Museumsbesuch lässt sich gut mit einem geführten Spaziergang durch die Altstadt verbinden.", count: 3 },
  "sight:spielzeugmuseum": { relevant: false, q: "Trier", heading: "Trier mit der Familie entdecken", intro: "Nach dem Spielzeugmuseum bietet sich ein gemütlicher Stadtrundgang durch Trier an.", count: 3 },
  "sight:st-matthias": { relevant: false, q: "Trier", heading: "Trier auf eigene Faust und geführt", intro: "Ein geführter Altstadtrundgang verbindet die Basilika St. Matthias mit weiteren Höhepunkten der Stadt.", count: 3 },
  "sight:st-paulin": { relevant: false, q: "Trier", heading: "Triers Kirchen und Altstadt erleben", intro: "Geführte Rundgänge zeigen St. Paulin im Zusammenhang mit Triers reicher Baugeschichte.", count: 3 },
  "sight:dreikoenigenhaus": { relevant: false, q: "Trier", heading: "Mittelalterliches Trier entdecken", intro: "Das Dreikönigenhaus liegt an der Strecke vieler geführter Altstadtrundgänge.", count: 3 },
  "sight:hauptmarkt": { relevant: true, q: "Trier Stadtführung Altstadt", heading: "Stadtführungen ab dem Hauptmarkt", intro: "Der Hauptmarkt ist Ausgangs- und Höhepunkt fast jeder geführten Altstadttour durch Trier.", count: 4 },
  "sight:kurfuerstliches-palais": { relevant: true, q: "Trier Stadtführung Altstadt", heading: "Geführte Touren zum Palais und Palastgarten", intro: "Das Kurfürstliche Palais und der Palastgarten sind feste Stationen geführter Altstadtrundgänge.", count: 3 },
  "sight:mariensaeule": { relevant: false, q: "Trier", heading: "Aussicht und Altstadt verbinden", intro: "Eine geführte Tour durch Trier rundet den Abstecher zur Mariensäule ab.", count: 3 },
  "sight:petrisberg": { relevant: false, q: "Trier", heading: "Trier von oben und im Detail", intro: "Nach dem Blick vom Petrisberg lohnt sich ein geführter Rundgang durch die Stadt.", count: 3 },
  "sight:weinkulturpfad-olewig": { relevant: true, q: "Trier Weinprobe Weinwanderung", heading: "Weinproben und Weinwanderungen in Trier", intro: "Rund um den Olewiger Weinort gibt es geführte Weinwanderungen und Verkostungen Moselaner Weine.", count: 4 },
  "sight:mosel-promenade": { relevant: true, q: "Trier Mosel Schifffahrt", heading: "Schifffahrten auf der Mosel", intro: "Direkt von der Promenade starten Moselrundfahrten und Bootstouren entlang der Weinberge.", count: 4 },

  // === KATEGORIEN ===
  "cat:unesco-welterbe": { relevant: true, q: "Trier Stadtführung Porta Nigra UNESCO", heading: "Touren zu den UNESCO-Welterbestätten", intro: "Geführte Rundgänge zu den römischen Welterbe-Bauten von Trier.", count: 4 },
  "cat:roemisches-erbe": { relevant: true, q: "Trier römische Stadtführung Kaiserthermen", heading: "Auf den Spuren der Römer", intro: "Führungen durch das antike Trier mit Porta Nigra und Kaiserthermen.", count: 4 },
  "cat:wein": { relevant: true, q: "Trier Weinprobe Weinwanderung Mosel", heading: "Weinerlebnisse an der Mosel", intro: "Weinwanderungen und Verkostungen in den Trierer Weinbergen.", count: 4 },
  "cat:museen": { relevant: false, q: "Trier", heading: "Stadtführungen und Erlebnisse in Trier", intro: "Geführte Touren, die Triers Geschichte und Sehenswürdigkeiten verbinden.", count: 3 },
  "cat:religioese-staetten": { relevant: true, q: "Trier Stadtführung Dom Altstadt", heading: "Führungen zu Dom und Altstadt", intro: "Rundgänge durch die historische Altstadt rund um den Trierer Dom.", count: 3 },
  "cat:familie": { relevant: false, q: "Trier", heading: "Erlebnisse für die ganze Familie", intro: "Stadtführungen und Touren, die sich gut mit Kindern erkunden lassen.", count: 3 },
  "cat:kulinarik": { relevant: true, q: "Trier Weinprobe kulinarische Führung", heading: "Kulinarische Touren und Weinproben", intro: "Verkostungen und Genuss-Rundgänge durch Trier und die Mosel.", count: 4 },
  "cat:aussicht-wandern": { relevant: true, q: "Trier Weinwanderung Mosel", heading: "Wanderungen mit Aussicht", intro: "Weinwanderungen durch die Weinberge mit Blick über das Moseltal.", count: 3 },
  "cat:mosel-aktivitaeten": { relevant: true, q: "Mosel Schifffahrt Bootsfahrt Trier", heading: "Aktivitäten auf der Mosel", intro: "Schifffahrten und Bootstouren auf der Mosel ab Trier.", count: 4 },
  "cat:shopping": { relevant: false, q: "Trier", heading: "Touren durch Trier", intro: "Geführte Stadtrundgänge durch die Trierer Innenstadt.", count: 3 },

  // === BEZIRKE ===
  "district:innenstadt": { relevant: true, q: "Trier Altstadt Stadtführung", heading: "Stadtführungen durch die Altstadt", intro: "Geführte Rundgänge durch die Innenstadt zeigen Porta Nigra, Hauptmarkt und Dom auf einem Weg.", count: 4 },
  "district:olewig": { relevant: true, q: "Trier Mosel Weinprobe Weingut", heading: "Weinproben rund um Olewig", intro: "Olewig ist der Weinort von Trier, passend dazu gibt es geführte Weinproben und Weingut-Touren an der Mosel.", count: 4 },
  "district:trier-sued": { relevant: true, q: "Trier römische Stadtführung Kaiserthermen Amphitheater", heading: "Römisches Trier im Süden", intro: "Im Süden liegen Amphitheater und Kaiserthermen, ideal für Führungen zur römischen Geschichte der Stadt.", count: 4 },
  "district:trier-nord": { relevant: false, q: "Trier", heading: "Touren und Erlebnisse in Trier", intro: "Von Trier-Nord aus lassen sich die klassischen Stadtführungen durch die Altstadt gut starten.", count: 3 },
  "district:trier-west-pallien": { relevant: true, q: "Trier Mosel Schifffahrt", heading: "Mosel-Schifffahrten am Westufer", intro: "West-Pallien liegt jenseits der Mosel, passend dazu gibt es Schifffahrten und Bootstouren auf dem Fluss.", count: 4 },
  "district:kuerenz": { relevant: false, q: "Trier", heading: "Stadterlebnisse in Trier", intro: "Aus dem Uni-Viertel Kürenz erreicht man die geführten Touren durch die Trierer Altstadt schnell.", count: 3 },
  "district:pfalzel": { relevant: true, q: "Trier Mosel Schifffahrt", heading: "Mosel-Touren bei Pfalzel", intro: "Pfalzel liegt direkt am Wasser, dazu passen Schifffahrten und Bootstouren auf der Mosel.", count: 3 },
  "district:ruwer-eitelsbach": { relevant: true, q: "Mosel Weinprobe Weingut Trier", heading: "Weinerlebnisse im Ruwertal", intro: "Das Ruwertal ist bekannt für seine Weine, dazu gibt es Weinproben und Weingut-Touren in der Region.", count: 3 },

  // === REISEPLANER ===
  "guide:3-tage-trier": { relevant: true, q: "Trier Stadtführung", heading: "Touren für drei Tage in Trier", intro: "Für ein langes Wochenende lassen sich Stadtführung, Mosel-Schifffahrt und Weinprobe gut kombinieren.", count: 4 },
  "guide:trier-mit-kindern": { relevant: true, q: "Trier Stadtführung Familie", heading: "Familienfreundliche Touren in Trier", intro: "Geführte Rundgänge und eine Mosel-Schifffahrt eignen sich gut für einen Ausflug mit Kindern.", count: 3 },
  "guide:trier-bei-regen": { relevant: true, q: "Trier römische Stadtführung Kaiserthermen", heading: "Touren für Regentage in Trier", intro: "An Regentagen bieten Führungen durch Kaiserthermen, Basilika und Museen Schutz und viel Geschichte.", count: 3 },

  // === EVENTS ===
  "event:antikenfestspiele-2026": { relevant: true, q: "Trier römische Führung Amphitheater", heading: "Auf den Spuren der Römer in Trier", intro: "Passend zu den Antikenfestspielen führen diese Touren zu den römischen Stätten der Stadt.", count: 3 },
  "event:olewiger-weinfest-2026": { relevant: true, q: "Trier Mosel Weinprobe Schifffahrt", heading: "Weinerlebnisse rund um Trier", intro: "Wer das Olewiger Weinfest besucht, kann den Moselwein auch bei diesen Touren entdecken.", count: 3 },
  "event:weihnachtsmarkt-2026": { relevant: true, q: "Trier Stadtführung Altstadt", heading: "Stadtführungen zur Adventszeit", intro: "Vor oder nach dem Weihnachtsmarkt lohnt sich ein geführter Rundgang durch die Altstadt.", count: 3 },
  "event:altstadtfest-2026": { relevant: true, q: "Trier Stadtführung Altstadt Highlights", heading: "Touren durch die Trierer Altstadt", intro: "Diese Rundgänge zeigen die Highlights der Altstadt rund um das Fest.", count: 3 },
  "event:brot-und-spiele-2026": { relevant: true, q: "Trier römische Führung Porta Nigra", heading: "Römisches Trier hautnah", intro: "Zum Römerspektakel Brot und Spiele passen diese Touren zu den antiken Monumenten.", count: 3 },
  "event:mosel-wein-nachts-bummel-2026": { relevant: true, q: "Trier Mosel Weinprobe Schifffahrt", heading: "Moselwein erleben", intro: "Ergänzend zum Wein-Nachts-Bummel gibt es diese Wein- und Schiffstouren an der Mosel.", count: 3 },
  "event:stadtmuseen-lange-nacht-2026": { relevant: true, q: "Trier Stadtführung Geschichte", heading: "Geschichte und Kultur in Trier", intro: "Rund um die lange Nacht der Museen vertiefen diese Führungen die Stadtgeschichte.", count: 3 },

  // === STARTSEITE & INDIZES ===
  "home": { relevant: true, q: "Trier", heading: "Die beliebtesten Erlebnisse in Trier", intro: "Eine Auswahl der meistgebuchten Touren und Aktivitäten in der ältesten Stadt Deutschlands.", count: 4 },
  "index:sehenswuerdigkeiten": { relevant: true, q: "Trier Stadtführung Sehenswürdigkeiten", heading: "Geführte Touren zu den Sehenswürdigkeiten", intro: "Diese Rundgänge verbinden die wichtigsten Bauwerke Triers zu einer Tour.", count: 4 },
  "index:kategorien": { relevant: true, q: "Trier", heading: "Touren nach Interesse", intro: "Ob Römerzeit, Wein oder Altstadt: hier finden sich passende Aktivitäten in Trier.", count: 4 },
  "index:reiseplaner": { relevant: true, q: "Trier", heading: "Aktivitäten für die Reiseplanung", intro: "Beliebte Touren, die sich gut in einen Trier-Aufenthalt einplanen lassen.", count: 4 },
  "index:events": { relevant: true, q: "Trier", heading: "Touren passend zu den Veranstaltungen", intro: "Wer wegen eines Events nach Trier kommt, kombiniert den Besuch gern mit diesen Touren.", count: 4 },
  "index:bezirke": { relevant: true, q: "Trier Stadtführung Altstadt", heading: "Touren durch Triers Stadtteile", intro: "Geführte Rundgänge, die die Viertel und die Altstadt miteinander verbinden.", count: 3 },
};

/** Kampagnen-Tag (data-gyg-cmp) aus dem Key ableiten, z. B. "sight:porta-nigra" -> "sight-porta-nigra". */
export const gygCmp = (key: string) => key.replace(/:/g, "-");

/** Platzierung zum Key holen (null, wenn kein Eintrag existiert). */
export const getGyg = (key: string): GygPlacement | null => gygPlacements[key] ?? null;
