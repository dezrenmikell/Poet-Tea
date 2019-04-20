from django.db import models

# Create your models here.
class Tea(models.Model):
    title = models.CharField(max_length=255)
    photo_url = models.CharField(max_length=400)
    description = models.CharField(max_length=400)

    def __str__(self):
        return self.title

class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=400)
    tea = models.ForeignKey(Tea, on_delete=models.CASCADE, related_name='ingredients')

    def __str__(self):
        return self.name

class Jewlery(models.Model):
    title = models.CharField(max_length=255)
    photo_url = models.CharField(max_length=400)
    description = models.CharField(max_length=800)
