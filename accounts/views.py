import os
import urllib.parse
import requests
import json
from operator import imod
from rest_framework import generics
from rest_framework.response import Response
from .models import StylistProfile, ClientProfile, User, Review
from .serializers import StylistProfileSerializer, ClientProfileSerializer, CustomUserDetailsSerializer, ReviewSerializer
from .permissions import IsUserOrReadOnly
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes


def filter_stylist_profiles_distance(stylistprofiles, origin, distance_radius):

    def get_profile_location(stylistprofile):
        return stylistprofile.location

    locations = list(map(get_profile_location, stylistprofiles))
    string_locations = ('|').join(locations)
    url_locations = urllib.parse.quote(string_locations)

    api_key = os.environ['GOOGLE_API_KEY']

    url = f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin}&destinations={url_locations}&units=imperial&key={api_key}"

    response = requests.request("GET", url, headers={}, data={})

    data = json.loads(response.text)

    distance_dict = data['rows'][0]['elements']

    distance_str_list = []
    for i in range(len(distance_dict)):
        distance_str_list.append(distance_dict[i]['distance']['text'])

    distance_int_list = []
    for i in range(len(distance_str_list)):
        distance_int_list.append(
            float((distance_str_list[i].replace('mi', ''))))

    filtered_profiles = []
    for (index, integer) in enumerate(distance_int_list):
        try:
            if integer < int(distance_radius):
                filtered_profiles.append(stylistprofiles[index])
        except:
            pass

    return filtered_profiles


def filter_stylist_profiles(request):
    origin = request.GET.get('origin')
    distance_radius = request.GET.get('distance')
    stylistprofiles = StylistProfile.objects.filter(is_verified=True)

    return filter_stylist_profiles_distance(stylistprofiles, origin, distance_radius)


@ api_view(['GET'],)
@ permission_classes([AllowAny],)
def get_filtered_profiles(request):
    profiles = filter_stylist_profiles(request)
    results = StylistProfileSerializer(profiles, many=True).data

    return Response(results)


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


class StylistReviewsListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsUserOrReadOnly,)
    serializer_class = ReviewSerializer

    def get_queryset(self):
        stylistprofile = self.kwargs['stylistprofile']
        return Review.objects.filter(stylistprofile=stylistprofile)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(['POST'])
@permission_classes([IsAdminUser, ])
def verify_stylist(self):
    pass
