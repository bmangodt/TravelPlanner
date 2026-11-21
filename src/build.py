import pathlib
s=pathlib.Path('index.src.html').read_text()
css=pathlib.Path('node_modules/leaflet/dist/leaflet.css').read_text()
js=pathlib.Path('node_modules/leaflet/dist/leaflet.js').read_text()
s=s.replace('/*LEAFLET_CSS*/',css,1).replace('/*LEAFLET_JS*/',js,1)
pathlib.Path('dist/index.html').write_text(s)
for f in ['sw.js','manifest.webmanifest']: pathlib.Path('dist/'+f).write_text(pathlib.Path(f).read_text())
