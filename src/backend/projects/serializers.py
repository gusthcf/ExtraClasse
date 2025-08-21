from rest_framework import serializers
from .models import Projeto, CustomUser 

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        # Estes são os campos que a API vai retornar após o login
        fields = ['id', 'username', 'first_name', 'last_name', 'tipo_usuario']
        
class ProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projeto
        fields = [
            'id', 'titulo', 'carga_horaria', 'duracao', 'professor',
            'financiador', 'vagas_remuneradas','vagas_voluntarias', 'tipo_projeto', 'descricao'
        ]


