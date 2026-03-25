from rest_framework import serializers
from games.models import Game

class GameSerializer(serializers.ModelSerializer):
    console_display = serializers.CharField(source='get_console_display', read_only=True)

    class Meta:
        model = Game
        fields = ["id", "title", "console", "console_display", "description", "owner", "created", 'box_art']
        read_only_fields = ["id", "created", "owner"]