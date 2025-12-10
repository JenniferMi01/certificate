import React, { useEffect } from "react";
import { Container, Button } from "@mantine/core"; // Import de Button

import '../models/assets/css/attestation-travail.css'


import logo from "./assets/img/logo.png";

// Import nécessaire pour générer le PDF à partir du HTML visible
import { Margin, usePDF } from "react-to-pdf";
import { useState } from "react";

import { Select } from "@mantine/core";

import axios from "axios";

export const AttestationTravail = () => {
  const [employeeList, setEmployeeList] = useState([]);

  const bearerToken = localStorage.getItem('access_token') || '';

  const [isPDFVisible, setIsPDFVisible] = useState(false);

  const handleSeePDF = (employeeId) => {
    console.log("Employé sélectionné ID :", employeeId);
    // Ici, vous pouvez implémenter la logique pour récupérer les données de l'employé sélectionné
    // et mettre à jour l'état employeeData en conséquence.
    setIsPDFVisible(!isPDFVisible);
  }

  // L'URL de l'API que nous allons interroger (exemple public)
  const LIST_EMPLOYEE_API = 'http://localhost:8000/api/attestations/employes/';

  useEffect(() => {
    // 🌟 Configuration d'Axios pour inclure le Bearer Token 🌟
    const config = {
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY3NTAzNTM3LCJpYXQiOjE3NjQ5MTE1MzcsImp0aSI6IjA1NGY4YTZmNWNlNjQzNWZiYWIxY2Q0MzAxMzFhMTdjIiwidXNlcl9pZCI6IjIifQ.f0Rw6qSTKTdAPu-LfHv8SHj6ZE3q9f2lHlR6iIMFLps`,
            'Content-Type': 'application/json' // Souvent inclus par bonne pratique
        }
    };

    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${LIST_EMPLOYEE_API}`, config);
        console.log('Données des employés récupérées :', response.data);
        // Traitez les données comme nécessaire

        setEmployeeList(response.data || []);
      }
      catch (error) {
        console.error('Erreur lors de la récupération des données des employés :', error);
      } 
    }

    fetchEmployeeData();
  }, []);


  // setEmployeeData(response.data.employee)


  const [employeeData, setEmployeeData] = useState({
    name: "RAKOTOVAO Harilanto",
    sexe: "Mâle",
    cin: "101 241 169 331",
    cinIssueDate: "11 juin 2014",
    cinIssuePlace: "Antananarivo IV",
    address: "Lot III 67 A Mahamasina Sud – 101 Antananarivo",
    position: "Commercial Grand Public",
    startDate: "23 août 2024",
    issueDate: "21 novembre 2025",
    hrName: "Johary RAJAONARIVONY",
  });


  // 1. Initialisation du hook usePDF
  const { toPDF, targetRef } = usePDF({
    filename: "attestation-de-travail.pdf",
    page: { margin: Margin.SMALL, orientation: "portrait" },
  });

  return (
    <Container size="md" py="xl">
      <div>
        <Select
          label="Sélectionner l'employé par matricule"
          placeholder="Rechercher le nom ou matricule de l'employé"
          data={employeeList.map((emp) => ({
            value: emp.id.toString(),
            label: `${emp.matricule} - ${String(emp.nom).toUpperCase()} ${emp.prenom}`}))}
          searchable
          onChange={handleSeePDF}
        />
      </div>


      {/* BOUTON DE TÉLÉCHARGEMENT */}
      <Button onClick={() => toPDF()}>Imprimer PDF</Button>
      {/* 2. CONTENEUR A4 AVEC LA RÉFÉRENCE POUR LE PDF */}{" "}
      <div className={isPDFVisible ? 'a4 block' : 'hidden'} ref={targetRef}>
        {" "}
        <div className="header">
          <img src={logo} className="logo" alt="GULFSAT" />
          {" "}
          <div className="company">
            Lot IVR 41 Avenue de l'Indépendance {" "}
            <br />
            Antanimena – 101 Antananarivo  <br />
            Tél : 020 23 320 10 | info@gulfsat.mg  {" "}
          </div>
          {" "}
        </div>
        <div className="title">Attestation d'emploi</div>{" "}
        <div className="content">
          Nous soussignés, la{" "}
          <strong>Société GULFSAT MADAGASCAR</strong>,<br />
          attestons par la présente que :<br />
          <br /> {" "}
          <div className="highlight">
            {" "}
            <strong>{employeeData.sexe == 'Mâle' ? 'Monsieur' : 'Madame'} {employeeData.name}</strong>
            <br /> Titulaire de la CIN n°{" "}
            <strong>{employeeData.cin}</strong>
            <br />
            Délivrée le {employeeData.cinIssueDate} à {employeeData.cinIssuePlace}
            <br /> Résidant au {employeeData.address}
          </div>
          est employé dans notre société en qualité de{" "}
          <strong>{employeeData.position}</strong>
          <br />depuis le <strong>{employeeData.startDate}</strong>, sous
          contrat à durée indéterminée (CDI) à temps plein.
          <br />
          <br />La présente attestation est délivrée à
          l'intéressé, à sa demande, pour servir et valoir ce que de droit.
          {" "}
        </div>
        {/* BLOC DE SIGNATURE CORRIGÉ */}{" "}
        <div className="signature-block">
          Antananarivo, le <strong>10 décembre 2025</strong>
          <br />
          <br />
          <br />
          <br /> {/* Espacement uniforme pour la signature */}
          <div className="sign-name">{employeeData.hrName}</div>
          Responsable des Ressources Humaines {" "}
        </div>
        {" "}
      </div>
      {/* Rétrait du PDFViewer redondant */}{" "}
    </Container>
  );
};

export default AttestationTravail;
