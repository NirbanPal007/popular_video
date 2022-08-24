from django.contrib import admin
from django.urls import path,include
from videoapp import views

urlpatterns = [
   
    path('',views.index,name="index1"),
    path('add', views.add,name="add"),
    path('modify', views.add,name="modify"),
    path('add/adding/', views.adding,name="adding"),
    path('delete/<int:id>/',views.delete,name="delete"),
    path('deleteselected',views.deleteselected,name="deleteselected"),

]