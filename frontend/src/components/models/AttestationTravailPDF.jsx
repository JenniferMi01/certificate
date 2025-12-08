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

const AttestationTravailPDF = () => (
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

      <Text style={styles.title}>Attestation d'emploi</Text>

      <View style={styles.content}>
        <Text>
          Nous soussignés, la <Text style={{ fontWeight: 'bold' }}>Société GULFSAT MADAGASCAR</Text>,{'\n'}
          attestons par la présente que :{'\n'}
          {'\n'}
          <View style={styles.highlight}>
            <Text style={{ fontWeight: 'bold' }}>Monsieur RAMANDANIRAINY Josoa Nirina Franck</Text>{'\n'}
            Titulaire de la CIN n° <Text style={{ fontWeight: 'bold' }}>101 241 169 331</Text>{'\n'}
            Délivrée le 11 juin 2014 à Antananarivo IV{'\n'}
            Résidant au Lot III 67 A Mahamasina Sud – 101 Antananarivo
          </View>
          est employé dans notre société en qualité de <Text style={{ fontWeight: 'bold' }}>Commercial Grand Public</Text>{'\n'}
          depuis le <Text style={{ fontWeight: 'bold' }}>23 août 2024</Text>, sous contrat à durée indéterminée (CDI) à temps plein.{'\n'}
          {'\n'}
          La présente attestation est délivrée à l'intéressé, à sa demande, pour servir et valoir ce que de droit.
        </Text>
      </View>

      <View style={styles.signatureBlock}>
        <Text>Antananarivo, le <Text style={{ fontWeight: 'bold' }}>21 novembre 2025</Text></Text>
        <Text style={styles.signName}>Johary RAJAONARIVONY</Text>
        <Text>Responsable des Ressources Humaines</Text>
      </View>
    </Page>
  </Document>
);

export default AttestationTravailPDF;
