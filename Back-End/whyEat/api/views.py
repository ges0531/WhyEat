from .serializers import UserSerializer, HistorySerializer
from .models import User, User_history
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import datetime
from django.db.models import F




class MultipleFieldLookupMixin(object):
    """
    Apply this mixin to any view or viewset to get multiple field filtering
    based on a `lookup_fields` attribute, instead of the default single field filtering.
    """

    def get_object(self):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        for field in self.lookup_fields:
            if self.kwargs[field]:  # Ignore empty fields.
                filter[field] = self.kwargs[field]
        return get_object_or_404(queryset, **filter)


class UserExistsView(APIView):
  def get(self, request, *args, **kwargs):
    exist_query = self.kwargs.get('kakao_id')
    try:
        User.objects.get(kakao_id=exist_query)
    except User.DoesNotExist:
        print('False')
        # return false as user does not exist
        return Response(data={'message': False})
    else:
        print('True')
        return Response(data={'message': True})  # Otherwise, return True



@api_view(['GET','POST'])
def user_list(request):
    if request.method == 'GET':
        qs = User.objects.all()
        serializer = UserSerializer(qs, many=True)
        return Response(serializer.data)
    else:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET','PUT','DELETE'])
def user_detail(request, kakao_id):
    user = get_object_or_404(User, kakao_id=kakao_id)
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET','POST'])
def history_list(request):
    if request.method == 'GET':
        qs = User_history.objects.all()
        serializer = HistorySerializer(qs, many=True)
        return Response(serializer.data)
    else:
        serializer = HistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET','PUT','DELETE'])
def history_detail(request, history_pk):
    history = get_object_or_404(User_history, pk=history_pk)
    if request.method == 'GET':
        serializer = HistorySerializer(history)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = HistorySerializer(history, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        history.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def rank_list(request):
    # history = User_history.objects.extra(
    #     select={'fieldsum':'user_breakfast + user_lunch + user_dinner'},
    #     order_by=('fieldsum', )
    # )[:5]
    now = datetime.datetime.now()
    nowDate = now.strftime('%Y-%m-%d')
    history = User_history.objects.all().filter(payment_date=nowDate).extra(
        select={'fieldsum':'user_breakfast + user_lunch + user_dinner'},
        order_by=('fieldsum', )
    )[:5]
    # history = User_history.objects.annotate(fieldsum=F('user_breakfast') + F('user_lunch') + F('user_dinner')).order_by('fieldsum')
    serializer = HistorySerializer(history, many=True)
    return Response(serializer.data)
    

