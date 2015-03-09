from rest_framework.response import Response
from rest_framework import status
from subcategory.models import Addon
from subcategory.serializers import AddonSerializer
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView

# Create your views here.


class AddonListAPIView(ListAPIView):
    """
    List all Addons for current user.

    """
    serializer_class = AddonSerializer

    def get_queryset(self):
        """
        Retrieves all Addons for current user.

        """
        user = self.request.user
        return Addon.objects.filter(user=user)


class AddonCreateAPIVIew(CreateAPIView):
    """
    Creates a single Addon for current user.

    """
    serializer_class = AddonSerializer

    def post(self, request, *args, **kwargs):
        """
        Creates a record of an Addon for current user.

        """
        serializer = AddonSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"msg": "Addon Info Created"}, status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class AddonUpdateAPIView(UpdateAPIView):
    """
    Updates a single record for Addon

    """
    serializer_class = AddonSerializer

    def patch(self, request, id, *args, **kwargs):
        """
        Updates record for a single Addon, ID is taken from the URL.

        """
        snippet = Addon.objects.get(pk=id)
        serializer = AddonSerializer(snippet, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Addon Info Updated"}, status=status.HTTP_204_NO_CONTENT)

        else:
            return Response({"msg": "This Addon Info does not exist"},status=status.HTTP_404_NOT_FOUND)


class AddonDestroyAPIView(DestroyAPIView):
    serializer_class = AddonSerializer

    def delete(self, request, id, *args, **kwargs):
        """
        Deletes a single addon from the table.  ID is taken from the URL.
        """
        snippet = Addon.objects.get(pk=id)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)





