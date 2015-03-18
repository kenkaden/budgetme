from rest_framework.response import Response
from rest_framework import status
from baseinfo.models import BasicInfo, PercentInfo
from baseinfo.serializers import BasicInfoSerializer, PercentInfoSerializer, UserSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView, CreateAPIView, ListAPIView
from django.contrib.auth.models import User

# Create your views here.


class BasicInfoListAPIView(ListAPIView):
    """
    List basic information of current user

    """
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        """
        Retrieves username and id for current logged in user.

        """
        queryset = User.objects.get(pk=request.user.id)
        serializer = UserSerializer(queryset)

        return Response(serializer.data, status=status.HTTP_200_OK)


class BasicInfoCreateAPIView(CreateAPIView):
    """
    Create class for Basic Information

    """
    serializer_class = BasicInfoSerializer

    def post(self, request, *args, **kwargs):
        """
        Posts basic information with user tagged to current logged in user.

        """
        serializer = BasicInfoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"msg": "Basic Info Created"}, status=status.HTTP_200_OK)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class BasicInfoRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    Basic Information Retrieve, Update and Destroy Class

    """

    serializer_class = BasicInfoSerializer
    queryset = BasicInfo.objects.all()

    def get(self, request, *args, **kwargs):
        """
        Retrieves a single record for the user's basic information.

        """
        queryset = BasicInfo.objects.get(user=request.user)
        serializer = BasicInfoSerializer(queryset)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        """
        Updates all fields that have been altered for user's basic information.

        """
        snippet = BasicInfo.objects.get(user=request.user)
        serializer = BasicInfoSerializer(snippet, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Basic Info updated"}, status=status.HTTP_204_NO_CONTENT)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        """
        Deletes user basic information from database.

        """
        snippet = BasicInfo.objects.get(user=request.user)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PercentInfoListAPIView(ListAPIView):
    """
    List percentage of income split of current user

    """
    serializer_class = PercentInfoSerializer

    def get_queryset(self):
        """
        Retrieves percentages for current logged in user.

        """
        user = self.request.user
        return PercentInfo.objects.filter(user=user)


class PercentInfoCreateAPIView(CreateAPIView):
    """
    Create Class for User Percentage Information.

    """
    serializer_class = PercentInfoSerializer

    def post(self, request, *args, **kwargs):
        """
        Creates record of percentages to use for calculation.

        """
        serializer = PercentInfoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"msg": "Percentage Info Created"}, status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PercentInfoRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    User Percentage Retrieve, Update and Destroy API.

    """
    serializer_class = PercentInfoSerializer
    queryset = PercentInfo.objects.all()

    def get(self, request, *args, **kwargs):
        """
        Retrieves a single record for the current user's percentages

        """
        queryset = PercentInfo.objects.get(user=request.user)
        serializer = PercentInfoSerializer(queryset)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        """
        Updates all altered fields for percentages.

        """
        snippet = PercentInfo.objects.get(user=request.user)
        serializer = PercentInfoSerializer(snippet, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Percentage Info updated"}, status=status.HTTP_204_NO_CONTENT)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        """
        Deletes current user's percentages record from the table.

        """
        snippet = PercentInfo.objects.get(user=request.user)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
