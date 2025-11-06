from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Logout JWT → invalide le refresh token."""
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()  # rend le token inutilisable
        return Response({"message": "Déconnexion réussie"}, status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response({"error": "Token invalide ou manquant"}, status=status.HTTP_400_BAD_REQUEST)
