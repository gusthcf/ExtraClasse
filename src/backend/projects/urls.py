from django.urls import path
from .views import ProjetoListCreateView
from .views import ProjetoDetailView

urlpatterns = [
    path('projetos/', ProjetoListCreateView.as_view(), name='projeto-list-create'),
    path('projetos/<int:pk>/', ProjetoDetailView.as_view(), name='projeto-detail'),
]