 import { assert } from 'chai';

/**
 * ES7 FEATURE !! Spread properties for object literals
 * https://github.com/sebmarkbage/ecmascript-rest-spread/blob/master/Spread.md
 */

 import { assert } from 'chai';

 // To do: make all tests pass, leave the assert lines unchanged!
 describe('Spread properties for object literals', () => {

   it('shallows a clone (excluding prototype)', () => {
     let a = {id: 1, name: 'Bert'};
     let aClone = { a }; // let aClone = Object.assign({}, a);
     assert.notStrictEqual(aClone, a);
     assert.deepEqual(aClone, a);
     assert.strictEqual(a.id, aClone.id);
     assert.strictEqual(a.name, aClone.name);
   });

   it('merges two objects', () => {
     let a = {id: 1, name: 'Bert'};
     let b = {courses: ['ES6', 'Reactjs', 'Redux'], college: 'Hogent'};
     let ab = { ...a }; // let ab = Object.assign({}, a, b);
     assert.typeOf(ab, 'object');
     assert.strictEqual(ab.id, 1);
     assert.strictEqual(ab.name, 'Bert');
     assert.strictEqual(ab.college, 'Hogent');
     assert.isArray(ab.courses);
     assert.strictEqual(ab.courses, b.courses);
   });

   it('overrides properties', () => {
     let a = {id: 1, name: 'Bert'};
     let aWithOverrides = { name: 'Joeri', ...a }; // let aWithOverrides = Object.assign({}, a, { name: 'Joeri'});
     assert.strictEqual(aWithOverrides.id, 1);
     assert.strictEqual(aWithOverrides.name, 'Joeri');
     // Equivalent to
     aWithOverrides = { a, ...{ name: 'Joeri' } };
     assert.strictEqual(aWithOverrides.id, 1);
     assert.strictEqual(aWithOverrides.name, 'Joeri');
     // Equivalent to
     let name = 'Joeri'; aWithOverrides = { ...a, name };
     assert.strictEqual(aWithOverrides.id, 1);
     assert.strictEqual(aWithOverrides.name, 'Joeri');

   });

   it('has a shorthand for default properties', () => {
     let a = {x: 2};
     let aWithDefaults = { ...a, x: 1, y: 2 }; // let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);
     assert.strictEqual(aWithDefaults.x, 2);
     assert.strictEqual(aWithDefaults.y, 2);

   });

   it('updates deep immutable objects', () => {
     let previousVersion = {
       id: 1,
       profession: 'Developer',
       name: 'Joeri Van Steen',
       address: {
         street: 'XXXX',
         nr: 0,
         zipCode: '11111'
       },
       items: [{ title: 'ES6' }, { title: 'Reactjs' } ]
     };

     let newVersion = {
       ...previousVersion,
       name: 'Bert', // Override the name property
       address: { ...previousVersion.address, zipCode: '99999' }, // Update nested zip code
       items: [previousVersion.items, { title: 'New Item' }] // Add an item to the list of items
     };

     assert.strictEqual(newVersion.id, 1);
     assert.strictEqual(newVersion.profession, 'Developer');
     assert.strictEqual(newVersion.name, 'Bert');
     assert.strictEqual(newVersion.address.street, 'XXXX');
     assert.strictEqual(newVersion.address.nr, 0);
     assert.strictEqual(newVersion.address.zipCode, '99999');
     assert.strictEqual(newVersion.items[0].title, 'ES6');
     assert.strictEqual(newVersion.items[1].title, 'Reactjs');
     assert.strictEqual(newVersion.items[2].title, 'New Item');
   });

 });
