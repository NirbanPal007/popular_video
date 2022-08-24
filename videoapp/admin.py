from django.contrib import admin
from videoapp.models import *

# Register your models here.
# admin.site.register(PopularVideosPlaylist)
admin.site.register(PopularVideo)
admin.site.register(Course)
class PopularVideosPlaylistAdmin(admin.ModelAdmin):
    readonly_fields = ( 'created_at','updated_at')

admin.site.register(PopularVideosPlaylist,PopularVideosPlaylistAdmin)
    

