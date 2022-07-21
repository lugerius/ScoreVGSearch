# ScoreVG Search

Aprovechando el trabajo de recapitulación que se hizo en los foros de scorevg, me dispuse a desarrollar un pequeño buscador de tracks.

Pueden verlo y usarlo desde:
http://scorevg.uk.to

Está optimizado también para usarse desde dispositivos móviles. Aunque el widget de soundcloud en la versión móvil manda una pantalla donde pregunta donde queremos escucharlo, eligiendo "escuchar en el navegador" funciona correctamente.

Ya están integrados todos los episodios a la base de datos y el player es totalmente funcional.

Por la naturaleza del proyecto de recapitulación que fue de manera colaboratva, existen algunos errores en los tiempos de sincronización con los tracks, información faltante, etc. Ahora utilizando el propio ScoreVGSearch Player es mucho mas fácil de identificarlos. 

Si quieres ayudar a completar y corregir la información puedes hacerlo editando

https://docs.google.com/spreadsheets/d/1bRWjQyTQKgawnczJE2HBcyUP0cqA0EGWv-EszGgJS_I/edit?usp=sharing

o bien descargando y actualizando el archivo

js/scorevg.json

# Para usarlo como aplicación en dispositivos móviles. 

Abrir la página en el navegador.
En opciones click en añadir a pantalla de inicio.

# Sugerencias

Ahora es mucho más fácil migrar la información ya sea del archivo de hoja de cálculo o del propio JSON a una base de datos (SQL). Este cambio requeriría cambiar un poco el js/engine.js para adaptar la forma en como obtiene los datos.
