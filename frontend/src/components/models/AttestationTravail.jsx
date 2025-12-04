import React from "react";

import './attestation-travail.css'
import logo from './assets/img/logo.png'

export const AttestationTravail = () => {
  return (
    <div className="a4">
      <div className="header">
        <img src={logo} className="logo" alt="GULFSAT" />
        <div className="company">
          {/* <h1>GULFSAT MADAGASCAR</h1> */}
          Lot IVR 41 Avenue de l’Indépendance
          <br />
          Antanimena – 101 Antananarivo
          <br />
          Tél : 020 23 320 10 | info@gulfsat.mg
        </div>
      </div>

      <div className="title">Attestation d’emploi</div>

      <div className="content">
        Nous soussignés, la <strong>Société GULFSAT MADAGASCAR</strong>,<br />
        attestons par la présente que :<br />
        <br />
        <div className="highlight">
          <strong>Monsieur RAMANDANIRAINY Josoa Nirina Franck</strong>
          <br />
          Titulaire de la CIN n° <strong>101 241 169 331</strong>
          <br />
          Délivrée le 11 juin 2014 à Antananarivo IV
          <br />
          Résidant au Lot III 67 A Mahamasina Sud – 101 Antananarivo
        </div>
        est employé dans notre société en qualité de <strong>Commercial Grand Public</strong><br />
        depuis le <strong>23 août 2024</strong>, sous contrat à durée indéterminée (CDI) à temps plein.<br />
        <br />
        La présente attestation est délivrée à l’intéressé, à sa demande, pour servir et valoir ce que de droit.
      </div>

      <div className="signature-block">
        Antananarivo, le <strong>21 novembre 2025</strong>
        <br></br>
        {/* <div className="signature-line"></div> */}
        <br></br>
        <br></br>
        <div className="sign-name">Johary RAJAONARIVONY</div>
        Responsable des Ressources Humaines
      </div>
    </div>
  );
};

export default AttestationTravail;