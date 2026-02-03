import React, { useEffect, useState } from "react";
import { Container, Button, Space } from "@mantine/core";
import { Select } from "@mantine/core";

import "../models/assets/css/attestation-travail.css";
import logo from "./assets/img/logo.png";

import { Margin, usePDF } from "react-to-pdf";
import axios from "axios";
import { formatDateToFrench } from "../../utils/utilities";

export const AttestationTravail = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isPDFVisible, setIsPDFVisible] = useState(false);

  // ✅ API ODOO
  const LIST_EMPLOYEE_API = `${import.meta.env.VITE_API_BASE_URL}/employees`;

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(LIST_EMPLOYEE_API);
        console.log("Employés Odoo :", response.data);
        setEmployeeList(response.data.data || []);
      } catch (error) {
        console.error("Erreur chargement employés :", error);
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
      const response = await axios.get(`${LIST_EMPLOYEE_API}/${employeeId}`);
      setSelectedEmployee(response.data);
      setIsPDFVisible(true);
    } catch (error) {
      console.error("Erreur employé :", error);
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
      <div style={{ maxWidth: "500px", marginBottom: "1.5rem" }}>
        <Select
          label="Sélectionner l'employé par matricule"
          placeholder="Rechercher le nom ou matricule de l'employé"
          data={employeeList.map((emp) => ({
            value: emp.id.toString(),
            label: `${emp.number || "-"} - ${emp.name?.toUpperCase()}`,
          }))}
          searchable
          onChange={handleSeePDF}
        />
      </div>

      <Button
        onClick={() => toPDF()}
        disabled={!selectedEmployee}
        style={{ marginBottom: "2rem" }}
      >
        Imprimer PDF
      </Button>

      <Space h="md" />

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
            Nous soussignés, la <strong>Société GULFSAT MADAGASCAR</strong>,
            attestons par la présente que :
            <br />
            <br />
            <div className="highlight">
              <strong>{selectedEmployee.name}</strong>
              <br />
              Résidant au {selectedEmployee?.address_home_id?.[1] || "-"}
            </div>
            est employé(e) dans notre société en qualité de{" "}
            <strong>{selectedEmployee?.job_id?.[1] || "Employé"}</strong>
            <br />
            depuis le {" "}
            <strong>
              {formatDateToFrench(selectedEmployee?.start_date) || "-"}
            </strong>
            , sous contrat à durée indéterminée (CDI) à temps plein.
            <br />
            <br />
            La présente attestation est délivrée à l'intéressé(e), à sa demande,
            pour servir et valoir ce que de droit.
          </div>

          <div className="signature-block">
            Antananarivo, le{" "}
            <strong>{new Date().toLocaleDateString("fr-FR")}</strong>
            <br />
            <br />
            <br />
            <div className="sign-name">Johary RAJAONARIVONY</div>
            Responsable des Ressources Humaines
          </div>

          <div className="footer">
            Gulfsat Madagascar SARL au capital de 5 000 000 000 Ar – Siège
            social : 41 avenue Lénine Antanimena Antananarivo 101 – <br />
            BP 8127 - RCS Antananarivo 2001 B 000 25 - NIF N° 4000004897 – STAT
            N° 61906 11 2001 0 10059 <br />
            Tél : 23 320 10 – Mail : info@gulfsat.mg
          </div>
        </div>
      )}
    </Container>
  );
};

export default AttestationTravail;
