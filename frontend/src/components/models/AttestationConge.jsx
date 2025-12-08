import React from "react";
import { Container } from '@mantine/core';
import AttestationCongePDF from './AttestationCongePDF';
import PDFViewer from './PDFViewer';

import './attestation-conge.css'
import logo from './assets/img/logo.png'

export const AttestationConge = () => {
  return (
    <Container size="md" py="xl">
      <div className="a4">
        <div className="header">
          <img src={logo} className="logo" alt="GULFSAT" />
          <div className="company">
            {/* <h1>GULFSAT MADAGASCAR</h1> */}
            Lot IVR 41 Avenue de l'Indépendance
            <br />
            Antanimena – 101 Antananarivo
            <br />
            Tél : 020 23 320 10 | info@gulfsat.mg
          </div>
        </div>

        <div className="title">Attestation de Congé</div>

        <div className="content">
          Nous soussignés, la <strong>Société GULFSAT MADAGASCAR</strong>,<br />
          attestons par la présente que :<br />
          <div className="highlight">
            <strong>Madame RAKOTO Andrianirina</strong>
            <br />
            Née le <strong>29 novembre 1980</strong> à Soavinandriana Madagascar
          </div>
          est employée au sein de notre société en qualité de «{" "}
          <strong>Responsable …….</strong> » depuis le{" "}
          <strong>09 septembre 2013</strong>.<br />
          <br />
          Madame RAKOTO Andrianirina partira en congé du{" "}
          <strong>23 juillet 2025</strong> au <strong>31 août 2025</strong>.<br />
          <br />
          Sitôt le congé terminé, elle est tenue de retourner à Madagascar et de
          reprendre son poste de travail au sein de la Société.
          <br />
          <br />
          Délivrée à l’intéressée, sur sa demande, pour servir et valoir ce que de
          droit.
        </div>

        <div className="signature-block">
          Antananarivo, le <strong>03 juin 2025</strong>
          <br></br>
          {/* <div className="signature-line"></div> */}
          <br></br>
          <br></br>
          <div className="sign-name">Ndrianja RAJEMISON</div>
          Directeur Administratif et Financier
        </div>
      </div>

      <PDFViewer
        document={<AttestationCongePDF />}
        fileName="attestation-conge.pdf"
      />
    </Container>
  );
};

export default AttestationConge;
