// import React, { useEffect, useState } from "react";
// import { Container, Button, Space } from "@mantine/core";
// import { Select } from "@mantine/core";

// import '../models/assets/css/attestation-conge.css'; // ← Io CSS io no manao ny header bleu tsara tarehy!

// import logo from "./assets/img/logo.png";

// import { Margin, usePDF } from "react-to-pdf";
// import axios from "axios";

// export const AttestationConge = () => {
//   const [employeeList, setEmployeeList] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [isPDFVisible, setIsPDFVisible] = useState(false);

//   const LIST_EMPLOYEE_API = 'http://localhost:8000/api/attestations/employes/';

//   const TOKEN = localStorage.getItem("access_token") || "";

//   const config = {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//       "Content-Type": "application/json",
//     },
//   };

//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       try {
//         const response = await axios.get(LIST_EMPLOYEE_API, config);
//         setEmployeeList(response.data || []);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des employés :', error);
//       }
//     };

//     fetchEmployeeData();
//   }, []);

//   const handleEmployeeSelect = async (employeeId) => {
//     if (!employeeId) {
//       setSelectedEmployee(null);
//       setIsPDFVisible(false);
//       return;
//     }

//     try {
//       const response = await axios.get(`${LIST_EMPLOYEE_API}${employeeId}/`, config);
//       setSelectedEmployee(response.data);
//       setIsPDFVisible(true);
//       console.log("Employé sélectionné :", response.data);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des détails de l\'employé :', error);
//       setSelectedEmployee(null);
//       setIsPDFVisible(false);
//     }
//   };

//   const { toPDF, targetRef } = usePDF({
//     filename: "attestation-de-conge.pdf",
//     page: { margin: Margin.SMALL, orientation: "portrait" },
//   });

//   return (
//     <Container size="md" py="xl">
//       {/* Select largeur contrôlée + aligné gauche */}
//       <div style={{ maxWidth: "500px", marginBottom: "1.5rem" }}>
//         <Select
//           label="Sélectionner l'employé par matricule"
//           placeholder="Rechercher le nom ou matricule de l'employé"
//           data={employeeList.map((emp) => ({
//             value: emp.id.toString(),
//             label: `${emp.matricule} - ${String(emp.nom).toUpperCase()} ${emp.prenom}`
//           }))}
//           searchable
//           onChange={handleEmployeeSelect}
//         />
//       </div>

//       {/* Bouton aligné gauche */}
//       <div style={{ marginBottom: "2rem" }}>
//         <Button
//           onClick={() => toPDF()}
//           disabled={!selectedEmployee}
//         >
//           Imprimer PDF
//         </Button>
//       </div>

//       <Space h="md" />

//       {/* ← IO NO TENA MAHAZAKA NY HEADER BLEU TSARA TAREHY (avy amin'ny CSS) */}
//       {selectedEmployee && (
//         <div className={isPDFVisible ? "a4 block" : "hidden"} ref={targetRef}>
//           <div className="header">
//             <img src={logo} className="logo" alt="GULFSAT" />
//             <div className="company">
//               Lot IVR 41 Avenue de l'Indépendance<br />
//               Antanimena – 101 Antananarivo<br />
//               Tél : 020 23 320 10 | info@gulfsat.mg
            
//             </div>
//           </div>

//           <div className="title">Attestation de Congé</div>

//           <div className="content">
//             Nous soussignés, la <strong>Société GULFSAT MADAGASCAR</strong>,
//             {/* <br /> */}
//             attestons par la présente que :<br />
//             {/* <br /> */}
//             <div className="highlight">
//               <strong>
//                 {selectedEmployee.sexe === 'F' ? 'Madame' : 'Monsieur'} {String(selectedEmployee.nom).toUpperCase()} {selectedEmployee.prenom}
//               </strong>
//               <br />
//               Née le <strong>{new Date(selectedEmployee.date_naissance).toLocaleDateString('fr-FR')}</strong> à {selectedEmployee.lieu_naissance} Madagascar
//             </div>

//             est employée au sein de notre société en qualité de « <strong>
//               {selectedEmployee.postes && selectedEmployee.postes.length > 0
//                 ? selectedEmployee.postes[0].intitule
//                 : 'Employé'}
//             </strong> » depuis le <strong>{new Date(selectedEmployee.date_embauche).toLocaleDateString('fr-FR')}</strong>.<br />
//             <br />
//             {selectedEmployee.sexe === 'F' ? 'Madame' : 'Monsieur'} {String(selectedEmployee.nom).toUpperCase()} {selectedEmployee.prenom} partira en congé du <strong>23 juillet 2025</strong> au <strong>31 août 2025</strong>.<br />
//             <br />
//             Sitôt le congé terminé, {selectedEmployee.sexe === 'F' ? 'elle' : 'il'} est tenu{selectedEmployee.sexe === 'F' ? 'e' : ''} de retourner à Madagascar et de reprendre son poste de travail au sein de la Société.
//             <br /><br />
//             Délivrée à l'intéressée, sur sa demande, pour servir et valoir ce que de droit.
//           </div>

//           <div className="signature-block">
//             Antananarivo, le <strong>{new Date().toLocaleDateString('fr-FR')}</strong>
//             <br /><br /><br />
//             <div className="sign-name">Johary RAJAONARIVONY</div>
//             Responsable des Ressources Humaines
//           </div>
//               <div className="footer">
//                 Route Digue domaine d’Andranoabo – B.P 8127 - 101 – ANTANANARIVO – Tél :  23 320 10 – Fax :  22 331 96  – 1 691 640 <br />
//                 Mail: info@gulfsat.mg 
//              </div>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default AttestationConge;


// 20/01/2026
// import React, { useEffect, useState } from "react";
// import { Container, Button, Space } from "@mantine/core";
// import { Select, TextInput } from "@mantine/core";
// import { DatePickerInput } from "@mantine/dates";

// import "../models/assets/css/attestation-conge.css";
// import logo from "./assets/img/logo.png";

// import { Margin, usePDF } from "react-to-pdf";
// import axios from "axios";

// export const AttestationConge = () => {
//   const [employeeList, setEmployeeList] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [isPDFVisible, setIsPDFVisible] = useState(false);

//   // ✅ AJOUTS demandés
//   const [periodeConge, setPeriodeConge] = useState([null, null]);
//   const [destination, setDestination] = useState("");

//   const LIST_EMPLOYEE_API = "http://localhost:8000/api/attestations/employes/";
//   const TOKEN = localStorage.getItem("access_token") || "";

//   const config = {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//       "Content-Type": "application/json",
//     },
//   };

//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       try {
//         const response = await axios.get(LIST_EMPLOYEE_API, config);
//         setEmployeeList(response.data || []);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des employés :", error);
//       }
//     };

//     fetchEmployeeData();
//   }, []);

//   const handleEmployeeSelect = async (employeeId) => {
//     if (!employeeId) {
//       setSelectedEmployee(null);
//       setIsPDFVisible(false);
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `${LIST_EMPLOYEE_API}${employeeId}/`,
//         config
//       );
//       setSelectedEmployee(response.data);
//       setIsPDFVisible(true);
//     } catch (error) {
//       console.error(
//         "Erreur lors de la récupération des détails de l'employé :",
//         error
//       );
//       setSelectedEmployee(null);
//       setIsPDFVisible(false);
//     }
//   };

//   const { toPDF, targetRef } = usePDF({
//     filename: "attestation-de-conge.pdf",
//     page: { margin: Margin.SMALL, orientation: "portrait" },
//   });

//   return (
//     <Container size="md" py="xl">
//       {/* Sélection employé */}
//       <div style={{ maxWidth: "500px", marginBottom: "1.5rem" }}>
//         <Select
//           label="Sélectionner l'employé par matricule"
//           placeholder="Rechercher le nom ou matricule de l'employé"
//           data={employeeList.map((emp) => ({
//             value: emp.id.toString(),
//             label: `${emp.matricule} - ${String(emp.nom).toUpperCase()} ${
//               emp.prenom
//             }`,
//           }))}
//           searchable
//           onChange={handleEmployeeSelect}
//         />
//       </div>

//       {/* ✅ AJOUT : période de congé */}
//       <div style={{ maxWidth: "500px", marginBottom: "1.5rem" }}>
//         <DatePickerInput
//           type="range"
//           label="Période de congé"
//           placeholder="Choisir la période"
//           value={periodeConge}
//           onChange={setPeriodeConge}
//           locale="fr"
//         />
//       </div>

//       {/* ✅ AJOUT : destination */}
//       <div style={{ maxWidth: "500px", marginBottom: "1.5rem" }}>
//         <TextInput
//           label="Destination"
//           placeholder="Ex : Maurice, France, Antsirabe..."
//           value={destination}
//           onChange={(e) => setDestination(e.currentTarget.value)}
//         />
//       </div>

//       {/* Bouton PDF */}
//       <div style={{ marginBottom: "2rem" }}>
//         <Button onClick={() => toPDF()} disabled={!selectedEmployee}>
//           Imprimer PDF
//         </Button>
//       </div>

//       <Space h="md" />

//       {selectedEmployee && (
//         <div className={isPDFVisible ? "a4 block" : "hidden"} ref={targetRef}>
//           <div className="header">
//             <img src={logo} className="logo" alt="GULFSAT" />
//             <div className="company">
//               Lot IVR 41 Avenue de l'Indépendance
//               <br />
//               Antanimena – 101 Antananarivo
//               <br />
//               Tél : 020 23 320 10 | info@gulfsat.mg
//             </div>
//           </div>

//           <div className="title">Attestation de Congé</div>

//           <div className="content">
//             Nous soussignés, la <strong>Société GULFSAT MADAGASCAR</strong>,
//             attestons par la présente que :
//             <div className="highlight">
//               <strong>
//                 {selectedEmployee.sexe === "F" ? "Madame" : "Monsieur"}{" "}
//                 {String(selectedEmployee.nom).toUpperCase()}{" "}
//                 {selectedEmployee.prenom}
//               </strong>
//               <br />
//               Née le{" "}
//               <strong>
//                 {new Date(
//                   selectedEmployee.date_naissance
//                 ).toLocaleDateString("fr-FR")}
//               </strong>{" "}
//               à {selectedEmployee.lieu_naissance} Madagascar
//             </div>

//             est employée au sein de notre société en qualité de «{" "}
//             <strong>
//               {selectedEmployee.postes &&
//               selectedEmployee.postes.length > 0
//                 ? selectedEmployee.postes[0].intitule
//                 : "Employé"}
//             </strong>{" "}
//             » depuis le{" "}
//             <strong>
//               {new Date(
//                 selectedEmployee.date_embauche
//               ).toLocaleDateString("fr-FR")}
//             </strong>
//             .
//             <br />
//             <br />
//             {selectedEmployee.sexe === "F" ? "Madame" : "Monsieur"}{" "}
//             {String(selectedEmployee.nom).toUpperCase()}{" "}
//             {selectedEmployee.prenom}
//             {" "}partira en congé du{" "}
//             <strong>
//               {periodeConge[0]
//                 ? periodeConge[0].toLocaleDateString("fr-FR")
//                 : "—"}
//             </strong>{" "}
//             au{" "}
//             <strong>
//               {periodeConge[1]
//                 ? periodeConge[1].toLocaleDateString("fr-FR")
//                 : "—"}
//             </strong>{" "}
//             à destination de <strong>{destination || "—"}</strong>.
//             <br />
//             <br />
//             Sitôt le congé terminé,{" "}
//             {selectedEmployee.sexe === "F" ? "elle" : "il"} est tenu
//             {selectedEmployee.sexe === "F" ? "e" : ""} de retourner à Madagascar
//             et de reprendre son poste de travail au sein de la Société.
//             <br />
//             <br />
//             Délivrée à l'intéressée, sur sa demande, pour servir et valoir ce que
//             de droit.
//           </div>

//           <div className="signature-block">
//             Antananarivo, le{" "}
//             <strong>{new Date().toLocaleDateString("fr-FR")}</strong>
//             <br />
//             <br />
//             <br />
//             <div className="sign-name">Johary RAJAONARIVONY</div>
//             Responsable des Ressources Humaines
//           </div>

//           <div className="footer">
//             Route Digue domaine d’Andranoabo – B.P 8127 - 101 – ANTANANARIVO –
//             <br />
//             Tél : 23 320 10 – Fax : 22 331 96 – 1 691 640
//             <br />
//             Mail: info@gulfsat.mg
//           </div>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default AttestationConge;


import React, { useEffect, useState } from "react";
import { Container, Button, Space } from "@mantine/core";
import { Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import "../models/assets/css/attestation-conge.css";
import logo from "./assets/img/logo.png";

import { Margin, usePDF } from "react-to-pdf";
import axios from "axios";

export const AttestationConge = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isPDFVisible, setIsPDFVisible] = useState(false);

  // ✅ états existants (inchangés)
  const [periodeConge, setPeriodeConge] = useState([null, null]);
  const [destination, setDestination] = useState("");

  const LIST_EMPLOYEE_API = "http://localhost:8000/api/attestations/employes/";
  const TOKEN = localStorage.getItem("access_token") || "";

  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(LIST_EMPLOYEE_API, config);
        setEmployeeList(response.data || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des employés :", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleEmployeeSelect = async (employeeId) => {
    if (!employeeId) {
      setSelectedEmployee(null);
      setIsPDFVisible(false);
      return;
    }

    try {
      const response = await axios.get(
        `${LIST_EMPLOYEE_API}${employeeId}/`,
        config
      );
      setSelectedEmployee(response.data);
      setIsPDFVisible(true);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de l'employé :",
        error
      );
      setSelectedEmployee(null);
      setIsPDFVisible(false);
    }
  };

  const { toPDF, targetRef } = usePDF({
    filename: "attestation-de-conge.pdf",
    page: { margin: Margin.SMALL, orientation: "portrait" },
  });

  // 🔒 AJOUT CRITIQUE (SANS TOUCHER AU RESTE)
  const dateDebut =
  periodeConge[0]
    ? new Date(periodeConge[0]).toLocaleDateString("fr-FR")
    : "—";

const dateFin =
  periodeConge[1]
    ? new Date(periodeConge[1]).toLocaleDateString("fr-FR")
    : "—";


  return (
    <Container size="md" py="xl">
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
          onChange={handleEmployeeSelect}
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
            <img src={logo} className="logo" alt="GULFSAT" />
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
                {selectedEmployee.sexe === "F" ? "Madame" : "Monsieur"}{" "}
                {String(selectedEmployee.nom).toUpperCase()}{" "}
                {selectedEmployee.prenom}
              </strong>
              <br />
              Née le{" "}
              <strong>
                {new Date(
                  selectedEmployee.date_naissance
                ).toLocaleDateString("fr-FR")}
              </strong>{" "}
              à {selectedEmployee.lieu_naissance} Madagascar
            </div>

            est employée au sein de notre société en qualité de «{" "}
            <strong>
              {selectedEmployee.postes &&
              selectedEmployee.postes.length > 0
                ? selectedEmployee.postes[0].intitule
                : "Employé"}
            </strong>{" "}
            » depuis le{" "}
            <strong>
              {new Date(
                selectedEmployee.date_embauche
              ).toLocaleDateString("fr-FR")}
            </strong>
            .
            <br />
            <br />
            {selectedEmployee.sexe === "F" ? "Madame" : "Monsieur"}{" "}
            {String(selectedEmployee.nom).toUpperCase()}{" "}
            {selectedEmployee.prenom} partira en congé du{" "}
            <strong>{dateDebut}</strong> au{" "}
            <strong>{dateFin}</strong> à destination de{" "}
            <strong>{destination || "—"}</strong>.
            <br />
            <br />
            Sitôt le congé terminé,{" "}
            {selectedEmployee.sexe === "F" ? "elle" : "il"} est tenu
            {selectedEmployee.sexe === "F" ? "e" : ""} de retourner à Madagascar
            et de reprendre son poste de travail au sein de la Société.
            <br />
            <br />
            Délivrée à l'intéressée, sur sa demande, pour servir et valoir ce que
            de droit.
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
