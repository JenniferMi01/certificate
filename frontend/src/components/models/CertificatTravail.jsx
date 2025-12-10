import React from "react";
import { Container, Button } from "@mantine/core";
// Nous utilisons react-to-pdf, donc ces imports de PDF/viewer sont retirés ou commentés
// import CertificatTravailPDF from "./CertificatTravailPDF";
// import PDFViewer from "./PDFViewer";

import '../models/assets/css/certificat-travail.css'
import logo from "./assets/img/logo.png";

// Import nécessaire pour générer le PDF à partir du HTML visible
import { Margin, usePDF } from "react-to-pdf";

export const CertificatTravail = () => {
  // 1. Initialisation du hook usePDF
  const { toPDF, targetRef } = usePDF({
    filename: "certificat-de-travail.pdf",
    page: { margin: Margin.SMALL, orientation: "portrait" },
  });

  return (
    <Container size="md" py="xl">
      {/* BOUTON DE TÉLÉCHARGEMENT (comme dans l'Attestation de Congé) */}
      <Button onClick={() => toPDF()}>Imprimer PDF</Button>

      {/* 2. CONTENEUR A4 AVEC LA RÉFÉRENCE POUR LE PDF */}
      <div className="a4" ref={targetRef}>
        <div className="header">
          <img src={logo} className="logo" alt="GULFSAT" />{" "}
          <div className="company">
            Lot IVR 41 Avenue de l'Indépendance <br />
            Antanimena – 101 Antananarivo <br />
            Tél : 020 23 320 10 | info@gulfsat.mg{" "}
          </div>{" "}
        </div>
        <div className="title">Certificat de Travail</div>{" "}
        <div className="content">
          Nous soussignée, la <strong>Société GULFSAT MADAGASCAR</strong>, sise
          au Lot IVR 41 Avenue de l'Indépendance, Antanimena – 101 Antananarivo,{" "}
          <br />
          certifions par la présente que :<br />
          <br />{" "}
          <div className="highlight" style={{ marginTop: '-10px', marginBottom: '20px'}}>
            <strong>Madame RAKOTOBE Mariane</strong>
            <br />
            Titulaire de la CIN n° <strong>101 252 190 721</strong>
            <br /> Délivrée le 31 mars 2015 à Antananarivo V <br /> Résidant au
            Lot II C 10 D Bis A Manjakaray{" "}
          </div>
          a été employée au sein de notre société en qualité de :
          <br />{" "}
          <div className="job-history">
            {" "}
            <p>
              • « <strong>Assistante Commerciale</strong> » du{" "}
              <strong>01 janvier 2020 au 08 octobre 2022</strong>
            </p>{" "}
            <p>
              • « <strong>Chargée de Clientèle</strong> » du{" "}
              <strong>09 octobre 2022 au 28 février 2023</strong>
            </p>{" "}
            <p>
              • « <strong>Responsable Commerciale</strong> » du{" "}
              <strong>01 mars 2023 au 08 octobre 2025</strong>
            </p>{" "}
          </div>
          Elle nous quitte libre de tout engagement. <br />
          <br />
          En foi de quoi, le présent certificat lui est délivré pour servir et
          valoir ce que de droit.{" "}
        </div>{" "}
        {/* BLOC DE SIGNATURE CORRIGÉ ET ESPACÉ */}
        <div className="signature-block">
          Fait à Antananarivo, le <strong>08 octobre 2025</strong>
          <br />
          <br />
          <br /> {/* Espace vide pour la signature (4 sauts de ligne) */}
          <div className="sign-name">Johary RAJAONARIVONY</div>
          Responsable des Ressources Humaines{" "}
        </div>{" "}
      </div>{" "}
    </Container>
  );
};

export default CertificatTravail;
