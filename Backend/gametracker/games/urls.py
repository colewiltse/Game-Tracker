from django.urls import path
from games import views

urlpatterns = [
    path('games/', views.GameTrackerListCreate.as_view()),
    path('games/<int:pk>/', views.GameTrackerDetail.as_view()),
    path('consoles/', views.ConsoleList.as_view()), 
    path('genres/', views.GenreList.as_view()),
]