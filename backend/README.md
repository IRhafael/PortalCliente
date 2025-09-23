# ...existing code...

## Como iniciar o backend Django

1. Crie um ambiente virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # ou venv\Scripts\activate no Windows
   ```

2. Instale o Django e o Django REST Framework:
   ```bash
   pip install django djangorestframework
   ```

3. Inicie um novo projeto Django:
   ```bash
   django-admin startproject backend .
   ```

4. (Opcional) Crie um app para a API:
   ```bash
   python manage.py startapp api
   ```

5. Adicione `'rest_framework'` e seu app (`'api'`) em `INSTALLED_APPS` no `settings.py`.

6. Rode as migrações iniciais:
   ```bash
   python manage.py migrate
   ```

7. Inicie o servidor:
   ```bash
   python manage.py runserver
   ```

O backend estará disponível em `http://localhost:8000/`.