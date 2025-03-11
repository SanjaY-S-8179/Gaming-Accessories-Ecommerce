from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse({"message": "Login successful", "user": user.username})
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)

@csrf_exempt
def user_logout(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully"})

def user_details(request):
    if request.user.is_authenticated:
        return JsonResponse({"username": request.user.username, "email": request.user.email})
    else:
        return JsonResponse({"error": "Not authenticated"}, status=401)
