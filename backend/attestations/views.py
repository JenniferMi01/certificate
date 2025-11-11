from rest_framework.decorators import api_view  # Décorateur pour indiquer les méthodes HTTP autorisées (GET, POST, PUT, DELETE)
from rest_framework.response import Response    # Pour renvoyer des réponses JSON
from rest_framework import status                # Codes HTTP standards (200, 201, 400, 404, ...)
from django.shortcuts import get_object_or_404   # Récupère un objet ou renvoie une 404 si inexistant
from django.http import HttpResponse             # Pour renvoyer des réponses HTTP, ici utilisé pour les PDF
from reportlab.lib.pagesizes import A4           # Taille A4 pour les PDF
from reportlab.pdfgen import canvas             # Pour générer des PDF avec ReportLab
from .models import Employe, PosteHistorique, Conge          # Import des modèles de la base de données
from .serializers import EmployeSerializer, PosteHistoriqueSerializer, CongeSerializer  # Import des serializers
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication



# CRUD EMPLOYE
@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])  # Vérifie le token
@permission_classes([IsAuthenticated]) 
def employe_list_create(request):
    """GET → retourne la liste de tous les employés
       POST → crée un nouvel employé"""
    if request.method == 'GET':
        employes = Employe.objects.all()  # Récupère tous les employés de la base
        serializer = EmployeSerializer(employes, many=True)  # Sérialise la liste en JSON
        return Response(serializer.data)  # Retourne la liste sérialisée
    elif request.method == 'POST':
        serializer = EmployeSerializer(data=request.data)  # Sérialise les données reçues pour validation
        if serializer.is_valid():  # Vérifie que les données sont conformes au modèle
            serializer.save()  # Sauvegarde le nouvel employé
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Retourne l'objet créé
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Erreur si données invalides

@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([JWTAuthentication])  # Vérifie le token
@permission_classes([IsAuthenticated])
def employe_detail(request, pk):
    """GET → retourne les détails d'un employé
       PUT → met à jour un employé
       DELETE → supprime un employé"""
    employe = get_object_or_404(Employe, pk=pk)  # Récupère l'employé ou renvoie 404
    if request.method == 'GET':
        serializer = EmployeSerializer(employe)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = EmployeSerializer(employe, data=request.data)  # Sérialise les nouvelles données
        if serializer.is_valid():
            serializer.save()  # Sauvegarde les modifications
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        employe.delete()  # Supprime l'employé
        message = f"Employé {pk} supprimé avec succès."
        return Response(data={message}, status=status.HTTP_204_NO_CONTENT)  # 204 → pas de contenu à renvoyer


# CRUD POSTE HISTORIQUE
@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])  # Vérifie le token
@permission_classes([IsAuthenticated]) 
def poste_list_create(request):
    """GET → retourne la liste des postes historiques
       POST → crée un nouveau poste historique"""
    if request.method == 'GET':
        postes = PosteHistorique.objects.all()  # Récupère tous les postes historiques de la base
        serializer = PosteHistoriqueSerializer(postes, many=True)  # Sérialise la liste pour la transformer en JSON
        return Response(serializer.data)  # Retourne la liste sérialisée
    elif request.method == 'POST':
        serializer = PosteHistoriqueSerializer(data=request.data)  # Sérialise les données reçues pour validation
        if serializer.is_valid():  # Vérifie si les données sont valides selon le modèle
            serializer.save()  # Sauvegarde le nouveau poste historique dans la base
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Retourne l'objet créé
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Retourne les erreurs si données invalides

@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([JWTAuthentication])  # Vérifie le token
@permission_classes([IsAuthenticated])
def poste_detail(request, pk):
    """GET → détail d'un poste historique
       PUT → met à jour le poste
       DELETE → supprime le poste"""
    poste = get_object_or_404(PosteHistorique, pk=pk)  # Récupère le poste par PK ou renvoie 404 si inexistant
    if request.method == 'GET':
        serializer = PosteHistoriqueSerializer(poste)  # Sérialise le poste pour l’envoyer en JSON
        return Response(serializer.data)  # Retourne le poste
    elif request.method == 'PUT':
        serializer = PosteHistoriqueSerializer(poste, data=request.data)  # Sérialise les nouvelles données
        if serializer.is_valid():  # Vérifie la validité des données
            serializer.save()  # Sauvegarde les modifications
            return Response(serializer.data)  # Retourne l’objet mis à jour
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Retourne les erreurs si invalides
    elif request.method == 'DELETE':
        poste.delete()  # Supprime le poste de la base
        return Response(status=status.HTTP_204_NO_CONTENT)  # 204 → pas de contenu à renvoyer

# CRUD CONGÉ
@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])  # Vérifie le token
@permission_classes([IsAuthenticated]) 
def conge_list_create(request):
    """GET → retourne la liste de tous les congés
       POST → crée un nouveau congé"""
    if request.method == 'GET':
        conges = Conge.objects.all()  # Récupère tous les congés de la base de données
        serializer = CongeSerializer(conges, many=True)  # Sérialise la liste pour la transformer en JSON
        return Response(serializer.data)  # Retourne la liste des congés sérialisée
    elif request.method == 'POST':
        serializer = CongeSerializer(data=request.data)  # Sérialise les données reçues pour validation
        if serializer.is_valid():  # Vérifie que les données sont valides selon le modèle Conge
            serializer.save()  # Sauvegarde le nouveau congé dans la base de données
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Retourne l'objet créé
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Retourne les erreurs si données invalides

@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([JWTAuthentication])  # Vérifie le token
@permission_classes([IsAuthenticated])
def conge_detail(request, pk):
    """GET → détail d'un congé
       PUT → met à jour un congé
       DELETE → supprime un congé"""
    conge = get_object_or_404(Conge, pk=pk)  # Récupère le congé par sa clé primaire ou renvoie 404 si inexistant
    if request.method == 'GET':
        serializer = CongeSerializer(conge)  # Sérialise le congé pour l’envoyer en JSON
        return Response(serializer.data)  # Retourne le congé
    elif request.method == 'PUT':
        serializer = CongeSerializer(conge, data=request.data)  # Sérialise les nouvelles données reçues
        if serializer.is_valid():  # Vérifie la validité des données
            serializer.save()  # Sauvegarde les modifications dans la base
            return Response(serializer.data)  # Retourne le congé mis à jour
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Retourne les erreurs si invalides
    elif request.method == 'DELETE':
        conge.delete()  # Supprime le congé de la base de données
        return Response(status=status.HTTP_204_NO_CONTENT)  # 204 → pas de contenu à renvoyer

# GÉNÉRATION DES PDF
def generer_pdf(employe, titre, texte_corps):
    """Génère un PDF pour un employé avec un texte donné"""
    response = HttpResponse(content_type='application/pdf')  # Type de réponse PDF
    response['Content-Disposition'] = f'inline; filename="{titre}_{employe.nom}.pdf"'  # Nom du fichier
    p = canvas.Canvas(response, pagesize=A4)  # Création du PDF
    width, height = A4  # Taille du papier A4
    p.setFont("Helvetica-Bold", 16)
    p.drawCentredString(width / 2, height - 80, titre)  # Titre centré
    p.setFont("Helvetica", 12)
    text_object = p.beginText(50, height - 150)
    for ligne in texte_corps.splitlines():  # Écrit le texte ligne par ligne
        text_object.textLine(ligne)
    p.drawText(text_object)
    p.drawString(50, 120, "Fait à Antananarivo, le ....../....../2025")  # Footer
    p.drawString(50, 100, "Signature et cachet")
    p.showPage()
    p.save()
    return response


# ATTESTATION DE TRAVAIL
@api_view(['GET'])
@authentication_classes([JWTAuthentication])  # Vérifie le token
@permission_classes([IsAuthenticated])
def attestation_travail_pdf(request, matricule):
    """Renvoie un PDF d'attestation de travail pour un employé"""
    employe = get_object_or_404(Employe, matricule=matricule)  # Cherche l'employé
    poste_actuel = employe.postes.last().intitule if employe.postes.exists() else "Non défini"  # Dernier poste
    texte = (
        f"Nous certifions que M./Mme {employe.prenom} {employe.nom}, "
        f"matricule {employe.matricule}, "
        f"occupe actuellement le poste de {poste_actuel} depuis le {employe.date_embauche.strftime('%d/%m/%Y')}.\n\n"
        "Cette attestation est délivrée à la demande de l’intéressé(e) pour servir et valoir ce que de droit."
    )
    return generer_pdf(employe, "ATTESTATION DE TRAVAIL", texte)


# ATTESTATION DE CONGÉ
@api_view(['GET'])
@authentication_classes([JWTAuthentication])  # Vérifie le token
@permission_classes([IsAuthenticated])
def attestation_conge_pdf(request, matricule):
    """Renvoie un PDF d'attestation de congé pour un employé"""
    employe = get_object_or_404(Employe, matricule=matricule)
    conge = Conge.objects.filter(employe=employe).last()  # Dernier congé de l'employé
    if not conge:
        return Response({"detail": "Aucun congé trouvé."}, status=status.HTTP_404_NOT_FOUND)
    texte = (
        f"Nous certifions que M./Mme {employe.prenom} {employe.nom}, "
        f"matricule {employe.matricule}, "
        f"bénéficie d’un congé du {conge.date_debut.strftime('%d/%m/%Y')} au {conge.date_fin.strftime('%d/%m/%Y')} "
        f"pour le motif suivant : {conge.motif}.\n\n"
        "Cette attestation est délivrée pour servir et valoir ce que de droit."
    )
    return generer_pdf(employe, "ATTESTATION DE CONGÉ", texte)


# CERTIFICAT DE TRAVAIL
@api_view(['GET'])
@authentication_classes([JWTAuthentication])  # Vérifie le token
@permission_classes([IsAuthenticated])
def certificat_travail_pdf(request, matricule):
    """Renvoie un PDF de certificat de travail pour un employé"""
    
    # Récupère l'employé correspondant au matricule ou renvoie 404 si inexistant
    employe = get_object_or_404(Employe, matricule=matricule)
    
    # Récupère le dernier poste de l'employé si existant, sinon "Non défini"
    poste_actuel = employe.postes.last().intitule if employe.postes.exists() else "Non défini"
    
    # Texte du certificat de travail avec informations dynamiques de l'employé
    texte = (
        f"Je soussigné, certifie que M./Mme {employe.prenom} {employe.nom}, "
        f"matricule {employe.matricule}, "
        f"a travaillé au sein de notre entreprise du {employe.date_embauche.strftime('%d/%m/%Y')} "
        f"au ....../....../2025 en qualité de {poste_actuel}.\n\n"
        "Le présent certificat est délivré à la demande de l’intéressé(e) pour servir et valoir ce que de droit."
    )
    
    # Appelle la fonction generer_pdf pour créer le PDF et le renvoyer dans la réponse HTTP
    return generer_pdf(employe, "CERTIFICAT DE TRAVAIL", texte)

