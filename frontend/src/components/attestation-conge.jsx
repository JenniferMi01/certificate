// src/components/attestation-conge.jsx
import { useState } from 'react';
import {
  Select,
  NumberInput,
  TextInput,
  FileInput,
  Button,
  Group,
  Title,
  Paper,
  Grid,
  Flex,
} from '@mantine/core';
import {
  IconBed,
  IconArrowLeft,
  IconFileDownload,
  IconInfoCircle,
} from '@tabler/icons-react';

export const Attestation = () => {
  const [typeConge, setTypeConge] = useState('Maladie');
  const [duree, setDuree] = useState(10);
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [justificatif, setJustificatif] = useState(null);

  const handleGeneratePDF = () => {
    alert('PDF généré ! (prochaine étape : vraie génération avec jsPDF)');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Titre principal */}
        <Title order={1} className="text-4xl font-bold text-gray-800 mb-10 flex items-center gap-4">
          <IconBed size={48} className="text-blue-600" />
          Attestation de Congé
        </Title>

        <Paper shadow="lg" radius="xl" p="xl" withBorder>
          {/* Section titre */}
          <Flex align="center" gap="md" mb="xl">
            <IconInfoCircle size={28} className="text-blue-600" />
            <Title order={3} className="text-2xl font-semibold text-gray-800 m-0">
              Informations sur le congé
            </Title>
          </Flex>

          {/* Type + Durée */}
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="Type de congé"
                value={typeConge}
                onChange={setTypeConge}
                data={[
                  'Congé annuel',
                  'Maladie',
                  'Maternité',
                  'Accident de travail',
                  'Sans solde',
                ]}
                size="lg"
                radius="lg"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput
                label="Durée (jours)"
                value={duree}
                onChange={setDuree}
                min={1}
                size="lg"
                radius="lg"
              />
            </Grid.Col>
          </Grid>

          {/* Dates */}
          <Grid gutter="xl" mt="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                type="date"
                label="Date de début"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.currentTarget.value)}
                required
                size="lg"
                radius="lg"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                type="date"
                label="Date de fin"
                value={dateFin}
                onChange={(e) => setDateFin(e.currentTarget.value)}
                required
                size="lg"
                radius="lg"
              />
            </Grid.Col>
          </Grid>

          {/* Justificatif */}
          <FileInput
            label="Justificatif médical (facultatif)"
            placeholder="Aucun fichier sélectionné"
            accept=".pdf,.jpg,.jpeg,.png"
            value={justificatif}
            onChange={setJustificatif}
            mt="xl"
            size="lg"
            radius="lg"
            clearable
          />

          {/* Boutons */}
          <Group justify="flex-end" mt="xl" gap="lg">
            <Button
              variant="default"
              size="xl"
              radius="xl"
              leftSection={<IconArrowLeft size={24} />}
              onClick={() => window.history.back()}
            >
              Retour
            </Button>

            <Button
              size="xl"
              radius="xl"
              color="green"
              leftSection={<IconFileDownload size={24} />}
              onClick={handleGeneratePDF}
              style={{
                background: 'linear-gradient(145deg, #27ae60, #219653)',
                boxShadow: '0 10px 25px rgba(39,174,96,0.4)',
              }}
            >
              Générer le PDF
            </Button>
          </Group>
        </Paper>
      </div>
    </div>
  );
};