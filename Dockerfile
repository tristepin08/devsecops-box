# 1. On part d'un ordinateur Linux vierge avec Python déjà installé
FROM python:3.11-slim

# 2. On crée un dossier /app à l'intérieur de notre boîte
WORKDIR /app

# 3. On copie notre liste de courses dans la boîte
COPY requirements.txt .

# 4. On demande à la boîte d'installer Flask
RUN pip install -r requirements.txt

# 5. On copie tout le reste de notre code (app.py, config.py) dans la boîte
COPY . .

# 6. On ouvre le port 5000 pour que la page web puisse communiquer avec l'extérieur
EXPOSE 5000

# 7. La commande pour allumer le moteur quand la boîte s'ouvre !
CMD ["flask", "run", "--host=0.0.0.0"]