# 🔍 Buscador con Pagefind

Esta es una implementación de [Pagefind](https://pagefind.app/), un motor de búsqueda estático para Astro.

## 📍 Ubicaciones

- **Página de búsqueda**: `/buscar`
- **Componentes**: 
  - `src/components/PagefindUI.astro` - Interfaz de búsqueda
  - `src/components/SearchButton.astro` - Botón para agregar al navbar
- **Configuración**: `pagefind.json`

## 🔧 Configuración

El archivo `pagefind.json` controla la indexación:

```json
{
  "site": "dist",
  "output_subdir": "pagefind",
  "exclude_selectors": [".no-search"]
}
```

### Parámetros

| Parámetro | Descripción |
|-----------|------------|
| `site` | Carpeta del sitio estático compilado |
| `output_subdir` | Subcarpeta donde Pagefind genera el buscador |
| `exclude_selectors` | Elementos adicionales que no se indexan |

## 🚀 Uso

### Compilar y Generar Índice

```bash
npm run build
```

Esto:
1. Compila el sitio con Astro
2. Ejecuta Pagefind para indexar el contenido
3. Genera archivos en `dist/_pagefind/`

### Desarrollo

```bash
npm run dev
```

**Nota**: `astro dev` no genera el índice. Para probar la búsqueda localmente, ejecuta primero `npm run build` y después `npm run preview`.

## 🎯 Personalización

### Agregar Botón de Búsqueda al Navbar

En `src/components/Navbar.astro`:

```astro
---
import SearchButton from '@components/SearchButton.astro';
---

<!-- En tu navbar -->
<SearchButton />
```

### Excluir Contenido de la Búsqueda

Agrega la clase `no-search` a cualquier elemento que no quieras indexar:

```astro
<div class="no-search">
  Este contenido no aparecerá en los resultados de búsqueda
</div>
```

## 📊 Información de Índices

- **Ubicación**: `/dist/pagefind/`
- **Archivos generados**:
  - `pagefind-component-ui.css` - Estilos
  - `pagefind-component-ui.js` - Interfaz
  - `pagefind.js` - Motor de búsqueda
  - `index.*.pf` - Índices de búsqueda

## 🔗 Recursos

- [Documentación de Pagefind](https://pagefind.app/docs/)
- [Integración con Astro](https://pagefind.app/docs/running-pagefind/)
- [Configuración avanzada](https://pagefind.app/docs/config/)
