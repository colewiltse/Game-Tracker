from rest_framework import serializers
from games.models import Game

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ["id", "title", "console", "description", "owner", "created"]
        read_only_fields = ["id", "created", "owner"]