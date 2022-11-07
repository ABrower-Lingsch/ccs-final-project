from django.urls import path
from .views import ClientProfileDetailAPIView, ClientProfileListAPIView, StylistProfileDetailAPIView, StylistProfileListAPIView, UserListAPIView, verify_stylist

app_name = 'accounts'

urlpatterns = [
    path('users/', UserListAPIView.as_view(), name='user_list'),
    path('profiles/stylists/',
         StylistProfileListAPIView.as_view(), name='stylist_list'),
    path('profiles/stylists/<int:pk>/',
         StylistProfileDetailAPIView.as_view(), name='stylist_profile'),
    path('profiles/clients/', ClientProfileListAPIView.as_view(), name='client_list'),
    path('profiles/clients/<int:pk>/',
         ClientProfileDetailAPIView.as_view(), name='client_profile'),
    path('profiles/stylists/<int:pk>/verify/', verify_stylist),
]
