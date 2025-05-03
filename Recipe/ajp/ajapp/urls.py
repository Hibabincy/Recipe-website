from django.urls import path
from . import views
urlpatterns = [
    path('', views.index),
    path('cds',views.cards),
    path('add',views.additem),
    path('srch',views.search),
    
]
