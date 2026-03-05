function preview() {
  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  const type = document.title.includes('Attestation') ? 'Attestation de travail' :
              document.title.includes('Certificat') ? 'Certificat de travail' :
              'Attestation de congé';
  
  alert(`✅ Prévisualisation : ${type}\n\nEmployé : ${prenom} ${nom}\n\n(Simulation réussie)`);
}

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const type = document.title.split(' — ')[0];
    if (confirm(`Générer le ${type} pour cet employé ?`)) {
      alert(`📄 ${type} généré avec succès !\nEnregistré dans l'historique.`);
      // Ici : appel à l'API ou jsPDF
    }
  });
});

// Calcul automatique de la date de fin de congé
const debutInput = document.getElementById('dateDebutConge');
const dureeInput = document.getElementById('duree');
const finInput = document.getElementById('dateFinConge');

if (debutInput && dureeInput && finInput) {
  [debutInput, dureeInput].forEach(el => {
    el.addEventListener('input', () => {
      const debut = new Date(debutInput.value);
      if (!isNaN(debut.getTime())) {
        const duree = parseInt(dureeInput.value) || 0;
        debut.setDate(debut.getDate() + duree - 1);
        finInput.value = debut.toISOString().split('T')[0];
      }
    });
  });
}


// Dans le script du formulaire
const debutInput = document.getElementById('dateDebutConge');
const dureeInput = document.getElementById('duree');
const finInput = document.getElementById('dateFinConge');

if (debutInput && dureeInput && finInput) {
  [debutInput, dureeInput].forEach(el => {
    el.addEventListener('input', () => {
      const debut = new Date(debutInput.value);
      if (!isNaN(debut.getTime())) {
        const duree = parseInt(dureeInput.value) || 0;
        debut.setDate(debut.getDate() + duree - 1);
        finInput.value = debut.toISOString().split('T')[0];
      }
    });
  });
}