from django.shortcuts import render
from django.contrib.auth import authenticate 
from rest_framework import generics
from .models import Projeto
from .serializers import ProjetoSerializer, CustomUserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ProjetoListCreateView(generics.ListCreateAPIView):
    queryset = Projeto.objects.all()  # Apenas tutorias para a sprint 1
    serializer_class = ProjetoSerializer
# Create your views here.

class ProjetoDetailView(generics.RetrieveAPIView):
    queryset = Projeto.objects.all()  
    serializer_class = ProjetoSerializer

class LoginView(APIView):
    def post(self, request):
        # Usamos 'username' do Django para representar a matrícula
        matricula = request.data.get('matricula')
        senha = request.data.get('senha')

        if not matricula or not senha:
            return Response({'error': 'Matrícula e senha são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)

        # A função authenticate do Django faz a mágica de verificar no banco de dados
        user = authenticate(username=matricula, password=senha)

        if user is not None:
            # Se o usuário for válido, usamos nosso serializer para preparar a resposta
            serializer = CustomUserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Se as credenciais forem inválidas
            return Response({'error': 'Matrícula ou senha inválida'}, status=status.HTTP_401_UNAUTHORIZED)