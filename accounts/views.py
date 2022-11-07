from operator import imod
from rest_framework import generics
from .models import StylistProfile, ClientProfile, User
from .serializers import StylistProfileSerializer, ClientProfileSerializer, CustomUserDetailsSerializer
from .permissions import IsUserOrReadOnly
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes


class UserListAPIView(generics.ListAPIView):
    permission_classes = (IsAdminUser,)
    queryset = User.objects.all()
    serializer_class = CustomUserDetailsSerializer


class StylistProfileListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = StylistProfileSerializer

    def get_queryset(self):
        return StylistProfile.objects.filter(is_verified=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class StylistProfileDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsUserOrReadOnly,)
    queryset = StylistProfile.objects.all()
    serializer_class = StylistProfileSerializer


class ClientProfileListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ClientProfileDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsUserOrReadOnly,)
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer


@api_view(['POST'])
@permission_classes([IsAdminUser, ])
def verify_stylist(self):
    pass
