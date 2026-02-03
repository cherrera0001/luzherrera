# Resolver DNS_PROBE_FINISHED_NXDOMAIN (www.luzherrera.cl)

## Qué significa el error

**NXDOMAIN** = el DNS no encuentra el nombre. No es un error de Vercel ni de la configuración de registros dentro de Cloudflare. Ocurre porque el dominio **luzherrera.cl** todavía no usa los nameservers de Cloudflare a nivel mundial.

Tus registros en Cloudflare están bien:

| Tipo  | Nombre | Contenido                          | Uso        |
|-------|--------|------------------------------------|------------|
| A     | `@`    | 216.198.79.1                       | luzherrera.cl (raíz) → Vercel |
| CNAME | `www`  | b39c274c5dc5d807.vercel-dns-017.com | www.luzherrera.cl → Vercel |

"Solo DNS" (nube gris) es correcto para Vercel.

---

## Dónde está el problema: el registrador del dominio

Para dominios **.cl**, el registrador suele ser **NIC Chile** (www.nic.cl). Ahí se definen los **servidores de nombres** del dominio. Si ahí no están puestos los de Cloudflare, nadie usará los registros que configuraste en Cloudflare.

### Qué hacer en el registrador (NIC Chile u otro)

1. Entra al panel donde compraste/gestionas **luzherrera.cl** (ej. nic.cl, o el agente que usaste).
2. Busca la zona del dominio y la opción **Servidores de nombres** / **Nameservers** / **DNS**.
3. Configura **solo estos dos** (y en este orden si el sistema lo pide):
   ```
   titan.ns.cloudflare.com
   kelly.ns.cloudflare.com
   ```
4. Guarda. No agregues más nameservers; deja solo esos dos.

Hasta que esto esté guardado en el registrador, el mundo seguirá preguntando por los nameservers viejos y no verá tus A/CNAME en Cloudflare → **NXDOMAIN**.

---

## Cómo comprobar que ya está bien

- **Propagación:** puede tardar desde unos minutos hasta 24–48 horas.
- En **Cloudflare** (Dashboard → tu zona luzherrera.cl): cuando el dominio use los NS de Cloudflare, la zona dejará de mostrarte avisos de “pendiente” o “no activa”.
- En tu PC o móvil:
  - Prueba de nuevo: https://www.luzherrera.cl
  - O en terminal:  
    `nslookup www.luzherrera.cl`  
    Deberías ver la respuesta apuntando a Vercel (o al CNAME de Vercel).

---

## Resumen

| Dónde              | Qué hacer |
|--------------------|-----------|
| **Vercel**         | Nada; ya está bien configurado. |
| **Cloudflare**     | Nada; A y CNAME están correctos. |
| **Registrador .cl** | Poner nameservers: `titan.ns.cloudflare.com` y `kelly.ns.cloudflare.com`. |

Cuando el registrador apunte a Cloudflare, la resolución de **www.luzherrera.cl** y **luzherrera.cl** debería funcionar y el error NXDOMAIN desaparecer.
