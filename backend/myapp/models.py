from datetime import date
from turtle import title
from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class Post(models.Model):
    user=models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    title = models.CharField(max_length=2000)
    tag=models.CharField(max_length=100,default="About me")
    date=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id}--{self.tag}"