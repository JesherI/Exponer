from django.db import models

class Licence(models.Model):
    name = models.CharField(max_length=40, unique=True)
    letter = models.CharField(max_length=1)
    description = models.TextField(max_length=500)

    def __str__(self):
        return self.name