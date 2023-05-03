from django.urls import path
from django.urls import path, include
from rest_framework import routers
from api.views import PostViewSet, CommentViewSet, FollowViewSet, CustomUserViewSet


router_v1 = routers.DefaultRouter()

router_v1.register(r'posts', PostViewSet, basename='posts')
router_v1.register(r'follow', FollowViewSet, basename='follow')
router_v1.register(
    r'posts/(?P<post_id>\d+)/comments',
    CommentViewSet,
    basename='comments'
)
router_v1.register(
    r'users',
    CustomUserViewSet,
    basename='users'
)


urlpatterns = [
    path('v1/auth/', include('djoser.urls.authtoken')),
    path('v1/', include(router_v1.urls)),
    path('v1/', include('djoser.urls.base')),
]
