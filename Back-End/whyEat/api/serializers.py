from rest_framework import serializers
from .models import User, User_history
from django.contrib.auth import get_user_model
# from django.contrib.auth.models import User

class HistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = User_history
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    history = HistorySerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = '__all__'




