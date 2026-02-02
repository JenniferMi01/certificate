# backend/attestations/urls.py :
from django.urls import path
from . import views  # On importe les vues définies dans views.py
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import employes_views
from .views import postehistorique_views
from .views import conge_views
from .views import login_view
from .views import signup_view, login_view

# from .views import pdf_views

urlpatterns = [
    # --- Routes Employé ---
    # URL pour lister tous les employés ou en créer un nouveau (GET, POST)
    path('employes/', employes_views.employe_list_create, name='employe_list_create'), 

    # URL pour récupérer, mettre à jour ou supprimer un employé spécifique (GET, PUT, DELETE)
    path('employes/<int:pk>/', employes_views.employe_detail, name='employe_detail'),

     # --- Routes Poste Historique ---
    # URL pour lister tous les postes historiques ou en créer un nouveau (GET, POST)
    path('postes/', postehistorique_views.poste_list_create, name='poste_list_create'),

    # URL pour récupérer, mettre à jour ou supprimer un poste historique spécifique (GET, PUT, DELETE)
    path('postes/<int:pk>/', postehistorique_views.poste_detail, name='poste_detail'),


    # --- Routes Congé ---
    # URL pour lister tous les congés ou en créer un nouveau (GET, POST)
    path('conges/', conge_views.conge_list_create, name='conge_list_create'),

    # URL pour récupérer, mettre à jour ou supprimer un congé spécifique (GET, PUT, DELETE)
    path('conges/<int:pk>/', conge_views.conge_detail, name='conge_detail'),
    # --- Route de login ---
     path('api/login/', login_view, name='login'),  # ✅ Utilisation de login_view (pas login_views)
     path('signup/', signup_view, name='signup'),



    # --- Routes PDF ---
    # URL pour générer l'attestation de travail en PDF pour un employé via son matricule
    # path('pdf/travail/<str:matricule>/', pdf_views.attestation_travail_pdf, name='attestation_travail_pdf'),

    # URL pour générer l'attestation de congé en PDF pour un employé via son matricule
    # path('pdf/conge/<str:matricule>/', pdf_views.attestation_conge_pdf, name='attestation_conge_pdf'),

    # URL pour générer le certificat de travail en PDF pour un employé via son matricule
#     path('pdf/certificat/<str:matricule>/', pdf_views.certificat_travail_pdf, name='certificat_travail_pdf'),
]


# ==================== NOUVELLES ROUTES POUR LES ATTESTATIONS ====================

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
# from .models import AttestationTravail, AttestationConge, CertificatTravail
from .serializers import AttestationTravailSerializer, AttestationCongeSerializer, CertificatTravailSerializer


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def attestation_travail_list_create(request):
    if request.method == 'GET':
        data = AttestationTravail.objects.all()
        serializer = AttestationTravailSerializer(data, many=True)
        return Response(serializer.data)
    serializer = AttestationTravailSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def attestation_conge_list_create(request):
    if request.method == 'GET':
        data = AttestationConge.objects.all()
        serializer = AttestationCongeSerializer(data, many=True)
        return Response(serializer.data)
    serializer = AttestationCongeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def certificat_travail_list_create(request):
    if request.method == 'GET':
        data = CertificatTravail.objects.all()
        serializer = CertificatTravailSerializer(data, many=True)
        return Response(serializer.data)
    serializer = CertificatTravailSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Ajout des nouvelles routes
urlpatterns += [
    path('attestation-travail/', attestation_travail_list_create),
    path('attestation-conge/', attestation_conge_list_create),
    path('certificat-travail/', certificat_travail_list_create),
]



















# urlpatterns = [
#     # --- Routes Employé ---
#     path('employes/', views.employe_list_create, name='employe_list_create'),# URL pour lister tous les employés ou en créer un nouveau (GET, POST)
#     path('employes/<int:pk>/', views.employe_detail, name='employe_detail'), # URL pour récupérer, mettre à jour ou supprimer un employé spécifique (GET, PUT, DELETE)

#     # --- Routes Poste Historique ---
#     path('postes/', views.poste_list_create, name='poste_list_create'),# URL pour lister tous les postes historiques ou en créer un nouveau
#     path('postes/<int:pk>/', views.poste_detail, name='poste_detail'),# URL pour récupérer, mettre à jour ou supprimer un poste historique spécifique

#     # --- Routes Congé ---
#     path('conges/', views.conge_list_create, name='conge_list_create'),# URL pour lister tous les congés ou en créer un nouveau
#     path('conges/<int:pk>/', views.conge_detail, name='conge_detail'), # URL pour récupérer, mettre à jour ou supprimer un congé spécifique

#     # --- Routes PDF ---
#     path('pdf/travail/<str:matricule>/', views.attestation_travail_pdf, name='attestation_travail_pdf'),# URL pour générer l'attestation de travail en PDF pour un employé via son matricule
#     path('pdf/conge/<str:matricule>/', views.attestation_conge_pdf, name='attestation_conge_pdf'), # URL pour générer l'attestation de congé en PDF pour un employé via son matricule
#     path('pdf/certificat/<str:matricule>/', views.certificat_travail_pdf, name='certificat_travail_pdf'),# URL pour générer le certificat de travail en PDF pour un employé via son matricule
# ]



