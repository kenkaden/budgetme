from rest_framework.response import Response
from rest_framework import status
from expense.models import Envelope, Receipt
from baseinfo.models import BasicInfo
from expense.serializers import EnvelopeSerializer, ReceiptSerializer
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
import datetime

# Create your views here.


class EnvelopeListAPIView(ListAPIView):
    """
    List all envelopes created by current user.

    """
    serializer_class = EnvelopeSerializer

    def get_queryset(self):
        """
        Retrieves all envelopes for current user.

        """
        user = self.request.user
        return Envelope.objects.filter(user=user)


class EnvelopeCreateAPIView(CreateAPIView):
    """
    Create an envelope

    """
    serializer_class = EnvelopeSerializer

    def post(self, request, *args, **kwargs):
        """
        Post a single record for Envelope

        """
        serializer = EnvelopeSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)

            return Response({"msg": "Envelope Created"}, status=status.HTTP_200_OK)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EnvelopeUpdateAPIView(UpdateAPIView):
    """
    Updates a single record for Envelope.

    """
    serializer_class = EnvelopeSerializer

    def patch(self, request, id, *args, **kwargs):
        """
        Updates single envelope, takes in ID from url request.

        """
        snippet = Envelope.objects.get(pk=id)
        serializer = EnvelopeSerializer(snippet, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"msg": "Envelope is updated"}, status=status.HTTP_204_NO_CONTENT)

        else:
            return Response({"msg": "Envelope does not exist"}, status=status.HTTP_404_NOT_FOUND)


class EnvelopeDestroyAPIView(DestroyAPIView):
    """
    Destroy Class for Receipt

    """
    serializer_class = EnvelopeSerializer

    def delete(self, request, id, *args, **kwargs):
        """
        Delete a single record for envelope, takes in ID from url request.

        """
        snippet = Envelope.objects.get(pk=id)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReceiptListAPIView(ListAPIView):
    """
    List all receipts for current user.

    """
    serializer_class = ReceiptSerializer

    def get_queryset(self):
        """
        Retrieves all receipts for current logged in user.

        """
        month = datetime.datetime.now().month
        year = datetime.datetime.now().year
        user = self.request.user
        return Receipt.objects.filter(user=user, date__month=month, date__year=year)

class ExpenseListAPIView(ListAPIView):
    """
    List all receipts for current user.

    """
    serializer_class = ReceiptSerializer

    def get(self, request, *args, **kwargs):
        """
        Retrieves all expenses and envelope amount for the month for table by categories for current logged in user.

        """
        month = datetime.datetime.now().month
        year = datetime.datetime.now().year
        data_d = {}
        for e in Envelope.objects.filter(user=request.user.id):
            data_dict = {
                "id": e.id,
                "name": e.name,
                "amount": e.amount,
                "spent": 0,
            }
            data_d[e.name] = data_dict

        for r in Receipt.objects.filter(user=request.user.id, date__month=month, date__year=year):
            if (r.envelope.name not in data_d):
                data_d[r.envelope.name] = data_dict
            data_d[r.envelope.name]["spent"] += r.amount

        for e in Envelope.objects.filter(user=request.user.id):
            if (e.name not in data_d):
                data_d[e.name] = {"id": e.id, "key": e.name, "amount": e.amount, "spent": 0}

        data = data_d.values()

        return Response(data, status=status.HTTP_200_OK)

        # data = {}
        # for e in Envelope.objects.filter(user=request.user.id):
        #     data[e.name] = [e.amount, 0]
        #
        # for r in Receipt.objects.filter(user=request.user.id):
        #     data[r.envelope.name][1] += r.amount
        #
        # return Response(data, status=status.HTTP_200_OK)


class ReceiptCreateAPIView(CreateAPIView):
    """
    Create Class for Receipt.

    """
    serializer_class = ReceiptSerializer

    def post(self, request, *args, **kwargs):
        """
        Post a single record for Receipt.

        """

        serializer = ReceiptSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReceiptUpdateAPIView(UpdateAPIView):
    """
    Updates a single record for Receipt.

    """
    serializer_class = ReceiptSerializer

    def patch(self, request, id, *args, **kwargs):
        """
        Updates single receipt, takes in ID from url request.

        """
        snippet = Receipt.objects.get(pk=id)
        serializer = ReceiptSerializer(snippet, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"msg": "Receipt is updated"}, status=status.HTTP_204_NO_CONTENT)

        else:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class ReceiptDestroyAPIView(DestroyAPIView):
    """
    Destroy Class for Receipt

    """
    serializer_class = ReceiptSerializer

    def delete(self, request, id, *args, **kwargs):
        """
        Delete a single record for receipt, takes in ID from url request.

        """
        snippet = Receipt.objects.get(pk=id)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GraphListAPIView(ListAPIView):
    """
    List all receipts for current user.

    """
    serializer_class = ReceiptSerializer

    def get(self, request, *args, **kwargs):
        """
        Retrieves all expenses for the month for graphing by categories for current logged in user.

        """
        month = datetime.datetime.now().month
        year = datetime.datetime.now().year
        data_d = {}
        total_spent = 0;
        flex_money = (BasicInfo.objects.get(user=request.user.id)).flex_money

        for r in Receipt.objects.filter(user=request.user.id, date__month=month, date__year=year):
            if (r.envelope.name not in data_d):
                data_dict = {
                    "key": r.envelope.name,
                    "y": 0
                }
                data_d[r.envelope.name] = data_dict
                data_dict['y'] += r.amount

            else:
                data_d[r.envelope.name]['y'] += r.amount

            total_spent += r.amount

        for e in Envelope.objects.filter(user=request.user.id):
            if (e.name not in data_d):
                data_d[e.name] = {"key": e.name, "y": e.amount}

        leftover = flex_money - total_spent
        data_d["flex"] = {"key": "Flex Money", "y": leftover}
        data = data_d.values()

        return Response(data, status=status.HTTP_200_OK)

class OldReceiptListAPIView(ListAPIView):
    """
    List all receipts for current user.

    """
    serializer_class = ReceiptSerializer

    def get_queryset(self):
        """
        Retrieves all receipts for current logged in user.

        """
        user = self.request.user
        return Receipt.objects.filter(user=user, date__gte=datetime.date(2013, 1, 1),
                                      date__lte=datetime.date(3000, 12, 31))