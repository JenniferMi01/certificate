from django.db import models
from .employe import Employe

class CertificatTravail(models.Model):
    employe = models.ForeignKey(Employe, on_delete=models.CASCADE)
    date_sortie = models.DateField()
    motif_sortie = models.TextField(null=True, blank=True)
    date_generation = models.DateField(auto_now_add=True)
