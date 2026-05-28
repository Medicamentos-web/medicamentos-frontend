# Prompts para Makko AI — VotaSuiza

Usa estos prompts en [Makko AI](https://makko.ai) para generar personajes cartoon consistentes.
Exporta como PNG 512×512 y colócalos en `assets/images/characters/` (Flutter) o `web/public/characters/` (Web).

---

## SVP / UDC (Verde #006633)

**Personaje:**
> Político suizo de mediana edad, hombre, traje verde oscuro con corbata roja, estilo cartoon flat, expresión seria pero amable, fondo suizo verde claro, busto frontal, estilo ilustración editorial moderna, sin texto

**Pose hablando:**
> Mismo personaje SVP cartoon, gesto de mano explicando, boca abierta hablando, burbuja de diálogo vacía, fondo parlamento suizo estilizado

---

## SP / PS (Rojo #CC0000)

**Personaje:**
> Política suiza joven, mujer, traje rojo, estilo cartoon flat, expresión empática y cercana, fondo rojo claro, busto frontal, ilustración editorial

**Pose hablando:**
> Misma personaje SP cartoon, sonriendo, mano en el corazón, estilo cálido, fondo manifestación pacífica estilizada

---

## FDP / PLR (Azul #0066CC)

**Personaje:**
> Político suizo, hombre joven, traje azul marino, gafas, estilo cartoon técnico-profesional, expresión confiada, fondo azul claro, busto frontal

**Pose hablando:**
> Mismo personaje FDP cartoon, señalando gráfico ascendente, estilo business cartoon, fondo oficina moderna

---

## Mitte / Le Centre (Naranja #FF9900)

**Personaje:**
> Político suizo mayor, hombre amable, traje gris con corbata naranja, estilo cartoon conciliador, expresión serena, fondo naranja suave, busto frontal

**Pose hablando:**
> Mismo personaje Mitte cartoon, manos juntas en gesto de diálogo, fondo paisaje alpino suizo estilizado

---

## GPS / Les Verts (Verde #66CC00)

**Personaje:**
> Política suiza joven, mujer, traje verde, estilo cartoon ecológico, expresión apasionada, hoja estilizada en el fondo, busto frontal

**Pose hablando:**
> Misma personaje GPS cartoon, señalando panel solar estilizado, fondo naturaleza suiza cartoon

---

## Fondo general para pantallas

> Panorama suizo estilizado cartoon: Alpes, lago, bandera suiza pequeña, cielo azul, estilo flat illustration, colores suaves, sin personas, 16:9

## Urna de votación

> Urna de votación suiza cartoon, madera marrón, ranura superior, estilo flat, fondo transparente, icono app

---

## Instrucciones de reemplazo

1. Genera en Makko AI con cada prompt
2. Exporta PNG 512×512 (personajes) o 1920×1080 (fondos)
3. Renombra: `svp.png`, `sp.png`, `fdp.png`, `cvp.png`, `gps.png`
4. En Flutter: actualiza `avatarAsset` en `parties.json` a `.png`
5. En Web: coloca en `public/characters/` y actualiza `CharacterAvatar.tsx` si usas PNG
