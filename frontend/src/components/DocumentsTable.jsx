import { Paper, Text, Table, Badge, ActionIcon } from '@mantine/core';
import { Download } from 'lucide-react';

function DocumentsTable() {
  const documents = [
    {
      date: '19/11/2025',
      employee: 'RANDRIANARIJAONA Fanomezantsoa H.',
      type: 'Attestation de travail',
      status: 'validé',
    },
    {
      date: '18/11/2025',
      employee: 'RAKOTONIRAINY TOKY A.',
      type: 'Certificat de travail',
      status: 'validé',
    },
    {
      date: '18/11/2025',
      employee: 'RASOAMAHARO Rado Nomena',
      type: 'Attestation de congé',
      status: 'validé',
    },
  ];

  return (
    <Paper p="xl" radius="md" style={{ backgroundColor: 'white' }}>
      <Text size="lg" fw={600} mb="md">
        Derniers documents
      </Text>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Employé</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Statut</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {documents.map((doc, index) => (
            <Table.Tr key={index}>
              <Table.Td>{doc.date}</Table.Td>
              <Table.Td>{doc.employee}</Table.Td>
              <Table.Td>{doc.type}</Table.Td>
              <Table.Td>
                <Badge color="green" variant="light">
                  {doc.status}
                </Badge>
              </Table.Td>
              <Table.Td>
                <ActionIcon variant="subtle" color="gray">
                  <Download size={18} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}

export default DocumentsTable;
