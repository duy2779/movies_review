from django.shortcuts import render


def home(request):
    page_title = "Home"
    context = {'page_title': page_title}
    return render(request, 'core/home.html', context)
