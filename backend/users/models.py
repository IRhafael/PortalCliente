from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone

class UserManager(BaseUserManager):
	def create_user(self, email, name, password=None, **extra_fields):
		if not email:
			raise ValueError('O email é obrigatório')
		email = self.normalize_email(email)
		user = self.model(email=email, name=name, **extra_fields)
		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, email, name, password=None, **extra_fields):
		extra_fields.setdefault('is_staff', True)
		extra_fields.setdefault('is_superuser', True)
		extra_fields.setdefault('is_active', True)
		return self.create_user(email, name, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
	name = models.CharField(max_length=150)
	email = models.EmailField(unique=True)
	ip_address = models.GenericIPAddressField(null=True, blank=True)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	date_joined = models.DateTimeField(default=timezone.now)
	last_login_ip = models.GenericIPAddressField(null=True, blank=True)

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['name']

	objects = UserManager()

	def __str__(self):
		return self.email
