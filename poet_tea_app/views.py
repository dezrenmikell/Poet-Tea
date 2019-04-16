from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from .serializers import TeaSerializer, IngredientSerializer
from .models import Tea, Ingredient


class TeaView(viewsets.ModelViewSet):
    queryset = Tea.objects.all()
    serializer_class = TeaSerializer

class IngredientView(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer