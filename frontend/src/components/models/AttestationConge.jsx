// import React from "react";
// import { Container } from '@mantine/core';

// import { Button } from "@mantine/core";

// import '../models/assets/css/attestation-conge.css'

// import logo from './assets/img/logo.png'

// import { Margin, usePDF } from 'react-to-pdf';

// export const AttestationConge = () => {
//   const { toPDF, targetRef } = usePDF({
//     filename: 'use-pdf-example.pdf',
//     page: { margin: Margin.SMALL, orientation: 'portrait' },
//   });

//   return (
//     <Container size="md" py="xl">
//       <Button onClick={() => toPDF()}>Imprimer PDF</Button>
//       <div className="a4" ref={targetRef}>
//         <div className="header">
//           <img src={logo} className="logo" alt="GULFSAT" />
//           <div className="company">
//             {/* <h1>GULFSAT MADAGASCAR</h1> */}
//             Lot IVR 41 Avenue de l'Indépendance
//             <br />
//             Antanimena – 101 Antananarivo
//             <br />
//             Tél : 020 23 320 10 | info@gulfsat.mg
//           </div>
//         </div>

//         <div className="title">Attestation de Congé</div>

//         <div className="content">
//           Nous soussignés, la <strong>Société GULFSAT MADAGASCAR</strong>,<br />
//           attestons par la présente que :<br />
//           <div className="highlight">
//             <strong>Madame RAKOTO Andrianirina</strong>
//             <br />
//             Née le <strong>29 novembre 1980</strong> à Soavinandriana Madagascar
//           </div>
//           est employée au sein de notre société en qualité de «{" "}
//           <strong>Responsable …….</strong> » depuis le{" "}
//           <strong>09 septembre 2013</strong>.<br />
//           <br />
//           Madame RAKOTO Andrianirina partira en congé du{" "}
//           <strong>23 juillet 2025</strong> au <strong>31 août 2025</strong>.<br />
//           <br />
//           Sitôt le congé terminé, elle est tenue de retourner à Madagascar et de
//           reprendre son poste de travail au sein de la Société.
//           <br />
//           <br />
//           Délivrée à l’intéressée, sur sa demande, pour servir et valoir ce que de
//           droit.
//         </div>

//         <div className="signature-block">
//           Antananarivo, le <strong>03 juin 2025</strong>
//           <br></br>
//           {/* <div className="signature-line"></div> */}
//           <br></br>
//           <br></br>
//           <div className="sign-name">Ndrianja RAJEMISON</div>
//           Directeur Administratif et Financier
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default AttestationConge;




import React, { useEffect, useState } from "react";
import { Container, Button } from '@mantine/core';
import { Select } from "@mantine/core";

import '../models/assets/css/attestation-conge.css';

import logo from './assets/img/logo.png';

import { Margin, usePDF } from 'react-to-pdf';
import axios from "axios";

export const AttestationConge = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isPDFVisible, setIsPDFVisible] = useState(false); 
  const LIST_EMPLOYEE_API = 'http://localhost:8000/api/attestations/employes/';

  useEffect(() => {
    const config = {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY3NTAzNTM3LCJpYXQiOjE3NjQ5MTE1MzcsImp0aSI6IjA1NGY4YTZmNWNlNjQzNWZiYWIxY2Q0MzAxMzFhMTdjIiwidXNlcl9pZCI6IjIifQ.f0Rw6qSTKTdAPu-LfHv8SHj6ZE3q9f2lHlR6iIMFLps`,
        'Content-Type': 'application/json'
      }
    };

    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${LIST_EMPLOYEE_API}`, config);
        console.log('Données des employés récupérées :', response.data);
        setEmployeeList(response.data || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des employés :', error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleEmployeeSelect = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setIsPDFVisible(true); 
    console.log("Employé sélectionné ID :", employeeId);
    // Eto afaka manao fetch détails an'ny employé iray raha ilaina any aoriana
  };

   const [employeeData, setEmployeeData] = useState({
      name: "RAKOTO Andrinirina",
      sexe: "Mâle",
      cin: "101 221 169 331",
      cinIssueDate: "11 juin 2014",
      cinIssuePlace: "Antananarivo IV",
      address: "Lot III 67 A Mahamasina Sud – 101 Antananarivo",
      position: "Commercial Grand Public",
      startDate: "23 août 2024",
      issueDate: "21 novembre 2025",
      hrName: "Johary RAJAONARIVONY",
    });

  const { toPDF, targetRef } = usePDF({
    filename: 'attestation-de-conge.pdf',
    page: { margin: Margin.SMALL, orientation: 'portrait' },
  });

  return (
    <Container size="md" py="xl">
      <div>
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
      <Button 
        onClick={() => toPDF()} 
        disabled={!selectedEmployeeId}
        style={{ marginTop: '1rem', marginBottom: '1rem' }}
      >
        Imprimer PDF
      </Button>

      <div className={isPDFVisible ? 'a4 block' : 'hidden'} ref={targetRef}>
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
          Nous soussignés, la <strong>Société GULFSAT MADAGASCAR</strong>,<br />
          attestons par la présente que :<br />
          <div className="highlight">
            <strong>Madame RAKOTO Andrianirina</strong>
            <br />
            Née le <strong>29 novembre 1980</strong> à Soavinandriana Madagascar
          </div>
          est employée au sein de notre société en qualité de «{" "}
          <strong>Responsable …….</strong> » depuis le{" "}
          <strong>09 septembre 2013</strong>.<br />
          <br />
          Madame RAKOTO Andrianirina partira en congé du{" "}
          <strong>23 juillet 2025</strong> au <strong>31 août 2025</strong>.<br />
          <br />
          Sitôt le congé terminé, elle est tenue de retourner à Madagascar et de
          reprendre son poste de travail au sein de la Société.
          <br />
          <br />
          Délivrée à l’intéressée, sur sa demande, pour servir et valoir ce que de
          droit.
        </div>

        <div className="signature-block">
          Antananarivo, le <strong>03 juin 2025</strong>
          <br></br>
          <br></br>
          <br></br>
          <div className="sign-name">Ndrianja RAJEMISON</div>
          Directeur Administratif et Financier
        </div>
      </div>
    </Container>
  );
};

export default AttestationConge;