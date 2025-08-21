from django.shortcuts import render
from rest_framework import generics
from .models import Projeto
from .serializers import ProjetoSerializer

class ProjetoListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjetoSerializer

    # ✅ NOVO MÉTODO ADICIONADO AQUI
    def get_queryset(self):
        """
        Sobrescreve o método original para permitir a filtragem de projetos
        pelo nome do professor via query parameter.
        """
        # Pega o queryset base (todos os projetos)
        queryset = Projeto.objects.all()

        # Verifica se o parâmetro 'professor' está na URL
        # Ex: /api/projetos/?professor=NomeDoProfessor
        professor_nome = self.request.query_params.get('professor', None)

        # Se o parâmetro existir, filtra o queryset
        if professor_nome is not None:
            # Usamos 'iexact' para uma busca case-insensitive (ignora maiúsculas/minúsculas)
            queryset = queryset.filter(professor__iexact=professor_nome)

        return queryset
# Create your views here.

class ProjetoDetailView(generics.RetrieveAPIView):
    queryset = Projeto.objects.all()  
    serializer_class = ProjetoSerializer
