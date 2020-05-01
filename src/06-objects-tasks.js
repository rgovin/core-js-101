/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  // throw new Error('Not implemented');
  return {
    width,
    height,
    getArea() {
      return this.width * this.height;
    },
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  // throw new Error('Not implemented');
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  // throw new Error('Not implemented');
  const o = Object.create(proto);
  return Object.assign(o, JSON.parse(json));
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, stringify() method to output the string repsentation
 * according to css specificationindependent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the .
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  order: ['element', 'id', 'class', 'attribute', 'pseudo-class', 'pseudo-element', 'combine'],
  cantDouble: ['element', 'id', 'pseudo-element'],
  stack: [],
  clearStack() {
    return this.stack.splice(0, this.stack.length).map((el) => el.value).join('');
  },
  canDouble() {
    return this.stack
      .map((el) => el.type)
      .filter((el, i, arr) => arr.indexOf(el) !== i)
      .every((el) => this.cantDouble.indexOf(el) === -1);
  },
  isOrderValid() {
    if (this.stack.length === 1) {
      return true;
    }
    return this.stack
      .map((el) => el.type)
      .filter((el, i, arr) => arr.indexOf(el) === i)
      .every((el, i, arr) => this.order.indexOf(el) > this.order.indexOf(arr[i - 1]));
  },

  add(type, ...value) {
    const newBuilder = { ...this };

    newBuilder.stack = this.stack.concat({ type, value: value.join('') });

    if (!newBuilder.canDouble()) newBuilder.DoubleError();
    if (!newBuilder.isOrderValid()) newBuilder.OrderError();

    return newBuilder;
  },

  element(value) {
    // throw new Error('Not implemented');
    return this.add('element', value);
  },

  OrderError() {
    throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
  },

  DoubleError() {
    throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
  },

  id(value) {
    // throw new Error('Not implemented');
    return this.add('id', `#${value}`);
  },

  class(value) {
    // throw new Error('Not implemented');
    return this.add('class', `.${value}`);
  },

  attr(value) {
    // throw new Error('Not implemented');
    return this.add('attribute', `[${value}]`);
  },

  pseudoClass(value) {
    // throw new Error('Not implemented');
    return this.add('pseudo-class', `:${value}`);
  },

  pseudoElement(value) {
    // throw new Error('Not implemented');
    return this.add('pseudo-element', `::${value}`);
  },

  combine(selector1, combinator, selector2) {
    // throw new Error('Not implemented');
    return this.add('combine', selector1.stringify(), ` ${combinator} `, selector2.stringify());
  },

  stringify() {
    return this.clearStack();
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
