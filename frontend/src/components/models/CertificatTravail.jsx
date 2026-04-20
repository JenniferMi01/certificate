import React, { useEffect, useState, useCallback } from "react";
import { Container, Button, Space, Checkbox, Loader, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
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

  const [signName, setSignName] = useState("RAJAONARIVONY Johary");

  const [libreEngagement, setLibreEngagement] = useState(false);

  const [postesHistory, setPostesHistory] = useState([
    { intitule: "", periode: [null, null] },
  ]);

  const [selectedCompany, setSelectedCompany] = useState("gulfsat");

  const addPoste = () => {
    setPostesHistory([...postesHistory, { intitule: "", periode: [null, null] }]);
  };

  const removePoste = (index) => {
    setPostesHistory(postesHistory.filter((_, i) => i !== index));
  };

  const updatePoste = (index, field, value) => {
    const updated = [...postesHistory];
    updated[index][field] = value;
    setPostesHistory([...updated]);
  };

  // ✅ Formatage date : 01 janvier 2026
  const formatDateFr = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

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
        if (response.data.last_name) {
          fullName += response.data.last_name.toUpperCase() + " ";
        }
        if (response.data.first_name) {
          fullName += response.data.first_name;
        }
        setSignName(fullName || response.data?.username || "RAJAONARIVONY Johary");
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
      console.log("Réponse de l'API :", response);
      setEmployeeList(response.data.data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des employés:', error);
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
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleEmployeeSelect = async (employeeId) => {
    if (!employeeId) {
      setSelectedEmployee(null);
      setIsPDFVisible(false);
      return;
    }

    try {
      const response = await axios.get(`${LIST_EMPLOYEE_API}/${employeeId}`);
      console.log("EMPLOYE SELECTIONNE :", response.data);
      setSelectedEmployee(response.data);
      setIsPDFVisible(true);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'employé:', error);
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
        label="L'employé quitte libre de tout engagement"
        checked={libreEngagement}
        onChange={(e) => setLibreEngagement(e.currentTarget.checked)}
        mb="md"
      />

      {/* Historique des postes */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontWeight: 600 }}>Historique des postes</label>
        {postesHistory.map((poste, index) => (
          <div key={index} style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", alignItems: "center" }}>
            <input
              placeholder="Intitulé du poste"
              value={poste.intitule}
              onChange={(e) => updatePoste(index, "intitule", e.target.value)}
              style={{ flex: 2, padding: "0.4rem", border: "1px solid #ccc", borderRadius: "4px" }}
            />
            <DatePickerInput
              type="range"
              placeholder="Choisir la période"
              value={poste.periode}
              onChange={(val) => updatePoste(index, "periode", val)}
              locale="fr"
              style={{ flex: 2 }}
            />
            {postesHistory.length > 1 && (
              <button
                onClick={() => removePoste(index)}
                style={{ color: "red", cursor: "pointer", border: "none", background: "none", fontSize: "1.2rem" }}
              >✕</button>
            )}
          </div>
        ))}
        <Button variant="outline" size="xs" mt="xs" onClick={addPoste}>+ Ajouter un poste</Button>
      </div>

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
            />
          </div>

          <div className="title">Certificat de Travail</div>

          <div className="content">
            <p>Nous soussignée, la <strong>{companyData[selectedCompany].name}</strong>,
            sise au Lot IVR 41 Avenue de l'Indépendance, Antanimena – 101 Antananarivo,
            certifions par la présente que :</p>
            
            <div className="highlight">
              <p><strong>{String(selectedEmployee.name || '').toUpperCase()}</strong></p>
              <p>Titulaire de la CIN n° <strong>{selectedEmployee.identification_id ? formatBy3(selectedEmployee.identification_id) : '-'}</strong></p>
              <p>Délivrée le <strong>{formatDateFr(selectedEmployee.date_delivrance_cin)}</strong> à {selectedEmployee.lieu_delivrance_cin || '-'}</p>
              <p>Résidant au {selectedEmployee?.address_home_id?.[1] || '-'}</p>
            </div>

            <p>a été employée au sein de notre société en qualité de :</p>

            <div className="job-history">
              {postesHistory.filter(p => p.intitule).length > 0 ? (
                postesHistory.filter(p => p.intitule).map((poste, index) => (
                  <p key={index}>
                    • « <strong>{poste.intitule}</strong> »
                    {poste.periode[0] && (
                      <> du <strong>{formatDateFr(poste.periode[0])}</strong></>
                    )}
                    {poste.periode[1] && (
                      <> au <strong>{formatDateFr(poste.periode[1])}</strong></>
                    )}
                  </p>
                ))
              ) : (
                <p>• « <strong>{selectedEmployee?.job_id?.[1] || '-'}</strong> »</p>
              )}
            </div>

            {selectedEmployee.start_date && (
              <p>
                Date d'embauche :{" "}
                <strong>{formatDateFr(selectedEmployee.start_date)}</strong>
              </p>
            )}

            {libreEngagement && (
              <p>{selectedEmployee.name ? (selectedEmployee.name.toLowerCase().includes('femme') ? 'Elle' : 'Il') : 'Il'} nous quitte libre de tout engagement.</p>
            )}

            <p>En foi de quoi, le présent certificat lui est délivré pour servir et valoir ce que de droit.</p>
          </div>

          <div className="signature-block">
            <div className="signature-date">
              Fait à Antananarivo, le <strong>{formatDateFr(new Date())}</strong>
            </div>
            <div className="signature-space"></div>
            <div className="sign-name">{signName}</div>
            <div className="signature-title">Directeur des Ressources Humaines</div>
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
