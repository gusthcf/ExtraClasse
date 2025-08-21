from django.shortcuts import render
from rest_framework import generics
from .models import Projeto
from .serializers import ProjetoSerializer


from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Projeto, Inscricao # Certifique-se de importar seus models


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
        professor_nome = self.request.query_params.get('professor', None)

        # Se o parâmetro existir, filtra o queryset
        if professor_nome is not None:
            queryset = queryset.filter(professor__iexact=professor_nome)

        return queryset

class ProjetoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Projeto.objects.all()
    serializer_class = ProjetoSerializer


@api_view(['POST']) # Esta view só aceitará requisições do tipo POST
@permission_classes([IsAuthenticated]) # Exige que o usuário esteja logado
def inscrever_projeto_view(request, pk):
    """
    View para um aluno se inscrever em um projeto específico.
    """
    # Busca o projeto pelo ID (pk) fornecido na URL
    projeto = get_object_or_404(Projeto, pk=pk)
    aluno = request.user

    # --- Validações de Negócio ---

    # 1. Verifica se o usuário já está inscrito no projeto
    if Inscricao.objects.filter(projeto=projeto, aluno=aluno).exists():
        return Response(
            {'detail': 'Você já está inscrito neste projeto.'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    # 2. Verifica se o professor do projeto está tentando se inscrever
    if projeto.professor == aluno.username:
        return Response(
            {'detail': 'O orientador não pode se inscrever no próprio projeto.'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # --- Criação da Inscrição ---
    Inscricao.objects.create(projeto=projeto, aluno=aluno)

    return Response(
        {'detail': 'Inscrição realizada com sucesso!'}, 
        status=status.HTTP_201_CREATED
    )
