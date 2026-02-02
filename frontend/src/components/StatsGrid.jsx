import { SimpleGrid, Paper, Text, Group } from '@mantine/core';
import { FileText, Users, Clock } from 'lucide-react';

function StatsGrid() {
  const stats = [
    {
      title: 'Documents totaux',
      value: '21 324',
      icon: FileText,
      color: '#228be6',
    },
    {
      title: 'Employés actifs',
      value: '247',
      icon: Users,
      color: '#228be6',
    },
    {
      title: 'Temps moyen',
      value: '28s',
      icon: Clock,
      color: '#228be6',
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb="xl">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Paper
            key={stat.title}
            p="xl"
            radius="md"
            style={{ backgroundColor: 'white' }}
          >
            <Group justify="space-between">
              <div>
                <Text size="xl" fw={700}>
                  {stat.value}
                </Text>
                <Text size="sm" c="dimmed" mt="xs">
                  {stat.title}
                </Text>
              </div>
              <div
                style={{
                  backgroundColor: '#e7f5ff',
                  borderRadius: '50%',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={24} color={stat.color} />
              </div>
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
}

export default StatsGrid;
