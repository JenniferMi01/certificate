# from django.db import models  # ← Import du module Django pour créer des modèles de base de données

# class Employe(models.Model):  # ← Modèle représentant un employé
#     SEXE_CHOICES = [('M', 'Monsieur'), ('F', 'Madame')]  # ← Choix pour le champ sexe (M ou F)

#     matricule = models.CharField("Matricule", max_length=20, unique=True)  # ← Identifiant unique de l'employé
#     sexe = models.CharField("Sexe", max_length=1, choices=SEXE_CHOICES) 
#     nom = models.CharField("Nom", max_length=100)  
#     prenom = models.CharField("Prénom", max_length=100)  
#     date_naissance = models.DateField("Date de naissance")
#     lieu_naissance = models.CharField("Lieu de naissance", max_length=100)  
#     cin = models.CharField("CIN", max_length=20, unique=True)  # ← Numéro CIN, doit être unique
#     cin_date = models.DateField("Date délivrance CIN")  
#     cin_lieu = models.CharField("Lieu délivrance CIN", max_length=100)  
#     adresse = models.CharField("Adresse", max_length=200)  
#     date_embauche = models.DateField("Date d'embauche")  
#     contrat_cdi = models.BooleanField("CDI", default=False)  # ← Vrai si CDI, Faux si CDD
#     en_poste = models.BooleanField("Toujours en poste", default=True)  # ← Vrai si encore en activité

#     def nom_complet(self):  # ← Méthode pour afficher prénom + nom
#         return f"{self.prenom} {self.nom}"  

#     def __str__(self):  # ← Représentation textuelle dans l'admin Django
#         return f"{self.nom_complet()} ({self.matricule})"  # ← Ex: "Jean Dupont (EMP001)"

#     class Meta:  # ← Options du modèle (personnalisation)
#         verbose_name = "Employé"  # ← Nom au singulier dans l'interface
#         verbose_name_plural = "Employés"  # ← Nom au pluriel


# class PosteHistorique(models.Model):  # ← Historique des postes occupés
#     employe = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='postes')  # ← Lien vers Employe, suppression en cascade
#     intitule = models.CharField("Intitulé du poste", max_length=150)  # ← Nom du poste (ex: "Développeur")
#     date_debut = models.DateField("Date de début") 
#     date_fin = models.DateField("Date de fin", null=True, blank=True)  

#     class Meta:  # ← Options du modèle
#         ordering = ['date_debut']  # ← Tri par défaut : du plus ancien au plus récent
#         verbose_name = "Historique de poste"  # ← Nom dans l'admin

#     def __str__(self):  # ← Affichage du poste
#         fin = self.date_fin.strftime('%d/%m/%Y') if self.date_fin else "en cours"  
#         return f"{self.intitule} ({self.date_debut} → {fin})"  


# class Conge(models.Model):  # ← Modèle pour les demandes de congé
#     employe = models.ForeignKey(Employe, on_delete=models.CASCADE, related_name='conges')  # ← Lien vers l'employé
#     date_debut = models.DateField("Date de début") 
#     date_fin = models.DateField("Date de fin") 
#     motif = models.CharField("Motif", max_length=200)  # ← Raison du congé
#     approuve = models.BooleanField("Approuvé", default=True)  # ← Approuvé par défaut
#     date_demande = models.DateTimeField("Date de demande", auto_now_add=True)  # ← Date/heure automatique à la création

#     def __str__(self):  # ← Affichage dans l'admin
#         return f"{self.employe} - {self.date_debut} au {self.date_fin}"  

#     class Meta:  # ← Options
#         verbose_name = "Congé"  