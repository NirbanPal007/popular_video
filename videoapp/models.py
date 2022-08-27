from sqlite3 import Timestamp
from django.db import models
import datetime

# Create your models here.
class Course(models.Model):

     # Model for course or we can say pathways (The grand parent)

    TAGS_CHOICES = (

        ('demo', 'Demo'),

        ('pro', 'Pro'),

        ('classic', 'Classic'),

        ('premium', 'Premium')

    )

    course_unique_id = models.CharField(max_length=255,default='SOME STRING')

    name = models.CharField(max_length=255)

    tag =  models.CharField(max_length=255, choices=TAGS_CHOICES, null=True,blank=True)

    language = models.CharField(max_length=255,default=None, null=True,blank=True)

    is_old_curriculum = models.BooleanField(default=False)

    open_course = models.BooleanField(default=False)

    created_datetime = models.DateTimeField(auto_now_add=True)

    modified_datetime = models.DateTimeField(auto_now=True)

    

    def __str__(self):
        return self.course_unique_id + ": " + self.name



class PopularVideosPlaylist(models.Model):
    playlist_name=models.CharField(max_length=255, null=False, blank=True)
    description=models.TextField(null=False, blank=True)
    # Timestamp
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.CharField(max_length=30,null=False, blank=True)
    courses = models.ManyToManyField(Course)
    # report=models.ForeignKey(Report,on_delete=models.CASCADE)
class PopularVideo(models.Model):
    video_name = models.CharField(max_length=255)
    video_key = models.TextField()
    order_no = models.IntegerField(default=-1)
    popular_videos_playlist  = models.ForeignKey(PopularVideosPlaylist,on_delete=models.CASCADE)





   

    

