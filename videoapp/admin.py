from django.contrib import admin
from videoapp.models import *

# Register your models here.
# admin.site.register(PopularVideosPlaylist)
class PopularVideosPlaylistAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at','updated_at')
    list_display = ('id', 'playlist_name', 'description', 'updated_by')

class PopularVideoAdmin(admin.ModelAdmin):
    list_display = ('id', 'video_name', 'video_key')

class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'tag', 'language')

admin.site.register(PopularVideosPlaylist,PopularVideosPlaylistAdmin)
admin.site.register(PopularVideo,PopularVideoAdmin)
admin.site.register(Course, CourseAdmin)
    

