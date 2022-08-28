from django.contrib import admin
from django.urls import path,include
from videoapp import views

urlpatterns = [
   
    path('',views.index,name="index1"),
    path('add', views.add,name="add"),
    path('modify/<int:id>/', views.modify,name="modify"),
    # path('add/adding/', views.adding,name="adding"),
    path('delete/<int:id>/',views.delete,name="delete"),
    path('deleteselected',views.deleteselected,name="deleteselected"),              
    path('add_playlist', views.add_playlist, name='add_playlist'),
    path('modify/<int:id>/update_playlist', views.update_playlist, name='update_playlist'),
    # path('add_playlist', views.add_playlist, name='add_playlist'),
]