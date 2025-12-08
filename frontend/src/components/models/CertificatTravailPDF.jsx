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
  companyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
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
  jobHistory: {
    marginLeft: 20,
    marginVertical: 5,
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

const CertificatTravailPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        {/* <Image style={styles.logo} src={logo} /> */}
        <View style={{ width: 80, height: 80, marginRight: 20, backgroundColor: '#f0f0f0' }} />
        <View style={styles.company}>
          <Text style={styles.companyTitle}>GULFSAT MADAGASCAR</Text>
          <Text>
            Lot IVR 41 Avenue de l'Indépendance{'\n'}
            Antanimena – 101 Antananarivo{'\n'}
            Tél : 020 23 320 10 | info@gulfsat.mg
          </Text>
        </View>
      </View>

      <Text style={styles.title}>Certificat de Travail</Text>

      <View style={styles.content}>
        <Text>
          Nous soussignée, la <Text style={{ fontWeight: 'bold' }}>Société GULFSAT MADAGASCAR</Text>, sise au Lot IVR 41 Avenue de l'Indépendance, Antanimena – 101 Antananarivo,{'\n'}
          certifions par la présente que :{'\n'}
          {'\n'}
          <View style={styles.highlight}>
            <Text style={{ fontWeight: 'bold' }}>Madame RAKOTOBE Mariane</Text>{'\n'}
            Titulaire de la CIN n° <Text style={{ fontWeight: 'bold' }}>101 252 190 721</Text>{'\n'}
            Délivrée le 31 mars 2015 à Antananarivo V{'\n'}
            Résidant au Lot II C 10 D Bis A Manjakaray
          </View>
          a été employée au sein de notre société en qualité de :{'\n'}
          {'\n'}
          <View style={styles.jobHistory}>
            <Text>• « <Text style={{ fontWeight: 'bold' }}>Assistante Commerciale</Text> » du <Text style={{ fontWeight: 'bold' }}>01 janvier 2020 au 08 octobre 2022</Text></Text>{'\n'}
            <Text>• « <Text style={{ fontWeight: 'bold' }}>Chargée de Clientèle</Text> » du <Text style={{ fontWeight: 'bold' }}>09 octobre 2022 au 28 février 2023</Text></Text>{'\n'}
            <Text>• « <Text style={{ fontWeight: 'bold' }}>Responsable Commerciale</Text> » du <Text style={{ fontWeight: 'bold' }}>01 mars 2023 au 08 octobre 2025</Text></Text>
          </View>
          {'\n'}
          Elle nous quitte libre de tout engagement.{'\n'}
          {'\n'}
          En foi de quoi, le présent certificat lui est délivré pour servir et valoir ce que de droit.
        </Text>
      </View>

      <View style={styles.signatureBlock}>
        <Text>Fait à Antananarivo, le <Text style={{ fontWeight: 'bold' }}>08 octobre 2025</Text></Text>
        <Text style={styles.signName}>Johary RAJAONARIVONY</Text>
        <Text>Responsable des Ressources Humaines</Text>
      </View>
    </Page>
  </Document>
);

export default CertificatTravailPDF;
