from rest_framework.decorators import api_view  # Décorateur pour indiquer les méthodes HTTP autorisées (GET, POST, PUT, DELETE)
from rest_framework.response import Response    # Pour renvoyer des réponses JSON
from rest_framework import status                # Codes HTTP standards (200, 201, 400, 404, ...)
from django.shortcuts import get_object_or_404   # Récupère un objet ou renvoie une 404 si inexistant
from ..models import PosteHistorique             # Import du modèle PosteHistorique
from ..serializers import PosteHistoriqueSerializer  # Import du serializer
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


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
        message = f"Poste historique {pk} supprimé avec succès."
        return Response(data={message}, status=status.HTTP_204_NO_CONTENT)  # 204 → pas de contenu à renvoyer
    