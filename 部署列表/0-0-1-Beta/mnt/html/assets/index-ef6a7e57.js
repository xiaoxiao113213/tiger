function e(e,r){const t=String(e);if("string"!=typeof r)throw new TypeError("Expected character");let n=0,o=t.indexOf(r);for(;-1!==o;)n++,o=t.indexOf(r,o+r.length);return n}export{e as c};
