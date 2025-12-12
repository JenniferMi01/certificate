import React, { useEffect, useState } from "react";
import { Container, Button, Space } from "@mantine/core"; // Ajout de Space pour l'espacement

import "../models/assets/css/attestation-travail.css";

import logo from "./assets/img/logo.png";

import { Margin, usePDF } from "react-to-pdf";

import { Select } from "@mantine/core";

import axios from "axios";

export const AttestationTravail = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isPDFVisible, setIsPDFVisible] = useState(false);

  const LIST_EMPLOYEE_API = "http://localhost:8000/api/attestations/employes/";

  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY3NTAzNTM3LCJpYXQiOjE3NjQ5MTE1MzcsImp0aSI6IjA1NGY4YTZmNWNlNjQzNWZiYWIxY2Q0MzAxMzFhMTdjIiwidXNlcl9pZCI6IjIifQ.f0Rw6qSTKTdAPu-LfHv8SHj6ZE3q9f2lHlR6iIMFLps`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${LIST_EMPLOYEE_API}`, config);
        console.log("Données des employés récupérées :", response.data);
        setEmployeeList(response.data || []);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des employés :",
          error
        );
      }
    };

    fetchEmployeeData();
  }, []);

  const handleSeePDF = async (employeeId) => {
    if (!employeeId) {
      setSelectedEmployee(null);
      setIsPDFVisible(false);
      return;
    }

    try {
      const response = await axios.get(`${LIST_EMPLOYEE_API}${employeeId}/`, config);
      setSelectedEmployee(response.data);
      setIsPDFVisible(true);
      console.log("Employé sélectionné :", response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'employé :', error);
      setSelectedEmployee(null);
      setIsPDFVisible(false);
    }
  };

  const { toPDF, targetRef } = usePDF({
    filename: "attestation-de-travail.pdf",
    page: { margin: Margin.SMALL, orientation: "portrait" },
  });

  return (
    <Container size="md" py="xl">
      {/* Select avec marge en bas */}
      {/* <div style={{ marginBottom: '1.5rem' }}>
        <Select
          label="Sélectionner l'employé par matricule"
          placeholder="Rechercher le nom ou matricule de l'employé"
          data={employeeList.map((emp) => ({
            value: emp.id.toString(),
            label: `${emp.matricule} - ${String(emp.nom).toUpperCase()} ${emp.prenom}`
          }))}
          searchable
          onChange={handleSeePDF}
        />
      </div> */}

      {/* Div vaovao  */}
      <div style={{ maxWidth: "500px", marginBottom: "1.5rem" }}>
        <Select
          label="Sélectionner l'employé par matricule"
          placeholder="Rechercher le nom ou matricule de l'employé"
          data={employeeList.map((emp) => ({
            value: emp.id.toString(),
            label: `${emp.matricule} - ${String(emp.nom).toUpperCase()} ${
              emp.prenom
            }`,
          }))}
          searchable
          onChange={handleSeePDF}
        />
      </div>

      {/* Bouton avec marge et désactivé si rien n'est sélectionné */}
      <Button
        onClick={() => toPDF()}
        disabled={!selectedEmployee}
        style={{ marginBottom: "2rem" }}
      >
        Imprimer PDF
      </Button>

      {/* Espace supplémentaire avant le preview */}
      <Space h="md" />

      {/* Preview visible uniquement après sélection */}
      {selectedEmployee && (
        <div className={isPDFVisible ? "a4 block" : "hidden"} ref={targetRef}>
          <div className="header">
            <img src={logo} className="logo" alt="GULFSAT" />
            <div className="company">
              Lot IVR 41 Avenue de l'Indépendance <br />
              Antanimena – 101 Antananarivo <br />
              Tél : 020 23 320 10 | info@gulfsat.mg
            </div>
          </div>
          <div className="title">Attestation d'emploi</div>
          <div className="content">
            Nous soussignés, la <strong>Société GULFSAT MADAGASCAR</strong>,<br />
            attestons par la présente que :<br />
            <br />
            <div className="highlight">
              <strong>
                {selectedEmployee.sexe === 'M' ? "Monsieur" : "Madame"} {String(selectedEmployee.nom).toUpperCase()} {selectedEmployee.prenom}
              </strong>
              <br /> Titulaire de la CIN n° <strong>{selectedEmployee.cin}</strong>
              <br />
              Délivrée le {new Date(selectedEmployee.cin_date).toLocaleDateString('fr-FR')} à{" "}
              {selectedEmployee.cin_lieu}
              <br /> Résidant au {selectedEmployee.adresse}
            </div>
            est employé dans notre société en qualité de{" "}
            <strong>
              {selectedEmployee.postes && selectedEmployee.postes.length > 0
                ? selectedEmployee.postes[0].intitule
                : 'Employé'}
            </strong>
            <br />
            depuis le <strong>{new Date(selectedEmployee.date_embauche).toLocaleDateString('fr-FR')}</strong>, sous contrat à
            durée indéterminée (CDI) à temps plein.
            <br />
            <br />
            La présente attestation est délivrée à l'intéressé, à sa demande, pour
            servir et valoir ce que de droit.
          </div>
          <div className="signature-block">
            Antananarivo, le <strong>{new Date().toLocaleDateString('fr-FR')}</strong>
            <br />
            <br />
            <br />
            <br />
            <div className="sign-name">Johary RAJAONARIVONY</div>
            Responsable des Ressources Humaines
          </div>
        </div>
      )}
    </Container>
  );
};

export default AttestationTravail;
