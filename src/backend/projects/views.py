from django.shortcuts import render
from rest_framework import generics
from .models import Projeto
from .serializers import ProjetoSerializer

class ProjetoListCreateView(generics.ListCreateAPIView):
    queryset = Projeto.objects.filter(tipo_projeto='tutoria')  # Apenas tutorias para a sprint 1
    serializer_class = ProjetoSerializer
# Create your views here.

class ProjetoDetailView(generics.RetrieveAPIView):
    queryset = Projeto.objects.all()  
    serializer_class = ProjetoSerializer
