# Front para probar un login con express y passport-jwt

Generar un archivo .env con la siguiente estructura y agregar la URL del backend.

```
NEXT_PUBLIC_API_URL=
```

hacer el npm install para instalar las dependencias. Luego npm run dev.

> [!IMPORTANT]
>
> Si el backend esta corriendo en local el puerto debe ser diferente al 3000 porque next despliega en el 3000.
>
> Acomodar cada ruta de los formularios y del contexto para que funcione con la estructura de su backend.
>
> ejemplo:
>
> `<form onSubmit={handleSubmit(onSubmit)} action={`${API_URL}/api/session/login `} method="post">`
>
> Cambiar despues de `${API_URL}` a las rutas predeterminadas por su backend.
