from rest_framework.decorators import api_view  # Décorateur pour indiquer les méthodes HTTP autorisées (GET, POST, PUT, DELETE)
from rest_framework.response import Response    # Pour renvoyer des réponses JSON
from rest_framework import status                # Codes HTTP standards (200, 201, 400, 404, ...)
from django.shortcuts import get_object_or_404   # Récupère un objet ou renvoie une 404 si inexistant
from ..models import Conge                       # Import du modèle Conge
from ..serializers import CongeSerializer        # Import du serializer
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


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
        message = f"Congé {pk} supprimé avec succès."
        return Response(data={message}, status=status.HTTP_204_NO_CONTENT)  # 204 → pas de contenu à renvoyer