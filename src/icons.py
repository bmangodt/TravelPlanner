from PIL import Image, ImageDraw
def icon(n,path,pad=0):
    S=n*4; im=Image.new('RGB',(S,S),'#6C8E4E'); d=ImageDraw.Draw(im)
    d.ellipse([S*.56,S*.16,S*.84,S*.44],fill='#E07A9A')            # zon
    w=int(S*.055)
    pts=[(S*.2,S*.8),(S*.42,S*.62),(S*.36,S*.48),(S*.6,S*.56),(S*.78,S*.72)]
    for a,b in zip(pts,pts[1:]):
        # streepjeslijn
        import math
        L=math.dist(a,b); k=int(L/(S*.06))
        for i in range(0,k,2):
            p=(a[0]+(b[0]-a[0])*i/k,a[1]+(b[1]-a[1])*i/k); q=(a[0]+(b[0]-a[0])*(i+1)/k,a[1]+(b[1]-a[1])*(i+1)/k)
            d.line([p,q],fill='#F9F2EA',width=w)
    for p in (pts[0],pts[-1]):
        r=S*.06; d.ellipse([p[0]-r,p[1]-r,p[0]+r,p[1]+r],fill='#ffffff')
    im.resize((n,n),Image.LANCZOS).save(path)
icon(180,'dist/apple-touch-icon.png'); icon(192,'dist/icon-192.png'); icon(512,'dist/icon-512.png')
