from rest_framework import serializers
from .models import Store, Store_score, Store_menu
# from django.contrib.auth.models import User

class StoreScoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Store_score
        fields = '__all__'


class StoreMenuSerializer(serializers.ModelSerializer):

    class Meta:
        model = Store_menu
        fields = '__all__'
        

class StoreSerializer(serializers.ModelSerializer):
    menu = StoreMenuSerializer(many=True, read_only=True)

    class Meta:
        model = Store
        fields = '__all__'

