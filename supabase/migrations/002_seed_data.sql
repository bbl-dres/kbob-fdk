-- KBOB Fachdatenkatalog - Data Seed
-- Generated from JSON files
-- Run this in Supabase SQL Editor after running 001_create_tables.sql

-- Clear existing data (optional - comment out if you want to preserve data)
TRUNCATE elements, usecases, documents, models, epds CASCADE;

-- ===========================================
-- ELEMENTS DATA
-- ===========================================
INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    'e1',
    'Fenster (Aussen)',
    'assets/img/window.jpg',
    'Architektur',
    'Standard-Aussenfenster mit 3-fach Verglasung und Holz-Alu Rahmen.',
    '["Planung","Realisierung","Betrieb","Dokumentation","Objektplanung"]'::jsonb,
    '[{"system":"eBKP-H","code":"E4.1","desc":"Fenster, Fenstertüren"},{"system":"Uniformat II 2010","code":"B2020","desc":"Exterior Windows"}]'::jsonb,
    '[{"element":"Fenster","ifc":"IfcWindow.WINDOW","revit":"Windows"},{"element":"Oberlicht","ifc":"IfcWindow.SKYLIGHT","revit":"Windows"}]'::jsonb,
    '[{"name":"Länge","desc":"Gesamtlänge des Elements","phases":[1,2,3,4]},{"name":"Breite","desc":"Gesamtbreite des Elements","phases":[1,2,3,4]},{"name":"Höhe","desc":"Gesamthöhe des Elements","phases":[1,2,3,4]},{"name":"Brüstungshöhe","desc":"Abstand von OKFFB bis Unterkante Fenster","phases":[1,2,3,4]},{"name":"Repräsentative Modellierung","desc":"Vereinfachte Darstellung für Pläne 1:50","phases":[2,3,4]},{"name":"Zubehör","desc":"Griffe, Bänder, Beschläge","phases":[3,4]},{"name":"Glasleisten","desc":"Detaillierte Profilierung","phases":[3,4]}]'::jsonb,
    '[{"name":"Wärmedurchgangskoeffizient","desc":"U-Wert des Fensters (W/m²K)","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_WindowCommon.ThermalTransmittance"},{"name":"Schallschutzklasse","desc":"Anforderung an Schalldämmung","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_WindowCommon.AcousticRating"},{"name":"Feuerwiderstand","desc":"Brandschutzklasse nach VKF","format":"String","list":true,"phases":[1,2,3,4],"ifc":"Pset_WindowCommon.FireRating"},{"name":"IsExternal","desc":"Definiert, ob das Bauteil zur Aussenhülle gehört","format":"Boolean","list":false,"phases":[1,2,3,4],"ifc":"Pset_WindowCommon.IsExternal"},{"name":"GlazingAreaFraction","desc":"Verhältnis Glasfläche zu Rahmenfläche","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_WindowCommon.GlazingAreaFraction"},{"name":"SecurityRating","desc":"Einbruchschutzklasse (RC1-RC6)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_WindowCommon.SecurityRating"},{"name":"SolarHeatGainCoefficient","desc":"g-Wert (Gesamtenergiedurchlassgrad)","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_WindowCommon.SolarHeatGainCoefficient"},{"name":"Hersteller","desc":"Name des Fensterherstellers","format":"String","list":false,"phases":[2,3,4],"ifc":"Pset_ManufacturerTypeInformation.Manufacturer"}]'::jsonb,
    '[{"name":"Vorschriften","desc":"Relevante Normen und Richtlinien (SIA 331, EN 14351)","phases":[1]},{"name":"Produktdatenblatt","desc":"Technisches Datenblatt des Herstellers","phases":[2,3,4]},{"name":"Leistungsverzeichnis","desc":"NPK-Positionen für Ausschreibung","phases":[2]},{"name":"Montageanleitung","desc":"Einbauhinweise und Anschlussdetails","phases":[3,4]},{"name":"Wartungsanleitung","desc":"Pflege- und Wartungsintervalle","phases":[4]}]'::jsonb
);

INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    'e2',
    'Innentür (Holz)',
    'assets/img/door_interior.jpg',
    'Architektur',
    'Einflügelige Innentür, Holzwerkstoff, deckend gestrichen.',
    '["Planung","Realisierung","Betrieb","Dokumentation","Objektplanung"]'::jsonb,
    '[{"system":"eBKP-H","code":"C2.1","desc":"Innentüren"}]'::jsonb,
    '[{"element":"Tür","ifc":"IfcDoor.DOOR","revit":"Doors"}]'::jsonb,
    '[{"name":"Durchgangslichte","desc":"Freie Durchgangsbreite","phases":[1,2,3,4]},{"name":"Durchgangshöhe","desc":"Freie Durchgangshöhe","phases":[1,2,3,4]},{"name":"Türblattstärke","desc":"Dicke des Türblatts","phases":[2,3,4]},{"name":"Aufschlagrichtung","desc":"Links/Rechts öffnend","phases":[1,2,3,4]},{"name":"Zargendetail","desc":"Modellierung der Türzarge","phases":[2,3,4]},{"name":"Beschläge","desc":"Drücker, Schloss, Bänder","phases":[3,4]}]'::jsonb,
    '[{"name":"FireRating","desc":"Feuerwiderstandsklasse VKF (EI30, EI60)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_DoorCommon.FireRating"},{"name":"AcousticRating","desc":"Schalldämmmaß Rw (dB)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_DoorCommon.AcousticRating"},{"name":"IsExternal","desc":"Außentür (ja/nein)","format":"Boolean","list":false,"phases":[1,2,3,4],"ifc":"Pset_DoorCommon.IsExternal"},{"name":"SelfClosing","desc":"Mit Türschliesser ausgestattet","format":"Boolean","list":false,"phases":[2,3,4],"ifc":"Pset_DoorCommon.SelfClosing"},{"name":"SecurityRating","desc":"Einbruchschutzklasse","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_DoorCommon.SecurityRating"},{"name":"HandicapAccessible","desc":"Rollstuhlgängig nach SIA 500","format":"Boolean","list":false,"phases":[1,2,3,4],"ifc":"Pset_DoorCommon.HandicapAccessible"}]'::jsonb,
    '[{"name":"Montageanleitung","desc":"Anweisungen für Einbau","phases":[3,4]},{"name":"Türliste","desc":"Übersicht aller Türen mit Anforderungen","phases":[2,3]},{"name":"Brandschutznachweis","desc":"VKF-Zulassung für Brandschutztüren","phases":[2,3,4]},{"name":"Wartungsplan","desc":"Intervalle für Beschlags- und Schliesserprüfung","phases":[4]}]'::jsonb
);

INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    'e3',
    'Wand (Massiv)',
    'assets/img/wall.jpg',
    'Architektur',
    'Tragende Wand aus Beton oder Mauerwerk.',
    '["Planung","Realisierung","Betrieb","Dokumentation","Objektplanung"]'::jsonb,
    '[{"system":"eBKP-H","code":"C2.1","desc":"Aussenwand Konstruktion"}]'::jsonb,
    '[{"element":"Wand","ifc":"IfcWall.SOLIDWALL","revit":"Walls"},{"element":"Schacht","ifc":"IfcWall.SHEAR","revit":"Walls"}]'::jsonb,
    '[{"name":"Wandstärke","desc":"Dicke der Wandkonstruktion","phases":[1,2,3,4]},{"name":"Höhe","desc":"Geschosshöhe oder Teilhöhe","phases":[1,2,3,4]},{"name":"Länge","desc":"Wandlänge im Grundriss","phases":[1,2,3,4]},{"name":"Öffnungen","desc":"Aussparungen für Türen, Fenster, Durchbrüche","phases":[1,2,3,4]},{"name":"Schichtaufbau","desc":"Mehrschichtige Darstellung (Putz, Dämmung)","phases":[2,3,4]}]'::jsonb,
    '[{"name":"LoadBearing","desc":"Tragendes Bauteil","format":"Boolean","list":false,"phases":[1,2,3,4],"ifc":"Pset_WallCommon.LoadBearing"},{"name":"IsExternal","desc":"Aussenwand","format":"Boolean","list":false,"phases":[1,2,3,4],"ifc":"Pset_WallCommon.IsExternal"},{"name":"FireRating","desc":"Feuerwiderstand (REI)","format":"String","list":true,"phases":[1,2,3,4],"ifc":"Pset_WallCommon.FireRating"},{"name":"ThermalTransmittance","desc":"U-Wert (W/m²K)","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_WallCommon.ThermalTransmittance"},{"name":"AcousticRating","desc":"Schalldämmung Rw (dB)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_WallCommon.AcousticRating"}]'::jsonb,
    '[{"name":"Statiknachweis","desc":"Tragwerksnachweis nach SIA 260ff","phases":[2,3]},{"name":"Brandschutzkonzept","desc":"Nachweis Feuerwiderstand","phases":[2,3]},{"name":"Wärmeschutznachweis","desc":"Nachweis nach SIA 380/1","phases":[2,3]}]'::jsonb
);

INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    'e4',
    'Bodenplatte (Stahlbeton)',
    'assets/img/slab.jpg',
    'Tragwerk',
    'Fundamentplatte aus Stahlbeton, ortbetoniert.',
    '["Planung","Realisierung","Dokumentation","Nachweise","Fachplanung"]'::jsonb,
    '[{"system":"eBKP-H","code":"C1.1","desc":"Bodenplatte"}]'::jsonb,
    '[{"element":"Bodenplatte","ifc":"IfcSlab.BASESLAB","revit":"Floors"}]'::jsonb,
    '[{"name":"Stärke","desc":"Statisch erforderliche Dicke","phases":[1,2,3,4]},{"name":"Gefälle","desc":"Modellierung von Gefälle für Entwässerung","phases":[2,3,4]},{"name":"Aussparungen","desc":"Durchbrüche für Leitungen und Schächte","phases":[2,3,4]},{"name":"Fugen","desc":"Arbeitsfugen und Dehnfugen","phases":[2,3,4]}]'::jsonb,
    '[{"name":"LoadBearing","desc":"Ist das Bauteil tragend","format":"Boolean","list":false,"phases":[1,2,3,4],"ifc":"Pset_SlabCommon.LoadBearing"},{"name":"ConcreteGrade","desc":"Betonsorte (z.B. C25/30)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_ConcreteElementGeneral.ConstructionMaterial"},{"name":"ExposureClass","desc":"Expositionsklasse nach SIA 262","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_ConcreteElementGeneral.ExposureClass"},{"name":"ReinforcementVolume","desc":"Bewehrungsgehalt (kg/m³)","format":"Real","list":false,"phases":[2,3,4],"ifc":"Qto_SlabBaseQuantities.ReinforcementVolume"}]'::jsonb,
    '[{"name":"Bewehrungsplan","desc":"Planung der Armierung","phases":[2,3]},{"name":"Schalungsplan","desc":"Planung der Schalung","phases":[2,3]},{"name":"Betonierprotokoll","desc":"Dokumentation der Betonierarbeiten","phases":[3,4]},{"name":"Baugrundgutachten","desc":"Geotechnischer Bericht","phases":[1,2]}]'::jsonb
);

INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    'e5',
    'Dach (Flachdach)',
    'assets/img/roof_flat.jpg',
    'Architektur',
    'Warmdachkonstruktion mit Abdichtung und extensiver Begrünung.',
    '["Planung","Realisierung","Betrieb","Dokumentation","Objektplanung"]'::jsonb,
    '[{"system":"eBKP-H","code":"F1.2","desc":"Flachdach befahrbar/begrünt"}]'::jsonb,
    '[{"element":"Dachdecke","ifc":"IfcSlab.ROOF","revit":"Roofs"}]'::jsonb,
    '[{"name":"Schichtaufbau","desc":"Modellierung der einzelnen Schichten (Dämmung, Abdichtung, Substrat)","phases":[3,4]},{"name":"Gesamtdicke","desc":"Raumbedarf der Konstruktion","phases":[1,2,3,4]},{"name":"Gefälle","desc":"Entwässerungsgefälle (min. 2%)","phases":[2,3,4]},{"name":"Attika","desc":"Randausbildung und Anschlüsse","phases":[2,3,4]},{"name":"Durchdringungen","desc":"Aussparungen für Dachabläufe, Lüftung","phases":[2,3,4]}]'::jsonb,
    '[{"name":"IsExternal","desc":"Aussenbauteil","format":"Boolean","list":false,"phases":[1,2,3,4],"ifc":"Pset_SlabCommon.IsExternal"},{"name":"ThermalTransmittance","desc":"U-Wert des Aufbaus (W/m²K)","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_SlabCommon.ThermalTransmittance"},{"name":"LoadBearing","desc":"Tragende Dachkonstruktion","format":"Boolean","list":false,"phases":[1,2,3,4],"ifc":"Pset_SlabCommon.LoadBearing"},{"name":"SurfaceTreatment","desc":"Oberflächenbehandlung (Kies, Begrünung, Belag)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_SlabCommon.SurfaceTreatment"}]'::jsonb,
    '[{"name":"Detailpläne","desc":"Anschlussdetails Attika, Durchdringungen","phases":[2,3]},{"name":"Abdichtungskonzept","desc":"Planung der Dachabdichtung","phases":[2,3]},{"name":"Entwässerungsplan","desc":"Planung Dachentwässerung","phases":[2,3]},{"name":"Wartungsanleitung","desc":"Pflege Dachbegrünung und Kontrollen","phases":[4]}]'::jsonb
);

INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    'e6',
    'Stütze (Fertigteil)',
    'assets/img/column.jpg',
    'Tragwerk',
    'Vorgefertigte Stütze aus Stahlbeton oder Spannbeton.',
    '["Planung","Realisierung","Dokumentation","Nachweise","Fachplanung"]'::jsonb,
    '[{"system":"eBKP-H","code":"C2.3","desc":"Stützen (Konstruktion)"}]'::jsonb,
    '[{"element":"Stütze","ifc":"IfcColumn.COLUMN","revit":"Structural Columns"}]'::jsonb,
    '[{"name":"Querschnitt","desc":"Abmessungen (b/h oder Durchmesser)","phases":[1,2,3,4]},{"name":"Länge","desc":"Gesamtlänge inkl. Einspannung","phases":[1,2,3,4]},{"name":"Konsolen","desc":"Auflager für Träger","phases":[2,3,4]},{"name":"Anschlussdetails","desc":"Kopf- und Fussausbildung","phases":[2,3,4]}]'::jsonb,
    '[{"name":"FireRating","desc":"Feuerwiderstand (R60, R90)","format":"String","list":true,"phases":[1,2,3,4],"ifc":"Pset_ColumnCommon.FireRating"},{"name":"LoadBearing","desc":"Tragend","format":"Boolean","list":false,"phases":[1,2,3,4],"ifc":"Pset_ColumnCommon.LoadBearing"},{"name":"ConcreteGrade","desc":"Betonsorte","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_ConcreteElementGeneral.ConstructionMaterial"},{"name":"PrecastNumber","desc":"Fertigteilnummer","format":"String","list":false,"phases":[2,3,4],"ifc":"Pset_PrecastConcreteElementGeneral.TypeDesignation"}]'::jsonb,
    '[{"name":"Versetzplan","desc":"Logistikplan für Montage","phases":[3,4]},{"name":"Werkplanung","desc":"Fertigungszeichnungen Fertigteilwerk","phases":[2,3]},{"name":"Statiknachweis","desc":"Bemessung nach SIA 262","phases":[2]},{"name":"Abnahmeprotokoll","desc":"Qualitätskontrolle Fertigteil","phases":[3,4]}]'::jsonb
);

INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    'e7',
    'Unterzug (Stahlbeton)',
    'assets/img/beam.jpg',
    'Tragwerk',
    'Tragender Balken aus Stahlbeton, ortbetoniert oder als Fertigteil.',
    '["Planung","Realisierung","Dokumentation","Nachweise","Fachplanung"]'::jsonb,
    '[{"system":"eBKP-H","code":"C2.2","desc":"Unterzüge, Träger"}]'::jsonb,
    '[{"element":"Unterzug","ifc":"IfcBeam.BEAM","revit":"Structural Framing"}]'::jsonb,
    '[{"name":"Querschnitt","desc":"Breite und Höhe (b/h)","phases":[1,2,3,4]},{"name":"Spannweite","desc":"Länge zwischen Auflagern","phases":[1,2,3,4]},{"name":"Voutenausbildung","desc":"Variable Querschnittshöhe","phases":[2,3,4]},{"name":"Aussparungen","desc":"Durchbrüche für Leitungsführung","phases":[2,3,4]}]'::jsonb,
    '[{"name":"LoadBearing","desc":"Tragend","format":"Boolean","list":false,"phases":[1,2,3,4],"ifc":"Pset_BeamCommon.LoadBearing"},{"name":"FireRating","desc":"Feuerwiderstand","format":"String","list":true,"phases":[1,2,3,4],"ifc":"Pset_BeamCommon.FireRating"},{"name":"Span","desc":"Systemspannweite","format":"Real","list":false,"phases":[1,2,3,4],"ifc":"Pset_BeamCommon.Span"},{"name":"ConcreteGrade","desc":"Betonsorte","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_ConcreteElementGeneral.ConstructionMaterial"}]'::jsonb,
    '[{"name":"Bewehrungsplan","desc":"Armierungszeichnung","phases":[2,3]},{"name":"Schalungsplan","desc":"Schalungszeichnung","phases":[2,3]},{"name":"Statiknachweis","desc":"Tragwerksberechnung","phases":[2]}]'::jsonb
);

INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    'e8',
    'Lüftungskanal (rechteckig)',
    'assets/img/duct_rect.jpg',
    'Haustechnik',
    'Rechteckiger Lüftungskanal aus verzinktem Stahlblech.',
    '["Planung","Realisierung","Betrieb","Dokumentation","Fachplanung"]'::jsonb,
    '[{"system":"eBKP-H","code":"D5.1","desc":"Luftverteilung"}]'::jsonb,
    '[{"element":"Kanal rechteckig","ifc":"IfcDuctSegment.RIGIDSEGMENT","revit":"Ducts"},{"element":"Kanal rund","ifc":"IfcDuctSegment.RIGIDSEGMENT","revit":"Ducts"}]'::jsonb,
    '[{"name":"Querschnitt","desc":"Breite x Höhe (mm)","phases":[1,2,3,4]},{"name":"Länge","desc":"Kanallänge","phases":[1,2,3,4]},{"name":"Wandstärke","desc":"Blechdicke","phases":[2,3,4]},{"name":"Dämmung","desc":"Wärme- und Schalldämmung","phases":[2,3,4]}]'::jsonb,
    '[{"name":"NominalWidth","desc":"Nennbreite","format":"Real","list":false,"phases":[1,2,3,4],"ifc":"Pset_DuctSegmentTypeCommon.NominalWidth"},{"name":"NominalHeight","desc":"Nennhöhe","format":"Real","list":false,"phases":[1,2,3,4],"ifc":"Pset_DuctSegmentTypeCommon.NominalHeight"},{"name":"FlowRate","desc":"Volumenstrom (m³/h)","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_DuctSegmentTypeCommon.FlowRate"},{"name":"PressureClass","desc":"Dichtheitsklasse (A, B, C, D)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_DuctSegmentTypeCommon.PressureClass"},{"name":"FireRating","desc":"Brandschutzklasse","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_DuctSegmentTypeCommon.FireRating"},{"name":"InsulationThickness","desc":"Dämmstärke","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_DuctSegmentTypeCommon.InsulationThickness"}]'::jsonb,
    '[{"name":"Lüftungsschema","desc":"Prinzipschema der Lüftungsanlage","phases":[2]},{"name":"Kanalnetzberechnung","desc":"Druckverlustberechnung","phases":[2]},{"name":"Montageanleitung","desc":"Einbauhinweise","phases":[3,4]},{"name":"Abnahmeprotokoll","desc":"Dichtigkeitsprüfung","phases":[3,4]}]'::jsonb
);

INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    'e9',
    'Lüftungsgerät (Zentralgerät)',
    'assets/img/ahu.jpg',
    'Haustechnik',
    'Zentrales Lüftungsgerät mit Wärmerückgewinnung.',
    '["Planung","Realisierung","Betrieb","Dokumentation","Fachplanung"]'::jsonb,
    '[{"system":"eBKP-H","code":"D5.2","desc":"Lüftungsgeräte"}]'::jsonb,
    '[{"element":"Monoblockgerät","ifc":"IfcUnitaryEquipment.AIRHANDLER","revit":"Mechanical Equipment"}]'::jsonb,
    '[{"name":"Bounding Box","desc":"Aussenmasse (L x B x H)","phases":[1,2,3,4]},{"name":"Anschlusspositionen","desc":"Lage der Kanalanschlüsse","phases":[2,3,4]},{"name":"Wartungszugang","desc":"Platzbedarf für Service","phases":[2,3,4]}]'::jsonb,
    '[{"name":"AirFlowRate","desc":"Nenn-Volumenstrom (m³/h)","format":"Real","list":false,"phases":[1,2,3,4],"ifc":"Pset_AirTerminalBoxTypeCommon.AirFlowRate"},{"name":"HeatRecoveryEfficiency","desc":"Wärmerückgewinnungsgrad (%)","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_AirTerminalBoxTypeCommon.HeatRecoveryEfficiency"},{"name":"PowerInput","desc":"Elektrische Anschlussleistung (kW)","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_ElectricalDeviceCommon.PowerInput"},{"name":"SoundPowerLevel","desc":"Schallleistungspegel (dB(A))","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_SoundGeneration.SoundPowerLevel"},{"name":"FilterClass","desc":"Filterklasse (F7, F9, H13)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_FilterTypeCommon.FilterClass"},{"name":"Hersteller","desc":"Gerätehersteller","format":"String","list":false,"phases":[2,3,4],"ifc":"Pset_ManufacturerTypeInformation.Manufacturer"},{"name":"Modell","desc":"Typenbezeichnung","format":"String","list":false,"phases":[2,3,4],"ifc":"Pset_ManufacturerTypeInformation.ModelReference"}]'::jsonb,
    '[{"name":"Leistungsnachweis","desc":"Auslegungsberechnung","phases":[2]},{"name":"Produktdatenblatt","desc":"Technische Daten Hersteller","phases":[2,3,4]},{"name":"Inbetriebnahmeprotokoll","desc":"Einregulierung und Abnahme","phases":[3,4]},{"name":"Wartungsanleitung","desc":"Service-Intervalle und Anleitungen","phases":[4]},{"name":"Ersatzteilliste","desc":"Empfohlene Ersatzteile","phases":[4]}]'::jsonb
);

INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    'e10',
    'Heizungsrohr',
    'assets/img/pipe_heating.jpg',
    'Haustechnik',
    'Heizungsrohr aus Stahlrohr oder Kupfer mit Wärmedämmung.',
    '["Planung","Realisierung","Betrieb","Dokumentation","Fachplanung"]'::jsonb,
    '[{"system":"eBKP-H","code":"D2.1","desc":"Wärmeverteilung"}]'::jsonb,
    '[{"element":"Heizleitung","ifc":"IfcPipeSegment.RIGIDSEGMENT","revit":"Pipes"}]'::jsonb,
    '[{"name":"Aussendurchmesser","desc":"Rohrdurchmesser inkl. Dämmung","phases":[1,2,3,4]},{"name":"Länge","desc":"Rohrlänge","phases":[1,2,3,4]},{"name":"Dämmstärke","desc":"Dicke der Rohrisolation","phases":[2,3,4]},{"name":"Systemtrennung","desc":"Farbe/Kennzeichnung nach System","phases":[2,3,4]}]'::jsonb,
    '[{"name":"NominalDiameter","desc":"Nennweite (DN)","format":"Real","list":false,"phases":[1,2,3,4],"ifc":"Pset_PipeSegmentTypeCommon.NominalDiameter"},{"name":"OperatingPressure","desc":"Betriebsdruck (bar)","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_PipeSegmentTypeCommon.OperatingPressure"},{"name":"OperatingTemperature","desc":"Vorlauf-/Rücklauftemperatur (°C)","format":"String","list":false,"phases":[2,3,4],"ifc":"Pset_PipeSegmentTypeCommon.OperatingTemperature"},{"name":"Material","desc":"Rohrmaterial (Stahl, Kupfer, PE-X)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_PipeSegmentTypeCommon.Material"},{"name":"InsulationClass","desc":"Dämmklasse nach SIA 380/1","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_PipeSegmentTypeCommon.InsulationClass"},{"name":"FlowRate","desc":"Volumenstrom (l/h)","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_PipeSegmentTypeCommon.FlowRate"}]'::jsonb,
    '[{"name":"Heizungsschema","desc":"Hydraulikschema","phases":[2]},{"name":"Rohrnetzberechnung","desc":"Hydraulische Berechnung","phases":[2]},{"name":"Druckprüfprotokoll","desc":"Dichtheitsprüfung","phases":[3,4]},{"name":"Isolationsnachweis","desc":"Nachweis Wärmedämmung","phases":[2,3]}]'::jsonb
);

INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    'e11',
    'Heizkörper (Flachheizkörper)',
    'assets/img/radiator.jpg',
    'Haustechnik',
    'Flachheizkörper Typ 22, mit Thermostatkopf.',
    '["Planung","Realisierung","Betrieb","Dokumentation","Fachplanung"]'::jsonb,
    '[{"system":"eBKP-H","code":"D2.2","desc":"Wärmeabgabe"}]'::jsonb,
    '[{"element":"Heizkörper","ifc":"IfcSpaceHeater.RADIATOR","revit":"Mechanical Equipment"}]'::jsonb,
    '[{"name":"Baulänge","desc":"Breite des Heizkörpers","phases":[1,2,3,4]},{"name":"Bauhöhe","desc":"Höhe des Heizkörpers","phases":[1,2,3,4]},{"name":"Bautiefe","desc":"Tiefe (Typ abhängig)","phases":[2,3,4]},{"name":"Anschlussart","desc":"Seitlich, unten mittig","phases":[2,3,4]}]'::jsonb,
    '[{"name":"HeatOutput","desc":"Wärmeleistung bei 75/65/20 (W)","format":"Real","list":false,"phases":[1,2,3,4],"ifc":"Pset_SpaceHeaterTypeCommon.HeatOutput"},{"name":"HeaterType","desc":"Heizkörpertyp (10, 11, 21, 22, 33)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_SpaceHeaterTypeCommon.HeaterType"},{"name":"TemperatureClassification","desc":"Vorlauf-/Rücklauftemperatur","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_SpaceHeaterTypeCommon.TemperatureClassification"},{"name":"ControlType","desc":"Thermostatventil, Rücklauftemperaturbegrenzer","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_SpaceHeaterTypeCommon.ControlType"},{"name":"Hersteller","desc":"Heizkörperhersteller","format":"String","list":false,"phases":[2,3,4],"ifc":"Pset_ManufacturerTypeInformation.Manufacturer"}]'::jsonb,
    '[{"name":"Heizflächenberechnung","desc":"Raumweise Heizlastberechnung","phases":[2]},{"name":"Produktdatenblatt","desc":"Technische Daten Hersteller","phases":[2,3,4]},{"name":"Montagehinweise","desc":"Einbauanleitung","phases":[3,4]},{"name":"Einregulierprotokoll","desc":"Hydraulischer Abgleich","phases":[3,4]}]'::jsonb
);

INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    'e12',
    'Sanitärobjekt (WC)',
    'assets/img/wc.jpg',
    'Haustechnik',
    'Wand-WC mit Unterputzspülkasten.',
    '["Planung","Realisierung","Betrieb","Dokumentation","Fachplanung"]'::jsonb,
    '[{"system":"eBKP-H","code":"D8.2","desc":"Sanitäre Einrichtungen"}]'::jsonb,
    '[{"element":"WC","ifc":"IfcSanitaryTerminal.TOILETPAN","revit":"Plumbing Fixtures"},{"element":"Urinal","ifc":"IfcSanitaryTerminal.URINAL","revit":"Plumbing Fixtures"}]'::jsonb,
    '[{"name":"Ausladung","desc":"Tiefe ab Wand","phases":[1,2,3,4]},{"name":"Breite","desc":"Breite der Keramik","phases":[1,2,3,4]},{"name":"Sitzhöhe","desc":"Höhe der Oberkante","phases":[2,3,4]},{"name":"Vorwandelement","desc":"Installationselement","phases":[2,3,4]}]'::jsonb,
    '[{"name":"FlushType","desc":"Spülart (2-Mengen, Druckspüler)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_SanitaryTerminalTypeToiletPan.FlushType"},{"name":"FlushVolume","desc":"Spülwassermenge (l)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_SanitaryTerminalTypeToiletPan.FlushVolume"},{"name":"MountingType","desc":"Wandhängend oder Bodenstehend","format":"String","list":true,"phases":[1,2,3,4],"ifc":"Pset_SanitaryTerminalTypeToiletPan.MountingType"},{"name":"WaterRating","desc":"Wasserlabel (A-G)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_SanitaryTerminalTypeToiletPan.WaterRating"},{"name":"Hersteller","desc":"Keramikhersteller","format":"String","list":false,"phases":[2,3,4],"ifc":"Pset_ManufacturerTypeInformation.Manufacturer"},{"name":"Farbton","desc":"Keramikfarbe","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_SanitaryTerminalTypeToiletPan.Color"}]'::jsonb,
    '[{"name":"Sanitärschemata","desc":"Isometrische Darstellung","phases":[2]},{"name":"Produktdatenblatt","desc":"Technische Daten","phases":[2,3,4]},{"name":"Montagehinweise","desc":"Einbauanleitung Vorwandsystem","phases":[3,4]},{"name":"Pflegeanleitung","desc":"Reinigung und Wartung","phases":[4]}]'::jsonb
);

INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    'e13',
    'Elektroverteiler (UV)',
    'assets/img/distribution_board.jpg',
    'Haustechnik',
    'Unterverteiler für Stockwerksversorgung.',
    '["Planung","Realisierung","Betrieb","Dokumentation","Fachplanung"]'::jsonb,
    '[{"system":"eBKP-H","code":"D4.1","desc":"Elektrische Verteilung"}]'::jsonb,
    '[{"element":"Unterverteiler","ifc":"IfcDistributionBoard.DISTRIBUTIONBOARD","revit":"Electrical Equipment"}]'::jsonb,
    '[{"name":"Aussenmasse","desc":"Breite x Höhe x Tiefe","phases":[1,2,3,4]},{"name":"Einbautiefe","desc":"Tiefe bei Unterputzmontage","phases":[2,3,4]},{"name":"Montagehöhe","desc":"Höhe Oberkante ab OKFFB","phases":[2,3,4]}]'::jsonb,
    '[{"name":"NumberOfPhases","desc":"Anzahl Phasen (1 oder 3)","format":"Integer","list":false,"phases":[1,2,3,4],"ifc":"Pset_DistributionBoardTypeCommon.NumberOfPhases"},{"name":"RatedCurrent","desc":"Bemessungsstrom (A)","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_DistributionBoardTypeCommon.RatedCurrent"},{"name":"NumberOfModules","desc":"Anzahl Teilungseinheiten","format":"Integer","list":false,"phases":[2,3,4],"ifc":"Pset_DistributionBoardTypeCommon.NumberOfModules"},{"name":"IPRating","desc":"Schutzart (IP20, IP44, IP65)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_DistributionBoardTypeCommon.IPRating"},{"name":"ShortCircuitRating","desc":"Kurzschlussfestigkeit (kA)","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_DistributionBoardTypeCommon.ShortCircuitRating"},{"name":"Hersteller","desc":"Verteilerhersteller","format":"String","list":false,"phases":[2,3,4],"ifc":"Pset_ManufacturerTypeInformation.Manufacturer"}]'::jsonb,
    '[{"name":"Einlinienschema","desc":"Übersichtsschaltplan","phases":[2]},{"name":"Stromlaufplan","desc":"Detaillierter Schaltplan","phases":[2,3]},{"name":"Verteilerlayout","desc":"Bestückungsplan","phases":[2,3]},{"name":"Selektivitätsnachweis","desc":"Nachweis Selektivität Schutzgeräte","phases":[2,3]},{"name":"Prüfprotokoll","desc":"Erstprüfung nach NIV","phases":[3,4]}]'::jsonb
);

INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    'e14',
    'Kabeltrasse',
    'assets/img/cable_tray.jpg',
    'Haustechnik',
    'Kabelrinne oder Kabelkanal für die Leitungsführung.',
    '["Planung","Realisierung","Betrieb","Dokumentation","Fachplanung"]'::jsonb,
    '[{"system":"eBKP-H","code":"D4.2","desc":"Kabelführung"}]'::jsonb,
    '[{"element":"Kabelrinne","ifc":"IfcCableCarrierSegment.CABLETRAY","revit":"Cable Trays"},{"element":"Kabelleiter","ifc":"IfcCableCarrierSegment.CABLELADDER","revit":"Cable Trays"}]'::jsonb,
    '[{"name":"Breite","desc":"Trassenbreite","phases":[1,2,3,4]},{"name":"Höhe","desc":"Seitenhöhe","phases":[2,3,4]},{"name":"Länge","desc":"Segmentlänge","phases":[1,2,3,4]},{"name":"Befestigung","desc":"Abhängung, Wandbefestigung","phases":[2,3,4]}]'::jsonb,
    '[{"name":"NominalWidth","desc":"Nennbreite (mm)","format":"Real","list":false,"phases":[1,2,3,4],"ifc":"Pset_CableCarrierSegmentTypeCommon.NominalWidth"},{"name":"NominalHeight","desc":"Nennhöhe (mm)","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_CableCarrierSegmentTypeCommon.NominalHeight"},{"name":"Material","desc":"Werkstoff (Stahl verzinkt, Alu, Kunststoff)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_CableCarrierSegmentTypeCommon.Material"},{"name":"LoadCapacity","desc":"Traglast (kg/m)","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_CableCarrierSegmentTypeCommon.LoadCapacity"},{"name":"FireRating","desc":"Funktionserhalt bei Brand (E30, E90)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_CableCarrierSegmentTypeCommon.FireRating"}]'::jsonb,
    '[{"name":"Trassenplan","desc":"Übersicht Kabelführung","phases":[2]},{"name":"Belegungsplan","desc":"Kabelbelegung je Trasse","phases":[2,3]},{"name":"Montagehinweise","desc":"Einbau und Befestigung","phases":[3,4]}]'::jsonb
);

INSERT INTO elements (id, title, image, category, description, tags, classifications, ifc_mapping, geometry, information, documentation)
VALUES (
    'e15',
    'Aufzug',
    'assets/img/elevator.jpg',
    'Haustechnik',
    'Personenaufzug mit maschinenraumloser Technik (MRL).',
    '["Planung","Realisierung","Betrieb","Dokumentation","Fachplanung"]'::jsonb,
    '[{"system":"eBKP-H","code":"D6.1","desc":"Aufzugsanlagen"}]'::jsonb,
    '[{"element":"Personenaufzug","ifc":"IfcTransportElement.ELEVATOR","revit":"Specialty Equipment"}]'::jsonb,
    '[{"name":"Schachtmasse","desc":"Lichte Schachtmasse (B x T)","phases":[1,2,3,4]},{"name":"Kabinenmasse","desc":"Innenmasse Kabine","phases":[2,3,4]},{"name":"Schachtgrube","desc":"Tiefe unter unterstem Halt","phases":[1,2,3,4]},{"name":"Schachtkopf","desc":"Höhe über oberstem Halt","phases":[1,2,3,4]},{"name":"Türöffnung","desc":"Lichte Türbreite und -höhe","phases":[2,3,4]}]'::jsonb,
    '[{"name":"LoadCapacity","desc":"Tragfähigkeit (kg / Personen)","format":"String","list":true,"phases":[1,2,3,4],"ifc":"Pset_TransportElementElevator.LoadCapacity"},{"name":"NumberOfStops","desc":"Anzahl Haltestellen","format":"Integer","list":false,"phases":[1,2,3,4],"ifc":"Pset_TransportElementElevator.NumberOfStops"},{"name":"Speed","desc":"Nenngeschwindigkeit (m/s)","format":"Real","list":false,"phases":[2,3,4],"ifc":"Pset_TransportElementElevator.Speed"},{"name":"DriveType","desc":"Antriebsart (Seil, Hydraulik, MRL)","format":"String","list":true,"phases":[2,3,4],"ifc":"Pset_TransportElementElevator.DriveType"},{"name":"FiremanLift","desc":"Feuerwehraufzug","format":"Boolean","list":false,"phases":[1,2,3,4],"ifc":"Pset_TransportElementElevator.FiremanLift"},{"name":"HandicapAccessible","desc":"Rollstuhlgerecht nach SIA 500","format":"Boolean","list":false,"phases":[1,2,3,4],"ifc":"Pset_TransportElementElevator.HandicapAccessible"},{"name":"Hersteller","desc":"Aufzugshersteller","format":"String","list":false,"phases":[2,3,4],"ifc":"Pset_ManufacturerTypeInformation.Manufacturer"}]'::jsonb,
    '[{"name":"Schachtplan","desc":"Schnittzeichnung Aufzugsschacht","phases":[2,3]},{"name":"Leistungsverzeichnis","desc":"Ausschreibungsunterlagen","phases":[2]},{"name":"Produktdatenblatt","desc":"Technische Daten Hersteller","phases":[2,3,4]},{"name":"Montageplan","desc":"Einbauzeichnung","phases":[3,4]},{"name":"Wartungsvertrag","desc":"Service-Vereinbarung","phases":[4]},{"name":"SVTI-Abnahme","desc":"Behördliche Abnahme","phases":[3,4]}]'::jsonb
);

-- ===========================================
-- USECASES DATA
-- ===========================================
INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc000',
    'Minimalstandard',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    'Grundlagen',
    'Verbindliche Basisanforderungen für jedes Bauprojekt: Informationsanforderungen, Abwicklungsplanung und Projektkoordination, unabhängig von Bauvolumen oder Methodik.',
    '["Entwicklung","Planung","Realisierung","Betrieb","Koordination","Projektmanagement"]'::jsonb,
    '[1,2,3,4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 2051","ISO 19650"]'::jsonb,
    '["Einheitliche Projektgrundlagen schaffen","Klare Informationsanforderungen definieren","Verbindliche Abwicklungsplanung sicherstellen"]'::jsonb,
    '["Projektauftrag","Organisatorische Rahmenbedingungen","Vorlagen AIA/BAP"]'::jsonb,
    '["Auftraggeber-Informationsanforderungen (AIA)","BIM-Abwicklungsplan (BAP)","Projektorganisation"]'::jsonb,
    '[{"actor":"Projektleiter","responsible":["Definition der Projektziele","Freigabe AIA"],"contributing":["Abstimmung mit Stakeholdern"],"informed":[]},{"actor":"BIM-Manager","responsible":["Erstellung AIA und BAP","Definition Informationsanforderungen"],"contributing":[],"informed":["Projektänderungen"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc010',
    'Bestandserfassung',
    'assets/img/usecase/uc010.jpg',
    'Planung',
    'Erfassung des Bestandes durch geeignete Aufnahmeverfahren (z.B. Laserscan, Photogrammetrie, Handaufmass) und Dokumentation als Grundlage für die weitere Planung.',
    '["Entwicklung","Planung","Betrieb","Bestandserfassung","Vermessung"]'::jsonb,
    '[1,2,4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 405","ISO 19650"]'::jsonb,
    '["Vollständige Dokumentation des Ist-Zustands","Grundlage für Umbau- und Sanierungsplanung","Digitale Datenbasis für FM"]'::jsonb,
    '["Bestandspläne (falls vorhanden)","Zugang zum Objekt","Anforderungen an Detaillierungsgrad"]'::jsonb,
    '["Punktwolke / Vermessungsdaten","Bestandsdokumentation","Bestandsmodell (optional)"]'::jsonb,
    '[{"actor":"Vermesser","responsible":["Durchführung der Bestandsaufnahme","Erstellung Punktwolke"],"contributing":[],"informed":["Qualitätsanforderungen"]},{"actor":"BIM-Autor","responsible":["Modellierung des Bestands"],"contributing":["Abstimmung Detaillierungsgrad"],"informed":[]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc020',
    'Bedarfsplanung',
    'assets/img/usecase/uc020.jpg',
    'Planung',
    'Systematische Ermittlung und Dokumentation der Anforderungen: Raumprogramm, Flächenbedarf, funktionale Zusammenhänge und Nutzeranforderungen.',
    '["Entwicklung","Bedarfsplanung","Objektplanung","Nutzerschaft"]'::jsonb,
    '[1]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 416","DIN 18205"]'::jsonb,
    '["Klare Definition der Nutzeranforderungen","Basis für Flächenplanung und Kostenrahmen","Vermeidung von Fehlplanungen"]'::jsonb,
    '["Nutzeranforderungen","Strategische Vorgaben","Bestandsdaten (bei Umbau)"]'::jsonb,
    '["Raumprogramm","Funktionsdiagramm","Flächenbedarfsnachweis"]'::jsonb,
    '[{"actor":"Nutzervertreter","responsible":["Definition der Anforderungen"],"contributing":[],"informed":["Ergebnisse der Bedarfsplanung"]},{"actor":"Planer","responsible":["Erstellung Raumprogramm","Dokumentation"],"contributing":["Abstimmung mit Nutzer"],"informed":[]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc030',
    'Planungsvarianten',
    'assets/img/usecase/uc030.jpg',
    'Planung',
    'Erstellung und Bewertung von Planungsvarianten anhand projektspezifischer Kriterien aus den Bereichen Ökologie, Ökonomie und Gesellschaft.',
    '["Entwicklung","Planung","Variantenvergleich","Nachhaltigkeit","Objektplanung"]'::jsonb,
    '[1,2]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 112","SNBS"]'::jsonb,
    '["Fundierte Entscheidungsgrundlage für Varianten","Bewertung nach Nachhaltigkeitskriterien","Transparenter Auswahlprozess"]'::jsonb,
    '["Raumprogramm","Bewertungskriterien","Rahmenbedingungen (Budget, Termine)"]'::jsonb,
    '["Variantendokumentation","Bewertungsmatrix","Empfehlung Vorzugsvariante"]'::jsonb,
    '[{"actor":"Architekt","responsible":["Erstellung der Planungsvarianten"],"contributing":[],"informed":["Bewertungsergebnisse"]},{"actor":"Projektleiter","responsible":["Definition Bewertungskriterien","Variantenentscheid"],"contributing":["Bewertung"],"informed":[]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc040',
    'Visualisierung',
    'assets/img/usecase/uc040.jpg',
    'Kommunikation',
    'Bedarfsgerechte Visualisierung des Bauvorhabens für Projektkommunikation, Entscheidungsfindung oder Öffentlichkeitsarbeit (Darstellungen, Animationen, Rundgänge).',
    '["Entwicklung","Planung","Realisierung","Betrieb","Visualisierung","Objektplanung"]'::jsonb,
    '[1,2,3,4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '[]'::jsonb,
    '["Verständliche Darstellung für Entscheidungsträger","Unterstützung der Öffentlichkeitsarbeit","Frühzeitige Erkennung von Gestaltungsfragen"]'::jsonb,
    '["Planungsunterlagen / 3D-Modell","Anforderungen an Darstellung","Kontextdaten (Umgebung, Gelände)"]'::jsonb,
    '["Visualisierungen / Renderings","Animationen","Virtuelle Rundgänge"]'::jsonb,
    '[{"actor":"Visualisierer","responsible":["Erstellung der Visualisierungen"],"contributing":[],"informed":["Planungsänderungen"]},{"actor":"Architekt","responsible":["Bereitstellung Planungsdaten"],"contributing":["Abstimmung Darstellung"],"informed":[]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc050',
    'Koordination der Fachgewerke',
    'assets/img/usecase/uc050.jpg',
    'Koordination',
    'Systematische Abstimmung der Fachplanungen, Erkennung von Konflikten zwischen Gewerken und koordinierte Konfliktbehebung.',
    '["Planung","Realisierung","Koordination","Qualitätssicherung","Fachplanung"]'::jsonb,
    '[2,3]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["ISO 19650","SIA 2051"]'::jsonb,
    '["Frühzeitige Erkennung von Planungskonflikten","Reduzierung von Kollisionen auf der Baustelle","Verbesserte Abstimmung zwischen Gewerken"]'::jsonb,
    '["Fachmodelle (Architektur, Tragwerk, TGA)","Koordinationsregeln","Prüfkriterien"]'::jsonb,
    '["Koordinationsmodell","Kollisionsbericht","Protokoll Konfliktbehebung"]'::jsonb,
    '[{"actor":"BIM-Gesamtkoordinator","responsible":["Zusammenführung Fachmodelle","Kollisionsprüfung","Koordination Konfliktbehebung"],"contributing":[],"informed":[]},{"actor":"Fachplaner","responsible":["Bereitstellung Fachmodelle","Behebung von Konflikten"],"contributing":["Abstimmung"],"informed":["Kollisionsbericht"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc060',
    'Qualitätsprüfung',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    'Qualitätssicherung',
    'Überwachung des Planungsfortschritts, Prüfung der Planungsqualität auf Vollständigkeit und Konsistenz sowie Freigabeprozesse.',
    '["Entwicklung","Planung","Realisierung","Qualitätssicherung","Projektmanagement"]'::jsonb,
    '[1,2,3]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["ISO 19650","SIA 2051"]'::jsonb,
    '["Sicherstellung der Planungsqualität","Nachvollziehbare Freigabeprozesse","Frühzeitige Erkennung von Abweichungen"]'::jsonb,
    '["Planungsunterlagen / Modelle","Prüfkriterien (AIA/BAP)","Referenzdaten"]'::jsonb,
    '["Prüfbericht","Freigabeprotokoll","Mängelliste"]'::jsonb,
    '[{"actor":"BIM-Gesamtkoordinator","responsible":["Qualitätsprüfung","Dokumentation"],"contributing":[],"informed":[]},{"actor":"Projektleiter","responsible":["Freigabe"],"contributing":["Prüfung"],"informed":["Prüfberichte"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc070',
    'Bemessung und Nachweisführung',
    'assets/img/usecase/uc070.jpg',
    'Analyse',
    'Durchführung von Berechnungen und Simulationen (Statik, Energie, Tageslicht, Akustik, Brandschutz) zur Bemessung und für behördliche Nachweise.',
    '["Planung","Realisierung","Nachweise","Fachplanung"]'::jsonb,
    '[2,3]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 380/1","SIA 261","SIA 181"]'::jsonb,
    '["Normgerechte Bemessung und Nachweise","Optimierung der Gebäudeperformance","Erfüllung behördlicher Anforderungen"]'::jsonb,
    '["Planungsunterlagen / 3D-Modell","Materialkenndaten","Normen und Anforderungen"]'::jsonb,
    '["Berechnungen und Nachweise","Simulationsergebnisse","Behördliche Dokumente"]'::jsonb,
    '[{"actor":"Fachplaner","responsible":["Durchführung Berechnungen","Erstellung Nachweise"],"contributing":[],"informed":["Planungsänderungen"]},{"actor":"BIM-Autor","responsible":["Bereitstellung Modelldaten"],"contributing":["Abstimmung Informationsgehalt"],"informed":[]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc080',
    'Ableitung von Planunterlagen',
    'assets/img/usecase/uc080.jpg',
    'Dokumentation',
    'Erstellung der erforderlichen Planunterlagen (Grundrisse, Schnitte, Ansichten, Details) gemäss den jeweiligen Richtlinien und Normen.',
    '["Planung","Realisierung","Betrieb","Dokumentation","Objektplanung"]'::jsonb,
    '[2,3,4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 400","SIA 2014"]'::jsonb,
    '["Konsistente Planunterlagen aus einer Datenquelle","Reduzierung manueller Nachbearbeitung","Einhaltung von Darstellungsstandards"]'::jsonb,
    '["3D-Modell / Planungsdaten","Planungsrichtlinien","Darstellungsvorlagen"]'::jsonb,
    '["Grundrisse, Schnitte, Ansichten","Detailpläne","Listen und Tabellen"]'::jsonb,
    '[{"actor":"BIM-Autor","responsible":["Ableitung der Pläne aus Modell","Nachbearbeitung"],"contributing":[],"informed":["Freigabeergebnisse"]},{"actor":"Projektleiter","responsible":["Freigabe der Planunterlagen"],"contributing":[],"informed":[]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc090',
    'Genehmigungsprozess',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    'Behörden',
    'Zusammenstellung und Einreichung der erforderlichen Unterlagen für das Baubewilligungsverfahren und Begleitung der behördlichen Prüfung.',
    '["Planung","Genehmigung","Objektplanung","Prüfende Instanz"]'::jsonb,
    '[2]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["RPG","BauG"]'::jsonb,
    '["Vollständige Gesuchsunterlagen","Effiziente Bewilligungsverfahren","Rechtssicherheit"]'::jsonb,
    '["Planunterlagen","Nachweise und Berechnungen","Formulare und Anträge"]'::jsonb,
    '["Baugesuch","Baubewilligung","Auflagen"]'::jsonb,
    '[{"actor":"Architekt","responsible":["Zusammenstellung Gesuchsunterlagen","Einreichung"],"contributing":[],"informed":["Behördliche Rückfragen"]},{"actor":"Bauherr","responsible":["Antragstellung"],"contributing":[],"informed":["Bewilligungsentscheid"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc100',
    'Mengen- und Kostenermittlung',
    'assets/img/usecase/uc100.jpg',
    'Kostenplanung',
    'Ermittlung von Mengen (Volumen, Flächen, Längen, Stückzahlen) und Aufstellung von Kostenschätzungen bzw. Kostenberechnungen nach eBKP-H.',
    '["Entwicklung","Planung","Realisierung","Kosten","Controlling"]'::jsonb,
    '[1,2,3]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["eBKP-H","SIA 416","DIN 276"]'::jsonb,
    '["Transparente, nachvollziehbare Kostenermittlung","Frühzeitige Kostensicherheit für Entscheidungen","Vergleichbarkeit von Planungsvarianten"]'::jsonb,
    '["Planungsunterlagen (2D oder 3D)","Raumprogramm / Flächenprogramm","Kostenkennwerte (eBKP-H)"]'::jsonb,
    '["Mengengerüst nach Bauteilen","Kostenschätzung / Kostenberechnung","Kostenvergleich bei Varianten"]'::jsonb,
    '[{"actor":"BIM-Autor","responsible":["Modellbasierte und händische Ableitung von Mengen","Verknüpfung von Mengen mit Kosten"],"contributing":[],"informed":["Ergebnisse der Qualitätsprüfung"]},{"actor":"BIM-Gesamtkoordinator","responsible":["Qualitätsprüfung und Dokumentation","Bereitstellung der Ergebnisse"],"contributing":["Erfassung von Anforderungen im BAP"],"informed":["Ergebnisse der Plausibilitätsprüfung"]},{"actor":"Kostenplaner","responsible":["Kostengliederung nach eBKP-H","Zuordnung Kostenkennwerte"],"contributing":["Plausibilisierung Mengen"],"informed":[]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc110',
    'Leistungsverzeichnis und Ausschreibung',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    'Ausschreibung',
    'Erstellung von Leistungsverzeichnissen mit Mengenpositionen, Durchführung der Ausschreibung und Vergabe auf Basis der Planungsunterlagen.',
    '["Planung","Realisierung","Ausschreibung und Vergabe","Projektmanagement"]'::jsonb,
    '[2,3]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 118","NPK","BöB"]'::jsonb,
    '["Vollständige und präzise Leistungsbeschreibung","Vergleichbare Angebote","Rechtskonforme Vergabe"]'::jsonb,
    '["Planungsunterlagen","Mengengerüst","NPK-Kataloge"]'::jsonb,
    '["Leistungsverzeichnis","Ausschreibungsunterlagen","Vergabeempfehlung"]'::jsonb,
    '[{"actor":"Kostenplaner","responsible":["Erstellung Leistungsverzeichnis"],"contributing":[],"informed":["Vergabeentscheid"]},{"actor":"Projektleiter","responsible":["Vergabeentscheid"],"contributing":["Angebotsprüfung"],"informed":[]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc120',
    'Terminplanung der Ausführung',
    'assets/img/usecase/uc120.jpg',
    'Terminplanung',
    'Erstellung und Visualisierung des Bauprogramms mit Verknüpfung von Terminen und Bauelementen zur Überprüfung des geplanten Bauablaufs.',
    '["Planung","Realisierung","Termine","Bauausführung"]'::jsonb,
    '[2,3]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 118"]'::jsonb,
    '["Realistische Bauablaufplanung","Frühzeitige Erkennung von Terminrisiken","Visualisierung für Kommunikation"]'::jsonb,
    '["Planungsunterlagen / 3D-Modell","Terminvorgaben","Ressourcenplanung"]'::jsonb,
    '["Bauprogramm","4D-Simulation (optional)","Meilensteinplan"]'::jsonb,
    '[{"actor":"Bauleiter","responsible":["Erstellung Bauprogramm","Terminüberwachung"],"contributing":[],"informed":[]},{"actor":"Unternehmer","responsible":["Detailterminplanung"],"contributing":["Abstimmung Bauablauf"],"informed":["Terminänderungen"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc130',
    'Logistikplanung',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=400&fit=crop',
    'Bauausführung',
    'Planung und Dokumentation von Baustelleneinrichtung, Baustelleninfrastruktur, Materialflüssen und Verkehrsphasen.',
    '["Planung","Realisierung","Logistik","Bauausführung"]'::jsonb,
    '[2,3]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SUVA","BauAV"]'::jsonb,
    '["Effiziente Baustellenorganisation","Sichere Verkehrsführung","Minimierung von Störungen"]'::jsonb,
    '["Baustellenplan","Terminplan","Materialplanung"]'::jsonb,
    '["Baustelleneinrichtungsplan","Logistikkonzept","Verkehrsphasenplan"]'::jsonb,
    '[{"actor":"Bauleiter","responsible":["Logistikplanung","Koordination"],"contributing":[],"informed":[]},{"actor":"Unternehmer","responsible":["Umsetzung Logistik"],"contributing":["Abstimmung"],"informed":["Änderungen"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc140',
    'Baufortschrittskontrolle',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=400&fit=crop',
    'Bauausführung',
    'Systematische Erfassung und Dokumentation des Baufortschritts als Grundlage für Soll-Ist-Vergleiche und Projekt-Controlling.',
    '["Realisierung","Qualitätssicherung","Controlling","Projektsteuerung"]'::jsonb,
    '[3]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 118"]'::jsonb,
    '["Transparente Fortschrittsdokumentation","Frühzeitige Erkennung von Abweichungen","Basis für Steuerungsmassnahmen"]'::jsonb,
    '["Bauprogramm (Soll)","Baustellenbegehungen","Rapporte"]'::jsonb,
    '["Fortschrittsbericht","Soll-Ist-Vergleich","Fotodokumentation"]'::jsonb,
    '[{"actor":"Bauleiter","responsible":["Fortschrittserfassung","Dokumentation"],"contributing":[],"informed":[]},{"actor":"Projektleiter","responsible":["Controlling","Steuerung"],"contributing":[],"informed":["Fortschrittsbericht"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc150',
    'Änderungs- und Nachtragsmanagement',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    'Bauausführung',
    'Dokumentation, Nachverfolgung und Freigabe von Planungsänderungen während der Bauausführung sowie Erfassung und Bewertung von Nachträgen.',
    '["Realisierung","Änderungsmanagement","Kosten","Bauausführung"]'::jsonb,
    '[3]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 118"]'::jsonb,
    '["Nachvollziehbare Änderungsdokumentation","Transparente Nachtragsbewertung","Kontrolle der Kostenauswirkungen"]'::jsonb,
    '["Änderungsanträge","Vertragsdokumente","Planungsunterlagen"]'::jsonb,
    '["Änderungsprotokoll","Nachtragsbewertung","Freigabedokumentation"]'::jsonb,
    '[{"actor":"Bauleiter","responsible":["Erfassung Änderungen","Dokumentation"],"contributing":[],"informed":[]},{"actor":"Projektleiter","responsible":["Freigabe Änderungen","Nachtragsentscheid"],"contributing":["Bewertung"],"informed":[]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc160',
    'Abrechnung von Bauleistungen',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    'Bauausführung',
    'Dokumentation der ausgeführten Leistungen und Plausibilisierung von Abschlagsrechnungen und Schlussabrechnungen.',
    '["Realisierung","Betrieb","Kosten","Bauausführung"]'::jsonb,
    '[3,4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 118"]'::jsonb,
    '["Korrekte Leistungsabrechnung","Plausible Mengenermittlung","Transparente Kostenkontrolle"]'::jsonb,
    '["Leistungsverzeichnis","Aufmassprotokolle","Rechnungen"]'::jsonb,
    '["Geprüfte Rechnungen","Zahlungsfreigabe","Kostenverfolgung"]'::jsonb,
    '[{"actor":"Bauleiter","responsible":["Aufmass","Rechnungsprüfung"],"contributing":[],"informed":[]},{"actor":"Projektleiter","responsible":["Zahlungsfreigabe"],"contributing":[],"informed":["Kostenstand"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc170',
    'Abnahme- und Mängelmanagement',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    'Bauausführung',
    'Systematische Erfassung, Verortung und Nachverfolgung von Ausführungsmängeln sowie Dokumentation der Behebung.',
    '["Realisierung","Betrieb","Abnahme","Qualitätssicherung","Bauausführung"]'::jsonb,
    '[3,4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 118","OR"]'::jsonb,
    '["Vollständige Mängelerfassung","Nachvollziehbare Mängelverfolgung","Dokumentierte Abnahme"]'::jsonb,
    '["Abnahmeprotokolle","Qualitätsanforderungen","Planungsunterlagen"]'::jsonb,
    '["Mängelliste","Abnahmeprotokoll","Nachweis Mängelbehebung"]'::jsonb,
    '[{"actor":"Bauleiter","responsible":["Mängelerfassung","Nachverfolgung"],"contributing":[],"informed":[]},{"actor":"Unternehmer","responsible":["Mängelbehebung"],"contributing":[],"informed":["Mängelliste"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc180',
    'Inbetriebnahmemanagement',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=400&fit=crop',
    'Übergabe',
    'Koordination und Dokumentation der Inbetriebnahme von der Planung bis zur Übergabe an den Betrieb, inkl. Funktionsprüfungen und Einweisungen.',
    '["Realisierung","Betrieb","Inbetriebnahme","Abnahme","Facility Management"]'::jsonb,
    '[3,4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 118","GEFMA 190"]'::jsonb,
    '["Systematische Inbetriebnahme aller Anlagen","Dokumentierte Funktionsprüfung","Geordnete Übergabe an Betrieb"]'::jsonb,
    '["Anlagendokumentation","Prüfprotokolle","Betriebsanleitungen"]'::jsonb,
    '["Inbetriebnahmeprotokoll","Einweisungsdokumentation","Übergabeprotokoll"]'::jsonb,
    '[{"actor":"Inbetriebnahme-Manager","responsible":["Koordination IBN","Funktionsprüfung"],"contributing":[],"informed":[]},{"actor":"Betreiber","responsible":["Übernahme"],"contributing":["Einweisung"],"informed":["IBN-Protokolle"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc190',
    'Projekt- und Bauwerksdokumentation',
    'assets/img/usecase/uc190.jpg',
    'Dokumentation',
    'Strukturierte Zusammenstellung der Bauwerksdokumentation: Projektdokumentation (PD) während Planung und Bau, Objektdokumentation (OD) für den Betrieb, Archivdokumentation (AD) für aufbewahrungspflichtige Unterlagen.',
    '["Entwicklung","Planung","Realisierung","Betrieb","Dokumentation","Projektmanagement"]'::jsonb,
    '[1,2,3,4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["KBOB BWD-Richtlinie","SIA 112"]'::jsonb,
    '["Vollständige Projektdokumentation","Geordnete Übergabe an Betrieb","Rechtssichere Archivierung"]'::jsonb,
    '["Alle Projektunterlagen","Revisionspläne","Prüfprotokolle und Nachweise"]'::jsonb,
    '["Projektdokumentation (PD)","Objektdokumentation (OD)","Archivdokumentation (AD)"]'::jsonb,
    '[{"actor":"BIM-Gesamtkoordinator","responsible":["Zusammenstellung Dokumentation","Qualitätsprüfung"],"contributing":[],"informed":[]},{"actor":"Betreiber","responsible":["Übernahme OD"],"contributing":["Definition Anforderungen"],"informed":["Liefertermine"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc200',
    'Nutzung für Betrieb und Erhaltung',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=400&fit=crop',
    'Betrieb',
    'Übergabe und Nutzung der Bauwerksdokumentation für Betrieb, Instandhaltung und Erneuerung, inkl. Anbindung an CAFM-Systeme wo sinnvoll.',
    '["Betrieb","Dokumentation","Facility Management"]'::jsonb,
    '[4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["GEFMA 922","SIA 469"]'::jsonb,
    '["Effiziente Datennutzung im Betrieb","Integration in CAFM-Systeme","Aktuelle Dokumentation über Lebenszyklus"]'::jsonb,
    '["Objektdokumentation (OD)","CAFM-Anforderungen","Betriebskonzept"]'::jsonb,
    '["CAFM-Datensatz","Betriebsdokumentation","Aktualisierte Bestandsdaten"]'::jsonb,
    '[{"actor":"FM-Manager","responsible":["Datenübernahme","Pflege CAFM"],"contributing":[],"informed":[]},{"actor":"BIM-Gesamtkoordinator","responsible":["Datenbereitstellung"],"contributing":["Abstimmung Datenformat"],"informed":[]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc210',
    'Gewährleistungsmanagement',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    'Betrieb',
    'Verfolgung und Dokumentation von Gewährleistungsansprüchen, Fristen und Mängelrügen während der Garantiezeit.',
    '["Betrieb","Qualitätssicherung","Facility Management"]'::jsonb,
    '[4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 118","OR"]'::jsonb,
    '["Fristgerechte Geltendmachung von Ansprüchen","Vollständige Dokumentation","Vermeidung von Fristversäumnissen"]'::jsonb,
    '["Abnahmeprotokolle","Gewährleistungsfristen","Mängelmeldungen"]'::jsonb,
    '["Mängelrügen","Gewährleistungsverfolgung","Abschlussdokumentation"]'::jsonb,
    '[{"actor":"FM-Manager","responsible":["Fristenüberwachung","Mängelrügen"],"contributing":[],"informed":[]},{"actor":"Projektleiter","responsible":[],"contributing":["Unterstützung bei komplexen Fällen"],"informed":["Gewährleistungsstatus"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc220',
    'Wartungs- und Inspektionsmanagement',
    'assets/img/usecase/uc220.jpg',
    'Betrieb',
    'Planung, Durchführung und Dokumentation von Wartungs- und Inspektionsarbeiten an technischen Anlagen und Bauteilen.',
    '["Betrieb","Facility Management"]'::jsonb,
    '[4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 469","GEFMA 124"]'::jsonb,
    '["Werterhaltung der Anlagen","Vermeidung von Ausfällen","Erfüllung Betreiberverantwortung"]'::jsonb,
    '["Wartungspläne","Anlagendokumentation","Herstellervorgaben"]'::jsonb,
    '["Wartungsprotokolle","Inspektionsberichte","Massnahmenplanung"]'::jsonb,
    '[{"actor":"FM-Manager","responsible":["Wartungsplanung","Beauftragung"],"contributing":[],"informed":["Wartungsberichte"]},{"actor":"Servicetechniker","responsible":["Durchführung Wartung","Dokumentation"],"contributing":[],"informed":[]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc230',
    'Instandhaltungs- und Instandsetzungsmanagement',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    'Betrieb',
    'Erfassung, Priorisierung und Durchführung von Instandhaltungs- und Instandsetzungsmassnahmen zur Werterhaltung.',
    '["Betrieb","Facility Management"]'::jsonb,
    '[4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 469","DIN 31051"]'::jsonb,
    '["Werterhaltung des Gebäudes","Minimierung von Ausfallzeiten","Kostenoptimierte Massnahmenplanung"]'::jsonb,
    '["Schadensmeldungen","Inspektionsergebnisse","Zustandsbewertung"]'::jsonb,
    '["Massnahmenplan","Ausführungsdokumentation","Aktualisierte Zustandsdaten"]'::jsonb,
    '[{"actor":"FM-Manager","responsible":["Massnahmenplanung","Beauftragung"],"contributing":[],"informed":[]},{"actor":"Unternehmer","responsible":["Ausführung"],"contributing":[],"informed":["Auftrag"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc240',
    'Flächen- und Raumbelegungsmanagement',
    'assets/img/usecase/uc240.jpg',
    'Betrieb',
    'Verwaltung und Optimierung der Flächennutzung, Raumbelegung und Arbeitsplatzvergabe.',
    '["Betrieb","Bedarfsplanung","Facility Management"]'::jsonb,
    '[4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SIA 416","DIN 277"]'::jsonb,
    '["Optimale Flächenauslastung","Transparente Raumbelegung","Bedarfsgerechte Arbeitsplatzvergabe"]'::jsonb,
    '["Flächendaten","Nutzungsanforderungen","Belegungsdaten"]'::jsonb,
    '["Belegungsplan","Flächenauswertungen","Optimierungsvorschläge"]'::jsonb,
    '[{"actor":"FM-Manager","responsible":["Flächenplanung","Belegungssteuerung"],"contributing":[],"informed":[]},{"actor":"Nutzer","responsible":[],"contributing":["Bedarfsmeldung"],"informed":["Zuweisung"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc250',
    'Energiemanagement',
    'assets/img/usecase/uc250.jpg',
    'Betrieb',
    'Monitoring und Steuerung der Gebäudeperformance, Erfassung von Verbräuchen und Optimierung der Energieeffizienz.',
    '["Betrieb","Nachhaltigkeit","Facility Management"]'::jsonb,
    '[4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["ISO 50001","SIA 380/1"]'::jsonb,
    '["Reduktion Energieverbrauch","Transparentes Verbrauchsmonitoring","Erreichung Klimaziele"]'::jsonb,
    '["Verbrauchsdaten","Zielwerte","Gebäudedaten"]'::jsonb,
    '["Energiebericht","Benchmarking","Optimierungsmassnahmen"]'::jsonb,
    '[{"actor":"Energiemanager","responsible":["Monitoring","Analyse","Massnahmenplanung"],"contributing":[],"informed":[]},{"actor":"FM-Manager","responsible":[],"contributing":["Umsetzung Massnahmen"],"informed":["Energiebericht"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc260',
    'Betreiberverantwortung',
    'assets/img/usecase/uc260.jpg',
    'Betrieb',
    'Erfüllung und Dokumentation der gesetzlichen Betreiberpflichten, Sicherheitsprüfungen und Nachweise.',
    '["Betrieb","Qualitätssicherung","Risikomanagement","Facility Management"]'::jsonb,
    '[4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["GEFMA 190","VKF","SUVA"]'::jsonb,
    '["Erfüllung gesetzlicher Pflichten","Rechtssichere Dokumentation","Sicherheit für Nutzer"]'::jsonb,
    '["Gesetzliche Vorgaben","Prüfpflichten","Anlagendokumentation"]'::jsonb,
    '["Prüfberichte","Nachweisdokumentation","Massnahmenplan"]'::jsonb,
    '[{"actor":"FM-Manager","responsible":["Koordination Prüfungen","Dokumentation"],"contributing":[],"informed":[]},{"actor":"Prüfstelle","responsible":["Durchführung Prüfungen"],"contributing":[],"informed":[]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc270',
    'Nachhaltigkeitsnachweise',
    'assets/img/usecase/uc270.jpg',
    'Nachhaltigkeit',
    'Erstellung von Nachweisen für Nachhaltigkeitszertifizierungen (SNBS, Minergie, DGNB) inkl. Ökobilanz, Lebenszykluskosten und Komfortnachweise.',
    '["Entwicklung","Planung","Realisierung","Betrieb","Nachhaltigkeit","Zertifizierung"]'::jsonb,
    '[1,2,3,4]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["SNBS","Minergie","SIA 2032","SIA 2040"]'::jsonb,
    '["Erreichung Nachhaltigkeitszertifikat","Transparente Nachweisführung","Optimierung Umweltwirkung"]'::jsonb,
    '["Planungsunterlagen","Materialdaten","Energiekonzept"]'::jsonb,
    '["Ökobilanz","LCC-Berechnung","Zertifikat"]'::jsonb,
    '[{"actor":"Nachhaltigkeitsberater","responsible":["Erstellung Nachweise","Zertifizierungsprozess"],"contributing":[],"informed":[]},{"actor":"Fachplaner","responsible":["Datenlieferung"],"contributing":["Optimierung"],"informed":["Bewertungsergebnisse"]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc280',
    'Rückbauplanung',
    'assets/img/usecase/uc280.jpg',
    'Rückbau',
    'Planung des Rückbaus unter Berücksichtigung von Schadstoffsanierung, Materialrückgewinnung und Entsorgungskonzept.',
    '["Abbruch","Nachhaltigkeit"]'::jsonb,
    '[5]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["VVEA","SIA 430"]'::jsonb,
    '["Schadstofffreier Rückbau","Maximale Materialrückgewinnung","Umweltgerechte Entsorgung"]'::jsonb,
    '["Bestandsdokumentation","Schadstoffkataster","Materialdaten"]'::jsonb,
    '["Rückbaukonzept","Entsorgungskonzept","Materialkataster"]'::jsonb,
    '[{"actor":"Rückbauplaner","responsible":["Rückbauplanung","Entsorgungskonzept"],"contributing":[],"informed":[]},{"actor":"Schadstoffexperte","responsible":["Schadstoffkataster"],"contributing":["Sanierungskonzept"],"informed":[]}]'::jsonb
);

INSERT INTO usecases (id, title, image, category, description, tags, phases, process_url, examples, standards, goals, inputs, outputs, roles)
VALUES (
    'uc290',
    'Bauteilbörse und Wiederverwendung',
    'assets/img/usecase/uc290.jpg',
    'Rückbau',
    'Identifikation, Bewertung und Vermittlung von wiederverwendbaren Bauteilen und Materialien aus Rückbauprojekten.',
    '["Abbruch","Nachhaltigkeit"]'::jsonb,
    '[5]'::jsonb,
    'https://modeler.camunda.io/embed/08a56470-9848-4980-b498-7280c02a4d52',
    '[]'::jsonb,
    '["VVEA","SIA 430"]'::jsonb,
    '["Ressourcenschonung durch Wiederverwendung","Reduktion Abfallaufkommen","Wirtschaftlicher Mehrwert"]'::jsonb,
    '["Materialkataster","Zustandsbewertung Bauteile","Marktanalyse"]'::jsonb,
    '["Bauteilkatalog","Vermittlung / Verkauf","Dokumentation Wiederverwendung"]'::jsonb,
    '[{"actor":"Rückbauplaner","responsible":["Identifikation Bauteile","Bewertung"],"contributing":[],"informed":[]},{"actor":"Bauherr","responsible":["Entscheid Wiederverwendung"],"contributing":[],"informed":["Potenzialanalyse"]}]'::jsonb
);

-- ===========================================
-- DOCUMENTS DATA
-- ===========================================
INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O01001',
    'Immobilienhandbuch',
    '',
    'Organisation',
    'Das Immobilienhandbuch regelt die Abläufe, Zuständigkeiten, Kompetenzen sowie die Formen der Zusammenarbeit im Immobilienmanagement',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O01002',
    'Organigramm Stammorganisation',
    '',
    'Organisation',
    'Grafische Darstellung des logischen Aufbaus einer Stammorganisation',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O01003',
    'Adressverzeichnis Stammorganisation',
    '',
    'Organisation',
    'Verzeichnis aller Namen und Adressen einer Stammorganisation',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O02001',
    'Projektauftrag',
    '',
    'Organisation',
    'Beinhaltet Kosten, Termine, Leistungen, Qualität, Organisationsform für die kommende Phase',
    '["Koordination","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O02002',
    'Projekthandbuch',
    '',
    'Organisation',
    'Das Projekthandbuch regelt die Abläufe, Zuständigkeiten, Kompetenzen, sowie die Formen der Zusammenarbeit im Projektmanagement',
    '["Koordination","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O02003',
    'Organigramm Projektorganisation',
    '',
    'Organisation',
    'Grafische Darstellung des logischen Aufbaus einer Projektorganisation',
    '["Koordination","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O02004',
    'Adressverzeichnis Projektorganisation',
    '',
    'Organisation',
    'Verzeichnis aller Namen und Adressen einer Projektorganisation (inkl. Unternehmerliste)',
    '["Koordination","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[1,2,3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O02005',
    'Projektmanagementkonzept',
    '',
    'Organisation',
    'Konzept zum Planen, Steuern und Kontrollieren von Projekten',
    '["Koordination","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O02006',
    'Vorgehenskonzept',
    '',
    'Organisation',
    'Beschreibung über das Vorgehen bei der Umsetzung von Bau- und Planungsleitungen der kommenden Projektphasen',
    '["Koordination","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O02007',
    'Projektstatusbericht',
    '',
    'Organisation',
    'Bericht über den aktuellen Stand des Projektes und die weiteren Schritte',
    '["Koordination","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O02008',
    'Funktionendiagramm',
    '',
    'Organisation',
    'Aufstellung aller Aufgaben, Verantwortungen und Kompetenzen',
    '["Koordination","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O02009',
    'Projektantrag',
    '',
    'Organisation',
    'Antrag an eine übergeordnete Stelle für die Freigabe von weiteren Projektphasen',
    '["Koordination","Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O02010',
    'Projektänderungsantrag',
    '',
    'Organisation',
    'Antrag an eine übergeordnete Stelle für die Freigabe von Projektänderungen',
    '["Änderungsmanagement","Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O03001',
    'Betriebsführungshandbuch',
    '',
    'Organisation',
    'Regelt die Abläufe, Zuständigkeiten, Kompetenzen sowie die Formen der Zusammenarbeit im Facility Management',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O03002',
    'Organigramm Betriebsorganisation',
    '',
    'Organisation',
    'Grafische Darstellung des logischen Aufbaus einer Betriebsorganisation',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O03003',
    'Adressverzeichnis Betriebsorganisation',
    '',
    'Organisation',
    'Verzeichnis aller Namen und Adressen einer Betriebsorganisation',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O04001',
    'Risikoanalyse',
    '',
    'Organisation',
    'Risikoanalyse (Top-Down) wird bei jedem Phasenstart wiederholt revidiert',
    '["Risikomanagement","Qualitätssicherung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O04002',
    'PQM-Konzept/Handbuch',
    '',
    'Organisation',
    'Beschrieb wie das PQM System in diesem spezifischen Projekt gehandhabt wird',
    '["Qualitätssicherung","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O04003',
    'PQM-Vereinbarung',
    '',
    'Organisation',
    'PQM wird zwischen Bauherrschaft und Auftragnehmer vereinbart',
    '["Qualitätssicherung","Koordination"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '12 Jahre',
    '[2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O04004',
    'QM-Plan/Kontrollplan',
    '',
    'Organisation',
    'Wird aus der Risikoanalyse entwickelt und soll die Risiken minimieren',
    '["Qualitätssicherung","Risikomanagement"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O04005',
    'PQM-Prüfnachweis',
    '',
    'Organisation',
    'Jeder Beteiligte liefert seine Nachweisdokumente ans PQM',
    '["Qualitätssicherung","Nachweise/Bemessung und Nachweisführung/Gutachten"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O04006',
    'PQM-Überwachung',
    '',
    'Organisation',
    'Festgelegte Massnahmen aus der Überprüfung des Kontrollplans',
    '["Qualitätssicherung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O04051',
    'Checkliste',
    '',
    'Organisation',
    'Checkliste für die Überprüfung von Qualität und Abläufen im Allgemeinen',
    '["Qualitätssicherung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'keine Aufbewahrung',
    '[3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O04052',
    'Wartungscheckliste',
    '',
    'Organisation',
    'Checkliste für die Wartung von Anlagen',
    '["Betrieb","Qualitätssicherung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O04101',
    'Regulatorienhandbuch',
    '',
    'Organisation',
    'Handbuch/Sammlung aller wichtigen Regulatorien, welche das Bauwerk und deren Anlagen betreffen',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O05001',
    'Informationskonzept',
    '',
    'Organisation',
    'Konzept zur Festlegung der Verbreitung von Informationen über Bauwerke und Projekte',
    '["Dokumentation","Koordination"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[1,2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O05002',
    'Kommunikationskonzept',
    '',
    'Organisation',
    'Konzept über die Art und Form Kommunikation innerhalb einer Organisation und gegen Aussen',
    '["Dokumentation","Koordination"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[1,2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O05003',
    'Datenaustauschvereinbarung',
    '',
    'Organisation',
    'Vereinbarung über den projektspezifischen Datenaustausch',
    '["Dokumentation","Koordination"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O05004',
    'Dokumentationskonzept',
    '',
    'Organisation',
    'Beschreibt die Anforderungen an die Bauwerksdokumentation',
    '["Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O05005',
    'DM-Handbuch',
    '',
    'Organisation',
    'Regelt die Datenmanagement-Prozesse sowie Inhalte und Formen der Bauwerksdokumentation',
    '["Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[1,2,3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O05006',
    'DM-Prüfprotokoll',
    '',
    'Organisation',
    'Qualitätsprüfprotokoll für die Bauwerksdokumentation',
    '["Dokumentation","Qualitätssicherung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[1,2,3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O06001',
    'Terminplan',
    '',
    'Organisation',
    'Auflistung von Start- und Endterminen von Aufgaben und Meilensteinen',
    '["Termine"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O06002',
    'Netzplan',
    '',
    'Organisation',
    'Darstellung aller planerischen und baulichen Abhängigkeiten',
    '["Termine","Koordination"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O07001',
    'Piketteinsatzplan',
    '',
    'Organisation',
    'Organisation der Piketteinsätze über einen bestimmten Zeitraum',
    '["Betrieb","Termine"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O07002',
    'Reinigungseinsatzplan',
    '',
    'Organisation',
    'Organisation der Reinigungseinsätze über einen bestimmten Zeitraum',
    '["Betrieb","Termine"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O07003',
    'Wartungsplan',
    '',
    'Organisation',
    'Übersicht der geplanten bzw. der zu planenden Wartungen',
    '["Betrieb","Termine"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O08001',
    'Dokumentenverzeichnis',
    '',
    'Organisation',
    'Verzeichnis aller relevanten Dokumente gemäss KBOB/IPB-Empfehlung',
    '["Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[1,2,3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O08002',
    'Planverzeichnis',
    '',
    'Organisation',
    'Verzeichnis aller relevanten Pläne gemäss KBOB/IPB-Empfehlung',
    '["Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[1,2,3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O09001',
    'Telefonverzeichnis',
    '',
    'Organisation',
    'Verzeichnis mit Mitarbeitern und Telefonnummern',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O09002',
    'Mieter-/Eigentümerverzeichnis',
    '',
    'Organisation',
    'Verzeichnis der Mieter und Eigentümer',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10001',
    'Sitzungs- und Beschlussprotokoll',
    '',
    'Organisation',
    'Dokumentation von relevanten Vorgängen und deren Reihenfolge, Zeitpunkt, Auftraggeber und Verantwortliche im Rahmen von Besprechungen',
    '["Koordination","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10002',
    'Übergabeprotokoll Bewirtschaftung',
    '',
    'Organisation',
    'Protokoll der Übergabe der Bewirtschaftung an den Bewirtschafter oder einen Betreiber',
    '["Abnahme","Inbetriebnahme"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '12 Jahre',
    '[3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10003',
    'Übergabeprotokoll Mietvertrag',
    '',
    'Organisation',
    'Protokoll der Übergabe/Übernahme eines Mietobjekts',
    '["Abnahme","Betrieb"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '12 Jahre',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10004',
    'Aktennotiz',
    '',
    'Organisation',
    'Schriftlich festgehaltene relevante und kurze Information',
    '["Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10005',
    'Pendenzenliste',
    '',
    'Organisation',
    'Zusammenstellung aller schwebenden, unerledigten Angelegenheiten',
    '["Koordination"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'keine Aufbewahrung',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10006',
    'Projektänderungsverzeichnis',
    '',
    'Organisation',
    'Verzeichnis aller Projektänderungen',
    '["Änderungsmanagement","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10007',
    'Behördenkorrespondenz',
    '',
    'Organisation',
    'Korrespondenzdokumente an und von Behörden mit wichtigen aufbewahrungsrelevanten Informationen',
    '["Genehmigung","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '12 Jahre',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10008',
    'Interne Korrespondenz',
    '',
    'Organisation',
    'Korrespondenz innerhalb des Unternehmens mit wichtigen aufbewahrungsrelevanten Informationen',
    '["Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10009',
    'Korrespondenz mit Beauftragten',
    '',
    'Organisation',
    'Korrespondenz an und von Beauftragten mit wichtigen aufbewahrungsrelevanten Informationen',
    '["Koordination","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10010',
    'Korrespondenz mit Mietern',
    '',
    'Organisation',
    'Sämtliche Korrespondenz an und von Mietvertragspartnern',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10011',
    'Allgemeine Korrespondenz',
    '',
    'Organisation',
    'Weitere allgemeine Korrespondenz mit wichtigen aufbewahrungsrelevanten Informationen',
    '["Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10012',
    'Mängelrüge',
    '',
    'Organisation',
    'Schriftliche Meldung von Mängeln an einem Mietobjekt',
    '["Abnahme","Qualitätssicherung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10013',
    'Kündigungsschreiben',
    '',
    'Organisation',
    'Kündigungsschreiben eines Mietverhältnisses',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '12 Jahre',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10014',
    'Beschlussverzeichnis',
    '',
    'Organisation',
    'Verzeichnis aller Beschlüsse aus den Beschlussprotokollen',
    '["Koordination","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10015',
    'Schadensmeldung',
    '',
    'Organisation',
    'Offizielle Meldung eines Schadens an den Bewirtschafter/Eigentümer',
    '["Betrieb","Risikomanagement"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10016',
    'Wartungsmeldung',
    '',
    'Organisation',
    'Offizielle Meldung einer Wartungsmassnahme',
    '["Betrieb"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10017',
    'Störungsmeldung',
    '',
    'Organisation',
    'Offizielle Meldung einer Störung einer Anlage',
    '["Betrieb"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10018',
    'Politischer Vorstoss',
    '',
    'Organisation',
    'Anfragen aus der Politik zur Stellungnahme durch den Bauherren',
    '["Genehmigung","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '12 Jahre',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10019',
    'Rechtsfall',
    '',
    'Organisation',
    'Dokumente zu einem Rechtsfall',
    '["Dokumentation","Risikomanagement"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '12 Jahre',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O10020',
    'Korrespondenz Dritte',
    '',
    'Organisation',
    'Korrespondenz mit weiteren Rollen rund um ein Bauwerk',
    '["Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O11001',
    'Schlüssel- und Kartenquittung',
    '',
    'Organisation',
    'Bestätigung für den Erhalt von Schlüsseln und Karten',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O12001',
    'Publikation',
    '',
    'Organisation',
    'Veröffentlichung von Informationen zu Bauwerken und Bauprojekten',
    '["Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O12002',
    'Öffentlichkeitsarbeit',
    '',
    'Organisation',
    'Korrespondenz, Artikel etc. für die Öffentlichkeitsarbeit (inkl. Präsentationen und Anlässe)',
    '["Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[1,2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13001',
    'Gesuch',
    '',
    'Organisation',
    'Antragsformular',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13002',
    'Gesuch Kanalisation',
    '',
    'Organisation',
    'Antragsformular für den Anschluss eines Bauwerks an die Kanalisation',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13003',
    'Gesuch Elektrizität',
    '',
    'Organisation',
    'Antragsformular für den Anschluss, Stilllegung, Änderung einer elektrischen Anlage an das Elektrizitätsnetz',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13004',
    'Gesuch Kabelfernsehen',
    '',
    'Organisation',
    'Antragsformular für den Anschluss, Stilllegung, Änderung eines Bauwerks an das Kabelfernseh-Netz',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13005',
    'Gesuch Gas',
    '',
    'Organisation',
    'Antragsformular für den Anschluss, Stilllegung, Änderung eines Bauwerks an das Gasnetz',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13006',
    'Gesuch Wasser',
    '',
    'Organisation',
    'Antragsformular für den Anschluss, Stilllegung, Änderung eines Bauwerks an die Wasserversorgung',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13007',
    'Gesuch Fernheizung',
    '',
    'Organisation',
    'Antragsformular für den Anschluss, Stilllegung, Änderung eines Bauwerks an die Fernheizung',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13008',
    'Gesuch Erdsondennutzung',
    '',
    'Organisation',
    'Antragsformular zur Nutzung von Erdwärme mittels Erdsonden',
    '["Genehmigung","Nachhaltigkeit"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13009',
    'Gesuch Grundwassernutzung',
    '',
    'Organisation',
    'Antragsformular zur Nutzung von Grundwasser zu Heiz- oder Kühlzwecken',
    '["Genehmigung","Nachhaltigkeit"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13010',
    'Gesuch Oberflächengewässernutzung',
    '',
    'Organisation',
    'Antragsformular zur Nutzung von Oberflächengewässer (Fluss oder See) zu Heiz- oder Kühlzwecken',
    '["Genehmigung","Nachhaltigkeit"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13011',
    'Gesuch Bedarfsnachweiskühlung',
    '',
    'Organisation',
    'Antragsformular zur Bewilligung von Kältenutzung (Bedarfsnachweis nach Kühlung)',
    '["Genehmigung","Nachhaltigkeit"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13012',
    'Gesuch Telekommunikation',
    '',
    'Organisation',
    'Antragsformular für den Anschluss, Stilllegung, Änderung eines Bauwerks an das Telekommunikationsnetz',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13013',
    'Gesuch für Spezialbewilligungen',
    '',
    'Organisation',
    'Antragsformular für weitere Bewilligungen',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13014',
    'Gesuch Feuerpolizei',
    '',
    'Organisation',
    'Antragsformular an die Feuerpolizei',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13015',
    'Baugesuch',
    '',
    'Organisation',
    'Antragsformular für die Baubewilligung',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13016',
    'Konzessionsgesuch',
    '',
    'Organisation',
    'Antragsformular zum Erhalt von Konzessionen',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13017',
    'Subventionsantrag',
    '',
    'Organisation',
    'Antragsformular für Subventionsleistungen',
    '["Genehmigung","Kosten"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13018',
    'Gesuch Werbung',
    '',
    'Organisation',
    'Antragsformular zur Präsentation von Werbung',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13019',
    'Gesuch Bahntechnik',
    '',
    'Organisation',
    'Antragsformular für die Bahntechnik im Plangenehmigungsverfahren (PGV)',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13020',
    'Gesuch Denkmalpflege',
    '',
    'Organisation',
    'Antragsformular für die Denkmalpflege',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O13101',
    'Mietformular',
    '',
    'Organisation',
    'Antragsformular für die Miete einer Räumlichkeit',
    '["Betrieb"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14001',
    'Bewilligung',
    '',
    'Organisation',
    'Bewilligung/Entscheid',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14002',
    'Bewilligung Kanalisation',
    '',
    'Organisation',
    'Bewilligung für den Anschluss eines Bauwerks an die Kanalisation',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14003',
    'Bewilligung Elektrizität',
    '',
    'Organisation',
    'Bewilligung für den Anschluss, Stilllegung, Änderung einer elektrischen Anlage an das Elektrizitätsnetz',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14004',
    'Bewilligung Kabelfernsehen',
    '',
    'Organisation',
    'Bewilligung für den Anschluss, Stilllegung, Änderung eines Bauwerks an das Kabelfernseh-Netz',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14005',
    'Bewilligung Gas',
    '',
    'Organisation',
    'Bewilligung für den Anschluss, Stilllegung, Änderung eines Bauwerks an das Gasnetz',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14006',
    'Bewilligung Wasser',
    '',
    'Organisation',
    'Bewilligung für den Anschluss, Stilllegung, Änderung eines Bauwerks an die Wasserversorgung',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14007',
    'Bewilligung Fernheizung',
    '',
    'Organisation',
    'Bewilligung für den Anschluss, Stilllegung, Änderung eines Bauwerks an die Fernheizung',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14008',
    'Bewilligung Erdsondennutzung',
    '',
    'Organisation',
    'Bewilligung zur Nutzung von Erdwärme mittels Erdsonden',
    '["Genehmigung","Nachhaltigkeit"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14009',
    'Bewilligung Grundwassernutzung',
    '',
    'Organisation',
    'Bewilligung zur Nutzung von Grundwasser zu Heiz- oder Kühlzwecken',
    '["Genehmigung","Nachhaltigkeit"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14010',
    'Bewilligung Oberflächengewässernutzung',
    '',
    'Organisation',
    'Bewilligung zur Nutzung von Oberflächengewässer (Fluss oder See) zu Heiz- oder Kühlzwecken',
    '["Genehmigung","Nachhaltigkeit"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14011',
    'Bewilligung Bedarfsnachweiskühlung',
    '',
    'Organisation',
    'Bewilligung von Kältenutzung (Bedarfsnachweis nach Kühlung)',
    '["Genehmigung","Nachhaltigkeit"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14012',
    'Bewilligung Telekommunikation',
    '',
    'Organisation',
    'Bewilligung für den Anschluss, Stilllegung, Änderung eines Bauwerks an das Telekommunikationsnetz',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14013',
    'Spezialbewilligung',
    '',
    'Organisation',
    'Bewilligung für weitere Themenbereiche',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14014',
    'Entscheid Feuerpolizei',
    '',
    'Organisation',
    'Baubewilligung von der Feuerpolizei',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14015',
    'Baubewilligung',
    '',
    'Organisation',
    'Baubewilligung inkl. unterzeichnete Pläne',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14016',
    'Baurechtsentscheid',
    '',
    'Organisation',
    'Baurechtsentscheid (Erstinstanzliches Organ bei Baurechtsfällen)',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14017',
    'Entscheid Umweltbehörde',
    '',
    'Organisation',
    'Entscheid über die Baubewilligung von der Umweltbehörde',
    '["Genehmigung","Nachhaltigkeit"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14018',
    'Behördenentscheid (Diverse)',
    '',
    'Organisation',
    'Weitere Behördenentscheide',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14019',
    'Betriebsbewilligung',
    '',
    'Organisation',
    'Bewilligung für die Inbetriebnahme eines Bauwerks',
    '["Genehmigung","Inbetriebnahme"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14020',
    'Konzessionsbewilligung',
    '',
    'Organisation',
    'Bewilligung für eine Konzession',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14021',
    'Subventionszusage',
    '',
    'Organisation',
    'Zusage eines Subventionsantrages',
    '["Genehmigung","Kosten"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14022',
    'Bewilligung Werbung',
    '',
    'Organisation',
    'Bewilligung zur Präsentation von Werbung',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14023',
    'Bewilligung Bahntechnik',
    '',
    'Organisation',
    'Bewilligung für die Bahntechnik im Plangenehmigungsverfahren (PGV)',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14024',
    'Bewilligung Denkmalpflege',
    '',
    'Organisation',
    'Bewilligung der Denkmalpflege',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14050',
    'Behördliche Auflagen',
    '',
    'Organisation',
    'Von einer Behörde vorgeschriebene Auflagen im Rahmen einer Bewilligung',
    '["Genehmigung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[2,3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14101',
    'Zutrittsbewilligung',
    '',
    'Organisation',
    'Bewilligung für den Zutritt in eine Baustelle oder ein bestehendes Bauwerk',
    '["Genehmigung","Betrieb"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O14102',
    'Parkkarte',
    '',
    'Organisation',
    'Parkbewilligung',
    '["Betrieb"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Bearbeitungszweck entfällt',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O15001',
    'Vorabnahmeprotokoll',
    '',
    'Organisation',
    'Vorabnahmeprotokoll wird im Rahmen einer Abnahme während der Objektfertigstellung geführt',
    '["Abnahme","Qualitätssicherung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '12 Jahre',
    '[3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O15002',
    'Abnahmeprotokoll',
    '',
    'Organisation',
    'Das Abnahmeprotokoll wird bei der Abnahme nach Abschluss der Objektfertigstellung geführt und wird zum Festhalten des Sachverhaltes benötigt',
    '["Abnahme","Qualitätssicherung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '12 Jahre',
    '[3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O15003',
    'Protokoll integrale Tests',
    '',
    'Organisation',
    'Abnahmeprotokoll der integralen Tests',
    '["Abnahme","Inbetriebnahme","Qualitätssicherung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '12 Jahre',
    '[3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O15004',
    'Inbetriebnahmeprotokoll',
    '',
    'Organisation',
    'Inbetriebnahmeprotokoll wird bei der Inbetriebnahme eines Objektes oder Anlage geführt',
    '["Inbetriebnahme","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '12 Jahre',
    '[3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O15005',
    'Mängelliste',
    '',
    'Organisation',
    'Verzeichnis aller Mängel',
    '["Abnahme","Qualitätssicherung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O15006',
    'Inspektionsprotokoll',
    '',
    'Organisation',
    'Protokoll mit Ergebnissen und Massnahmen im Rahmen einer Inspektion',
    '["Betrieb","Qualitätssicherung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O15008',
    'Ereignisprotokoll',
    '',
    'Organisation',
    'Liste von meldepflichtigen Ereignissen im Rahmen eines Prozesses',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O15009',
    'Rissprotokoll',
    '',
    'Organisation',
    'Dokumentation über Risse/Schäden an den Bestandsbauten während der Bauzeit',
    '["Qualitätssicherung","Bestandserfassung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '12 Jahre',
    '[3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O15010',
    'Schlussprotokoll',
    '',
    'Organisation',
    'Festhalten der abschliessenden Prüfung des Bauwerk nach Ablauf der Garantiefrist (SIA118, Art. 177)',
    '["Abnahme","Qualitätssicherung"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '12 Jahre',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O15011',
    'Massnahmenkatalog',
    '',
    'Organisation',
    'Liste geplanter Massnahmen',
    '["Betrieb","Koordination"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O15012',
    'Instandsetzungsprotokoll',
    '',
    'Organisation',
    'Protokoll einer Reparatur',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O15013',
    'Installationsattest',
    '',
    'Organisation',
    'Anzeige für die Fertigstellung bzw. Prüfung von Gefahrenmeldeanlagen',
    '["Abnahme","Nachweise/Bemessung und Nachweisführung/Gutachten"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[3,4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O16001',
    'Baujournal',
    '',
    'Organisation',
    'Zusammenstellung aller während der Bauzeit relevanten Ereignisse, Entscheide, Aufgaben etc. in zeitlicher Abfolge',
    '["Dokumentation","Koordination"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '12 Jahre',
    '[3]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O16002',
    'Betriebsjournal',
    '',
    'Organisation',
    'Journal zum Festhalten von Ereignissen, Veränderungen etc. in einem Bauwerk während der Betriebsphase',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O16003',
    'Besucherjournal',
    '',
    'Organisation',
    'Registration der angemeldeten Besucher inkl. weiteren Angaben zum Aufenthalt und Dauer',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O16004',
    'Parkplatzjournal',
    '',
    'Organisation',
    'Registration der angemeldeten Parkplatznutzer inkl. weiteren Angaben zum Aufenthalt und Dauer',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O16005',
    'Ereignisjournal',
    '',
    'Organisation',
    'Registration aller wichtigen Ereignisse in und um ein Bauwerk',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    '5 Jahre',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O16006',
    'Logbuch',
    '',
    'Organisation',
    'Automatische Registration aller wichtigen Ereignisse einer Anlage',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[4]'::jsonb
);

INSERT INTO documents (id, title, image, category, description, tags, formats, retention, phases)
VALUES (
    'O16007',
    'Wartungsjournal',
    '',
    'Organisation',
    'Liste der durchgeführten Wartungen',
    '["Betrieb","Dokumentation"]'::jsonb,
    '["PDF-A","Office-Format"]'::jsonb,
    'bis Ersatz',
    '[3,4]'::jsonb
);

-- ===========================================
-- MODELS DATA
-- ===========================================
INSERT INTO models (id, title, image, category, description, tags, classifications, phases)
VALUES (
    'm1',
    'Architekturmodell',
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=200&fit=crop',
    'Fachmodelle',
    'Digitales 3D-Modell der architektonischen Planung mit Räumen, Wänden, Decken und Öffnungen',
    '["Architektur","Fachmodelle"]'::jsonb,
    '[{"system":"KBOB-FM","code":"FM-AR01","desc":"Architekturmodell"},{"system":"ISO 19650","code":"5.1.1","desc":"Architectural model"}]'::jsonb,
    '[1,2,3,4]'::jsonb
);

INSERT INTO models (id, title, image, category, description, tags, classifications, phases)
VALUES (
    'm2',
    'Tragwerksmodell',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=200&fit=crop',
    'Fachmodelle',
    'BIM-Modell der tragenden Struktur mit statischen Bauteilen und Bewehrung',
    '["Tragwerk","Fachmodelle"]'::jsonb,
    '[{"system":"KBOB-FM","code":"FM-TW01","desc":"Tragwerksmodell"},{"system":"ISO 19650","code":"5.1.2","desc":"Structural model"}]'::jsonb,
    '[2,3,4]'::jsonb
);

INSERT INTO models (id, title, image, category, description, tags, classifications, phases)
VALUES (
    'm3',
    'HLKS-Modell',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=200&fit=crop',
    'Fachmodelle',
    'Integriertes Modell für Heizung, Lüftung, Klima und Sanitär',
    '["Haustechnik","Fachmodelle"]'::jsonb,
    '[{"system":"KBOB-FM","code":"FM-HK01","desc":"HLKS-Modell"},{"system":"ISO 19650","code":"5.1.3","desc":"MEP model"}]'::jsonb,
    '[2,3,4]'::jsonb
);

INSERT INTO models (id, title, image, category, description, tags, classifications, phases)
VALUES (
    'm4',
    'Elektromodell',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
    'Fachmodelle',
    'BIM-Modell der Elektroinstallationen, Verkabelung und elektrischen Anlagen',
    '["Haustechnik","Fachmodelle"]'::jsonb,
    '[{"system":"KBOB-FM","code":"FM-EL01","desc":"Elektromodell"},{"system":"ISO 19650","code":"5.1.4","desc":"Electrical model"}]'::jsonb,
    '[2,3,4]'::jsonb
);

INSERT INTO models (id, title, image, category, description, tags, classifications, phases)
VALUES (
    'm5',
    'Koordinationsmodell',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop',
    'Koordination',
    'Zusammengeführtes Gesamtmodell aller Fachmodelle für Koordination und Kollisionsprüfung',
    '["BIM-Koordination","Koordination"]'::jsonb,
    '[{"system":"KBOB-FM","code":"FM-KO01","desc":"Koordinationsmodell"},{"system":"ISO 19650","code":"5.2.1","desc":"Federated model"}]'::jsonb,
    '[2,3,4]'::jsonb
);

INSERT INTO models (id, title, image, category, description, tags, classifications, phases)
VALUES (
    'm6',
    'Aussenraummodell',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop',
    'Fachmodelle',
    'Modell der Aussenanlagen, Bepflanzung und Geländegestaltung',
    '["Landschaftsarchitektur","Fachmodelle"]'::jsonb,
    '[{"system":"KBOB-FM","code":"FM-LA01","desc":"Aussenraummodell"},{"system":"ISO 19650","code":"5.1.5","desc":"Landscape model"}]'::jsonb,
    '[2,3,4]'::jsonb
);

INSERT INTO models (id, title, image, category, description, tags, classifications, phases)
VALUES (
    'm7',
    'Brandschutzmodell',
    'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&h=200&fit=crop',
    'Spezialmodelle',
    'Fachmodell mit Brandschutzabschnitten, Fluchtwegen und Brandschutzeinrichtungen',
    '["Brandschutz","Spezialmodelle"]'::jsonb,
    '[{"system":"KBOB-FM","code":"FM-BS01","desc":"Brandschutzmodell"},{"system":"GEFMA","code":"190-10","desc":"Brandschutz"}]'::jsonb,
    '[2,3,4]'::jsonb
);

INSERT INTO models (id, title, image, category, description, tags, classifications, phases)
VALUES (
    'm8',
    'Baugrubenmodell',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=200&fit=crop',
    'Spezialmodelle',
    'Temporäres Modell für Baugrubensicherung und Aushubarbeiten',
    '["Tragwerk","Spezialmodelle"]'::jsonb,
    '[{"system":"KBOB-FM","code":"FM-BG01","desc":"Baugrubenmodell"},{"system":"ISO 19650","code":"5.3.1","desc":"Temporary works model"}]'::jsonb,
    '[2,3,4]'::jsonb
);

INSERT INTO models (id, title, image, category, description, tags, classifications, phases)
VALUES (
    'm9',
    'Bestandsmodell',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=200&fit=crop',
    'Bestand',
    'Digitales Abbild des fertiggestellten Gebäudes für Betrieb und Unterhalt',
    '["Facility Management","Bestand"]'::jsonb,
    '[{"system":"KBOB-FM","code":"FM-AB01","desc":"Bestandsmodell"},{"system":"ISO 19650","code":"5.4.1","desc":"As-built model"}]'::jsonb,
    '[3,4]'::jsonb
);

INSERT INTO models (id, title, image, category, description, tags, classifications, phases)
VALUES (
    'm10',
    'Fassadenmodell',
    'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=200&fit=crop',
    'Fachmodelle',
    'Detailliertes Modell der Gebäudehülle mit Fassadenelementen und Anschlüssen',
    '["Architektur","Fachmodelle"]'::jsonb,
    '[{"system":"KBOB-FM","code":"FM-FA01","desc":"Fassadenmodell"},{"system":"ISO 19650","code":"5.1.6","desc":"Facade model"}]'::jsonb,
    '[2,3,4]'::jsonb
);

-- ===========================================
-- EPDS DATA (Environmental Product Declarations)
-- ===========================================
INSERT INTO epds (id, title, image, category, description, tags, classifications, gwp, unit, phases)
VALUES (
    'epd1',
    'Beton C25/30',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=200&fit=crop',
    'Baustoffe',
    'Umweltproduktdeklaration für Normalbeton der Festigkeitsklasse C25/30',
    '["Tragwerk","Baustoffe"]'::jsonb,
    '[{"system":"KBOB-EPD","code":"EPD-B01","desc":"Beton"},{"system":"eBKP-H","code":"C2.1","desc":"Ortbeton"}]'::jsonb,
    238,
    'kg CO₂-eq/m³',
    '[2,3,4]'::jsonb
);

INSERT INTO epds (id, title, image, category, description, tags, classifications, gwp, unit, phases)
VALUES (
    'epd2',
    'Betonstahl',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=200&fit=crop',
    'Baustoffe',
    'Ökobilanz für Bewehrungsstahl nach SN EN 10080',
    '["Tragwerk","Baustoffe"]'::jsonb,
    '[{"system":"KBOB-EPD","code":"EPD-S01","desc":"Betonstahl"},{"system":"eBKP-H","code":"C2.2","desc":"Bewehrung"}]'::jsonb,
    1420,
    'kg CO₂-eq/t',
    '[2,3,4]'::jsonb
);

INSERT INTO epds (id, title, image, category, description, tags, classifications, gwp, unit, phases)
VALUES (
    'epd3',
    'Kalksandstein',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
    'Baustoffe',
    'EPD für Kalksandstein-Mauerwerk nach DIN 106',
    '["Architektur","Baustoffe"]'::jsonb,
    '[{"system":"KBOB-EPD","code":"EPD-M01","desc":"Kalksandstein"},{"system":"eBKP-H","code":"C3.1","desc":"Mauerwerk"}]'::jsonb,
    152,
    'kg CO₂-eq/m³',
    '[2,3,4]'::jsonb
);

INSERT INTO epds (id, title, image, category, description, tags, classifications, gwp, unit, phases)
VALUES (
    'epd4',
    'Konstruktionsholz',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=200&fit=crop',
    'Baustoffe',
    'Umweltdaten für Brettschichtholz (BSH) aus Fichtenholz',
    '["Tragwerk","Baustoffe"]'::jsonb,
    '[{"system":"KBOB-EPD","code":"EPD-H01","desc":"Brettschichtholz"},{"system":"eBKP-H","code":"C4.1","desc":"Holzkonstruktion"}]'::jsonb,
    -680,
    'kg CO₂-eq/m³',
    '[2,3,4]'::jsonb
);

INSERT INTO epds (id, title, image, category, description, tags, classifications, gwp, unit, phases)
VALUES (
    'epd5',
    'Mineralwolle',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=200&fit=crop',
    'Dämmstoffe',
    'Ökobilanz für Steinwolle-Dämmplatten',
    '["Architektur","Dämmstoffe"]'::jsonb,
    '[{"system":"KBOB-EPD","code":"EPD-D01","desc":"Mineralwolle"},{"system":"eBKP-H","code":"E1.1","desc":"Wärmedämmung"}]'::jsonb,
    1.2,
    'kg CO₂-eq/kg',
    '[2,3,4]'::jsonb
);

INSERT INTO epds (id, title, image, category, description, tags, classifications, gwp, unit, phases)
VALUES (
    'epd6',
    'Dreifachverglasung',
    'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=200&fit=crop',
    'Bauteile',
    'EPD für 3-fach Isolierverglasung mit Wärmeschutzbeschichtung',
    '["Architektur","Bauteile"]'::jsonb,
    '[{"system":"KBOB-EPD","code":"EPD-G01","desc":"Isolierverglasung"},{"system":"eBKP-H","code":"E2.1","desc":"Fenster"}]'::jsonb,
    28.5,
    'kg CO₂-eq/m²',
    '[2,3,4]'::jsonb
);

INSERT INTO epds (id, title, image, category, description, tags, classifications, gwp, unit, phases)
VALUES (
    'epd7',
    'Aluminiumfassade',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop',
    'Bauteile',
    'Umweltdaten für Aluminium-Pfosten-Riegel-Fassade',
    '["Architektur","Bauteile"]'::jsonb,
    '[{"system":"KBOB-EPD","code":"EPD-F01","desc":"Alufassade"},{"system":"eBKP-H","code":"E3.1","desc":"Fassadenbekleidung"}]'::jsonb,
    12.8,
    'kg CO₂-eq/kg',
    '[2,3,4]'::jsonb
);

INSERT INTO epds (id, title, image, category, description, tags, classifications, gwp, unit, phases)
VALUES (
    'epd8',
    'Photovoltaikmodul',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=200&fit=crop',
    'Technik',
    'Ökobilanz für monokristalline Solarmodule',
    '["Haustechnik","Technik"]'::jsonb,
    '[{"system":"KBOB-EPD","code":"EPD-PV01","desc":"PV-Modul"},{"system":"eBKP-H","code":"D8.1","desc":"Photovoltaik"}]'::jsonb,
    45,
    'kg CO₂-eq/m²',
    '[2,3,4]'::jsonb
);

INSERT INTO epds (id, title, image, category, description, tags, classifications, gwp, unit, phases)
VALUES (
    'epd9',
    'Wärmepumpe Luft/Wasser',
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=200&fit=crop',
    'Technik',
    'EPD für Luft-Wasser-Wärmepumpen bis 15 kW',
    '["Haustechnik","Technik"]'::jsonb,
    '[{"system":"KBOB-EPD","code":"EPD-WP01","desc":"Wärmepumpe"},{"system":"eBKP-H","code":"D5.1","desc":"Wärmeerzeugung"}]'::jsonb,
    2850,
    'kg CO₂-eq/Stk',
    '[2,3,4]'::jsonb
);

INSERT INTO epds (id, title, image, category, description, tags, classifications, gwp, unit, phases)
VALUES (
    'epd10',
    'Linoleum',
    'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=200&fit=crop',
    'Ausbau',
    'Umweltproduktdeklaration für Linoleum-Bodenbelag',
    '["Architektur","Ausbau"]'::jsonb,
    '[{"system":"KBOB-EPD","code":"EPD-L01","desc":"Linoleum"},{"system":"eBKP-H","code":"G2.1","desc":"Bodenbelag"}]'::jsonb,
    4.2,
    'kg CO₂-eq/m²',
    '[3,4]'::jsonb
);

-- ===========================================
-- Verify data was inserted
-- ===========================================
SELECT 'elements' as table_name, COUNT(*) as count FROM elements
UNION ALL
SELECT 'usecases', COUNT(*) FROM usecases
UNION ALL
SELECT 'documents', COUNT(*) FROM documents
UNION ALL
SELECT 'models', COUNT(*) FROM models
UNION ALL
SELECT 'epds', COUNT(*) FROM epds;
