from rest_framework import serializers
from .models import Projeto

class ProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projeto
        fields = [
            'id', 'titulo', 'carga_horaria', 'duracao', 'professor',
            'financiador', 'qtd_vagas', 'tipo_projeto', 'descricao'
        ]