# backend/projects/urls.py

from django.urls import path
from .views import ProjetoListCreateView, ProjetoDetailView, inscrever_projeto_view 

urlpatterns = [
    path('projetos/', ProjetoListCreateView.as_view(), name='projeto-list-create'),
    path('projetos/<int:pk>/', ProjetoDetailView.as_view(), name='projeto-detail'),
    
    # --- NOVA ROTA ABAIXO ---
    path('projetos/<int:pk>/inscrever/', inscrever_projeto_view, name='projeto-inscrever'),
]