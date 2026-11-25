export const W=1280,H=800,SHIFT=105,HEARTS=3;
export const STATIONS=[
 {id:'pantry',name:'PANTRY',icon:'▤',x:108,y:571,color:'#e6aa56',hint:'1'},
 {id:'chop',name:'CHOP SHOP',icon:'✦',x:325,y:571,color:'#70c69a',hint:'2'},
 {id:'grill',name:'HOT PLATE',icon:'♨',x:542,y:571,color:'#f17b58',hint:'3'},
 {id:'assembly',name:'PLATING',icon:'◉',x:759,y:571,color:'#8d91df',hint:'4'},
 {id:'serve',name:'PICKUP',icon:'➜',x:1064,y:571,color:'#f0ce68',hint:'5'}
];
export const RECIPES=[
 {name:'Sunny Stack Burger',short:'SUNNY STACK',color:'#efb952',ingredients:[['bun','PANTRY'],['patty','GRILL'],['lettuce','CHOP'],['tomato','CHOP']]},
 {name:'Garden Crunch Salad',short:'GARDEN CRUNCH',color:'#7dc795',ingredients:[['lettuce','CHOP'],['tomato','CHOP'],['cucumber','CHOP']]},
 {name:'Ember Tomato Pasta',short:'EMBER PASTA',color:'#ef8063',ingredients:[['pasta','GRILL'],['tomato sauce','GRILL'],['basil','PANTRY']]},
 {name:'Berry Cloud Pancakes',short:'BERRY CLOUD',color:'#b19be8',ingredients:[['batter','GRILL'],['berries','PANTRY'],['cream','PANTRY']]},
];
export const STATION_BY_NAME=Object.fromEntries(STATIONS.map(s=>[s.name,s]));
