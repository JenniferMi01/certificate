from django.db import models
from .employe import Employe

class AttestationConge(models.Model):
    employe = models.ForeignKey(Employe, on_delete=models.CASCADE)
    date_debut_conge = models.DateField()
    date_fin_conge = models.DateField()
    type_conge = models.CharField(max_length=100)
    date_generation = models.DateField(auto_now_add=True)
