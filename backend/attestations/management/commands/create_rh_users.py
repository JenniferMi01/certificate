import csv
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import transaction
from attestations.models.employe import Employe, PosteHistorique
from datetime import date


class Command(BaseCommand):
    help = 'Create RH users with specific credentials and roles'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Run the command in dry-run mode without making changes to the database'
        )

    def handle(self, *args, **options):
        # Define the RH users to create
        rh_users = [
            {
                'username': 'root',
                'first_name': 'Admin',
                'last_name': 'Root',
                'email': 'admin@staff.blueline.mg',
                'password': 'admin123',
                'is_superuser': True,
                'is_staff': True,
                'matricule': 'ADMIN001',
                'poste': 'Administrateur Système'
            },
            {
                'username': 'johary.rajaonarivony',
                'first_name': 'Johary',
                'last_name': 'Rajaonarivony',
                'email': 'johary.rajaonarivony@staff.blueline.mg',
                'password': 'user123',
                'is_superuser': False,
                'is_staff': True,
                'matricule': 'RH001',
                'poste': 'Responsable RH'
            },
            {
                'username': 'soarinoro.razafindrajery',
                'first_name': 'Soarinoro',
                'last_name': 'Razafindrajery',
                'email': 'soarinoro.razafindrajery@staff.blueline.mg',
                'password': 'user123',
                'is_superuser': False,
                'is_staff': True,
                'matricule': 'RH002',
                'poste': 'Assistant RH'
            },
            {
                'username': 'misanda.andrianarimanana',
                'first_name': 'Misanda Harinirina',
                'last_name': 'Andrianarimanana',
                'email': 'misanda.andrianarimanana@staff.blueline.mg',
                'password': 'user123',
                'is_superuser': False,
                'is_staff': True,
                'matricule': 'RH003',
                'poste': 'Gestionnaire Paie'
            },
            {
                'username': 'mbolasoa.ranaivoson',
                'first_name': 'Noroniaina Mbolasoa',
                'last_name': 'Ranaivoson',
                'email': 'mbolasoa.ranaivoson@staff.blueline.mg',
                'password': 'user123',
                'is_superuser': False,
                'is_staff': True,
                'matricule': 'RH004',
                'poste': 'Recrutement'
            },
            {
                'username': 'tony.ratovonary',
                'first_name': 'Luca Antonio',
                'last_name': 'Ratovonary',
                'email': 'tony.ratovonary@staff.blueline.mg',
                'password': 'user123',
                'is_superuser': False,
                'is_staff': True,
                'matricule': 'RH005',
                'poste': 'Formation et Développement'
            }
        ]

        created_count = 0
        updated_count = 0
        skipped_count = 0

        for user_data in rh_users:
            try:
                with transaction.atomic():
                    # Create or update User
                    user, user_created = User.objects.get_or_create(
                        username=user_data['username'],
                        defaults={
                            'first_name': user_data['first_name'],
                            'last_name': user_data['last_name'],
                            'email': user_data['email'],
                            'is_active': True,
                            'is_superuser': user_data['is_superuser'],
                            'is_staff': user_data['is_staff'],
                        }
                    )

                    if not user_created:
                        # Update user info if already exists
                        user.first_name = user_data['first_name']
                        user.last_name = user_data['last_name']
                        user.email = user_data['email']
                        user.is_superuser = user_data['is_superuser']
                        user.is_staff = user_data['is_staff']
                        user.is_active = True
                        user.save()
                        updated_count += 1

                    # Set password
                    user.set_password(user_data['password'])
                    user.save()

                    # Create or update Employe
                    employe, employe_created = Employe.objects.get_or_create(
                        matricule=user_data['matricule'],
                        defaults={
                            'nom': user_data['last_name'],
                            'prenom': user_data['first_name'],
                            'sexe': 'M',  # Default to M, can be changed later
                            'date_naissance': date(1990, 1, 1),  # Default date
                            'lieu_naissance': 'Antananarivo',  # Default
                            'cin': f"TEMP{user_data['matricule']}",  # Temporary CIN
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
                        employe.nom = user_data['last_name']
                        employe.prenom = user_data['first_name']
                        employe.user = user
                        employe.save()

                    # Create PosteHistorique if poste is provided
                    if user_data['poste'] and not PosteHistorique.objects.filter(
                        employe=employe,
                        intitule=user_data['poste'],
                        date_fin__isnull=True
                    ).exists():
                        # Close any existing open poste
                        PosteHistorique.objects.filter(
                            employe=employe,
                            date_fin__isnull=True
                        ).update(date_fin=date.today())

                        PosteHistorique.objects.create(
                            employe=employe,
                            intitule=user_data['poste'],
                            date_debut=date.today()
                        )

                    # Rollback if dry run
                    if options['dry_run']:
                        transaction.set_rollback(True)

                    self.stdout.write(
                        self.style.SUCCESS(f'Successfully created/updated user: {user_data["username"]} ({user_data["email"]})')
                    )

            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'Error creating user {user_data["username"]}: {e}')
                )
                skipped_count += 1

        mode = ' (dry-run mode)' if options['dry_run'] else ''
        self.stdout.write(
            self.style.SUCCESS(
                f'RH users creation completed{mode}. Created: {created_count}, Updated: {updated_count}, Skipped: {skipped_count}'
            )
        )