from django.urls import path
from .views import ProjetoListCreateView, ProjetoDetailView, LoginView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'), 
    path('projetos/', ProjetoListCreateView.as_view(), name='projeto-list-create'),
    path('projetos/<int:pk>/', ProjetoDetailView.as_view(), name='projeto-detail'),
]