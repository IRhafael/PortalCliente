
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import User
from .serializers import RegisterSerializer, LoginSerializer, ObligationSerializer


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        print('POST /api/register/ - Dados recebidos:', request.data)
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            print('Usuário cadastrado com sucesso:', user.email)
            return Response({
                'id': user.id,
                'email': user.email,
                'name': user.name,
            }, status=status.HTTP_201_CREATED)
        print('Erro ao cadastrar usuário:', serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        print('POST /api/login/ - Dados recebidos:', request.data)
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            print('Login realizado com sucesso:', user.email)
            refresh = RefreshToken.for_user(user)
            user_data = {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'is_active': user.is_active,
                'is_staff': user.is_staff,
            }
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_data
            })
        print('Erro no login:', serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ------------------- OBRIGAÇÕES -------------------
from rest_framework import viewsets
from .models import Obligation

class ObligationViewSet(viewsets.ModelViewSet):
    serializer_class = ObligationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Obligation.objects.filter(user=self.request.user).order_by('-due_date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
