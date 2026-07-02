FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY assets/ /usr/share/nginx/html/assets/

# Cache-busting: css/js кэшируются на 7 дней (nginx + Cloudflare edge),
# поэтому каждой сборке даём свою версию ссылок — иначе после деплоя
# посетители до недели видят старые ассеты
RUN V=$(date +%s) && sed -i -E "s#(css/style\.css|js/[a-z-]+\.js)#&?v=$V#g" /usr/share/nginx/html/index.html

EXPOSE 80
