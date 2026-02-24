from rest_framework import serializers
from accounts.models import GameTrackerUser, GameTrackerUserManager
from django.contrib.auth.hashers import make_password

class GameTrackerUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameTrackerUser
        fields = ["id", "email", "password", "profile_picture",]
        read_only_fields = ["id",]

    def create(self, validated_data):
        return GameTrackerUser.objects.create_user(**validated_data)