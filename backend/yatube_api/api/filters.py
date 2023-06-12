from django_filters import AllValuesMultipleFilter, FilterSet

from posts.models import Post


class PostFilter(FilterSet):
    author = AllValuesMultipleFilter(
        field_name='author__email',
        conjoined=True
    )

    class Meta:
        model = Post
        fields = ('author', )