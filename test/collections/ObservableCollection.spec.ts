// import { TestBed, async } from '@angular/core/testing';
// import { ObservableCollection } from './ObservableCollection';
// import './CollectionExtensions';

// class Person {
//     Name: string;
//     Age: number;
// }

// describe('ObservableCollection', () => {

//     let collection: ObservableCollection<Person>;

//     beforeEach(async(() => {
//         collection = new ObservableCollection<Person>([]);
//     }));


//     it('default constructor should success', async(() => {
//         expect(collection).toBeTruthy();
//         expect(collection.Count).toEqual(0);
//     }));


//     it(`add one item`, async(() => {
//         let item = new Person();
//         item.Age = 40;
//         item.Name = 'test';
//         let triggered = false;

//         let observe = collection.subscribe(x => { triggered = true; });

//         collection.Add(item);

//         expect(collection.Count).toEqual(1);
//         //expect(triggered).toBe(true);

//         let actual = collection.Values[0];
//         expect(actual).toBeTruthy();
//         expect(actual.Age).toEqual(item.Age);
//         expect(actual.Name).toEqual(item.Name);
//     }));

//     it(`add two items`, async(() => {
//         let item = new Person();
//         item.Age = 40;
//         item.Name = 'test';

//         let item1 = new Person();
//         item1.Age = 41;
//         item1.Name = 'test1';

//         let items = [item, item1];

//         let triggered = false;

//         let observe = collection.subscribe(x => { triggered = true; });

//         collection.AddRange(items);
//         expect(collection.Count).toEqual(2);
//         //expect(triggered).toBe(true);

//         let find = collection.FirstOrDefault(x => x.Age === item.Age);
//         expect(find).toBeTruthy();
//         expect(find.Name).toEqual(item.Name);
//     }));

//     it(`iterator`, async(() => {
//         let item = new Person();
//         item.Age = 40;
//         item.Name = 'test';

//         let item1 = new Person();
//         item1.Age = 41;
//         item1.Name = 'test1';

//         let items = [item, item1];

//         let triggered = false;
//         collection.AddRange(items);

//         let count = 0;
//         for (let i of collection) {
//             count++;
//         }
//         expect(count).toEqual(2);

//     }));
// });
