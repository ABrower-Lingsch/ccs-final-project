from django.urls import path
from .views import IndexView

app_name = 'frontend'

urlpatterns = [
    path('', IndexView.as_view()),
    path('<path:resource>/', IndexView.as_view()),
]
