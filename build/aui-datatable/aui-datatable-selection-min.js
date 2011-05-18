AUI.add("aui-datatable-selection",function(y){var i=y.Lang,r=i.isBoolean,t=i.isString,C=y.getClassName,h=y.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),n="cell",v="cellKeydown",m="columnset",f="columnsetChange",q="datatable",B="down",k="editor",F="esc",D="host",o="id",w="left",p="mousedown",z="mouseEvent",u="multiple",E="recordset",e="recordsetChange",l="return",s="right",c="select",j="selected",d="tab",x="tabindex",g="up",a=C(q,n,j);var b=y.Base.create("dataTableSelection",y.Plugin.Base,[],{selectedCellHash:null,selectedColumnHash:null,selectedRowHash:null,initializer:function(){var A=this;A.selectedCellHash={};A.selectedColumnHash={};A.selectedRowHash={};A.publish({select:{defaultFn:A._defSelectFn}});A.afterHostEvent(v,A._afterKeyEvent);A.afterHostEvent(A.get(z),A._afterMouseEvent);A.afterHostEvent(f,A._afterHostColumnsetChange);A.afterHostEvent(e,A._afterHostRecordsetChange);},isCellSelected:function(G){var A=this;return A.selectedCellHash[G.get(o)];},isColumnSelected:function(A){},isRowSelected:function(A){},select:function(G){var A=this;A.selectCell(G);},selectCell:function(G){var A=this;if(!A.get(u)){A.unselectAllCells();}A.selectedCellHash[G.get(o)]=G;G.setAttribute(x,0).focus();G.addClass(a);},selectColumn:function(A){},selectRow:function(A){},toggleCell:function(G,H){var A=this;if(H||!A.isCellSelected(G)){A.selectCell(G);}else{A.unselectCell(G);}},toggleColumn:function(A,G){},toggleRow:function(G,A){},unselectCell:function(G){var A=this;delete A.selectedCellHash[G.get(o)];G.removeAttribute(x);G.removeClass(a);},unselectColumn:function(A){},unselectRow:function(A){},unselectAllCells:function(){var A=this;y.each(A.selectedCellHash,y.bind(A.unselectCell,A));},unselectAllColumns:function(){},unselectAllRows:function(){},_afterHostColumnsetChange:function(G){var A=this;A._cleanUp();},_afterHostRecordsetChange:function(G){var A=this;A._cleanUp();},_afterMouseEvent:function(G){var A=this;A._handleSelectEvent(G);},_afterKeyEvent:function(H){var G=this;var A=H.originalEvent;if(A.isNavKey()){if(A.isKey(F)){G._onEscKey(H);}else{if(A.isKey(l)){G._onReturnKey(H);}else{G._navigate(H);}}A.halt();}},_cleanUp:function(){var A=this;A.selectedCellHash={};A.selectedColumnHash={};A.selectedRowHash={};},_defSelectFn:function(G){var A=this;A.selectCell(G.cell);},_navigate:function(G){var A=this;A._updateNavKeyInfo(G);A._handleSelectEvent(G);},_onEscKey:function(H){var A=this;var G=H.column.get(k);if(G){G.hide();}},_onReturnKey:function(H){var A=this;var G=A.get(D);G._editCell(H);},_handleSelectEvent:function(G){var A=this;A.fire(c,{cell:G.cell,column:G.column,inHead:G.inHead,liner:G.liner,originalEvent:G.originalEvent,row:G.row,record:G.record});},_updateNavKeyInfo:function(A){var Q=this;var R=Q.get(D);var G=A.originalEvent;var I=R.get(m);var M=A.column.keyIndex;var O=R.get(E);var K=O.getRecordIndex(A.record);var H=G.ctrlKey||G.metaKey;var N=G.shiftKey;if(G.isKey(w)||(N&&G.isKey(d))){M--;}else{if(G.isKey(s)||(!N&&G.isKey(d))){M++;}else{if(G.isKey(B)){if(H){K=O.getLength()-1;}else{K++;}}else{if(G.isKey(g)){if(H){K=0;}else{K--;}}}}}M=Math.max(Math.min(M,I.getLength()-1),0);K=Math.max(Math.min(K,O.getLength()-1),0);var J=I.getColumn(M);var L=O.getRecord(K);var P=R.getCellNode(L,J);if(R.events){y.mix(A,R.events.getEvtPayload(P,A),true);}},_setMouseEvent:function(A){return n+h(A);}},{NS:"selection",NAME:"dataTableSelection",ATTRS:{multiple:{value:false,validator:r},mouseEvent:{setter:"_setMouseEvent",value:p,validator:t}}});y.namespace("Plugin").DataTableSelection=b;},"@VERSION@",{requires:["aui-datatable-base"],skinnable:true});