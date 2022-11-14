from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, StylistProfile, ClientProfile, Review

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(StylistProfile)
admin.site.register(ClientProfile)
admin.site.register(Review)
