from socket import fromshare
from django import forms 


Course_Choices=(
    ("1","WBCS Pro"),
    ("2", "SSC Pro"),
    ("3","PSc Pro"),
)

class EditForm(forms.Form):
    title=forms.CharField(max_length=255,required=True)
    description= forms.CharField(widget=forms.Textarea, required=True)
    courses= forms.ChoiceField(choices=Course_Choices)