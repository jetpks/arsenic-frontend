
Shove this in your nginx.conf and smoke it:

```ini
    location /api/ {
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_pass http://127.0.0.1:5000;
    }
```
