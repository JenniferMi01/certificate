import React, { useEffect, useState } from "react";
import { Container, Button, Space, Checkbox } from "@mantine/core";
import { Select } from "@mantine/core";

import '../models/assets/css/certificat-travail.css';
import logo from "./assets/img/logo.png";

import { Margin, usePDF } from "react-to-pdf";
import axios from "axios";

export const CertificatTravail = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isPDFVisible, setIsPDFVisible] = useState(false);

  // ✅ AJOUT UNIQUEMENT
  const [libreEngagement, setLibreEngagement] = useState(false);

  const LIST_EMPLOYEE_API = 'http://localhost:5000/employees';

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(LIST_EMPLOYEE_API);
        console.log("Réponse de l'API :", response);
        setEmployeeList(response.data.data || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des employés:', error);
        console.error('Détails de l\'erreur:', error.response?.data);
        // Optionnel : afficher un message d'erreur à l'utilisateur
      }
    };
    fetchEmployeeData();
  }, []);

  // const handleEmployeeSelect = async (employeeId) => {
  //   if (!employeeId) {
  //     setSelectedEmployee(null);
  //     setIsPDFVisible(false);
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(`${LIST_EMPLOYEE_API}/${employeeId}`);
  //     setSelectedEmployee(response.data);
  //     setIsPDFVisible(true);
  //   } catch (error) {
  //     console.error('Erreur lors de la récupération de l\'employé:', error);
  //     console.error('Détails de l\'erreur:', error.response?.data);
  //     setSelectedEmployee(null);
  //     setIsPDFVisible(false);
  //   }
  // };

  const { toPDF, targetRef } = usePDF({
    filename: "certificat-de-travail.pdf",
    page: { margin: Margin.SMALL, orientation: "portrait" },
  });

  return (
    <Container size="md" py="xl">
      <div style={{ maxWidth: "500px", marginBottom: "1.5rem" }}>
        <Select
          label="Sélectionner l'employé par matricule"
          placeholder="Rechercher le nom ou matricule de l'employé"
          data={employeeList.map((emp) => ({
            value: emp.id.toString(),
            label: `${emp.number || 'N/A'} - ${String(emp.name || '').toUpperCase()}`
          }))}
          searchable
          // onChange={handleEmployeeSelect}
        />
      </div>

      {/* ✅ CHECKBOX AJOUTÉE */}
      <Checkbox
        label="L’employé quitte libre de tout engagement"
        checked={libreEngagement}
        onChange={(e) => setLibreEngagement(e.currentTarget.checked)}
        mb="md"
      />

      <div style={{ marginBottom: "2rem" }}>
        <Button onClick={() => toPDF()} disabled={!selectedEmployee}>
          Imprimer PDF
        </Button>
      </div>

      <Space h="md" />

      {selectedEmployee && (
        <div className={isPDFVisible ? 'a4 block' : 'hidden'} ref={targetRef}>
          <div className="header">
            <img src={logo} className="logo" alt="GULFSAT" />
            <div className="company">
              Lot IVR 41 Avenue de l'Indépendance <br />
              Antanimena – 101 Antananarivo <br />
              Tél : 020 23 320 10 | info@gulfsat.mg
            </div>
          </div>

          <div className="title">Certificat de Travail</div>

          <div className="content">
            Nous soussignée, la <strong>Société GULFSAT MADAGASCAR</strong>,
            sise au Lot IVR 41 Avenue de l'Indépendance, Antanimena – 101 Antananarivo,
            certifions par la présente que :
            <br /><br />

            <div className="highlight">
              <strong>
                {String(selectedEmployee.name || '').toUpperCase()}
              </strong>
              <br />
              Titulaire de la CIN n° <strong>{selectedEmployee.identification_id || 'N/A'}</strong>
              <br />
              Délivrée le {selectedEmployee.date_delivrance_cin ? new Date(selectedEmployee.date_delivrance_cin).toLocaleDateString('fr-FR') : 'N/A'} à {selectedEmployee.lieu_delivrance_cin || 'N/A'}
              <br />
              Résidant au {selectedEmployee.work_email || 'N/A'}
            </div>

            a été employée au sein de notre société en qualité de :
            <div className="job-history">
              <p>
                • « <strong>{selectedEmployee.department?.name || 'Employé'}</strong> »
              </p>
            </div>

            {/* ✅ PHRASE CONDITIONNELLE */}
            {libreEngagement && (
              <>
                {selectedEmployee.name ? (selectedEmployee.name.toLowerCase().includes('femme') ? 'Elle' : 'Il') : 'Il'} nous quitte libre de tout engagement.
                <br /><br />
              </>
            )}

            En foi de quoi, le présent certificat lui est délivré pour servir et
            valoir ce que de droit.
          </div>

          <div className="signature-block">
            Fait à Antananarivo, le <strong>{new Date().toLocaleDateString('fr-FR')}</strong>
            <br /><br /><br />
            <div className="sign-name">Johary RAJAONARIVONY</div>
            Responsable des Ressources Humaines
          </div>

          {/* ✅ FOOTER BIEN PRÉSENT */}
          <div className="footer">
            Gulfsat Madagascar SARL au capital de 5 000 000 000 Ar – Siège social : 41 avenue Lénine Antanimena Antananarivo 101 – <br />
            BP 8127 - RCS Antananarivo 2001 B 000 25 - NIF N° 4000004897 – STAT N° 61906 11 2001 0 10059 <br />
            Tél : 23 320 10 – Mail : info@gulfsat.mg
          </div>
        </div>
      )}
    </Container>
  );
};

export default CertificatTravail;


