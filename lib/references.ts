'use client';
import {useSyncExternalStore} from 'react';
import {projects} from './projects';
const slugs=new Set(projects.map(project=>project.slug));
const KEY='victor-herbst:references:v1';
let memory='[]';
let storageUnavailable=false;
export type Reference={slug:string;focus:string};
export const focuses=['Composição','Tipografia','Imagem e direção de arte','Navegação e interação'];
function snapshot(){if(storageUnavailable)return memory;try{return window.localStorage.getItem(KEY)||memory}catch{return memory}}
function subscribe(callback:()=>void){window.addEventListener('storage',callback);window.addEventListener('portfolio-references',callback);return()=>{window.removeEventListener('storage',callback);window.removeEventListener('portfolio-references',callback)}}
export function parseReferences(raw:string):Reference[]{try{const value=JSON.parse(raw);if(!Array.isArray(value))return[];return value.filter((r):r is Reference=>r&&typeof r.slug==='string'&&slugs.has(r.slug)&&focuses.includes(r.focus)).filter((r,i,a)=>a.findIndex(x=>x.slug===r.slug)===i).slice(0,3)}catch{return[]}}
export function useReferences(){const raw=useSyncExternalStore(subscribe,snapshot,()=>'[]');const refs=parseReferences(raw);function save(next:Reference[]){memory=JSON.stringify(next.slice(0,3));try{localStorage.setItem(KEY,memory)}catch{storageUnavailable=true}window.dispatchEvent(new Event('portfolio-references'))}return{refs,add:(slug:string)=>{const current=parseReferences(snapshot());if(current.some(r=>r.slug===slug))return true;if(current.length>=3)return false;save([...current,{slug,focus:'Composição'}]);return true},remove:(slug:string)=>save(parseReferences(snapshot()).filter(r=>r.slug!==slug)),setFocus:(slug:string,focus:string)=>{if(focuses.includes(focus))save(parseReferences(snapshot()).map(r=>r.slug===slug?{...r,focus}:r))}}}
