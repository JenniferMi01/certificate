import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { Button, Group, Modal, Box, Loader } from '@mantine/core';
import { Eye, Download } from 'lucide-react';

const PDFViewerComponent = ({ document: DocumentComponent, fileName = 'document.pdf' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const handlePreview = async () => {
    setIsOpen(true);
    setPreviewLoading(true);
    try {
      const blob = await pdf(typeof DocumentComponent === 'function' ? DocumentComponent() : DocumentComponent).toBlob();
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch (error) {
      console.error('Error generating PDF for preview:', error);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const blob = await pdf(typeof DocumentComponent === 'function' ? DocumentComponent() : DocumentComponent).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Group gap="md" mt="md">
        <Button
          leftSection={<Eye size={16} />}
          variant="outline"
          onClick={handlePreview}
        >
          Aperçu PDF
        </Button>
        <Button
          leftSection={<Download size={16} />}
          onClick={handleDownload}
          loading={loading}
        >
          Télécharger PDF
        </Button>
      </Group>

      <Modal
        opened={isOpen}
        onClose={handleClose}
        size="xl"
        title="Aperçu du PDF"
        centered
      >
        <Box style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {previewLoading ? (
            <Loader size="lg" />
          ) : previewUrl ? (
            <PDFViewer
              fileUrl={previewUrl}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          ) : (
            <div>Erreur lors du chargement du PDF</div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default PDFViewerComponent;
