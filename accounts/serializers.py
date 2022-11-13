from rest_framework import serializers
from .models import StylistProfile, ClientProfile
from dj_rest_auth.models import TokenModel
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer


class TokenSerializer(serializers.ModelSerializer):
    is_superuser = serializers.ReadOnlyField(source='user.is_superuser')
    id = serializers.ReadOnlyField(source='user.id')
    is_stylist = serializers.ReadOnlyField(source='user.is_stylist')
    is_client = serializers.ReadOnlyField(source='user.is_client')
    stylist_profile = serializers.ReadOnlyField(
        source='user.stylistprofile.id')
    stylist_avatar = serializers.ImageField(
        source='user.stylistprofile.avatar')
    client_avatar = serializers.ImageField(source='user.clientprofile.avatar')

    class Meta:
        model = TokenModel
        fields = '__all__'


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        field = UserDetailsSerializer.Meta.fields + \
            ('is_stylist', 'is_client',)


class CustomRegisterSerializer(RegisterSerializer):
    is_stylist = serializers.BooleanField(default=False)
    is_client = serializers.BooleanField(default=False)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['is_stylist'] = self.validated_data.get('is_stylist', False)
        data_dict['is_client'] = self.validated_data.get('is_client', False)

        return data_dict


class StylistProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StylistProfile
        fields = '__all__'
        read_only_fields = ['is_verified']


class ClientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientProfile
        fields = '__all__'
