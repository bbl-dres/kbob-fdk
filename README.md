KBOB BIM-Fachdatenkatalog (Mockup)
==================================

Ein Web-Mockup für den digitalen **BIM-Fachdatenkatalog** der KBOB (Koordinationskonferenz der Bau- und Liegenschaftsorgane der öffentlichen Bauherren).

Diese Anwendung dient als interaktiver Prototyp, um BIM-Anforderungen, Klassifizierungen und Attribute (LOI) für Bauelemente webbasiert zugänglich zu machen.

Über das Projekt
----------------

Der KBOB BIM-Fachdatenkatalog definiert die Informationsanforderungen für die Bestellung und Bewirtschaftung von Bauwerken. Dieses Projekt visualisiert diese Daten als "Single Source of Truth" in einer modernen, responsiven Webanwendung.

**Aktueller Status:** Mockup V1.2 (Clean)

Funktionen
----------

-   **Katalog-Übersicht:** Rasteransicht aller definierten Bauelemente.

-   **Suche & Filter:** Echtzeit-Suche nach Elementnamen und Klassifikationen.

-   **Detailansicht:** Detaillierte Auflistung von:

    -   Klassifizierungen (eBKP-H, BKP)

    -   IFC & Revit Mappings

    -   Geometrie-Anforderungen pro Phase

    -   Informationsanforderungen (LOI) pro Phase

    -   Dokumentationspflichten

-   **Responsive Design:** Optimiert für Desktop und Tablets.

Installation & Nutzung
----------------------

Da die Anwendung Daten per `fetch` aus einer lokalen JSON-Datei lädt, **kann sie nicht direkt über das Dateisystem (`file://`) geöffnet werden** (CORS-Security-Policy moderner Browser).

### Option 1: Lokaler Webserver (Empfohlen für Entwicklung)

1.  Klonen Sie das Repository:

    ```
    git clone [https://github.com/davras5/kbob-fdk.git](https://github.com/davras5/kbob-fdk.git)

    ```

2.  Öffnen Sie den Ordner in Ihrer IDE (z.B. VS Code).

3.  Nutzen Sie eine Extension wie **Live Server**, um die `index.html` zu starten.

### Option 2: Python Simple Server

Wenn Sie Python installiert haben:

```
# Im Projektverzeichnis ausführen
python -m http.server 8000

```

Öffnen Sie danach `http://localhost:8000` im Browser.

### Option 3: GitHub Pages

Das Projekt ist für das Hosting über GitHub Pages optimiert.

1.  Gehen Sie zu den Repository-Settings.

2.  Wählen Sie unter "Pages" den `main` Branch als Source.

3.  Die Seite ist kurz darauf unter `https://davras5.github.io/kbob-fdk/` erreichbar.

Projektstruktur
---------------

```
/
├── index.html           # Hauptanwendung (Single Page Application)
├── data/
│   └── elements.json    # Datensatz der Bauelemente
├── README.md            # Dokumentation
└── .gitignore

```

Tech Stack
----------

-   **HTML5 / CSS3:** Nutzung von CSS Variables für einfaches Theming.

-   **JavaScript (Vanilla):** Keine Frameworks, keine Build-Steps notwendig.

-   **Material Icons:** Einbindung via Google Fonts.

Datenstruktur
-------------

Die Daten liegen in `data/elements.json`. Ein Element ist wie folgt aufgebaut:

```
{
  "id": "e1",
  "title": "Fenster (Aussen)",
  "classification": "eBKP-H E 24.1",
  "lod": true,
  "loi": true,
  "phases": [false, true, true, true, true], // Status für Phasen 2-6
  ...
}

```

Lizenz
------

[Hier Lizenz einfügen, z.B. MIT oder Closed Source je nach KBOB Vorgabe]

*Dies ist ein inoffizielles Mockup zu Demonstrationszwecken.*
