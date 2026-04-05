from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView, CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions
from accounts.serializers import GameTrackerUserSerializer
from accounts.permissions import IsOwnerOrReadOnly
from accounts.models import GameTrackerUser


# Create your views here.
class GameTrackerUserCreate(CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = GameTrackerUserSerializer

class GameTrackerUserDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = GameTrackerUserSerializer
    def get_object(self):
        return self.request.user
    

class AdminGameTrackerUserList(ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = GameTrackerUserSerializer
    def get_queryset(self):
        return GameTrackerUser.objects.all()