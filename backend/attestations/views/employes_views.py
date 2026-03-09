from rest_framework.decorators import api_view  # Décorateur pour indiquer les méthodes HTTP autorisées (GET, POST, PUT, DELETE)
from rest_framework.response import Response    # Pour renvoyer des réponses JSON
from rest_framework import status                # Codes HTTP standards (200, 201, 400, 404, ...)
from django.shortcuts import get_object_or_404   # Récupère un objet ou renvoie une 404 si inexistant
from ..models import Employe         # Import des modèles de la base de données
from ..serializers import EmployeSerializer  # Import des serializers
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
