# Actualizar precios en Stripe

Los precios mostrados en la app han cambiado. Debes crear nuevos productos en Stripe y actualizar las variables de entorno.

## Productos creados (Stripe)

| Plan   | Product ID | Precio  |
|--------|------------|---------|
| Mensual | `prod_U5X1H9QlsiI5rp` | CHF 4.99/mes |
| Anual   | `prod_U5XFTPYn1UE94K` | CHF 53.90/año |

## Importante: necesitas Price IDs, no Product IDs

El backend usa **Price ID** (`price_...`), no Product ID (`prod_...`).

**Cómo obtener el Price ID:**
1. Ir a [dashboard.stripe.com](https://dashboard.stripe.com) → **Products**
2. Clic en el producto mensual (`prod_U5X1H9QlsiI5rp`)
3. En la sección **Pricing**, verás el precio asociado → copia el **Price ID** (empieza con `price_...`)
4. Repite para el producto anual (`prod_U5XFTPYn1UE94K`)

## Variables de entorno (Render)

En el backend de Render, añadir o actualizar:

```
STRIPE_PRICE_ID=price_xxxxx          # Price ID de prod_U5X1H9QlsiI5rp (mensual)
STRIPE_PRICE_ID_YEARLY=price_yyyyy   # Price ID de prod_U5XFTPYn1UE94K (anual)
```

**Mapeo:** Mensual = `prod_U5X1H9QlsiI5rp` · Anual = `prod_U5XFTPYn1UE94K`

Tras guardar, Render redeploya automáticamente.

## Nota

Los usuarios existentes con suscripciones antiguas mantendrán su precio hasta que renueven. Los nuevos clientes verán CHF 4.99/53.90.
