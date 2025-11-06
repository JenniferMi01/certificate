from django.contrib import admin  # Import du module admin de Django
from .models import Employe, PosteHistorique, Conge  # Import des modèles de l'application


# 🔹Administration du modèle Employe
@admin.register(Employe)  # Enregistre le modèle Employe dans l'interface d'administration
class EmployeAdmin(admin.ModelAdmin):
    # Colonnes affichées dans la liste des employés
    list_display = ('matricule', 'nom_complet', 'poste_actuel', 'en_poste')
    search_fields = ('matricule', 'nom', 'prenom') # Champs sur lesquels la recherche sera possible dans l'admin

    # Méthode personnalisée pour afficher le poste actuel de l'employé
    def poste_actuel(self, obj):
        # Cherche le poste dont date_fin est null (poste actuel)
        poste = obj.postes.filter(date_fin__isnull=True).first()
        return poste.intitule if poste else "-"  # Retourne l'intitulé du poste ou "-" si aucun poste actuel
    
    poste_actuel.short_description = "Poste actuel"  # Nom affiché dans l'admin pour cette colonne

# 🔹 Administration du modèle PosteHistorique

@admin.register(PosteHistorique)  # Enregistre le modèle PosteHistorique
class PosteHistoriqueAdmin(admin.ModelAdmin):
    # Colonnes affichées dans la liste des postes historiques
    list_display = ('employe', 'intitule', 'date_debut', 'date_fin')


# 🔹 Administration du modèle Conge

@admin.register(Conge)  # Enregistre le modèle Conge
class CongeAdmin(admin.ModelAdmin):
    # Colonnes affichées dans la liste des congés
    list_display = ('employe', 'date_debut', 'date_fin', 'approuve')
    
    # Filtres disponibles dans l'admin pour faciliter la navigation
    list_filter = ('approuve',)  # Permet de filtrer les congés approuvés ou non
