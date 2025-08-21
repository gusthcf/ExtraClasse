# backend/projects/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Projeto # 1. Importe seus modelos

# 2. Crie uma classe de Admin customizada para o seu usuário
class CustomUserAdmin(UserAdmin):
    # Campos que serão exibidos na lista de usuários
    list_display = ('username', 'email', 'first_name', 'last_name', 'tipo_usuario', 'is_staff')
    
    # Adiciona 'tipo_usuario' aos campos editáveis no painel de admin
    # Copiamos os fieldsets do UserAdmin padrão e adicionamos o nosso campo
    fieldsets = UserAdmin.fieldsets + (
        ('Campos Personalizados', {'fields': ('tipo_usuario',)}),
    )
    # Adiciona 'tipo_usuario' aos campos na tela de criação de usuário
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Campos Personalizados', {'fields': ('tipo_usuario',)}),
    )

# 3. Registre seus modelos com o admin
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Projeto) # Se o seu Projeto ainda não estiver registrado