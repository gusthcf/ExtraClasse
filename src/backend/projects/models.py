from django.db import models

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
    qtd_vagas = models.PositiveIntegerField()
    tipo_projeto = models.CharField(max_length=20, choices=TIPO_PROJETO_CHOICES)
    descricao = models.TextField()
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo
