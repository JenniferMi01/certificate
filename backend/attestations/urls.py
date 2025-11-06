from django.urls import path
from . import views  # On importe les vues définies dans views.py
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import logout_views


urlpatterns = [
    # --- Routes Employé ---
    path('employes/', views.employe_list_create, name='employe_list_create'),# URL pour lister tous les employés ou en créer un nouveau (GET, POST)
    path('employes/<int:pk>/', views.employe_detail, name='employe_detail'), # URL pour récupérer, mettre à jour ou supprimer un employé spécifique (GET, PUT, DELETE)

    # --- Routes Poste Historique ---
    path('postes/', views.poste_list_create, name='poste_list_create'),# URL pour lister tous les postes historiques ou en créer un nouveau
    path('postes/<int:pk>/', views.poste_detail, name='poste_detail'),# URL pour récupérer, mettre à jour ou supprimer un poste historique spécifique

    # --- Routes Congé ---
    path('conges/', views.conge_list_create, name='conge_list_create'),# URL pour lister tous les congés ou en créer un nouveau
    path('conges/<int:pk>/', views.conge_detail, name='conge_detail'), # URL pour récupérer, mettre à jour ou supprimer un congé spécifique

    # --- Routes PDF ---
    path('pdf/travail/<str:matricule>/', views.attestation_travail_pdf, name='attestation_travail_pdf'),# URL pour générer l'attestation de travail en PDF pour un employé via son matricule
    path('pdf/conge/<str:matricule>/', views.attestation_conge_pdf, name='attestation_conge_pdf'), # URL pour générer l'attestation de congé en PDF pour un employé via son matricule
    path('pdf/certificat/<str:matricule>/', views.certificat_travail_pdf, name='certificat_travail_pdf'),# URL pour générer le certificat de travail en PDF pour un employé via son matricule
]



urlpatterns += [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', logout_views.logout_view, name='logout'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
