import React from "react";
import { Container } from '@mantine/core';
import CertificatTravailPDF from './CertificatTravailPDF';
import PDFViewer from './PDFViewer';

import "./certificat-travail.css";
import logo from "./assets/img/logo.png";

export const CertificatTravail = () => {
  return (
    <Container size="md" py="xl">
      <div className="a4">
        <div className="header">
          <img src={logo} className="logo" alt="GULFSAT" />
          <div className="company">
            Lot IVR 41 Avenue de l'Indépendance
            <br />
            Antanimena – 101 Antananarivo
            <br />
            Tél : 020 23 320 10 | info@gulfsat.mg
          </div>
        </div>

        <div className="title">Certificat de Travail</div>

        <div className="content">
          Nous soussignée, la <strong>Société GULFSAT MADAGASCAR</strong>, sise au Lot IVR 41 Avenue de l'Indépendance, Antanimena – 101 Antananarivo,
          <br />
          certifions par la présente que :
          <br />
          <br />

          <div className="highlight">
            <strong>Madame RAKOTOBE Mariane</strong>
            <br />
            Titulaire de la CIN n° <strong>101 252 190 721</strong>
            <br />
            Délivrée le 31 mars 2015 à Antananarivo V
            <br />
            Résidant au Lot II C 10 D Bis A Manjakaray
          </div>

          a été employée au sein de notre société en qualité de :
          <br />
          <br />
          • « <strong>Assistante Commerciale</strong> » du <strong>01 janvier 2020 au 08 octobre 2022</strong>
          <br />
          <br />
          • « <strong>Chargée de Clientèle</strong> » du <strong>09 octobre 2022 au 28 février 2023</strong>
          <br />
          <br />
          • « <strong>Responsable Commerciale</strong> » du <strong>01 mars 2023 au 08 octobre 2025</strong>
          <br />
          <br />

          Elle nous quitte libre de tout engagement.
          <br />
          <br />

          En foi de quoi, le présent certificat lui est délivré pour servir et valoir ce que de droit.
        </div>

        <div className="signature-block">
          Fait à Antananarivo, le <strong>08 octobre 2025</strong>
          <br></br>
          <br></br>
          <br></br>
          {/* <div className="signature-line"></div> */}
          <div className="sign-name">Johary RAJAONARIVONY</div>
          Responsable des Ressources Humaines
        </div>
      </div>

      <PDFViewer
        document={<CertificatTravailPDF />}
        fileName="certificat-travail.pdf"
      />
    </Container>
  );
};

export default CertificatTravail;
