import { SimpleGrid, Paper, Text, Box, Group, Badge } from '@mantine/core';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function ChartsSection() {
  const lineData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
    datasets: [
      {
        data: [65, 72, 68, 75, 89, 85, 90],
        borderColor: '#228be6',
        backgroundColor: 'rgba(34, 139, 230, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutData = {
    labels: ['Attestation travail', 'Certificat travail', 'Attestation congé'],
    datasets: [
      {
        data: [58, 24, 18],
        backgroundColor: ['#228be6', '#fd7e14', '#20c997'],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '70%',
  };

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mb="xl">
      <Paper p="xl" radius="md" style={{ backgroundColor: 'white' }}>
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={600}>
            Évolution 2025
          </Text>
          <Badge color="green" variant="light">
            +89.1%
          </Badge>
        </Group>
        <Box style={{ position: 'relative' }}>
          <Text
            size="xl"
            fw={700}
            style={{
              position: 'absolute',
              top: '20px',
            }}
          >
            +89.1%
          </Text>
          <Box style={{ height: '200px' }}>
            <Line data={lineData} options={lineOptions} />
          </Box>
        </Box>
      </Paper>

      <Paper p="xl" radius="md" style={{ backgroundColor: 'white' }}>
        <Text size="lg" fw={600} mb="md">
          Répartition par type
        </Text>
        <Box style={{ position: 'relative', height: '200px' }}>
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <Box
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <Text size="xl" fw={700}>
              95K
            </Text>
            <Text size="xs" c="dimmed">
              Total
            </Text>
          </Box>
        </Box>
        <Box mt="md">
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <Box
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: '#228be6',
                  borderRadius: '50%',
                }}
              />
              <Text size="sm">Attestation travail</Text>
            </Group>
            <Text size="sm" fw={600}>
              58%
            </Text>
          </Group>
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <Box
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: '#fd7e14',
                  borderRadius: '50%',
                }}
              />
              <Text size="sm">Certificat travail</Text>
            </Group>
            <Text size="sm" fw={600}>
              24%
            </Text>
          </Group>
          <Group justify="space-between">
            <Group gap="xs">
              <Box
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: '#20c997',
                  borderRadius: '50%',
                }}
              />
              <Text size="sm">Attestation congé</Text>
            </Group>
            <Text size="sm" fw={600}>
              18%
            </Text>
          </Group>
        </Box>
      </Paper>
    </SimpleGrid>
  );
}

export default ChartsSection;
