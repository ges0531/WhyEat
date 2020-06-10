# from django.urls import path, include
# from rest_framework.urlpatterns import format_suffix_patterns
# from .views import UserView

# user_list = UserView.as_view({
#     'post': 'create',
#     'get': 'list'
# })
# # post_detail = UserView.as_view({
# #     'get': 'retrieve',
# #     'put': 'update',
# #     'patch': 'partial_update',
# #     'delete': 'destroy'
# # })
# urlpatterns = format_suffix_patterns([
#     path('auth/', include('rest_framework.urls', namespace='rest_framework')),
#     path('users/', user_list, name='user_list'),
#     # path('posts/<int:pk>/', post_detail, name='post_detail'),
# ])

from django.conf.urls import url, include
from django.urls import path
from . import views
# from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'user', views.UserView)

urlpatterns = [
    url('api-auth/', include('rest_framework.urls')),
    url(r'^user_exist/(?P<kakao_id>[\w.@+-]+)/$', views.UserExistsView.as_view(), name='user_exist'),
    path('rank_list/', views.rank_list),
    path('user_list/', views.user_list),
    path('user_detail/<int:kakao_id>/', views.user_detail),
    path('history_list/', views.history_list),
    path('history_detail/<int:history_pk>/', views.history_detail),
    # url(r'^', include(router.urls)),
    # url(r'^$', views.UserView.as_view(), name='user'),
    # url(r'^user_list/$', views.UserView.as_view(), name='user_list'),
    # url(r'^user_create/$', views.UserViewCreate.as_view(), name='user_create'),
    # url(r'^user_list/(?P<id>\d+)/$', views.UserViewDetail.as_view(), name='user_detail'),
    # url(r'^user_list/(?P<id>\d+)/update$', views.UserViewUpdate.as_view(), name='user_update'),
    # url(r'^user_list/(?P<id>\d+)/delete$', views.UserViewDelete.as_view(), name='user_delete'),
    # url(r'^rank_list/$', views.RankView.as_view(), name='rank'),
    # url(r'^user_history_list/(?P<user_id>\d+)/$', views.HistroyView.as_view(), name='user_history'),
    # url(r'^user_history_create/(?P<user_id>\d+)/$', views.HistroyViewCreate.as_view(), name='user_history_create'),
    # url(r'^user_history_list/(?P<user_id>\d+)/(?P<id>\d+)/update$', views.HistoryViewUpdate.as_view(), name='user_history_update'),
    # url(r'^user_history_list/(?P<user_id>\d+)/(?P<id>\d+)/delete$', views.HistroyViewDelete.as_view(), name='user_history_delete'),
]

# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)