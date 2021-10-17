# NodePopFrontend

## Flujo

En la aplicación de Nodepop hemos creado un usuario admin con contraseña admin a quien le pertenecen los anuncios, por lo tanto, si estamos logeados podremos borrarlos.

Si no estamos logeados, en index (donde se muestran los anuncios) podremos iniciar sesión directamente desde el botón login ubicado en la parte superior derecha.
Si la sesión ya esta iniciada el botón para iniciar sesión no saldrá.

Si accedemos al login y no tenemos cuenta podremos crearla, una vez creada y la sesión iniciada podremos acceder al index y crear anuncios. 
Este botón, si no estamos logeados no nos dejara crear anuncios sinó que nos redirigira a iniciar sesión.

Si tenemos la sesión iniciada y nos pertenece el anuncio podremos borrarlo cuando entremos al detalle a través de un botón.
