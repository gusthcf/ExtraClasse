from django.urls import path
from .views import ProjetoListCreateView

urlpatterns = [
    path('projetos/', ProjetoListCreateView.as_view(), name='projeto-list-create'),
]