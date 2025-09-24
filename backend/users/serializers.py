# SERIALIZERS.PY
from rest_framework import serializers
from users.models import User
from django.contrib.auth import authenticate

class RegisterSerializer(serializers.ModelSerializer):
	password = serializers.CharField(write_only=True, min_length=6)

	class Meta:
		model = User
		fields = ('id', 'email', 'password', 'name')

	def create(self, validated_data):
		user = User.objects.create_user(
			email=validated_data['email'],
			name=validated_data.get('name', ''),
			password=validated_data['password'],
		)
		return user

class LoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()

	def validate(self, data):
		email = data.get('email')
		password = data.get('password')
		user = authenticate(email=email, password=password)
		if not user:
			raise serializers.ValidationError('Credenciais inválidas.')
		if not user.is_active:
			raise serializers.ValidationError('Usuário inativo.')
		data['user'] = user
		return data