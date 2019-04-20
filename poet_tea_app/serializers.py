from rest_framework import serializers

from .models import Tea, Ingredient, Jewlery


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'description', 'tea')

class TeaSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)
    class Meta:
        model = Tea
        fields = ('id', 'title', 'photo_url', 'description', 'ingredients')

class JewlerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Jewlery
        fields = ('id', 'title', 'photo_url', 'description')
