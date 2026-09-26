# Outfit 600
wget -qO public/assets/fonts/outfit-600.woff2 "https://fonts.gstatic.com/s/outfit/v11/QGYyzD-vzvE63tPB8V188q0.woff2"
# Outfit 700
wget -qO public/assets/fonts/outfit-700.woff2 "https://fonts.gstatic.com/s/outfit/v11/QGYyzD-vzvE63tPBtV-88q0.woff2"
# Outfit 800
wget -qO public/assets/fonts/outfit-800.woff2 "https://fonts.gstatic.com/s/outfit/v11/QGYyzD-vzvE63tPBKV-88q0.woff2"

# Plus Jakarta Sans 400
wget -qO public/assets/fonts/plus-jakarta-sans-400.woff2 "https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaALWGmRQ4yZ3yHZzCEyjtc0-u81BwJ7B.woff2"
# Plus Jakarta Sans 500
wget -qO public/assets/fonts/plus-jakarta-sans-500.woff2 "https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaALWGmRQ4yZ3yHZzCEyjtc0-R81BwJ7B.woff2"
# Plus Jakarta Sans 600
wget -qO public/assets/fonts/plus-jakarta-sans-600.woff2 "https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaALWGmRQ4yZ3yHZzCEyjtc0-O85BwJ7B.woff2"
# Plus Jakarta Sans 700
wget -qO public/assets/fonts/plus-jakarta-sans-700.woff2 "https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaALWGmRQ4yZ3yHZzCEyjtc0-G85BwJ7B.woff2"

cat << 'CSS_EOF' > src/index.css.tmp
@font-face {
  font-family: 'Outfit';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/assets/fonts/outfit-600.woff2') format('woff2');
}
@font-face {
  font-family: 'Outfit';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/assets/fonts/outfit-700.woff2') format('woff2');
}
@font-face {
  font-family: 'Outfit';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url('/assets/fonts/outfit-800.woff2') format('woff2');
}
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/assets/fonts/plus-jakarta-sans-400.woff2') format('woff2');
}
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/assets/fonts/plus-jakarta-sans-500.woff2') format('woff2');
}
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/assets/fonts/plus-jakarta-sans-600.woff2') format('woff2');
}
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/assets/fonts/plus-jakarta-sans-700.woff2') format('woff2');
}

CSS_EOF
cat src/index.css >> src/index.css.tmp
mv src/index.css.tmp src/index.css

sed -i '/fonts.googleapis.com/d' index.html
sed -i '/fonts.gstatic.com/d' index.html
