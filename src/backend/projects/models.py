# backend/projects/models.py

from django.db import models
from django.conf import settings

class Projeto(models.Model):
    TIPO_PROJETO_CHOICES = [
        ('monitoria', 'Monitoria'),
        ('tutoria', 'Tutoria'),
        ('extensao', 'Projeto de Extensão'),
        ('iniciacao', 'Iniciação Científica'),
    ]

    titulo = models.CharField(max_length=255)
    carga_horaria = models.CharField(max_length=50)  
    duracao = models.CharField(max_length=50)       
    professor = models.CharField(max_length=100)
    financiador = models.CharField(max_length=100, blank=True)  # Opcional
    vagas_voluntarias = models.PositiveIntegerField()
    vagas_remuneradas = models.PositiveIntegerField()
    tipo_projeto = models.CharField(max_length=20, choices=TIPO_PROJETO_CHOICES)
    descricao = models.TextField()
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo

class Inscricao(models.Model):
    STATUS_CHOICES = [
        ('Pendente', 'Pendente'),
        ('Aprovado', 'Aprovado'),
        ('Rejeitado', 'Rejeitado'),
    ]

    projeto = models.ForeignKey(
        Projeto, 
        on_delete=models.CASCADE, 
        related_name='inscricoes'
    )
    
    aluno = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='inscricoes'
    )
    
    data_inscricao = models.DateTimeField(auto_now_add=True)
    
    status = models.CharField(
        max_length=10, 
        choices=STATUS_CHOICES, 
        default='Pendente'
    )

    class Meta:
        # Garante que um aluno não pode se inscrever duas vezes no mesmo projeto
        unique_together = ('projeto', 'aluno')
        verbose_name_plural = "Inscrições"

    def __str__(self):
        # Supondo que seu modelo de usuário tenha o campo 'username'
        return f'{self.aluno.username} inscrito em {self.projeto.titulo}'