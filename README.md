# Accesorios Alma & Vida — Catálogo web

Sitio web estático, adaptable a celular, tablet y computador. Está preparado para publicarse gratis con **GitHub Pages**.

## Archivos
- `index.html`: página principal del catálogo.
- `categoria.html`: plantilla de las categorías; cada opción se abre en una pestaña nueva del navegador y muestra su colección.
- `styles.css`: diseño, colores y adaptación a pantallas.
- `app.js`: filtros, búsqueda, menú móvil y enlaces de consulta.
- `products.js`: lista central donde se agregan los productos.
- `assets/logo-alma-vida.png`: logo proporcionado por la marca, preparado con fondo transparente.
- `assets/referencia-estetica.jpg`: imagen de referencia visual proporcionada.

## Cómo agregar productos
1. Abre `products.js`.
2. Dentro del arreglo `PRODUCTOS`, agrega objetos como este:

```js
{
  id: "cadena-001",
  name: "Nombre del accesorio",
  category: "Cadenas",
  image: "assets/productos/cadena-001.jpg",
  description: "Descripción breve.",
  price: "$45.000",
  oldPrice: "",
  discount: false
}
```

3. Crea la carpeta `assets/productos/` y sube allí las fotografías reales.
4. Guarda los cambios y vuelve a publicar.

Categorías válidas: `Cadenas`, `Ear cuffs`, `Chokers`, `Pulseras`, `Sets`, `Tobilleras`, `Aretes`, `Descuentos`.

Para que un producto aparezca también en la pestaña **Descuentos**, usa `discount: true`. Si tiene precio anterior, completa `oldPrice`.

No agregues información de materiales, precios ni descuentos que no corresponda a la pieza real.

## Navegación por categorías

En la página principal, cada categoría (Cadenas, Ear cuffs, Chokers, Pulseras, Sets, Tobilleras, Aretes y Descuentos) abre una pestaña nueva. Todas usan `categoria.html` con un parámetro de categoría, por lo que no necesitas crear ocho archivos distintos. Los productos se administran desde `products.js` como antes.

## Publicar en GitHub Pages
1. Entra a https://github.com y crea un repositorio nuevo, por ejemplo `alma-vida-catalogo`.
2. Sube **todo el contenido** de esta carpeta al nivel principal del repositorio. Debes ver `index.html` en la raíz, no dentro de otra carpeta.
3. En el repositorio entra a **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Elige la rama `main` y la carpeta `/ (root)`. Pulsa **Save**.
6. Espera a que GitHub Pages termine la publicación. Tu web quedará en una dirección similar a `https://TU-USUARIO.github.io/alma-vida-catalogo/`.

## Contacto configurado
- WhatsApp: +57 300 829 4273
- Instagram: https://www.instagram.com/accesorios_almavida/

## Nota
El catálogo inicia sin productos reales para no inventar referencias, precios o fotografías. Las categorías, búsqueda, menú móvil y estados vacíos ya funcionan. Al agregar productos a `products.js`, las tarjetas y consultas de WhatsApp se generan automáticamente.
