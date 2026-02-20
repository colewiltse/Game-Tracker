from django.urls import path
from accounts import views

urlpatterns = [
    path('user/', views.GameTrackerUserCreate.as_view()),
    path('user/<int:pk>/', views.GameTrackerUserDetail.as_view()), #Retrieve User Profile 
    path('super/users/', views.AdminGameTrackerUserList.as_view()),
]