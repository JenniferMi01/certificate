import { useState } from 'react';
import { IconSearch, IconCalendarOff, IconFileDownload, IconArrowLeft } from '@tabler/icons-react';
import { TextInput, Select, Textarea, Button, Group, Title, Paper, Grid, Flex } from '@mantine/core';

export const CertificatTravail = () => {
  const [matricule, setMatricule] = useState('');
  const [dateDepart, setDateDepart] = useState('');
  const [motif, setMotif] = useState('Retraite');
  const [appreciation, setAppreciation] = useState(
    'Sérieux(se), travailleur(se) et impliqué(e) dans ses missions.'
  );

  const handleGeneratePDF = () => {
    // Plus tard tu mettras ici la vraie génération PDF avec jsPDF ou une API
    alert('PDF généré ! (à connecter avec jsPDF ou ton backend)');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Title order={1} className="flex items-center gap-3 text-3xl font-bold text-gray-800 mb-10">
        <IconCalendarOff size={40} className="text-blue-600" />
        Certificat de Travail
      </Title>

      <Paper shadow="lg" p="xl" radius="lg" withBorder>

        {/* MATRICULE avec icône loupe */}
        <Flex align="center" gap="md" mb="xl" wrap="wrap">
          <label className="text-lg font-semibold text-gray-700 min-w-32">Matricule</label>
          <TextInput
            placeholder="Entrez votre Matricule"
            value={matricule}
            onChange={(e) => setMatricule(e.currentTarget.value)}
            leftSection={<IconSearch size={20} />}
            size="lg"
            radius="xl"
            style={{ flex: 1, maxWidth: 420 }}
          />
        </Flex>

        {/* FIN DE CONTRAT */}
        <Title order={3} className="flex items-center gap-2 text-xl font-semibold text-gray-700 mb-6">
          <IconCalendarOff size={28} />
          Fin de contrat
        </Title>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Date de départ"
              type="date"
              value={dateDepart}
              onChange={(e) => setDateDepart(e.currentTarget.value)}
              required
              size="lg"
              radius="lg"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Select
              label="Motif de départ"
              value={motif}
              onChange={setMotif}
              data={['Retraite', 'Fin de CDD', 'Licenciement', 'Démission']}
              size="lg"
              radius="lg"
            />
          </Grid.Col>
        </Grid>

        {/* APPRÉCIATION */}
        <Textarea
          label="Appréciation (facultatif)"
          value={appreciation}
          onChange={(e) => setAppreciation(e.currentTarget.value)}
          placeholder="Sérieux(se), travailleur(se)..."
          rows={4}
          mt="xl"
          size="lg"
          radius="lg"
        />

        {/* BOUTONS */}
        <Group justify="flex-end" mt="xl" gap="xl">
          <Button
            leftSection={<IconArrowLeft size={20} />}
            variant="default"
            size="lg"
            radius="xl"
            onClick={() => window.history.back()}
          >
            Retour
          </Button>

          <Button
            leftSection={<IconFileDownload size={20} />}
            color="green"
            size="lg"
            radius="xl"
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
  );
};