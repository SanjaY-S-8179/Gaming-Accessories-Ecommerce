from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# Simple home view
def home(request):
    return HttpResponse("Welcome to the Gaming Accessories Ecommerce Platform!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),  # Add this line for the homepage
    path('api/', include('store.urls')),  # API Routes
]


