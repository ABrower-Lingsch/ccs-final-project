from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.


class User(AbstractUser):
    is_stylist = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)


class ClientProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    avatar = models.ImageField(
        default='default.jpg', upload_to='profiles/', null=True)
    first_name = models.CharField(max_length=225, null=True)
    last_name = models.CharField(max_length=225, null=True)


class StylistProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    is_verified = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='profiles/', null=True)
    first_name = models.CharField(max_length=225, null=True)
    last_name = models.CharField(max_length=225, null=True)
    license = models.CharField(max_length=225, null=True)
    contact = models.CharField(max_length=225, null=True)
    business = models.CharField(max_length=225, null=True)
    location = models.CharField(max_length=225, null=True)
    specialties = models.CharField(max_length=225, null=True)
    bio = models.TextField(null=True)
    email = models.EmailField(max_length=225, null=True)
    instagram = models.CharField(max_length=225, null=True, blank=True)
    facebook = models.CharField(max_length=225, null=True, blank=True)


class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True)
    text = models.TextField(null=True)
    stylistprofile = models.ForeignKey(
        StylistProfile, on_delete=models.CASCADE, blank=True)
    rating = models.IntegerField()
    created_on = models.DateTimeField(auto_now_add=True, null=True)