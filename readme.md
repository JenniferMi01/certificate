## Générer diagramme de classe UML avec Django Extensions
python manage.py graph_models -a -g -o class_diagram.png





## Installation de Django²
### Créer virtual environnement avec python3

```bash
python3 -m venv env
```


### Activer environnement virtuel avec source

```bash
source env/bin/activate
```

### Installer les dépendances avec pip

```bash
pip install -r requirements.txt
```

### Génerer & Faire la migration de la base de données
```bash
python manage.py makemigrations
python manage.py migrate
```

### Exécuter le seeds

```bash
python manage.py import_employees
```


### Lancer le serveur

```bash
python manage.py runserver
```


## Installation de React

### Installer les dépendances avec npm

```bash
npm install
```

### Lancer le serveur
```bash
npm run dev
```

user test :
 annie / annie
