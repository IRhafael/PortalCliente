from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
	list_display = ('id', 'email', 'name', 'is_active', 'is_staff', 'date_joined', 'ip_address', 'last_login_ip')
	list_filter = ('is_active', 'is_staff', 'date_joined')
	search_fields = ('email', 'name', 'ip_address')
	ordering = ('-date_joined',)
	fieldsets = (
		(None, {'fields': ('email', 'password')}),
		('Informações pessoais', {'fields': ('name', 'ip_address', 'last_login_ip')}),
		('Permissões', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
		('Datas', {'fields': ('date_joined', 'last_login')}),
	)
	add_fieldsets = (
		(None, {
			'classes': ('wide',),
			'fields': ('email', 'name', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser')
		}),
	)
