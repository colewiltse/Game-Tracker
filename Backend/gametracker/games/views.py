import django_filters.rest_framework
from django.shortcuts import render
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions
from games.serializers import GameSerializer
from games.models import Game
from games.permissions import IsOwner

# Create your views here.
class GameTrackerListCreate(ListCreateAPIView):
    serializer_class = GameSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['console']
    search_fields = ['title']
    ordering_fields = ['title', 'console', 'created']
    ordering = ['created']

    def get_queryset(self):
        return Game.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class GameTrackerDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = GameSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Game.objects.filter(owner=self.request.user)

