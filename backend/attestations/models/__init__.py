# from .employe import Employe
# from .attestation_travail import AttestationTravail
# from .attestation_conge import AttestationConge
# from .certificat_travail import CertificatTravail



# attestations/models/__init__.py
# from .employe import Employe, PosteHistorique, Conge
# from .attestation_travail import AttestationTravail
# from .attestation_conge import AttestationConge
# from .certificat_travail import CertificatTravail


# backend/attestations/models/__init__.py

# from .employe import Employe, PosteHistorique, Conge
# backend/attestations/models/__init__.py
from ..models.employe import Employe, PosteHistorique, Conge   # ← deux points pour remonterfrom .attestation_travail import AttestationTravail
from .attestation_conge import AttestationConge
from .certificat_travail import CertificatTravail

__all__ = [
    'Employe',
    'PosteHistorique',
    'Conge',
    'AttestationTravail',
    'AttestationConge',
    'CertificatTravail',
]