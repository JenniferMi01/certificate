from rest_framework import serializers
from .models import Employe, PosteHistorique, Conge


#  SERIALIZER EMPLOYE
class EmployeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employe                     # Le modèle associé
        fields = '__all__'                  # Inclut tous les champs du modèle



#  SERIALIZER POSTE HISTORIQUE
class PosteHistoriqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = PosteHistorique
        fields = '__all__'                  # Tous les champs du modèle PosteHistorique

#  SERIALIZER CONGÉ

class CongeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conge
        fields = '__all__'                  # Tous les champs du modèle Conge
