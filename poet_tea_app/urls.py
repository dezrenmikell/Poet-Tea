from django.urls import path, include
from rest_framework import routers
from . import views
router = routers.DefaultRouter()
router.register('teas', views.TeaView)
router.register('ingredients', views.IngredientView)
router.register('jewlerys', views.JewleryView)

urlpatterns = [
    path('', include(router.urls))
]