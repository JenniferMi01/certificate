import React, { useEffect, useState, useCallback } from "react";
import { Container, Button, Space, Loader, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDebouncedValue } from "@mantine/hooks";

import "../models/assets/css/attestation-conge.css";
import GulfsatLogo from "./assets/img/Gulfsatlogo.jpeg";
import BluelineLogo from "./assets/img/BluelineLogo.jpeg";   

import { Margin, usePDF } from "react-to-pdf";
import axios from "axios";
import { formatDateToFrench } from "../../utils/utilities";

export const AttestationConge = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchValue, 350);
  const [loading, setLoading] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isPDFVisible, setIsPDFVisible] = useState(false);


  const [signName, setSignName] = useState("RAJAONARIVONY Johary");

  const [periodeConge, setPeriodeConge] = useState([null, null]);
  const [destination, setDestination] = useState("");

  

  // Sélection de la société
  const [selectedCompany, setSelectedCompany] = useState("gulfsat");

  const companyData = {
    gulfsat: {
      logo: GulfsatLogo,
      name: "Société GULFSAT MADAGASCAR",
    },
    blueline: {
      logo: BluelineLogo,           
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
      if (response.data.last_name){
        fullName += response.data.last_name.toUpperCase() + " ";
      }
      if (response.data.first_name){
        fullName += response.data.first_name;
      }
      setSignName(fullName || response.data?.username || "Directeur RH");
    } catch (error) {
      console.error("Erreur récupération utilisateur :", error);
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

  const handleEmployeeSelect = async (employeeId) => {
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
    filename: "attestation-de-conge.pdf",
    page: { margin: Margin.SMALL, orientation: "portrait" },
  });

  const dateDebut = periodeConge[0]
    ? new Date(periodeConge[0]).toLocaleDateString("fr-FR")
    : "—";

  const dateFin = periodeConge[1]
    ? new Date(periodeConge[1]).toLocaleDateString("fr-FR")
    : "—";

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
          label="Sélectionner l'employé par matricule"
          placeholder="Rechercher le nom ou matricule de l'employé"
          data={employeeList.map((emp) => ({
            value: emp.id.toString(),
            label: `${emp.number || "-"} - ${emp.name?.toUpperCase() || ""}`,
          }))}
          searchable
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onChange={handleEmployeeSelect}
          nothingFoundMessage="Aucun employé trouvé"
          rightSection={loading ? <Loader size="xs" /> : null}
          maxDropdownHeight={280}
        />
      </div>

      {/* Période de congé */}
      <div style={{ maxWidth: "500px", marginBottom: "1.5rem" }}>
        <DatePickerInput
          type="range"
          label="Période de congé"
          placeholder="Choisir la période"
          value={periodeConge}
          onChange={setPeriodeConge}
          locale="fr"
        />
      </div>

      {/* Destination */}
      <div style={{ maxWidth: "500px", marginBottom: "1.5rem" }}>
        <TextInput
          label="Destination"
          placeholder="Ex : Maurice, France, Antsirabe..."
          value={destination}
          onChange={(e) => setDestination(e.currentTarget.value)}
        />
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <Button onClick={() => toPDF()} disabled={!selectedEmployee}>
          Imprimer PDF
        </Button>
      </div>

      <Space h="md" />

      {selectedEmployee && (
        <div className={isPDFVisible ? "a4 block" : "hidden"} ref={targetRef}>
          <div className="header">
            <img
              src={companyData[selectedCompany].logo}
              className="logo"
              alt={companyData[selectedCompany].name}
            />
            
          </div>

          <div className="title">Attestation de Congé</div>

          <div className="content">
            <p>Nous soussignés, la <strong>{companyData[selectedCompany].name}</strong>,
            attestons par la présente que :</p>

            <div className="highlight">
              <p><strong>{selectedEmployee.name?.toUpperCase() || "-"}</strong></p>
              <p>Née le <strong>{formatDateToFrench(selectedEmployee.birthday) || "-"}</strong> à{" "}
              {selectedEmployee.place_of_birth || "-"}</p>
            </div>

            <p>est employé(e) au sein de notre société en qualité de «{" "}
            <strong>{selectedEmployee.job_id?.[1] || "Employé"}</strong>{" "}
            » depuis le <strong>{formatDateToFrench(selectedEmployee.start_date) || "-"}</strong>.</p>

            <p>{selectedEmployee.gender === "female" ? "Madame" : "Monsieur"}{" "}
            {selectedEmployee.name?.toUpperCase() || "-"} partira en congé du{" "}
            <strong>{dateDebut}</strong> au <strong>{dateFin}</strong> à destination de{" "}
            <strong>{destination || "—"}</strong>.</p>

            <p>Sitôt le congé terminé, {selectedEmployee.gender === "female" ? "elle" : "il"} est tenu
            {selectedEmployee.gender === "female" ? "e" : ""} de retourner à Madagascar
            et de reprendre son poste de travail au sein de la Société.</p>

            <p>Délivrée à l'intéressé(e), sur sa demande, pour servir et valoir ce que de droit.</p>
          </div>

          <div className="signature-block">
            <div className="signature-date">
              Antananarivo, le <strong>{new Date().toLocaleDateString("fr-FR")}</strong>
            </div>
            <div className="signature-space"></div>
            <div className="sign-name">{signName}</div>
            <div className="signature-title">Directeur des Ressources Humaines</div>
          </div>

          <div className="footer">
            Route Digue domaine d’Andranoabo – B.P 8127 - 101 – ANTANANARIVO –
            <br />
            Tél : 23 320 10 – Fax : 22 331 96 – 1 691 640
            <br />
            Mail: info@gulfsat.mg
          </div>
        </div>
      )}
    </Container>
  );
};

export default AttestationConge;