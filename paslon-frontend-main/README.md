# PASLON FRONTEND

Repository ini diperuntukkan sebagai media dari task teman - teman Backend, silakan dicek terlebih dahulu tampilannya seperti apa

## Configuration API

Untuk link konfigurasi, bisa langsung arahkan ke:
src > config > api.ts

```ts {3} title=api.ts
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
});
```
