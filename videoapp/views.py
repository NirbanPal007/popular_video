from xml.etree.ElementTree import Comment
from django.db import reset_queries
from django.http import JsonResponse
from django.shortcuts import redirect, render,HttpResponse
from videoapp.models import PopularVideosPlaylist,PopularVideo

# Create your views here.
def add(request):
    return render(request,'index.html')
def modify(request):
    return render(request,'index.html')

def adding(request):
    if request.method == 'POST':
        playlist_name = request.POST.get('title')
        description = request.POST.get('comment')

        tech = PopularVideosPlaylist(
            playlist_name = playlist_name,
            description = description
        )

        tech.save()
        return redirect('index1')
    return render(request,'index1.html')

def index(request):
    tech = PopularVideosPlaylist.objects.all()
    context = {
        'tech':tech,
    }
    return render(request,'index1.html',context)


def delete(request,id):
    tech = PopularVideosPlaylist.objects.filter(id = id)
    tech.delete()

    return redirect('index1')


    
    
def deleteselected(request):
    if request.method == 'POST':
        id_list = request.POST.getlist('boxes')
        # for x in id_list:
        #     tech = PopularVideosPlaylist.objects.filter(id = int(x))
        #     tech.delete()
        PopularVideosPlaylist.objects.filter(id__in=id_list).delete()
    return redirect('index1')  

     



















