from django.db import models
from django.urls import reverse
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser,AbstractUser,
    PermissionsMixin)
from django.conf import settings
from rest_framework import serializers

class UserManager(BaseUserManager):
    def create_user(self, kakao_id,  password=None):
        """
        주어진 이메일, 닉네임, 비밀번호 등 개인정보로 User 인스턴스 생성
        """
        # if not email:
        #     raise ValueError(('Users must have an email address'))

        # user = self.model(
        #     email=self.normalize_email(email),
        # )
        user = self.model(kakao_id=kakao_id)

        user.set_password(password)
        # user.set_unusable_password()

    def create_superuser(self, kakao_id, password):
        """
        주어진 이메일, 닉네임, 비밀번호 등 개인정보로 User 인스턴스 생성
        단, 최상위 사용자이므로 권한을 부여한다. 
        # """
        # user = self.create_user(
        #     email=email,
        #     password=password,
        # )

        user = self.create_user(
            kakao_id=kakao_id,
            password=password,
        )

        user.is_admin = True
        user.save(using=self._db)
        return user

        
class User(AbstractBaseUser, PermissionsMixin):
    kakao_id = models.CharField(unique=True, max_length=30 , verbose_name='UserID', primary_key=True)
    email = models.EmailField(unique=True, verbose_name='이메일', null=True)
    nickname = models.CharField(unique=True, max_length=20, verbose_name='닉네임',null=False, blank=False)
    item = models.CharField(null=True, max_length=50, verbose_name='유저 물건')
    price = models.IntegerField(null=True, verbose_name='물건가격')
    monthly_cost = models.IntegerField(null=True, verbose_name='한달 식비')
    profile_image = models.CharField(null=True, max_length=255 , verbose_name='프로필사진')
    item_image = models.CharField(null=True, max_length=255, verbose_name='물건 사진')
    ages = models.IntegerField(null = True, verbose_name="나이")


    # is_active = models.BooleanField(default=True)
    # is_admin = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = 'kakao_id'
    # REQUIRED_FIELDS = 'email'

    # def get_full_name(self):
    #     # The user is identified by their email address
    #     return self.user_id
 
    # # def get_short_name(self):
    # #     # The user is identified by their email address
    # #     return self.email
 
    def __str__(self):
        return self.kakao_id

    

class User_history(models.Model):
    kakao = models.ForeignKey(User, on_delete=models.CASCADE, related_name='history')
    payment_date = models.DateField(auto_now_add=True, null=True)
    user_breakfast = models.IntegerField(blank=True, null = True, default=0)
    user_lunch = models.IntegerField(blank=True, null = True, default=0)
    user_dinner = models.IntegerField(blank=True, null = True, default=0)
    total_paid = models.IntegerField(blank=True, null = True)   # 누적 지불금액
    today_saving = models.IntegerField(blank=True, null = True) # 얼마나 아꼈는지를 알려주는 컬럼
    
    objects = models.Manager