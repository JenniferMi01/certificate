from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_201_CREATED
from django.contrib.auth.models import User
from django.db import IntegrityError

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.id,
            'username': user.username,
        }, status=HTTP_200_OK)
    else:
        return Response(
            {'error': 'Identifiants invalides'},
            status=HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    # Vérifie que tous les champs requis sont présents
    if not username or not password or not email:
        return Response(
            {'error': 'Username, email et password sont requis.'},
            status=HTTP_400_BAD_REQUEST
        )

    try:
        # Crée un nouvel utilisateur
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        # Crée ou récupère un token pour cet utilisateur
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
        }, status=HTTP_201_CREATED)
    except IntegrityError:
        # Gère les erreurs d'unicité (username ou email déjà existant)
        return Response(
            {'error': 'Ce nom d\'utilisateur ou email est déjà utilisé.'},
            status=HTTP_400_BAD_REQUEST
        )
