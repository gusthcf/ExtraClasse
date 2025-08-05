from rest_framework import serializers
from .models import Projeto

class ProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projeto
        fields = [
            'id', 'titulo', 'carga_horaria', 'duracao', 'professor',
            'financiador', 'vagas_remuneradas','vagas_voluntarias', 'tipo_projeto', 'descricao'
        ]