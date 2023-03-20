from django.urls import path
from .views import ClientProfileDetailAPIView, ClientProfileListAPIView, StylistProfileDetailAPIView, StylistProfileListAPIView, UserListAPIView, verify_stylist, StylistReviewsListAPIView, get_filtered_profiles

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
    path('profiles/stylists/<int:stylistprofile>/reviews/',
         StylistReviewsListAPIView.as_view()),
    path('profiles/filter/', get_filtered_profiles, name='filtered_stylist_list'),
]
