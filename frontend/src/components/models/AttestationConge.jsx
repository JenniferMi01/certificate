import React, { useEffect, useState, useCallback } from "react";
import { Container, Button, Space, Loader, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDebouncedValue } from "@mantine/hooks";

import "../models/assets/css/attestation-conge.css";
import Gulfsat from "./assets/img/Gulfsatlogo.jpeg";

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

  const [periodeConge, setPeriodeConge] = useState([null, null]);
  const [destination, setDestination] = useState("");

  const LIST_EMPLOYEE_API = "http://localhost:5000/employees";

  const fetchEmployees = useCallback(async (search = "") => {
    setLoading(true);
    try {
      const params = search.trim() ? { search: search.trim() } : { limit: 20 };
      const response = await axios.get(LIST_EMPLOYEE_API, { params });
      setEmployeeList(response.data.data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des employés :", error);
      setEmployeeList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Chargement initial (sans recherche)
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Rechargement quand la recherche change (debounced)
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
      console.error("Erreur lors de la récupération des détails de l'employé :", error);
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
      <div style={{ maxWidth: "500px", marginBottom: "1.5rem", position: "relative" }}>
        <Select
          label="Sélectionner l'employé par matricule"
          placeholder="Rechercher le nom ou matricule de l'employé"
          data={employeeList.map((emp) => ({
            value: emp.id.toString(),
            label: `${emp.number || "-"} - ${emp.name?.toUpperCase()}`,
          }))}
          searchable
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onChange={handleEmployeeSelect}
          nothingFound="Aucun employé trouvé"
          rightSection={loading ? <Loader size="xs" /> : null}
          maxDropdownHeight={280}
        />
      </div>

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
            <img src={Gulfsat} className="logo" alt="GULFSAT" />
            <div className="company">
              Lot IVR 41 Avenue de l'Indépendance
              <br />
              Antanimena – 101 Antananarivo
              <br />
              Tél : 020 23 320 10 | info@gulfsat.mg
            </div>
          </div>

          <div className="title">Attestation de Congé</div>

          <div className="content">
            Nous soussignés, la <strong>Société GULFSAT MADAGASCAR</strong>,
            attestons par la présente que :
            <div className="highlight">
              <strong>
                {selectedEmployee.gender === "female" ? "Madame" : "Monsieur"}{" "}
                {selectedEmployee.name?.toUpperCase() || "-"}
              </strong>
              <br />
              Née le{" "}
              <strong>
                {formatDateToFrench(selectedEmployee.birthday) || "-"}
              </strong>{" "}
              à {selectedEmployee.place_of_birth || "-"}
            </div>

            est employé(e) au sein de notre société en qualité de «{" "}
            <strong>
              {selectedEmployee.job_id?.[1] || "Employé"}
            </strong>{" "}
            » depuis le{" "}
            <strong>
              {formatDateToFrench(selectedEmployee.start_date) || "-"}
            </strong>
            .
            <br />
            <br />
            {selectedEmployee.gender === "female" ? "Madame" : "Monsieur"}{" "}
            {selectedEmployee.name?.toUpperCase() || "-"} partira en congé du{" "}
            <strong>{dateDebut}</strong> au <strong>{dateFin}</strong> à destination de{" "}
            <strong>{destination || "—"}</strong>.
            <br />
            <br />
            Sitôt le congé terminé, {selectedEmployee.gender === "female" ? "elle" : "il"} est tenu
            {selectedEmployee.gender === "female" ? "e" : ""} de retourner à Madagascar
            et de reprendre son poste de travail au sein de la Société.
            <br />
            <br />
            Délivrée à l'intéressé(e), sur sa demande, pour servir et valoir ce que
            de droit.
          </div>

          <div className="signature-block">
            Antananarivo, le <strong>{new Date().toLocaleDateString("fr-FR")}</strong>
            <br />
            <br />
            <br />
            <div className="sign-name">Johary RAJAONARIVONY</div>
            Responsable des Ressources Humaines
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
