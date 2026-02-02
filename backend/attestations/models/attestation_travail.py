from django.db import models
from .employe import Employe

class AttestationTravail(models.Model):
    employe = models.ForeignKey(Employe, on_delete=models.CASCADE)
    date_generation = models.DateField(auto_now_add=True)
