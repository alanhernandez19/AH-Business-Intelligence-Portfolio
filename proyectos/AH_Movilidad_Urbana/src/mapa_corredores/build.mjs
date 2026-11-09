import WebPackWrap from 'powerbi-visuals-tools/lib/WebPackWrap.js';
import CommandManager from 'powerbi-visuals-tools/lib/CommandManager.js';
import fs from 'node:fs';
const requested=JSON.parse(fs.readFileSync('pbiviz.json','utf8')).apiVersion;
const installed=JSON.parse(fs.readFileSync('node_modules/powerbi-visuals-api/package.json','utf8')).version;
if(requested!==installed)throw new Error(`API requerida: ${requested}; instalada: ${installed}`);
// Packaging is offline: no development HTTPS server or system certificate is needed.
WebPackWrap.prototype.configureDevServer = async function () {};
await CommandManager.package({pbiviz:true,resources:true,minify:true,compression:6,skipApi:true,pbivizFile:'pbiviz.json',stats:false},process.cwd());
