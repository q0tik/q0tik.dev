import json, sys, base64, urllib.request, os, time
# usage: gen.py MODEL PROMPT OUT [REF_IMAGE...]
model, prompt, out, refs = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4:]
key = open(os.path.expanduser('~/.config/gemini/api-key')).read().strip()
parts = [{"inlineData": {"mimeType": "image/png", "data": base64.b64encode(open(r, 'rb').read()).decode()}} for r in refs]
parts.append({"text": prompt})
body = {"contents": [{"parts": parts}],
        "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "1:1"}}}
req = urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
    data=json.dumps(body).encode(), headers={"Content-Type": "application/json", "x-goog-api-key": key})
t = time.time()
try:
    d = json.load(urllib.request.urlopen(req, timeout=240))
except urllib.error.HTTPError as e:
    print("HTTP", e.code, e.read().decode()[:400]); sys.exit(1)
n = 0
for c in d.get("candidates", []):
    for p in c.get("content", {}).get("parts", []):
        if "inlineData" in p:
            open(out, "wb").write(base64.b64decode(p["inlineData"]["data"])); n += 1
        elif "text" in p:
            print("text:", p["text"][:200])
print(out, "images:", n, "secs:", round(time.time() - t, 1))
