from ctypes.wintypes import tagMSG
from datetime import date
from time import time
from turtle import title
from venv import create
import graphene
from graphene_django import DjangoObjectType
from .models import Post
import graphql_jwt
from graphql_jwt.decorators import login_required
from django.contrib.auth import get_user_model

class PostType(DjangoObjectType):
    class Meta:
        model = Post
        # fields=("id","title","tag","date")
                                           #removed to use user

class UserType(DjangoObjectType):
    class Meta:
        model=get_user_model()

class CreateUser(graphene.Mutation):
    user=graphene.Field(UserType)

    class Arguments:
        username=graphene.String(required=True)
        password=graphene.String(required=True)

    def mutate(self,info,username,password):
        user=get_user_model()(username=username)
        user.set_password(password)
        user.save()
        return CreateUser(user=user)


class Query(graphene.ObjectType):
    posts = graphene.List(PostType)
    post=graphene.Field(PostType,tag=graphene.String())
    user=graphene.Field(UserType)
    
    @login_required
    
    def resolve_posts(root,info):
        user = info.context.user
        return Post.objects.filter(user=user).order_by("-id")
    @login_required
    def resolve_post(root, info, tag):  #to be used
        user = info.context.user
        return Post.objects.get(tag)

    @login_required
    def resolve_user(self, info):
        user = info.context.user    #to be used
        if user.is_anonymous:
            raise Exception("Login Required")
        return user

# POST MUTATIONS

class PostInput(graphene.InputObjectType):
    id = graphene.ID()
    tag = graphene.String()
    title = graphene.String()

class CreatePost(graphene.Mutation):
    id=graphene.ID()
    tag = graphene.String()
    title=graphene.String()
    time=graphene.DateTime()
    
    class Arguments:
        tag=graphene.String()
        title=graphene.String()
        time=graphene.DateTime()


    @login_required
    def mutate(root, info, tag,title):
            user=info.context.user
            if user.is_anonymous :
                raise Exception("Not logged in!")
            post=Post(
            user=user,
            tag=tag,
            title=title,
            )
            post.save()

            return CreatePost(
                id=post.id,
                tag=post.tag,
                title=post.title,
            )

class UpdatePost(graphene.Mutation):
        post=graphene.Field(PostType)
    
    
        class Arguments:                #not used yet
            id=graphene.ID(required=True)
            tag=graphene.String()
            title=graphene.String()

        @login_required
        def mutate(root, info,tag,title,id):
            user=info.context.user
            if (user!=post.user):
                raise Exception ("It's not your post")
            post = Post.objects.get(id=id)

            if post:
                post.tag = tag
                post.title = title
                post.save()

                return UpdatePost(id=post.id,
                    tag=post.tag,
                    title=post.title,
                    )
            

class DeletePost(graphene.Mutation):
    class Arguments:                #not used yet
        id = graphene.ID()

    Post = graphene.Field(PostType)

    @login_required
    def mutate(root, info, id):
        user=info.context.user
        if (user!=post.user):
            raise Exception("Not  your post")

        post = Post.objects.get(id=id)
        post.delete()

        return None
    
    #END POST MUTATIONS

class Mutation(graphene.ObjectType):
    create_post=CreatePost.Field()
    update_post=UpdatePost.Field()
    delete_post=DeletePost.Field()
    create_user=CreateUser.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

schema = graphene.Schema(query=Query,mutation=Mutation)
