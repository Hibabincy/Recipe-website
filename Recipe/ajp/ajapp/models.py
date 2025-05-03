from django.db import models

# Create your models here.

class item_tbl(models.Model):
    pim=models.FileField(upload_to='pic')
    ttl=models.CharField(max_length=25,default=0)
    ds=models.TextField()
    lst=models.TextField()
    in1=models.CharField(max_length=25)
    in2=models.CharField(max_length=25)
    in3=models.CharField(max_length=25)  

    