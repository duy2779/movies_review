from django.urls import path
from .views import get_user

urlpatterns = [
    path('api/get-user', get_user, name='get-user')
]