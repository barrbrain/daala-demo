var asm = (function(global, foreign, buffer) {
'use asm';
var HEAP32 = new global.Int32Array(buffer);
var Math_imul = global.Math.imul;

function od_pre_filter8(x){
  x=x|0;
  var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;
  d=HEAP32[x>>2]|0;
  e=d-(HEAP32[x+28>>2]|0)|0;
  f=HEAP32[x+4>>2]|0;
  g=f-(HEAP32[x+24>>2]|0)|0;
  h=HEAP32[x+8>>2]|0;
  i=h-(HEAP32[x+20>>2]|0)|0;
  j=HEAP32[x+12>>2]|0;
  k=j-(HEAP32[x+16>>2]|0)|0;
  o=k*93>>6;
  l=((0-o|0)>>>31)+o|0;
  o=i*72>>6;
  m=((0-o|0)>>>31)+o|0;
  o=g*73>>6;
  n=((0-o|0)>>>31)+o|0;
  o=e*78>>6;
  p=((0-o|0)>>>31)+o+((Math_imul(n,-10)|0)+32>>6)|0;
  o=((Math_imul(m,-23)|0)+32>>6)+n+((p*23|0)+32>>6)|0;
  n=((Math_imul(l,-28)|0)+32>>6)+m+((o*37|0)+32>>6)|0;
  m=((n*50|0)+32>>6)+l|0;
  l=(p>>1)+(d-(e>>1))|0;
  HEAP32[x>>2]=l;
  e=(o>>1)+(f-(g>>1))|0;
  HEAP32[x+4>>2]=e;
  g=(n>>1)+(h-(i>>1))|0;
  HEAP32[x+8>>2]=g;
  i=(m>>1)+(j-(k>>1))|0;
  HEAP32[x+12>>2]=i;
  HEAP32[x+16>>2]=i-m;
  HEAP32[x+20>>2]=g-n;
  HEAP32[x+24>>2]=e-o;
  HEAP32[x+28>>2]=l-p;
  return;
}

function od_post_filter8(x){
  x=x|0;
  var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,q=0;
  d=HEAP32[x>>2]|0;
  e=d-(HEAP32[x+28>>2]|0)|0;
  f=HEAP32[x+4>>2]|0;
  g=f-(HEAP32[x+24>>2]|0)|0;
  h=HEAP32[x+8>>2]|0;
  i=h-(HEAP32[x+20>>2]|0)|0;
  j=HEAP32[x+12>>2]|0;
  k=j-(HEAP32[x+16>>2]|0)|0;
  q=k-((i*50|0)+32>>6)|0;
  l=i-((Math_imul(q,-28)|0)+32>>6)-((g*37|0)+32>>6)|0;
  m=g-((Math_imul(l,-23)|0)+32>>6)-((e*23|0)+32>>6)|0;
  n=(e-(((Math_imul(m,-10)|0)+32|0)>>>6)<<6|0)/78|0;
  o=(m<<6|0)/73|0;
  m=(l<<6|0)/72|0;
  l=(q<<6|0)/93|0;
  q=(n>>1)+(d-(e>>1))|0;
  HEAP32[x>>2]=q;
  e=(o>>1)+(f-(g>>1))|0;
  HEAP32[x+4>>2]=e;
  g=(m>>1)+(h-(i>>1))|0;
  HEAP32[x+8>>2]=g;
  i=(l>>1)+(j-(k>>1))|0;
  HEAP32[x+12>>2]=i;
  HEAP32[x+16>>2]=i-l;
  HEAP32[x+20>>2]=g-m;
  HEAP32[x+24>>2]=e-o;
  HEAP32[x+28>>2]=q-n;
  return;
}

function lapvert(a,b){
  a=a|0;
  b=b|0;
  var d=0,e=0;
  d=b*3|0;
  do{
    b=a+(e<<2)|0;
    od_pre_filter8(b);
    e=e+8|0
  }while((e|0)<(d|0));
  return;
}

function unlapvert(a,b){
  a=a|0;
  b=b|0;
  var d=0,e=0;
  d=b*3|0;
  do{
    b=a+(e<<2)|0;
    od_post_filter8(b);
    e=e+8|0
  }while((e|0)<(d|0));
  return;
}

function laphorz($bufptr,$w,$h,$t) {
 $bufptr = $bufptr|0;
 $w = $w|0;
 $h = $h|0;
 $t = $t|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $7 = 0, $8 = 0, $9 = 0, $exitcond = 0, $i$02 = 0, $i$02$phi = 0, $j$01 = 0, label = 0;
 $0 = ($h*3)|0;
 $1 = ($0|0)>(12);
 if (!($1)) {
  return;
 }
 $2 = ($w|0)>(0);
 $3 = ((($t)) + 4|0);
 $4 = ((($t)) + 8|0);
 $5 = ((($t)) + 12|0);
 $6 = ((($t)) + 16|0);
 $7 = ((($t)) + 20|0);
 $8 = ((($t)) + 24|0);
 $9 = ((($t)) + 28|0);
 $10 = $w << 3;
 $12 = 12;$i$02 = 4;
 while(1) {
  if ($2) {
   $14 = Math_imul($i$02, $w)|0;
   $j$01 = 0;
   while(1) {
    $15 = (($14) + ($j$01))|0;
    $16 = (($bufptr) + ($15<<2)|0);
    $17 = HEAP32[$16>>2]|0;
    HEAP32[$t>>2] = $17;
    $18 = (($15) + ($w))|0;
    $19 = (($bufptr) + ($18<<2)|0);
    $20 = HEAP32[$19>>2]|0;
    HEAP32[$3>>2] = $20;
    $21 = (($18) + ($w))|0;
    $22 = (($bufptr) + ($21<<2)|0);
    $23 = HEAP32[$22>>2]|0;
    HEAP32[$4>>2] = $23;
    $24 = (($21) + ($w))|0;
    $25 = (($bufptr) + ($24<<2)|0);
    $26 = HEAP32[$25>>2]|0;
    HEAP32[$5>>2] = $26;
    $27 = (($24) + ($w))|0;
    $28 = (($bufptr) + ($27<<2)|0);
    $29 = HEAP32[$28>>2]|0;
    HEAP32[$6>>2] = $29;
    $30 = (($27) + ($w))|0;
    $31 = (($bufptr) + ($30<<2)|0);
    $32 = HEAP32[$31>>2]|0;
    HEAP32[$7>>2] = $32;
    $33 = (($30) + ($w))|0;
    $34 = (($bufptr) + ($33<<2)|0);
    $35 = HEAP32[$34>>2]|0;
    HEAP32[$8>>2] = $35;
    $36 = (($33) + ($w))|0;
    $37 = (($bufptr) + ($36<<2)|0);
    $38 = HEAP32[$37>>2]|0;
    HEAP32[$9>>2] = $38;
    od_pre_filter8($t);
    $39 = (($36) - ($10))|0;
    $40 = HEAP32[$t>>2]|0;
    $41 = (($39) + ($w))|0;
    $42 = (($bufptr) + ($41<<2)|0);
    HEAP32[$42>>2] = $40;
    $43 = HEAP32[$3>>2]|0;
    $44 = (($41) + ($w))|0;
    $45 = (($bufptr) + ($44<<2)|0);
    HEAP32[$45>>2] = $43;
    $46 = HEAP32[$4>>2]|0;
    $47 = (($44) + ($w))|0;
    $48 = (($bufptr) + ($47<<2)|0);
    HEAP32[$48>>2] = $46;
    $49 = HEAP32[$5>>2]|0;
    $50 = (($47) + ($w))|0;
    $51 = (($bufptr) + ($50<<2)|0);
    HEAP32[$51>>2] = $49;
    $52 = HEAP32[$6>>2]|0;
    $53 = (($50) + ($w))|0;
    $54 = (($bufptr) + ($53<<2)|0);
    HEAP32[$54>>2] = $52;
    $55 = HEAP32[$7>>2]|0;
    $56 = (($53) + ($w))|0;
    $57 = (($bufptr) + ($56<<2)|0);
    HEAP32[$57>>2] = $55;
    $58 = HEAP32[$8>>2]|0;
    $59 = (($56) + ($w))|0;
    $60 = (($bufptr) + ($59<<2)|0);
    HEAP32[$60>>2] = $58;
    $61 = HEAP32[$9>>2]|0;
    $62 = (($59) + ($w))|0;
    $63 = (($bufptr) + ($62<<2)|0);
    HEAP32[$63>>2] = $61;
    $64 = (($j$01) + 1)|0;
    $exitcond = ($64|0)==($w|0);
    if ($exitcond) {
     break;
    } else {
     $j$01 = $64;
    }
   }
  }
  $11 = (($12) + 8)|0;
  $13 = ($11|0)<($0|0);
  if ($13) {
   $i$02$phi = $12;$12 = $11;$i$02 = $i$02$phi;
  } else {
   break;
  }
 }
 return;
}

function unlaphorz($bufptr,$w,$h,$t) {
 $bufptr = $bufptr|0;
 $w = $w|0;
 $h = $h|0;
 $t = $t|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $7 = 0, $8 = 0, $9 = 0, $exitcond = 0, $i$02 = 0, $i$02$phi = 0, $j$01 = 0, label = 0;
 $0 = ($h*3)|0;
 $1 = ($0|0)>(12);
 if (!($1)) {
  return;
 }
 $2 = ($w|0)>(0);
 $3 = ((($t)) + 4|0);
 $4 = ((($t)) + 8|0);
 $5 = ((($t)) + 12|0);
 $6 = ((($t)) + 16|0);
 $7 = ((($t)) + 20|0);
 $8 = ((($t)) + 24|0);
 $9 = ((($t)) + 28|0);
 $10 = $w << 3;
 $12 = 12;$i$02 = 4;
 while(1) {
  if ($2) {
   $14 = Math_imul($i$02, $w)|0;
   $j$01 = 0;
   while(1) {
    $15 = (($14) + ($j$01))|0;
    $16 = (($bufptr) + ($15<<2)|0);
    $17 = HEAP32[$16>>2]|0;
    HEAP32[$t>>2] = $17;
    $18 = (($15) + ($w))|0;
    $19 = (($bufptr) + ($18<<2)|0);
    $20 = HEAP32[$19>>2]|0;
    HEAP32[$3>>2] = $20;
    $21 = (($18) + ($w))|0;
    $22 = (($bufptr) + ($21<<2)|0);
    $23 = HEAP32[$22>>2]|0;
    HEAP32[$4>>2] = $23;
    $24 = (($21) + ($w))|0;
    $25 = (($bufptr) + ($24<<2)|0);
    $26 = HEAP32[$25>>2]|0;
    HEAP32[$5>>2] = $26;
    $27 = (($24) + ($w))|0;
    $28 = (($bufptr) + ($27<<2)|0);
    $29 = HEAP32[$28>>2]|0;
    HEAP32[$6>>2] = $29;
    $30 = (($27) + ($w))|0;
    $31 = (($bufptr) + ($30<<2)|0);
    $32 = HEAP32[$31>>2]|0;
    HEAP32[$7>>2] = $32;
    $33 = (($30) + ($w))|0;
    $34 = (($bufptr) + ($33<<2)|0);
    $35 = HEAP32[$34>>2]|0;
    HEAP32[$8>>2] = $35;
    $36 = (($33) + ($w))|0;
    $37 = (($bufptr) + ($36<<2)|0);
    $38 = HEAP32[$37>>2]|0;
    HEAP32[$9>>2] = $38;
    od_post_filter8($t);
    $39 = (($36) - ($10))|0;
    $40 = HEAP32[$t>>2]|0;
    $41 = (($39) + ($w))|0;
    $42 = (($bufptr) + ($41<<2)|0);
    HEAP32[$42>>2] = $40;
    $43 = HEAP32[$3>>2]|0;
    $44 = (($41) + ($w))|0;
    $45 = (($bufptr) + ($44<<2)|0);
    HEAP32[$45>>2] = $43;
    $46 = HEAP32[$4>>2]|0;
    $47 = (($44) + ($w))|0;
    $48 = (($bufptr) + ($47<<2)|0);
    HEAP32[$48>>2] = $46;
    $49 = HEAP32[$5>>2]|0;
    $50 = (($47) + ($w))|0;
    $51 = (($bufptr) + ($50<<2)|0);
    HEAP32[$51>>2] = $49;
    $52 = HEAP32[$6>>2]|0;
    $53 = (($50) + ($w))|0;
    $54 = (($bufptr) + ($53<<2)|0);
    HEAP32[$54>>2] = $52;
    $55 = HEAP32[$7>>2]|0;
    $56 = (($53) + ($w))|0;
    $57 = (($bufptr) + ($56<<2)|0);
    HEAP32[$57>>2] = $55;
    $58 = HEAP32[$8>>2]|0;
    $59 = (($56) + ($w))|0;
    $60 = (($bufptr) + ($59<<2)|0);
    HEAP32[$60>>2] = $58;
    $61 = HEAP32[$9>>2]|0;
    $62 = (($59) + ($w))|0;
    $63 = (($bufptr) + ($62<<2)|0);
    HEAP32[$63>>2] = $61;
    $64 = (($j$01) + 1)|0;
    $exitcond = ($64|0)==($w|0);
    if ($exitcond) {
     break;
    } else {
     $j$01 = $64;
    }
   }
  }
  $11 = (($12) + 8)|0;
  $13 = ($11|0)<($0|0);
  if ($13) {
   $i$02$phi = $12;$12 = $11;$i$02 = $i$02$phi;
  } else {
   break;
  }
 }
 return;
}

return {
od_pre_filter8: od_pre_filter8,
od_post_filter8: od_post_filter8,
lapvert:lapvert,
unlapvert:unlapvert,
laphorz:laphorz,
unlaphorz:unlaphorz};
})(window, null, window.HEAP);
window.od_pre_filter8 = asm.od_pre_filter8;
window.od_post_filter8 = asm.od_post_filter8;
window.lapvert = asm.lapvert;
window.unlapvert = asm.unlapvert;
window.laphorz = asm.laphorz;
window.unlaphorz = asm.unlaphorz;
