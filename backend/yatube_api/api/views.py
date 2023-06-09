from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework import filters
from rest_framework import mixins
from rest_framework import permissions
from djoser.views import UserViewSet
from rest_framework.pagination import LimitOffsetPagination

from .serializers import (
    CustomUserCreateSerializer, CustomUserSerializer, PostSerializer, CommentSerializer,
    FollowSerializer
)
from .permissions import IsAuthorOrReadOnly
from posts.models import Post
from .filters import PostFilter


class GetAndPostViewSet(mixins.CreateModelMixin, mixins.ListModelMixin,
                        viewsets.GenericViewSet):
    pass


class CustomUserViewSet(UserViewSet):

    def get_serializer_class(self):
        if self.action == 'create':
            return CustomUserCreateSerializer
        # elif self.action == 'set_password':
        #     return CustomPasswordSerializer
        # elif self.action == 'set_username':
        #     return serializers.SetUsernameSerializer
        # elif self.action == 'set_email':
        #     return SetEmailSerializer
        return CustomUserSerializer

    # def get_permissions(self):
    #     if self.action == 'set_email':
    #         self.permission_classes = [permissions.CurrentUserOrAdmin]
    #     return super().get_permissions()

    # def get_queryset(self):
    #     return CustomUser.objects.all()

    # @action(['post'], detail=False, url_path='set_email')
    # def set_email(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     user = self.request.user
    #     new_email = serializer.data['new_email']

    #     setattr(user, 'email', new_email)
    #     user.save()

    #     return Response(status=status.HTTP_204_NO_CONTENT)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filterset_class = PostFilter
    filter_backends = (DjangoFilterBackend,)
    permission_classes = [IsAuthorOrReadOnly]
    pagination_class = LimitOffsetPagination

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthorOrReadOnly]

    def get_post(self):
        return get_object_or_404(Post, id=self.kwargs.get('post_id'))

    def perform_create(self, serializer):
        post = Post.objects.get(id=self.kwargs.get('post_id'))
        post.comment_count = post.comment_count + 1
        post.save()
        serializer.save(author=self.request.user, post=self.get_post())

    def get_queryset(self):
        return self.get_post().comments.all()


class FollowViewSet(GetAndPostViewSet):
    serializer_class = FollowSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('following__username',)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.request.user.follower.all()
