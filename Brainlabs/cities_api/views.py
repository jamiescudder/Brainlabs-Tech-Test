from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# from django.views.decorators.csrf import csrf_exempt
from django.core import serializers


# Create your views here.
def capital_cities(request):
	return render(request, 'cities.html')