import { FaDownload } from 'react-icons/fa';

export default function RecentDocumentsTable() {
  const documents = [
    { date: "19/11/2025", employe: "RAMANDANIRAINY Josoa N. F.", type: "Attestation de travail" },
    { date: "18/11/2025", employe: "RAKOTOBE Mariane", type: "Certificat de travail" },
    { date: "18/11/2025", employe: "RAKOTO Andrianirina", type: "Attestation de congé" },
  ];

  return (
    <section className="recent-documents">
      <h2>Derniers documents</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Employé</th>
            <th>Type</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, i) => (
            <tr key={i}>
              <td>{doc.date}</td>
              <td>{doc.employe}</td>
              <td>{doc.type}</td>
              <td><span className="status success">Validé</span></td>
              <td><a href="#"><FaDownload /></a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}