from rest_framework import serializers
from accounts.models import GameTrackerUser, GameTrackerUserManager
from django.contrib.auth.hashers import make_password

class GameTrackerUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameTrackerUser
        fields = ["id", "email", "password",]
        read_only_fields = ["id",]

    def create(self, validated_data):
        return GameTrackerUser.objects.create_user(**validated_data)
    
    def update(self, instance, validated_data):
        email = validated_data.pop('email', None)
        password = validated_data.pop('password', None)
        
        if email:
            instance.email = email

        if password:
            instance.set_password(password) 

        instance.save()
        return instance