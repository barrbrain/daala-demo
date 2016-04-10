var asm = (function(global, foreign, buffer) {
'use asm';
var HEAP32 = new global.Int32Array(buffer);
var Math_imul = global.Math.imul;

function od_pre_filter8($_y,$_x) {
 $_y = $_y|0;
 $_x = $_x|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0;
 var $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, label = 0;
 $0 = HEAP32[$_x>>2]|0;
 $1 = ((($_x)) + 28|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = (($0) - ($2))|0;
 $4 = ((($_x)) + 4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = ((($_x)) + 24|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = (($5) - ($7))|0;
 $9 = ((($_x)) + 8|0);
 $10 = HEAP32[$9>>2]|0;
 $11 = ((($_x)) + 20|0);
 $12 = HEAP32[$11>>2]|0;
 $13 = (($10) - ($12))|0;
 $14 = ((($_x)) + 12|0);
 $15 = HEAP32[$14>>2]|0;
 $16 = ((($_x)) + 16|0);
 $17 = HEAP32[$16>>2]|0;
 $18 = (($15) - ($17))|0;
 $19 = $18 >> 1;
 $20 = (($15) - ($19))|0;
 $21 = $13 >> 1;
 $22 = (($10) - ($21))|0;
 $23 = $8 >> 1;
 $24 = (($5) - ($23))|0;
 $25 = $3 >> 1;
 $26 = (($0) - ($25))|0;
 $27 = ($18*93)|0;
 $28 = $27 >> 6;
 $29 = (0 - ($28))|0;
 $30 = $29 >>> 31;
 $31 = (($30) + ($28))|0;
 $32 = ($13*72)|0;
 $33 = $32 >> 6;
 $34 = (0 - ($33))|0;
 $35 = $34 >>> 31;
 $36 = (($35) + ($33))|0;
 $37 = ($8*73)|0;
 $38 = $37 >> 6;
 $39 = (0 - ($38))|0;
 $40 = $39 >>> 31;
 $41 = (($40) + ($38))|0;
 $42 = ($3*78)|0;
 $43 = $42 >> 6;
 $44 = (0 - ($43))|0;
 $45 = $44 >>> 31;
 $46 = (($45) + ($43))|0;
 $47 = Math_imul($41, -10)|0;
 $48 = (($47) + 32)|0;
 $49 = $48 >> 6;
 $50 = (($46) + ($49))|0;
 $51 = ($50*23)|0;
 $52 = (($51) + 32)|0;
 $53 = $52 >> 6;
 $54 = Math_imul($36, -23)|0;
 $55 = (($54) + 32)|0;
 $56 = $55 >> 6;
 $57 = (($56) + ($41))|0;
 $58 = (($57) + ($53))|0;
 $59 = ($58*37)|0;
 $60 = (($59) + 32)|0;
 $61 = $60 >> 6;
 $62 = Math_imul($31, -28)|0;
 $63 = (($62) + 32)|0;
 $64 = $63 >> 6;
 $65 = (($64) + ($36))|0;
 $66 = (($65) + ($61))|0;
 $67 = ($66*50)|0;
 $68 = (($67) + 32)|0;
 $69 = $68 >> 6;
 $70 = (($69) + ($31))|0;
 $71 = $50 >> 1;
 $72 = (($71) + ($26))|0;
 HEAP32[$_y>>2] = $72;
 $73 = $58 >> 1;
 $74 = (($73) + ($24))|0;
 $75 = ((($_y)) + 4|0);
 HEAP32[$75>>2] = $74;
 $76 = $66 >> 1;
 $77 = (($76) + ($22))|0;
 $78 = ((($_y)) + 8|0);
 HEAP32[$78>>2] = $77;
 $79 = $70 >> 1;
 $80 = (($79) + ($20))|0;
 $81 = ((($_y)) + 12|0);
 HEAP32[$81>>2] = $80;
 $82 = (($80) - ($70))|0;
 $83 = ((($_y)) + 16|0);
 HEAP32[$83>>2] = $82;
 $84 = (($77) - ($66))|0;
 $85 = ((($_y)) + 20|0);
 HEAP32[$85>>2] = $84;
 $86 = (($74) - ($58))|0;
 $87 = ((($_y)) + 24|0);
 HEAP32[$87>>2] = $86;
 $88 = (($72) - ($50))|0;
 $89 = ((($_y)) + 28|0);
 HEAP32[$89>>2] = $88;
 return;
}

function od_post_filter8($_x,$_y) {
 $_x = $_x|0;
 $_y = $_y|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $8 = 0, $9 = 0, label = 0;
 $0 = HEAP32[$_y>>2]|0;
 $1 = ((($_y)) + 28|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = (($0) - ($2))|0;
 $4 = ((($_y)) + 4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = ((($_y)) + 24|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = (($5) - ($7))|0;
 $9 = ((($_y)) + 8|0);
 $10 = HEAP32[$9>>2]|0;
 $11 = ((($_y)) + 20|0);
 $12 = HEAP32[$11>>2]|0;
 $13 = (($10) - ($12))|0;
 $14 = ((($_y)) + 12|0);
 $15 = HEAP32[$14>>2]|0;
 $16 = ((($_y)) + 16|0);
 $17 = HEAP32[$16>>2]|0;
 $18 = (($15) - ($17))|0;
 $19 = $18 >> 1;
 $20 = (($15) - ($19))|0;
 $21 = $13 >> 1;
 $22 = (($10) - ($21))|0;
 $23 = $8 >> 1;
 $24 = (($5) - ($23))|0;
 $25 = $3 >> 1;
 $26 = (($0) - ($25))|0;
 $27 = ($13*50)|0;
 $28 = (($27) + 32)|0;
 $29 = $28 >> 6;
 $30 = (($18) - ($29))|0;
 $31 = Math_imul($30, -28)|0;
 $32 = (($31) + 32)|0;
 $33 = $32 >> 6;
 $34 = (($13) - ($33))|0;
 $35 = ($8*37)|0;
 $36 = (($35) + 32)|0;
 $37 = $36 >> 6;
 $38 = (($34) - ($37))|0;
 $39 = Math_imul($38, -23)|0;
 $40 = (($39) + 32)|0;
 $41 = $40 >> 6;
 $42 = (($8) - ($41))|0;
 $43 = ($3*23)|0;
 $44 = (($43) + 32)|0;
 $45 = $44 >> 6;
 $46 = (($42) - ($45))|0;
 $47 = Math_imul($46, -10)|0;
 $48 = (($47) + 32)|0;
 $49 = $48 >>> 6;
 $50 = (($3) - ($49))|0;
 $51 = $50 << 6;
 $52 = (($51|0) / 78)&-1;
 $53 = $46 << 6;
 $54 = (($53|0) / 73)&-1;
 $55 = $38 << 6;
 $56 = (($55|0) / 72)&-1;
 $57 = $30 << 6;
 $58 = (($57|0) / 93)&-1;
 $59 = $52 >> 1;
 $60 = (($59) + ($26))|0;
 HEAP32[$_x>>2] = $60;
 $61 = $54 >> 1;
 $62 = (($61) + ($24))|0;
 $63 = ((($_x)) + 4|0);
 HEAP32[$63>>2] = $62;
 $64 = $56 >> 1;
 $65 = (($64) + ($22))|0;
 $66 = ((($_x)) + 8|0);
 HEAP32[$66>>2] = $65;
 $67 = $58 >> 1;
 $68 = (($67) + ($20))|0;
 $69 = ((($_x)) + 12|0);
 HEAP32[$69>>2] = $68;
 $70 = (($68) - ($58))|0;
 $71 = ((($_x)) + 16|0);
 HEAP32[$71>>2] = $70;
 $72 = (($65) - ($56))|0;
 $73 = ((($_x)) + 20|0);
 HEAP32[$73>>2] = $72;
 $74 = (($62) - ($54))|0;
 $75 = ((($_x)) + 24|0);
 HEAP32[$75>>2] = $74;
 $76 = (($60) - ($52))|0;
 $77 = ((($_x)) + 28|0);
 HEAP32[$77>>2] = $76;
 return;
}

function lapvert($bufptr,$pixels) {
 $bufptr = $bufptr|0;
 $pixels = $pixels|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $i$01 = 0, label = 0;
 $0 = ($pixels*3)|0;
 $1 = ($pixels|0)>(0);
 if ($1) {
  $i$01 = 0;
 } else {
  return;
 }
 while(1) {
  $2 = $i$01 << 3;
  $3 = (($bufptr) + ($2<<2)|0);
  od_pre_filter8($3,$3);
  $4 = (($i$01) + 1)|0;
  $5 = ($4|0)<($0|0);
  if ($5) {
   $i$01 = $4;
  } else {
   break;
  }
 }
 return;
}

return {od_pre_filter8: od_pre_filter8, od_post_filter8: od_post_filter8, lapvert:lapvert};
})(window, null, window.memory.M);
window.od_pre_filter8 = asm.od_pre_filter8;
window.od_post_filter8 = asm.od_post_filter8;
window.lapvert = asm.lapvert;
