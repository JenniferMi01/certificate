# from rest_framework import serializers
# from .models import Employe, PosteHistorique, Conge


# #  SERIALIZER EMPLOYE
# class EmployeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Employe                     # Le modèle associé
#         fields = '__all__'                  # Inclut tous les champs du modèle



# #  SERIALIZER POSTE HISTORIQUE
# class PosteHistoriqueSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PosteHistorique
#         fields = '__all__'                  # Tous les champs du modèle PosteHistorique

# #  SERIALIZER CONGÉ

# class CongeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Conge
#         fields = '__all__'                  # Tous les champs du modèle Conge


from rest_framework import serializers
# from .models import Employe, PosteHistorique, Conge, AttestationTravail, AttestationConge, CertificatTravail
from .models import Employe, PosteHistorique, Conge
from .models.attestation_travail import AttestationTravail
from .models.attestation_conge import AttestationConge
from .models.certificat_travail import CertificatTravail

# Anciens serializers (tu les gardes)
class PosteHistoriqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = PosteHistorique
        fields = '__all__'

class EmployeSerializer(serializers.ModelSerializer):
    postes = PosteHistoriqueSerializer(many=True, read_only=True)
    class Meta:
        model = Employe
        fields = '__all__'

class CongeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conge
        fields = '__all__'


# NOUVEAUX serializers pour les attestations
class AttestationTravailSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttestationTravail
        fields = '__all__'

class AttestationCongeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttestationConge
        fields = '__all__'

class CertificatTravailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificatTravail
        fields = '__all__'
