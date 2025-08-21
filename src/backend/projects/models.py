from django.db import models

from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    TIPO_USUARIO_CHOICES = [
        ('aluno', 'Aluno'),
        ('professor', 'Professor'),
    ]
    
    tipo_usuario = models.CharField(max_length=10, choices=TIPO_USUARIO_CHOICES)
    email = models.EmailField(blank=True)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # Nome único para o acesso reverso de Group
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set_permissions',  # Nome único para o acesso reverso de Permission
        blank=True,
    )
    # --- FIM DA CORREÇÃO ---

    def __str__(self):
        return self.username
    

class Projeto(models.Model):
    TIPO_PROJETO_CHOICES = [
        ('monitoria', 'Monitoria'),
        ('tutoria', 'Tutoria'),
        ('extensao', 'Projeto de Extensão'),
        ('iniciacao', 'Iniciação Científica'),
    ]

    titulo = models.CharField(max_length=255)
    carga_horaria = models.CharField(max_length=50)  # Ex: "20h semanais"
    duracao = models.CharField(max_length=50)       # Ex: "6 meses"
    professor = models.CharField(max_length=100)
    financiador = models.CharField(max_length=100, blank=True)  # Opcional
    vagas_voluntarias = models.PositiveIntegerField()
    vagas_remuneradas = models.PositiveIntegerField()
    tipo_projeto = models.CharField(max_length=20, choices=TIPO_PROJETO_CHOICES)
    descricao = models.TextField()
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo

