from xml.etree.ElementTree import Comment
from django.db import reset_queries
from django.http import JsonResponse
from django.shortcuts import redirect, render,HttpResponse
from videoapp.models import PopularVideosPlaylist,PopularVideo
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
import json

# Create your views here.
def add(request):
    playdict={
        'playlist':'',
    }
    context = {
        'tech':playdict,
    }
    return render(request,'index.html',context)
def modify(request,id):
    tech = PopularVideosPlaylist.objects.filter(id = id)
    video = PopularVideo.objects.filter(popular_videos_playlist_id = id)
    context = {
        'tech':tech,
        'video':video,
    }
    return render(request,'index.html',context)

# def adding(request):
#     if request.method == 'POST':
#         playlist_name = request.POST.get('title')
#         description = request.POST.get('comment')

#         tech = PopularVideosPlaylist(
#             playlist_name = playlist_name,
#             description = description
#         )

#         tech.save()
#         return redirect('index1')
#     return render(request,'index1.html')

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

@csrf_exempt
def add_playlist(request):
    # Function to add video playlist and video to the database

    updated_by = request.POST.get('updated_by')
    courses = request.POST.get('courses')
    ptitle = request.POST.get('ptitle')
    pdesc = request.POST.get('pdesc')
    videos = request.POST.get('videos')

    # create the PopularVideoPlaylist object
    play = PopularVideosPlaylist.objects.update_or_create(playlist_name=ptitle, description=pdesc, updated_by=updated_by)

    # For loop to add the course as a m2m object
    for i in courses:
        play.courses.add(i)

    # Fetches the ID of the Model object that was created above
    playlist_id = play.pk
    # import pdb; pdb.set_trace()

    video_dict = json.loads(videos)

    # Loop to add all videos to the PopularVideo model
    for i in video_dict:

        # name and key are the values from the dict to create the model object
        name = i.get('viname')
        key = i.get('ykey')
        order = i.get('orderno')
        vid = PopularVideo(video_name=name, video_key=key, order_no=order,popular_videos_playlist_id=playlist_id)
        vid.save()
        # import pdb; pdb.set_trace()
    messages.add_message(request, messages.INFO, 'Data added SUCCESSFULLY!')
    return redirect('index1')

     



















