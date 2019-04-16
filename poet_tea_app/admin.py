from django.contrib import admin
from .models import Tea, Ingredient

admin.site.register([Tea, Ingredient])
