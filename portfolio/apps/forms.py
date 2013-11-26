from django import forms

class CssForm(forms.Form):
    width = forms.IntegerField(required=False)
    height = forms.IntegerField(required=False)
    left = forms.IntegerField(required=False)
    top = forms.IntegerField(required=False)

class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField()