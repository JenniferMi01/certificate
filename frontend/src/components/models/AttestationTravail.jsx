import React, { useEffect, useState, useCallback } from "react";
import { Container, Button, Space, Loader, Select } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import "../models/assets/css/attestation-travail.css";
import GulfsatLogo from "./assets/img/Gulfsatlogo.jpeg";
import BluelineLogo from "./assets/img/BluelineLogo.jpeg";   

import { Margin, usePDF } from "react-to-pdf";
import axios from "axios";
import { formatDateToFrench } from "../../utils/utilities";

export const AttestationTravail = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchValue, 350);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isPDFVisible, setIsPDFVisible] = useState(false);
  const [signName, setSignName] = useState("RAJAONARIVONY Johary");

  // Sélection de la société
  
  const [selectedCompany, setSelectedCompany] = useState("gulfsat");

  const companyData = {
    gulfsat: {
      logo: GulfsatLogo,
      name: "Société GULFSAT MADAGASCAR",
    },
    blueline: {
      logo: BluelineLogo,           // ← Logo Blueline maintenant utilisé
      name: "Société BLUELINE",
    },
  };

  
  const LIST_EMPLOYEE_API = `${import.meta.env.VITE_API_BASE_ODOO}/employees`;


  const USER_INFO = `${import.meta.env.VITE_API_BASE_DJANGO}/api/me/`;
  const TOKEN = localStorage.getItem("access_token") || "";

  const config = {
    headers: {
      Authorization: `Token ${TOKEN}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(USER_INFO, config);

        console.log("User data:", response.data);
        let fullName = "";
        if (response.data.last_name) {
          fullName += response.data.first_name.toUpperCase() + "";
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des employés :", error);
      }
    };

    fetchUserData();
  }, []);

  const fetchEmployees = useCallback(async (search = "") => {
    setLoading(true);
    try {
      const params = search.trim() ? { search: search.trim() } : { limit: 20 };
      const response = await axios.get(LIST_EMPLOYEE_API, { params });
      setEmployeeList(response.data.data || []);
    } catch (error) {
      console.error("Erreur chargement employés :", error);
      setEmployeeList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    fetchEmployees(debouncedSearch);
  }, [debouncedSearch, fetchEmployees]);

  const handleSeePDF = async (employeeId) => {
    if (!employeeId) {
      setSelectedEmployee(null);
      setIsPDFVisible(false);
      return;
    }

    try {
      const response = await axios.get(`${LIST_EMPLOYEE_API}/${employeeId}`);
      console.log("ATTESTATION EMPLOYE :", response.data);
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
      {/* Sélection Société */}
      <div style={{ maxWidth: "500px", marginBottom: "1.5rem" }}>
        <Select
          label="Société"
          placeholder="Choisir la société"
          value={selectedCompany}
          onChange={setSelectedCompany}
          data={[
            { value: "gulfsat", label: "Gulfsat Madagascar" },
            { value: "blueline", label: "Blueline" },
          ]}
          nothingFoundMessage="Aucune société trouvée"
        />
      </div>

      {/* Sélection Employé */}
      <div style={{ maxWidth: "500px", marginBottom: "1.5rem", position: "relative" }}>
        <Select
          label="Sélectionner l'employé par matricule ou nom"
          placeholder="Rechercher le nom ou matricule de l'employé"
          data={employeeList.map((emp) => ({
            value: emp.id.toString(),
            label: `${emp.number || "-"} - ${emp.name?.toUpperCase() || ""}`,
          }))}
          searchable
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onChange={handleSeePDF}
          nothingFoundMessage="Aucun employé trouvé"
          rightSection={loading ? <Loader size="xs" /> : null}
          maxDropdownHeight={280}
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
            <img
             src={companyData[selectedCompany].logo}
             className="logo"          // ← uniformise la classe (supprime attestation-logo si tu veux)
             alt={companyData[selectedCompany].name}
           />
          </div>

          <div className="title" style={{ margin: "-10px 0 15px"}}>Attestation d'emploi</div>

          <div className="content">
            Nous soussignés, la <strong>{companyData[selectedCompany].name}</strong>,
            attestons par la présente que :
            <br />
            
           
            <div className="highlight" style={{ padding:"10px 15px", margin: "10px 0", fontSize:"15px"}}>
              <strong>{selectedEmployee.name}</strong>
              <br />
              Titulaire de la CIN n° <strong>{selectedEmployee.identification_id ? selectedEmployee.identification_id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "-"}</strong>
              <br />
              Délivrée le <strong>{selectedEmployee.date_delivrance_cin ? new Date(selectedEmployee.date_delivrance_cin).toLocaleDateString("fr-FR") : '-'}</strong> à {selectedEmployee.lieu_delivrance_cin || '-'}
              <br />
              Résidant au {selectedEmployee?.address_home_id?.[1] || "-" }
            </div>

            est employé(e) dans notre société en qualité de{" "}
            <strong>{selectedEmployee?.job_id?.[1] || "Employé"}</strong>
            <br />
            depuis le{" "}
            <strong>{formatDateToFrench(selectedEmployee?.start_date) || "-"}</strong>,
            sous contrat à durée indéterminée (CDI) à temps plein.
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
            <div className="sign-name">{signName}</div>
            Directeur des Ressources Humaines
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