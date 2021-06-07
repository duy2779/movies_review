from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    first_name = None
    last_name = None

    avatar = models.ImageField(
        blank=True, null=True, default="avatar_default.png")
    email = models.EmailField(
        max_length=100, unique=True, blank=False, null=False)
    full_name = models.EmailField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.username
