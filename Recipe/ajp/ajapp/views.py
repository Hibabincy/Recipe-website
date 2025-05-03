from django.shortcuts import render
from . models import item_tbl

# Create your views here.
def index(request):
    return render(request,'index.html')

def additem(request):
  if request.method=='POST':
    ttl=request.POST.get('title')
    ds=request.POST.get('des')
    lst=request.POST.get('l1')
    imag=request.FILES.get('im')
    in1=request.POST.get('in1')
    in2=request.POST.get('in2')
    in3=request.POST.get('in3') 
    obj=item_tbl.objects.create(ttl=ttl,pim=imag,ds=ds,lst=lst,in1=in1,in2=in2,in3=in3)
    obj.save()
    return render(request,'items.html',{'msg':'details uploaded..'})
  return render(request,"items.html") 

def search(request):
    if request.method=='POST':
        rk=request.POST['rk']
        rk=str(rk)
        rk=rk.lower()
        rob=item_tbl.objects.filter(lst=rk)
        return render(request,"oneitem.html",{"recipe":rob})
    return render(request,"oneitem.html")

def cards(request):
    cd=item_tbl.objects.all().order_by('-id')
    return render(request,'cards.html',{"data":cd})



         