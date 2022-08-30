from django.http import JsonResponse
from django.shortcuts import redirect, render,HttpResponse
from videoapp.models import PopularVideosPlaylist,PopularVideo,Course
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
import json
from videoapp.models import PopularVideosPlaylist,PopularVideo, Course
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
import json, time

# Create your views here.

def add(request):
    playdict={
        'playlist':'',
    }
    course_list = Course.objects.all().values('id', 'name').order_by('id')
    # import pdb; pdb.set_trace()
    context = {
        'tech':playdict,
        'courses' : course_list
    }
    # import pdb; pdb.set_trace()
    return render(request,'index.html',context)
def modify(request,id):
    course_list = Course.objects.all().values('id', 'name').order_by('id')
  
    tech = PopularVideosPlaylist.objects.filter(id = id)
    selected_courses=PopularVideosPlaylist.objects.filter(id = id).values('courses')
    video = PopularVideo.objects.filter(popular_videos_playlist_id = id)
    context = {
        'tech':tech,
        'video':video,
        'courses' : course_list,
        'presentcourses': selected_courses
    }
    # import pdb; pdb.set_trace()

    return render(request,'update.html',context)

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

    return redirect('videoapp:index1')


    
    
def deleteselected(request):
    if request.method == 'POST':
        id_list = request.POST.getlist('boxes')
        # for x in id_list:
        #     tech = PopularVideosPlaylist.objects.filter(id = int(x))
        #     tech.delete()
        PopularVideosPlaylist.objects.filter(id__in=id_list).delete()
    return redirect('videoapp:index1')  


# for updating
@csrf_exempt
def update_playlist_fresh(request, id):
    print("This is update function")
    # Function to modify video playlist and video to the database
    playlist_id = request.POST.get('id')
    updated_by = request.POST.get('updated_by')
    courses = request.POST.get('courses')
    ptitle = request.POST.get('ptitle')
    pdesc = request.POST.get('pdesc')
    videos = request.POST.get('videos')


    # create the PopularVideoPlaylist object
    

    entry=PopularVideosPlaylist.objects.filter(id=playlist_id).update(playlist_name=ptitle, description=pdesc, updated_by=updated_by)
   
    # Fetches the ID of the Model object that was created above  
    video_dict = json.loads(videos)

    # Loop to add all videos to the PopularVideo model
    for i in video_dict:

        # name and key are the values from the dict to create the model object
        # import pdb; pdb.set_trace()
        existing_videos = PopularVideo.objects.filter(popular_videos_playlist__courses__id = courses)
        name = i.get('viname')
        key = i.get('ykey')
        order = i.get('orderno')
        if not PopularVideo.objects.filter(popular_videos_playlist__courses__id = courses, video_name=name).exists():
            import pdb; pdb.set_trace()
            vid = PopularVideo(video_name=name, video_key=key, order_no=order,popular_videos_playlist_id=playlist_id)
            vid.save()
    messages.add_message(request, messages.INFO, 'Data added SUCCESSFULLY!')
    return redirect('update_playlist')


@csrf_exempt
def add_playlist(request):
    # Function to add video playlist and video to the database

    updated_by = request.POST.get('updated_by')
    courses = request.POST.getlist('course[]')
    ptitle = request.POST.get('ptitle')
    pdesc = request.POST.get('pdesc')
    videos = request.POST.get('videos')

    # create the PopularVideoPlaylist object
    play = PopularVideosPlaylist.objects.create(playlist_name=ptitle, description=pdesc, updated_by=updated_by)

    # import pdb; pdb.set_trace()

    for i in courses:
        course = Course.objects.filter(id=i)
        play.courses.add(*course)
    # Fetches the ID of the Model object that was created above
    playlist_id = play.pk

    video_dict = json.loads(videos)

    # Loop to add all videos to the PopularVideo model
    for i in video_dict:

        # name and key are the values from the dict to create the model object
        name = i.get('viname')
        key = i.get('ykey')
        order = i.get('orderno')
        vid = PopularVideo(video_name=name, video_key=key, order_no=order,popular_videos_playlist_id=playlist_id)
        vid.save()
    messages.add_message(request, messages.INFO, 'Data added SUCCESSFULLY!')
    time.sleep(3)
    return redirect('videoapp:index1')
















