from rest_framework import serializers
from accounts.models import GameTrackerUser

class GameTrackerUserSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(read_only = True)
    class Meta:
        model = GameTrackerUser
        fields = ["id", "email", "profile_picture",]