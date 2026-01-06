import csv
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import transaction
from attestations.models.employe import Employe, PosteHistorique
from datetime import date


class Command(BaseCommand):
    help = 'Import employees from CSV file'

    def add_arguments(self, parser):
        parser.add_argument(
            '--csv-file',
            type=str,
            default='static/employee_data.csv',
            help='Path to the CSV file containing employee data'
        )

    def handle(self, *args, **options):
        csv_file_path = options['csv_file']

        try:
            with open(csv_file_path, 'r', encoding='utf-8-sig') as file:
                reader = csv.DictReader(file)

                created_count = 0
                updated_count = 0
                skipped_count = 0

                for row in reader:
                    username = row.get('username', '').strip()
                    first_name = row.get('first_name', '').strip()
                    last_name = row.get('last_name', '').strip()
                    email = row.get('email', '').strip()
                    poste = row.get('poste', '').strip()
                    matricule = row.get('matricule', '').strip()

                    if not username or not matricule:
                        self.stdout.write(
                            self.style.WARNING(f'Skipping row with missing username or matricule: {row}')
                        )
                        skipped_count += 1
                        continue

                    try:
                        with transaction.atomic():
                            # Create or update User
                            user, user_created = User.objects.get_or_create(
                                username=username,
                                defaults={
                                    'first_name': first_name,
                                    'last_name': last_name,
                                    'email': email,
                                    'is_active': True,
                                }
                            )

                            if not user_created:
                                # Update user info
                                user.first_name = first_name
                                user.last_name = last_name
                                user.email = email
                                user.save()
                                updated_count += 1

                            # Create or update Employe
                            employe, employe_created = Employe.objects.get_or_create(
                                matricule=matricule,
                                defaults={
                                    'nom': last_name,
                                    'prenom': first_name,
                                    'sexe': 'M',  # Default to M, can be changed later
                                    'date_naissance': date(1990, 1, 1),  # Default date
                                    'lieu_naissance': 'Antananarivo',  # Default
                                    'cin': f"TEMP{matricule}",  # Temporary CIN
                                    'cin_date': date.today(),
                                    'cin_lieu': 'Antananarivo',
                                    'adresse': 'Adresse temporaire',
                                    'date_embauche': date.today(),
                                    'contrat_cdi': True,
                                    'en_poste': True,
                                    'user': user,
                                }
                            )

                            if employe_created:
                                created_count += 1
                            else:
                                # Update employe if needed
                                employe.nom = last_name
                                employe.prenom = first_name
                                employe.user = user
                                employe.save()

                            # Create PosteHistorique if poste is provided
                            if poste and not PosteHistorique.objects.filter(
                                employe=employe,
                                intitule=poste,
                                date_fin__isnull=True
                            ).exists():
                                # Close any existing open poste
                                PosteHistorique.objects.filter(
                                    employe=employe,
                                    date_fin__isnull=True
                                ).update(date_fin=date.today())

                                PosteHistorique.objects.create(
                                    employe=employe,
                                    intitule=poste,
                                    date_debut=date.today()
                                )

                    except Exception as e:
                        self.stdout.write(
                            self.style.ERROR(f'Error processing row {row}: {e}')
                        )
                        skipped_count += 1

                self.stdout.write(
                    self.style.SUCCESS(
                        f'Import completed. Created: {created_count}, Updated: {updated_count}, Skipped: {skipped_count}'
                    )
                )

        except FileNotFoundError:
            self.stdout.write(
                self.style.ERROR(f'CSV file not found: {csv_file_path}')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error reading CSV file: {e}')
            )
