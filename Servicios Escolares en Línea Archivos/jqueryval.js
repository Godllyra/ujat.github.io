(function(n){function i(n,t){for(var i=window,r=(n||"").split(".");i&&r.length;)i=i[r.shift()];return typeof i=="function"?i:(t.push(n),Function.constructor.apply(null,t))}function u(n){return n==="GET"||n==="POST"}function o(n,t){u(t)||n.setRequestHeader("X-HTTP-Method-Override",t)}function s(t,i,r){var u;r.indexOf("application/x-javascript")===-1&&(u=(t.getAttribute("data-ajax-mode")||"").toUpperCase(),n(t.getAttribute("data-ajax-update")).each(function(t,r){var f;switch(u){case"BEFORE":f=r.firstChild;n("<div />").html(i).contents().each(function(){r.insertBefore(this,f)});break;case"AFTER":n("<div />").html(i).contents().each(function(){r.appendChild(this)});break;case"REPLACE-WITH":n(r).replaceWith(i);break;default:n(r).html(i)}}))}function f(t,r){var e,h,f,c;(e=t.getAttribute("data-ajax-confirm"),!e||window.confirm(e))&&(h=n(t.getAttribute("data-ajax-loading")),c=parseInt(t.getAttribute("data-ajax-loading-duration"),10)||0,n.extend(r,{type:t.getAttribute("data-ajax-method")||undefined,url:t.getAttribute("data-ajax-url")||undefined,cache:!!t.getAttribute("data-ajax-cache"),beforeSend:function(n){var r;return o(n,f),r=i(t.getAttribute("data-ajax-begin"),["xhr"]).apply(t,arguments),r!==!1&&h.show(c),r},complete:function(){h.hide(c);i(t.getAttribute("data-ajax-complete"),["xhr","status"]).apply(t,arguments)},success:function(n,r,u){s(t,n,u.getResponseHeader("Content-Type")||"text/html");i(t.getAttribute("data-ajax-success"),["data","status","xhr"]).apply(t,arguments)},error:function(){i(t.getAttribute("data-ajax-failure"),["xhr","status","error"]).apply(t,arguments)}}),r.data.push({name:"X-Requested-With",value:"XMLHttpRequest"}),f=r.type.toUpperCase(),u(f)||(r.type="POST",r.data.push({name:"X-HTTP-Method-Override",value:f})),n.ajax(r))}function h(t){var i=n(t).data(e);return!i||!i.validate||i.validate()}var t="unobtrusiveAjaxClick",r="unobtrusiveAjaxClickTarget",e="unobtrusiveValidation";n(document).on("click","a[data-ajax=true]",function(n){n.preventDefault();f(this,{url:this.href,type:"GET",data:[]})});n(document).on("click","form[data-ajax=true] input[type=image]",function(i){var r=i.target.name,u=n(i.target),f=n(u.parents("form")[0]),e=u.offset();f.data(t,[{name:r+".x",value:Math.round(i.pageX-e.left)},{name:r+".y",value:Math.round(i.pageY-e.top)}]);setTimeout(function(){f.removeData(t)},0)});n(document).on("click","form[data-ajax=true] :submit",function(i){var f=i.currentTarget.name,e=n(i.target),u=n(e.parents("form")[0]);u.data(t,f?[{name:f,value:i.currentTarget.value}]:[]);u.data(r,e);setTimeout(function(){u.removeData(t);u.removeData(r)},0)});n(document).on("submit","form[data-ajax=true]",function(i){var e=n(this).data(t)||[],u=n(this).data(r),o=u&&u.hasClass("cancel");(i.preventDefault(),o||h(this))&&f(this,{url:this.action,type:this.method||"GET",data:e.concat(n(this).serializeArray())})})})(jQuery);!function(n){"function"==typeof define&&define.amd?define(["jquery"],n):n(jQuery)}(function(n){n.extend(n.fn,{validate:function(t){if(!this.length)return void(t&&t.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var i=n.data(this[0],"validator");return i?i:(this.attr("novalidate","novalidate"),i=new n.validator(t,this[0]),n.data(this[0],"validator",i),i.settings.onsubmit&&(this.validateDelegate(":submit","click",function(t){i.settings.submitHandler&&(i.submitButton=t.target);n(t.target).hasClass("cancel")&&(i.cancelSubmit=!0);void 0!==n(t.target).attr("formnovalidate")&&(i.cancelSubmit=!0)}),this.submit(function(t){function r(){var r;return i.settings.submitHandler?(i.submitButton&&(r=n("<input type='hidden'/>").attr("name",i.submitButton.name).val(n(i.submitButton).val()).appendTo(i.currentForm)),i.settings.submitHandler.call(i,i.currentForm,t),i.submitButton&&r.remove(),!1):!0}return i.settings.debug&&t.preventDefault(),i.cancelSubmit?(i.cancelSubmit=!1,r()):i.form()?i.pendingRequest?(i.formSubmitted=!0,!1):r():(i.focusInvalid(),!1)})),i)},valid:function(){var t,i;return n(this[0]).is("form")?t=this.validate().form():(t=!0,i=n(this[0].form).validate(),this.each(function(){t=i.element(this)&&t})),t},removeAttrs:function(t){var i={},r=this;return n.each(t.split(/\s/),function(n,t){i[t]=r.attr(t);r.removeAttr(t)}),i},rules:function(t,i){var e,s,f,u,o,h,r=this[0];if(t)switch(e=n.data(r.form,"validator").settings,s=e.rules,f=n.validator.staticRules(r),t){case"add":n.extend(f,n.validator.normalizeRule(i));delete f.messages;s[r.name]=f;i.messages&&(e.messages[r.name]=n.extend(e.messages[r.name],i.messages));break;case"remove":return i?(h={},n.each(i.split(/\s/),function(t,i){h[i]=f[i];delete f[i];"required"===i&&n(r).removeAttr("aria-required")}),h):(delete s[r.name],f)}return u=n.validator.normalizeRules(n.extend({},n.validator.classRules(r),n.validator.attributeRules(r),n.validator.dataRules(r),n.validator.staticRules(r)),r),u.required&&(o=u.required,delete u.required,u=n.extend({required:o},u),n(r).attr("aria-required","true")),u.remote&&(o=u.remote,delete u.remote,u=n.extend(u,{remote:o})),u}});n.extend(n.expr[":"],{blank:function(t){return!n.trim(""+n(t).val())},filled:function(t){return!!n.trim(""+n(t).val())},unchecked:function(t){return!n(t).prop("checked")}});n.validator=function(t,i){this.settings=n.extend(!0,{},n.validator.defaults,t);this.currentForm=i;this.init()};n.validator.format=function(t,i){return 1===arguments.length?function(){var i=n.makeArray(arguments);return i.unshift(t),n.validator.format.apply(this,i)}:(arguments.length>2&&i.constructor!==Array&&(i=n.makeArray(arguments).slice(1)),i.constructor!==Array&&(i=[i]),n.each(i,function(n,i){t=t.replace(new RegExp("\\{"+n+"\\}","g"),function(){return i})}),t)};n.extend(n.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:n([]),errorLabelContainer:n([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(n){this.lastActive=n;this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,n,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(n)))},onfocusout:function(n){!this.checkable(n)&&(n.name in this.submitted||!this.optional(n))&&this.element(n)},onkeyup:function(n,t){(9!==t.which||""!==this.elementValue(n))&&(n.name in this.submitted||n===this.lastElement)&&this.element(n)},onclick:function(n){n.name in this.submitted?this.element(n):n.parentNode.name in this.submitted&&this.element(n.parentNode)},highlight:function(t,i,r){"radio"===t.type?this.findByName(t.name).addClass(i).removeClass(r):n(t).addClass(i).removeClass(r)},unhighlight:function(t,i,r){"radio"===t.type?this.findByName(t.name).removeClass(i).addClass(r):n(t).removeClass(i).addClass(r)}},setDefaults:function(t){n.extend(n.validator.defaults,t)},messages:{required:"Campo requerido.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:n.validator.format("Please enter no more than {0} characters."),minlength:n.validator.format("Please enter at least {0} characters."),rangelength:n.validator.format("Please enter a value between {0} and {1} characters long."),range:n.validator.format("Please enter a value between {0} and {1}."),max:n.validator.format("Please enter a value less than or equal to {0}."),min:n.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function i(t){var r=n.data(this[0].form,"validator"),u="on"+t.type.replace(/^validate/,""),i=r.settings;i[u]&&!this.is(i.ignore)&&i[u].call(r,this[0],t)}this.labelContainer=n(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||n(this.currentForm);this.containers=n(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var t,r=this.groups={};n.each(this.settings.groups,function(t,i){"string"==typeof i&&(i=i.split(/\s/));n.each(i,function(n,i){r[i]=t})});t=this.settings.rules;n.each(t,function(i,r){t[i]=n.validator.normalizeRule(r)});n(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",i).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",i);this.settings.invalidHandler&&n(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);n(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),n.extend(this.submitted,this.errorMap),this.invalid=n.extend({},this.errorMap),this.valid()||n(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var n=0,t=this.currentElements=this.elements();t[n];n++)this.check(t[n]);return this.valid()},element:function(t){var u=this.clean(t),i=this.validationTargetFor(u),r=!0;return this.lastElement=i,void 0===i?delete this.invalid[u.name]:(this.prepareElement(i),this.currentElements=n(i),r=this.check(i)!==!1,r?delete this.invalid[i.name]:this.invalid[i.name]=!0),n(t).attr("aria-invalid",!r),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),r},showErrors:function(t){if(t){n.extend(this.errorMap,t);this.errorList=[];for(var i in t)this.errorList.push({message:t[i],element:this.findByName(i)[0]});this.successList=n.grep(this.successList,function(n){return!(n.name in t)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){n.fn.resetForm&&n(this.currentForm).resetForm();this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(n){var i,t=0;for(i in n)t++;return t},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(n){n.not(this.containers).text("");this.addWrapper(n).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{n(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(t){}},findLastActive:function(){var t=this.lastActive;return t&&1===n.grep(this.errorList,function(n){return n.element.name===t.name}).length&&t},elements:function(){var t=this,i={};return n(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&t.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in i||!t.objectLength(n(this).rules())?!1:(i[this.name]=!0,!0)})},clean:function(t){return n(t)[0]},errors:function(){var t=this.settings.errorClass.split(" ").join(".");return n(this.settings.errorElement+"."+t,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=n([]);this.toHide=n([]);this.currentElements=n([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(n){this.reset();this.toHide=this.errorsFor(n)},elementValue:function(t){var i,u=n(t),r=t.type;return"radio"===r||"checkbox"===r?n("input[name='"+t.name+"']:checked").val():"number"===r&&"undefined"!=typeof t.validity?t.validity.badInput?!1:u.val():(i=u.val(),"string"==typeof i?i.replace(/\r/g,""):i)},check:function(t){t=this.validationTargetFor(this.clean(t));var i,r,u,f=n(t).rules(),s=n.map(f,function(n,t){return t}).length,e=!1,h=this.elementValue(t);for(r in f){u={method:r,parameters:f[r]};try{if(i=n.validator.methods[r].call(this,h,t,u.parameters),"dependency-mismatch"===i&&1===s){e=!0;continue}if(e=!1,"pending"===i)return void(this.toHide=this.toHide.not(this.errorsFor(t)));if(!i)return this.formatAndAdd(t,u),!1}catch(o){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+t.id+", check the '"+u.method+"' method.",o),o;}}if(!e)return this.objectLength(f)&&this.successList.push(t),!0},customDataMessage:function(t,i){return n(t).data("msg"+i.charAt(0).toUpperCase()+i.substring(1).toLowerCase())||n(t).data("msg")},customMessage:function(n,t){var i=this.settings.messages[n];return i&&(i.constructor===String?i:i[t])},findDefined:function(){for(var n=0;n<arguments.length;n++)if(void 0!==arguments[n])return arguments[n];return void 0},defaultMessage:function(t,i){return this.findDefined(this.customMessage(t.name,i),this.customDataMessage(t,i),!this.settings.ignoreTitle&&t.title||void 0,n.validator.messages[i],"<strong>Warning: No message defined for "+t.name+"<\/strong>")},formatAndAdd:function(t,i){var r=this.defaultMessage(t,i.method),u=/\$?\{(\d+)\}/g;"function"==typeof r?r=r.call(this,i.parameters,t):u.test(r)&&(r=n.validator.format(r.replace(u,"{$1}"),i.parameters));this.errorList.push({message:r,element:t,method:i.method});this.errorMap[t.name]=r;this.submitted[t.name]=r},addWrapper:function(n){return this.settings.wrapper&&(n=n.add(n.parent(this.settings.wrapper))),n},defaultShowErrors:function(){for(var i,t,n=0;this.errorList[n];n++)t=this.errorList[n],this.settings.highlight&&this.settings.highlight.call(this,t.element,this.settings.errorClass,this.settings.validClass),this.showLabel(t.element,t.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(n=0;this.successList[n];n++)this.showLabel(this.successList[n]);if(this.settings.unhighlight)for(n=0,i=this.validElements();i[n];n++)this.settings.unhighlight.call(this,i[n],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return n(this.errorList).map(function(){return this.element})},showLabel:function(t,i){var u,o,e,r=this.errorsFor(t),s=this.idOrName(t),f=n(t).attr("aria-describedby");r.length?(r.removeClass(this.settings.validClass).addClass(this.settings.errorClass),r.html(i)):(r=n("<"+this.settings.errorElement+">").attr("id",s+"-error").addClass(this.settings.errorClass).html(i||""),u=r,this.settings.wrapper&&(u=r.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(u):this.settings.errorPlacement?this.settings.errorPlacement(u,n(t)):u.insertAfter(t),r.is("label")?r.attr("for",s):0===r.parents("label[for='"+s+"']").length&&(e=r.attr("id"),f?f.match(new RegExp("\b"+e+"\b"))||(f+=" "+e):f=e,n(t).attr("aria-describedby",f),o=this.groups[t.name],o&&n.each(this.groups,function(t,i){i===o&&n("[name='"+t+"']",this.currentForm).attr("aria-describedby",r.attr("id"))})));!i&&this.settings.success&&(r.text(""),"string"==typeof this.settings.success?r.addClass(this.settings.success):this.settings.success(r,t));this.toShow=this.toShow.add(r)},errorsFor:function(t){var r=this.idOrName(t),u=n(t).attr("aria-describedby"),i="label[for='"+r+"'], label[for='"+r+"'] *";return u&&(i=i+", #"+u.replace(/\s+/g,", #")),this.errors().filter(i)},idOrName:function(n){return this.groups[n.name]||(this.checkable(n)?n.name:n.id||n.name)},validationTargetFor:function(n){return this.checkable(n)&&(n=this.findByName(n.name).not(this.settings.ignore)[0]),n},checkable:function(n){return/radio|checkbox/i.test(n.type)},findByName:function(t){return n(this.currentForm).find("[name='"+t+"']")},getLength:function(t,i){switch(i.nodeName.toLowerCase()){case"select":return n("option:selected",i).length;case"input":if(this.checkable(i))return this.findByName(i.name).filter(":checked").length}return t.length},depend:function(n,t){return this.dependTypes[typeof n]?this.dependTypes[typeof n](n,t):!0},dependTypes:{boolean:function(n){return n},string:function(t,i){return!!n(t,i.form).length},"function":function(n,t){return n(t)}},optional:function(t){var i=this.elementValue(t);return!n.validator.methods.required.call(this,i,t)&&"dependency-mismatch"},startRequest:function(n){this.pending[n.name]||(this.pendingRequest++,this.pending[n.name]=!0)},stopRequest:function(t,i){this.pendingRequest--;this.pendingRequest<0&&(this.pendingRequest=0);delete this.pending[t.name];i&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(n(this.currentForm).submit(),this.formSubmitted=!1):!i&&0===this.pendingRequest&&this.formSubmitted&&(n(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(t){return n.data(t,"previousValue")||n.data(t,"previousValue",{old:null,valid:!0,message:this.defaultMessage(t,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(t,i){t.constructor===String?this.classRuleSettings[t]=i:n.extend(this.classRuleSettings,t)},classRules:function(t){var i={},r=n(t).attr("class");return r&&n.each(r.split(" "),function(){this in n.validator.classRuleSettings&&n.extend(i,n.validator.classRuleSettings[this])}),i},attributeRules:function(t){var r,i,u={},e=n(t),f=t.getAttribute("type");for(r in n.validator.methods)"required"===r?(i=t.getAttribute(r),""===i&&(i=!0),i=!!i):i=e.attr(r),/min|max/.test(r)&&(null===f||/number|range|text/.test(f))&&(i=Number(i)),i||0===i?u[r]=i:f===r&&"range"!==f&&(u[r]=!0);return u.maxlength&&/-1|2147483647|524288/.test(u.maxlength)&&delete u.maxlength,u},dataRules:function(t){var i,r,u={},f=n(t);for(i in n.validator.methods)r=f.data("rule"+i.charAt(0).toUpperCase()+i.substring(1).toLowerCase()),void 0!==r&&(u[i]=r);return u},staticRules:function(t){var i={},r=n.data(t.form,"validator");return r.settings.rules&&(i=n.validator.normalizeRule(r.settings.rules[t.name])||{}),i},normalizeRules:function(t,i){return n.each(t,function(r,u){if(u===!1)return void delete t[r];if(u.param||u.depends){var f=!0;switch(typeof u.depends){case"string":f=!!n(u.depends,i.form).length;break;case"function":f=u.depends.call(i,i)}f?t[r]=void 0!==u.param?u.param:!0:delete t[r]}}),n.each(t,function(r,u){t[r]=n.isFunction(u)?u(i):u}),n.each(["minlength","maxlength"],function(){t[this]&&(t[this]=Number(t[this]))}),n.each(["rangelength","range"],function(){var i;t[this]&&(n.isArray(t[this])?t[this]=[Number(t[this][0]),Number(t[this][1])]:"string"==typeof t[this]&&(i=t[this].replace(/[\[\]]/g,"").split(/[\s,]+/),t[this]=[Number(i[0]),Number(i[1])]))}),n.validator.autoCreateRanges&&(t.min&&t.max&&(t.range=[t.min,t.max],delete t.min,delete t.max),t.minlength&&t.maxlength&&(t.rangelength=[t.minlength,t.maxlength],delete t.minlength,delete t.maxlength)),t},normalizeRule:function(t){if("string"==typeof t){var i={};n.each(t.split(/\s/),function(){i[this]=!0});t=i}return t},addMethod:function(t,i,r){n.validator.methods[t]=i;n.validator.messages[t]=void 0!==r?r:n.validator.messages[t];i.length<3&&n.validator.addClassRules(t,n.validator.normalizeRule(t))},methods:{required:function(t,i,r){if(!this.depend(r,i))return"dependency-mismatch";if("select"===i.nodeName.toLowerCase()){var u=n(i).val();return u&&u.length>0}return this.checkable(i)?this.getLength(t,i)>0:n.trim(t).length>0},email:function(n,t){return this.optional(t)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(n)},url:function(n,t){return this.optional(t)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(n)},date:function(n,t){return this.optional(t)||!/Invalid|NaN/.test(new Date(n).toString())},dateISO:function(n,t){return this.optional(t)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(n)},number:function(n,t){return this.optional(t)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(n)},digits:function(n,t){return this.optional(t)||/^\d+$/.test(n)},creditcard:function(n,t){if(this.optional(t))return"dependency-mismatch";if(/[^0-9 \-]+/.test(n))return!1;var i,f,e=0,r=0,u=!1;if(n=n.replace(/\D/g,""),n.length<13||n.length>19)return!1;for(i=n.length-1;i>=0;i--)f=n.charAt(i),r=parseInt(f,10),u&&(r*=2)>9&&(r-=9),e+=r,u=!u;return e%10==0},minlength:function(t,i,r){var u=n.isArray(t)?t.length:this.getLength(n.trim(t),i);return this.optional(i)||u>=r},maxlength:function(t,i,r){var u=n.isArray(t)?t.length:this.getLength(n.trim(t),i);return this.optional(i)||r>=u},rangelength:function(t,i,r){var u=n.isArray(t)?t.length:this.getLength(n.trim(t),i);return this.optional(i)||u>=r[0]&&u<=r[1]},min:function(n,t,i){return this.optional(t)||n>=i},max:function(n,t,i){return this.optional(t)||i>=n},range:function(n,t,i){return this.optional(t)||n>=i[0]&&n<=i[1]},equalTo:function(t,i,r){var u=n(r);return this.settings.onfocusout&&u.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){n(i).valid()}),t===u.val()},remote:function(t,i,r){if(this.optional(i))return"dependency-mismatch";var u,e,f=this.previousValue(i);return this.settings.messages[i.name]||(this.settings.messages[i.name]={}),f.originalMessage=this.settings.messages[i.name].remote,this.settings.messages[i.name].remote=f.message,r="string"==typeof r&&{url:r}||r,f.old===t?f.valid:(f.old=t,u=this,this.startRequest(i),e={},e[i.name]=t,n.ajax(n.extend(!0,{url:r,mode:"abort",port:"validate"+i.name,dataType:"json",data:e,context:u.currentForm,success:function(r){var o,e,h,s=r===!0||"true"===r;u.settings.messages[i.name].remote=f.originalMessage;s?(h=u.formSubmitted,u.prepareElement(i),u.formSubmitted=h,u.successList.push(i),delete u.invalid[i.name],u.showErrors()):(o={},e=r||u.defaultMessage(i,"remote"),o[i.name]=f.message=n.isFunction(e)?e(t):e,u.invalid[i.name]=!0,u.showErrors(o));f.valid=s;u.stopRequest(i,s)}},r)),"pending")}}});n.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead.";};var i,t={};n.ajaxPrefilter?n.ajaxPrefilter(function(n,i,r){var u=n.port;"abort"===n.mode&&(t[u]&&t[u].abort(),t[u]=r)}):(i=n.ajax,n.ajax=function(r){var f=("mode"in r?r:n.ajaxSettings).mode,u=("port"in r?r:n.ajaxSettings).port;return"abort"===f?(t[u]&&t[u].abort(),t[u]=i.apply(this,arguments),t[u]):i.apply(this,arguments)});n.extend(n.fn,{validateDelegate:function(t,i,r){return this.bind(i,function(i){var u=n(i.target);if(u.is(t))return r.apply(u,arguments)})}})}),function(n){function i(n,t,i){n.rules[t]=i;n.message&&(n.messages[t]=n.message)}function h(n){return n.replace(/^\s+|\s+$/g,"").split(/\s*,\s*/g)}function f(n){return n.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g,"\\$1")}function e(n){return n.substr(0,n.lastIndexOf(".")+1)}function o(n,t){return n.indexOf("*.")===0&&(n=n.replace("*.",t)),n}function c(t,i){var r=n(this).find("[data-valmsg-for='"+f(i[0].name)+"']"),u=r.attr("data-valmsg-replace"),e=u?n.parseJSON(u)!==!1:null;r.removeClass("field-validation-valid").addClass("field-validation-error");t.data("unobtrusiveContainer",r);e?(r.empty(),t.removeClass("input-validation-error").appendTo(r)):t.hide()}function l(t,i){var u=n(this).find("[data-valmsg-summary=true]"),r=u.find("ul");r&&r.length&&i.errorList.length&&(r.empty(),u.addClass("validation-summary-errors").removeClass("validation-summary-valid"),n.each(i.errorList,function(){n("<li />").html(this.message).appendTo(r)}))}function a(t){var i=t.data("unobtrusiveContainer"),r=i.attr("data-valmsg-replace"),u=r?n.parseJSON(r):null;i&&(i.addClass("field-validation-valid").removeClass("field-validation-error"),t.removeData("unobtrusiveContainer"),u&&i.empty())}function v(){var t=n(this);t.data("validator").resetForm();t.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors");t.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer")}function s(t){var i=n(t),f=i.data(u),s=n.proxy(v,t),e=r.unobtrusive.options||{},o=function(i,r){var u=e[i];u&&n.isFunction(u)&&u.apply(t,r)};return f||(f={options:{errorClass:e.errorClass||"input-validation-error",errorElement:e.errorElement||"span",errorPlacement:function(){c.apply(t,arguments);o("errorPlacement",arguments)},invalidHandler:function(){l.apply(t,arguments);o("invalidHandler",arguments)},messages:{},rules:{},success:function(){a.apply(t,arguments);o("success",arguments)}},attachValidation:function(){i.off("reset."+u,s).on("reset."+u,s).validate(this.options)},validate:function(){return i.validate(),i.valid()}},i.data(u,f)),f}var r=n.validator,t,u="unobtrusiveValidation";r.unobtrusive={adapters:[],parseElement:function(t,i){var u=n(t),f=u.parents("form")[0],r,e,o;f&&(r=s(f),r.options.rules[t.name]=e={},r.options.messages[t.name]=o={},n.each(this.adapters,function(){var i="data-val-"+this.name,r=u.attr(i),s={};r!==undefined&&(i+="-",n.each(this.params,function(){s[this]=u.attr(i+this)}),this.adapt({element:t,form:f,message:r,params:s,rules:e,messages:o}))}),n.extend(e,{__dummy__:!0}),i||r.attachValidation())},parse:function(t){var i=n(t),u=i.parents().addBack().filter("form").add(i.find("form")).has("[data-val=true]");i.find("[data-val=true]").each(function(){r.unobtrusive.parseElement(this,!0)});u.each(function(){var n=s(this);n&&n.attachValidation()})}};t=r.unobtrusive.adapters;t.add=function(n,t,i){return i||(i=t,t=[]),this.push({name:n,params:t,adapt:i}),this};t.addBool=function(n,t){return this.add(n,function(r){i(r,t||n,!0)})};t.addMinMax=function(n,t,r,u,f,e){return this.add(n,[f||"min",e||"max"],function(n){var f=n.params.min,e=n.params.max;f&&e?i(n,u,[f,e]):f?i(n,t,f):e&&i(n,r,e)})};t.addSingleVal=function(n,t,r){return this.add(n,[t||"val"],function(u){i(u,r||n,u.params[t])})};r.addMethod("__dummy__",function(){return!0});r.addMethod("regex",function(n,t,i){var r;return this.optional(t)?!0:(r=new RegExp(i).exec(n),r&&r.index===0&&r[0].length===n.length)});r.addMethod("nonalphamin",function(n,t,i){var r;return i&&(r=n.match(/\W/g),r=r&&r.length>=i),r});r.methods.extension?(t.addSingleVal("accept","mimtype"),t.addSingleVal("extension","extension")):t.addSingleVal("extension","extension","accept");t.addSingleVal("regex","pattern");t.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");t.addMinMax("length","minlength","maxlength","rangelength").addMinMax("range","min","max","range");t.addMinMax("minlength","minlength").addMinMax("maxlength","minlength","maxlength");t.add("equalto",["other"],function(t){var r=e(t.element.name),u=t.params.other,s=o(u,r),h=n(t.form).find(":input").filter("[name='"+f(s)+"']")[0];i(t,"equalTo",h)});t.add("required",function(n){(n.element.tagName.toUpperCase()!=="INPUT"||n.element.type.toUpperCase()!=="CHECKBOX")&&i(n,"required",!0)});t.add("remote",["url","type","additionalfields"],function(t){var r={url:t.params.url,type:t.params.type||"GET",data:{}},u=e(t.element.name);n.each(h(t.params.additionalfields||t.element.name),function(i,e){var s=o(e,u);r.data[s]=function(){return n(t.form).find(":input").filter("[name='"+f(s)+"']").val()}});i(t,"remote",r)});t.add("password",["min","nonalphamin","regex"],function(n){n.params.min&&i(n,"minlength",n.params.min);n.params.nonalphamin&&i(n,"nonalphamin",n.params.nonalphamin);n.params.regex&&i(n,"regex",n.params.regex)});n(function(){r.unobtrusive.parse(document)})}(jQuery)