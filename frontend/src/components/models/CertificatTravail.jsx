import React, { useEffect, useState, useCallback } from "react";
import { Container, Button, Space, Checkbox, Loader, Select } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import '../models/assets/css/certificat-travail.css';
import GulfsatLogo from "./assets/img/Gulfsatlogo.jpeg";
import BluelineLogo from "./assets/img/BluelineLogo.jpeg";   

import { Margin, usePDF } from "react-to-pdf";
import axios from "axios";

export const CertificatTravail = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchValue, 350);
  const [loading, setLoading] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isPDFVisible, setIsPDFVisible] = useState(false);

  // Checkbox "libre de tout engagement"
  const [libreEngagement, setLibreEngagement] = useState(false);

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

  const commonAddress = "Lot IVR 41 Avenue de l'Indépendance<br />Antanimena – 101 Antananarivo";
  const commonContact = "Tél : 020 23 320 10 | info@gulfsat.mg";

  const LIST_EMPLOYEE_API = 'http://localhost:5000/employees';

  const fetchEmployees = useCallback(async (search = "") => {
    setLoading(true);
    try {
      const params = search.trim() ? { search: search.trim() } : { limit: 20 };
      const response = await axios.get(LIST_EMPLOYEE_API, { params });
      console.log("Réponse de l'API :", response);
      setEmployeeList(response.data.data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des employés:', error);
      console.error('Détails de l\'erreur:', error.response?.data);
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

  const formatBy3 = (value) => {
    return value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

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
      console.error('Erreur lors de la récupération de l\'employé:', error);
      console.error('Détails de l\'erreur:', error.response?.data);
      setSelectedEmployee(null);
      setIsPDFVisible(false);
    }
  };

  const { toPDF, targetRef } = usePDF({
    filename: "certificat-de-travail.pdf",
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
          label="Sélectionner l'employé par matricule"
          placeholder="Rechercher le nom ou matricule de l'employé"
          data={employeeList.map((emp) => ({
            value: emp.id.toString(),
            label: `${emp.number || '-'} - ${String(emp.name || '').toUpperCase()}`
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

      {/* Checkbox */}
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
            <img
              src={companyData[selectedCompany].logo}
              className="logo"
              alt={companyData[selectedCompany].name}
              style={{ maxWidth: "180px", height: "auto" }}
            />
            <div className="company">
              {companyData[selectedCompany].name}
              <br />
              <span dangerouslySetInnerHTML={{ __html: commonAddress }} />
              <br />
              {commonContact}
            </div>
          </div>

          <div className="title">Certificat de Travail</div>

          <div className="content">
            Nous soussignée, la <strong>{companyData[selectedCompany].name}</strong>,
            sise au Lot IVR 41 Avenue de l'Indépendance, Antanimena – 101 Antananarivo,
            certifions par la présente que :
            <br /><br />

            <div className="highlight">
              <strong>{String(selectedEmployee.name || '').toUpperCase()}</strong>
              <br />
              Titulaire de la CIN n° <strong>{formatBy3(selectedEmployee.identification_id) || '-'}</strong>
              <br />
              Délivrée le {selectedEmployee.date_delivrance_cin ? new Date(selectedEmployee.date_delivrance_cin).toLocaleDateString('fr-FR') : '-'} à {selectedEmployee.lieu_delivrance_cin || '-'}
              <br />
              Résidant au {selectedEmployee?.address_home_id?.[1] || '-'}
            </div>

            a été employée au sein de notre société en qualité de :
            <div className="job-history">
              <p>
                • « <strong>{selectedEmployee?.job_id?.[1] || '-'}</strong> »
              </p>
            </div>

            {libreEngagement && (
              <>
                {selectedEmployee.name ? (selectedEmployee.name.toLowerCase().includes('femme') ? 'Elle' : 'Il') : 'Il'} nous quitte libre de tout engagement.
                <br /><br />
              </>
            )}

            En foi de quoi, le présent certificat lui est délivré pour servir et valoir ce que de droit.
          </div>

          <div className="signature-block">
            Fait à Antananarivo, le <strong>{new Date().toLocaleDateString('fr-FR')}</strong>
            <br /><br /><br />
            <div className="sign-name">Johary RAJAONARIVONY</div>
            Responsable des Ressources Humaines
          </div>

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