// import React, { useEffect, useState } from "react";
// import { Container, Button, Space } from "@mantine/core";
// import { Select } from "@mantine/core";

// import '../models/assets/css/certificat-travail.css';
// import logo from "./assets/img/logo.png";

// import { Margin, usePDF } from "react-to-pdf";
// import axios from "axios";

// export const CertificatTravail = () => {
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
//         console.log('Données des employés récupérées :', response.data);
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
//     filename: "certificat-de-travail.pdf",
//     page: { margin: Margin.SMALL, orientation: "portrait" },
//   });

//   return (
//     <Container size="md" py="xl">
//       {/* Select : largeur max 500px, aligné à gauche */}
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

//       {/* Bouton aligné à gauche avec bon espacement */}
//       <div style={{ marginBottom: "2rem" }}>
//         <Button
//           onClick={() => toPDF()}
//           disabled={!selectedEmployee}
//         >
//           Imprimer PDF
//         </Button>
//       </div>

//       {/* Espace supplémentaire avant le preview */}
//       <Space h="md" />

//       {/* Preview du certificat (visible seulement après sélection) */}
//       {selectedEmployee && (
//         <div className={isPDFVisible ? 'a4 block' : 'hidden'} ref={targetRef}>
//           <div className="header">
//             <img src={logo} className="logo" alt="GULFSAT" />
//             <div className="company">
//               Lot IVR 41 Avenue de l'Indépendance <br />
//               Antanimena – 101 Antananarivo <br />
//               Tél : 020 23 320 10 | info@gulfsat.mg
//             </div>
//           </div>

//           <div className="title">Certificat de Travail</div>

//           <div className="content">
//             Nous soussignée, la <strong>Société GULFSAT MADAGASCAR</strong>, sise
//             au Lot IVR 41 Avenue de l'Indépendance, Antanimena – 101 Antananarivo, <br />
//             certifions par la présente que :<br />
//             <br />
//             <div className="highlight" style={{ marginTop: '-10px', marginBottom: '20px' }}>
//               <strong>
//                 {selectedEmployee.sexe === 'F' ? 'Madame' : 'Monsieur'} {String(selectedEmployee.nom).toUpperCase()} {selectedEmployee.prenom}
//               </strong>
//               <br />
//               Titulaire de la CIN n° <strong>{selectedEmployee.cin}</strong>
//               <br /> Délivrée le {new Date(selectedEmployee.cin_date).toLocaleDateString('fr-FR')} à {selectedEmployee.cin_lieu} <br /> Résidant au
//               {selectedEmployee.adresse}
//             </div>

//             a été employée au sein de notre société en qualité de :
//             <br />
//             <div className="job-history">
//               {selectedEmployee.postes && selectedEmployee.postes.length > 0 ? (
//                 selectedEmployee.postes
//                   .sort((a, b) => new Date(a.date_debut) - new Date(b.date_debut))
//                   .map((poste, index) => (
//                     <p key={index}>
//                       • « <strong>{poste.intitule}</strong> » du{" "}
//                       <strong>{new Date(poste.date_debut).toLocaleDateString('fr-FR')} {poste.date_fin ? `au ${new Date(poste.date_fin).toLocaleDateString('fr-FR')}` : 'à aujourd\'hui'}</strong>
//                     </p>
//                   ))
//               ) : (
//                 <p>• « <strong>Employé</strong> » depuis le <strong>{new Date(selectedEmployee.date_embauche).toLocaleDateString('fr-FR')}</strong></p>
//               )}
//             </div>

//             {selectedEmployee.sexe === 'F' ? 'Elle' : 'Il'} nous quitte libre de tout engagement. <br />
//             <br />
//             En foi de quoi, le présent certificat lui est délivré pour servir et
//             valoir ce que de droit.
//           </div>

//           <div className="signature-block">
//             Fait à Antananarivo, le <strong>{new Date().toLocaleDateString('fr-FR')}</strong>
//             <br />
//             <br />
//             <br />
//             <div className="sign-name">Johary RAJAONARIVONY</div>
//             Responsable des Ressources Humaines
//           </div>
//           <div className="footer">
//                   Gulfsat Madagascar SARL au capital de 5 000 000 000 Ar – Siège social : 41 avenue Lénine Antanimena Antananarivo 101 – <br />
//                   BP 8127 - RCS Antananarivo 2001 B 000 25  - NIF N° 4000004897 – STAT N° 61906 11 2001 0 10059 <br />
//                   Tél : 23 320 10 – Mail: info@gulfsat.mg
//                 </div>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default CertificatTravail;



// 20/01/2026
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

  const LIST_EMPLOYEE_API = 'http://localhost:8000/api/attestations/employes/';
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
        console.error(error);
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
      const response = await axios.get(`${LIST_EMPLOYEE_API}${employeeId}/`, config);
      setSelectedEmployee(response.data);
      setIsPDFVisible(true);
    } catch (error) {
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
      <div style={{ maxWidth: "500px", marginBottom: "1.5rem" }}>
        <Select
          label="Sélectionner l'employé par matricule"
          placeholder="Rechercher le nom ou matricule de l'employé"
          data={employeeList.map((emp) => ({
            value: emp.id.toString(),
            label: `${emp.matricule} - ${String(emp.nom).toUpperCase()} ${emp.prenom}`
          }))}
          searchable
          onChange={handleEmployeeSelect}
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
                {selectedEmployee.sexe === 'F' ? 'Madame' : 'Monsieur'} {String(selectedEmployee.nom).toUpperCase()} {selectedEmployee.prenom}
              </strong>
              <br />
              Titulaire de la CIN n° <strong>{selectedEmployee.cin}</strong>
              <br />
              Délivrée le {new Date(selectedEmployee.cin_date).toLocaleDateString('fr-FR')} à {selectedEmployee.cin_lieu}
              <br />
              Résidant au {selectedEmployee.adresse}
            </div>

            a été employée au sein de notre société en qualité de :
            <div className="job-history">
              {selectedEmployee.postes && selectedEmployee.postes.length > 0 ? (
                selectedEmployee.postes.map((poste, index) => (
                  <p key={index}>
                    • « <strong>{poste.intitule}</strong> » du{" "}
                    <strong>{new Date(poste.date_debut).toLocaleDateString('fr-FR')}</strong>
                  </p>
                ))
              ) : (
                <p>
                  • « <strong>Employé</strong> » depuis le{" "}
                  <strong>{new Date(selectedEmployee.date_embauche).toLocaleDateString('fr-FR')}</strong>
                </p>
              )}
            </div>

            {/* ✅ PHRASE CONDITIONNELLE */}
            {libreEngagement && (
              <>
                {selectedEmployee.sexe === 'F' ? 'Elle' : 'Il'} nous quitte libre de tout engagement.
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


