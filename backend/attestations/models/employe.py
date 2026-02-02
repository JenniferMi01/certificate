from django.db import models
from django.conf import settings


class Employe(models.Model):
    SEXE_CHOICES = [('M', 'Monsieur'), ('F', 'Madame')]
    
    matricule = models.CharField("Matricule", max_length=20, unique=True)
    sexe = models.CharField("Sexe", max_length=1, choices=SEXE_CHOICES)
    nom = models.CharField("Nom", max_length=100)
    prenom = models.CharField("Prénom", max_length=100)
    date_naissance = models.DateField("Date de naissance")
    lieu_naissance = models.CharField("Lieu de naissance", max_length=100)
    cin = models.CharField("CIN", max_length=20, unique=True)
    cin_date = models.DateField("Date délivrance CIN")
    cin_lieu = models.CharField("Lieu délivrance CIN", max_length=100)
    adresse = models.CharField("Adresse", max_length=200)
    date_embauche = models.DateField("Date d'embauche")
    contrat_cdi = models.BooleanField("CDI", default=False)
    en_poste = models.BooleanField("Toujours en poste", default=True)

    # LA LIAISON AVEC USER (optionnelle, comme tu voulais)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='employe_profile'
    )

    def nom_complet(self):
        return f"{self.prenom} {self.nom}"

    def __str__(self):
        return f"{self.nom_complet()} ({self.matricule})"

    class Meta:
        verbose_name = "Employé"
        verbose_name_plural = "Employés"


# Tes autres modèles liés (ils étaient bien dans le même fichier)
class PosteHistorique(models.Model):
    employe = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='postes')
    intitule = models.CharField("Intitulé du poste", max_length=150)
    date_debut = models.DateField("Date de début")
    date_fin = models.DateField("Date de fin", null=True, blank=True)

    def __str__(self):
        fin = self.date_fin.strftime('%d/%m/%Y') if self.date_fin else "en cours"
        return f"{self.intitule} ({self.date_debut} → {fin})"

    class Meta:
        ordering = ['-date_debut']
        verbose_name = "Historique de poste"


class Conge(models.Model):
    employe = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='conges')
    date_debut = models.DateField("Date de début")
    date_fin = models.DateField("Date de fin")
    motif = models.CharField("Motif", max_length=200)
    approuve = models.BooleanField("Approuvé", default=False)
    date_demande = models.DateTimeField("Date de demande", auto_now_add=True)

    def __str__(self):
        return f"{self.employe} - {self.date_debut} au {self.date_fin}"

    class Meta:
        verbose_name = "Congé"