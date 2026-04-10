{\rtf1\ansi\ansicpg1252\cocoartf2709
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw12240\paperh20160\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const CACHE_NAME = "flo-v3";\
\
const ASSETS = [\
  "/",\
  "/index.html",\
  "/manifest.json"\
];\
\
self.addEventListener("install", (event) => \{\
  self.skipWaiting();\
  event.waitUntil(\
    caches.open(CACHE_NAME).then((cache) => \{\
      return cache.addAll(ASSETS);\
    \})\
  );\
\});\
\
self.addEventListener("activate", (event) => \{\
  event.waitUntil(\
    caches.keys().then((keys) => \{\
      return Promise.all(\
        keys.map((key) => \{\
          if (key !== CACHE_NAME) \{\
            return caches.delete(key);\
          \}\
        \})\
      );\
    \})\
  );\
  self.clients.claim();\
\});\
\
self.addEventListener("fetch", (event) => \{\
  event.respondWith(\
    fetch(event.request)\
      .then((response) => \{\
        const resClone = response.clone();\
        caches.open(CACHE_NAME).then((cache) => \{\
          cache.put(event.request, resClone);\
        \});\
        return response;\
      \})\
      .catch(() => \{\
        return caches.match(event.request);\
      \})\
  );\
\});}