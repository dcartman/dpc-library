/**
 * User: danielcarter
 * Date: 10/12/11
 * Time: 3:46 PM
 * This object manages Adding and Building nested items in a form.
 * TODO:: Manage the removal of items?
 * NOTE:: I'm not sure if this object should also handle the removal of nested items.
 *        I think the nested Item should handle it's own removal. However if I make this
 *        the parent object of all nested items and rename this to NestedItem having remove
 *        here.
 *        However it then defeats it's purpose as a button for nested items.
 *        Maybe I should create Nest object?
 */

/**
 * @param ele DOMElement
 * @param $h  -- { nest: DOMElement, eggClass: string, template: string }
 */
function AddNestedItem(ele, $h) {
    var me = this,
        $h = $h || {},
        selector = this.selector || 'input, textarea';
    this.element = ele || document.createElement("span");
    this.element.object = this;

    for (var p in $h) {
        this[p] = $h[p];
    };

    this.nest = this.nest || "";
    this.eggClass = this.eggClass || "nested-item";
    this.template = this.template || "";
    this.callback = this.callback || function(egg) {};

    this.element.addEventListener("click", this.add, false);

};

AddNestedItem.prototype.add = function(evt){
    var ele = (evt.currentTarget) ? evt.currentTarget : evt.srcElement,
        me = ele.object,
        new_egg = me.createItem(),
        egg = $(me.nest).append(new_egg);
    me.callback(egg[0])
};

AddNestedItem.prototype.createItem = function() {
    var me = this,
        new_id = me.countNest();
    return me.decodeHTML(me.template.replace(/NEW_RECORD/g, new_id));
};

AddNestedItem.prototype.countNest = function() {
    var me = this;
    return me.nest.getElementsByClassName(me.eggClass).length;
};

AddNestedItem.prototype.decodeHTML = function(s) {
    var s = s || this.template,
        g = document.createElement('span');
    g.innerHTML = s;
    return g.firstChild.nodeValue;
};
