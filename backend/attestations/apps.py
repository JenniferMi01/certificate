from django.apps import AppConfig  # Import de la classe AppConfig pour configurer l'application Django

# Classe de configuration de l'application "attestations"
class AttestationsConfig(AppConfig):
    # Champ par défaut pour les clés primaires dans les modèles (BigAutoField → entier 64 bits auto-incrémenté)
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'attestations' # Nom de l'application telle qu'elle est reconnue par Django
