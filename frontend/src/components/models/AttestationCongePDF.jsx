import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  company: {
    flex: 1,
    fontSize: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  content: {
    lineHeight: 1.5,
    marginBottom: 40,
  },
  highlight: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  signatureBlock: {
    marginTop: 50,
    textAlign: 'left',
  },
  signName: {
    marginTop: 20,
    fontWeight: 'bold',
  },
});

const AttestationCongePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        {/* <Image style={styles.logo} src={logo} /> */}
        <View style={{ width: 80, height: 80, marginRight: 20, backgroundColor: '#f0f0f0' }} />
        <Text style={styles.company}>
          Lot IVR 41 Avenue de l'Indépendance{'\n'}
          Antanimena – 101 Antananarivo{'\n'}
          Tél : 020 23 320 10 | info@gulfsat.mg
        </Text>
      </View>

      <Text style={styles.title}>Attestation de Congé</Text>

      <View style={styles.content}>
        <Text>
          Nous soussignés, la <Text style={{ fontWeight: 'bold' }}>Société GULFSAT MADAGASCAR</Text>,{'\n'}
          attestons par la présente que :{'\n'}
          <View style={styles.highlight}>
            <Text style={{ fontWeight: 'bold' }}>Madame RAKOTO Andrianirina</Text>{'\n'}
            Née le <Text style={{ fontWeight: 'bold' }}>29 novembre 1980</Text> à Soavinandriana Madagascar
          </View>
          est employée au sein de notre société en qualité de «{' '}
          <Text style={{ fontWeight: 'bold' }}>Responsable …….</Text> » depuis le{' '}
          <Text style={{ fontWeight: 'bold' }}>09 septembre 2013</Text>.{'\n'}
          {'\n'}
          Madame RAKOTO Andrianirina partira en congé du{' '}
          <Text style={{ fontWeight: 'bold' }}>23 juillet 2025</Text> au <Text style={{ fontWeight: 'bold' }}>31 août 2025</Text>.{'\n'}
          {'\n'}
          Sitôt le congé terminé, elle est tenue de retourner à Madagascar et de reprendre son poste de travail au sein de la Société.{'\n'}
          {'\n'}
          Délivrée à l'intéressée, sur sa demande, pour servir et valoir ce que de droit.
        </Text>
      </View>

      <View style={styles.signatureBlock}>
        <Text>Antananarivo, le <Text style={{ fontWeight: 'bold' }}>03 juin 2025</Text></Text>
        <Text style={styles.signName}>Ndrianja RAJEMISON</Text>
        <Text>Directeur Administratif et Financier</Text>
      </View>
    </Page>
  </Document>
);

export default AttestationCongePDF;
