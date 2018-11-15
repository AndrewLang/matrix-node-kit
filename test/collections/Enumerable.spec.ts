import { TestBed, async } from '@angular/core/testing';
import { Enumerable } from './Enumerable';
import { IEnumerable } from '../../src/collections/IEnumerable';
import { List } from '../../src/collections/List';
import { CollectionExtensions } from '../../src/collections/CollectionExtensions';
import { Type } from '@angular/core';

class Person {
    Name: string;
    Age: number;
}

class PersonFactory {
    static GeneratePersons(): IEnumerable<Person> {
        let items = new List<Person>();

        let item = new Person();
        item.Age = 40;
        item.Name = 'test';

        let item1 = new Person();
        item1.Age = 41;
        item1.Name = 'test1';

        let item2 = new Person();
        item2.Age = 20;
        item2.Name = 'andy';

        items.Add(item);
        items.Add(item1);
        items.Add(item2);

        return items;
    }
}
describe('Enumerable', () => {
    let items: IEnumerable<Person>;

    beforeEach(async(() => {
        items = new Enumerable<Person>();
    }));

    it(`default constructor`, async(() => {
        expect(items).toBeTruthy();
    }));

    it(`set items property value`, async(() => {
        let item = new Person();
        item.Age = 40;
        item.Name = 'test';

        let item1 = new Person();
        item1.Age = 41;
        item1.Name = 'test1';

        let values = [item, item1];

        items.Items = values;


        expect(items).toBeTruthy();
        expect(items.Items.length).toBeTruthy(2);
    }));

    it(`for each item`, async(() => {
        items = PersonFactory.GeneratePersons();

        let count = 0;
        items.ForEach(x => {
            count++;
        });

        expect(count).toEqual(3);
    }));
    it(`sort`, async(() => {
        items = PersonFactory.GeneratePersons();
        items.Sort((x, y) => {
            return x.Age - y.Age;
        });

        expect(items.ElementAt(0).Name).toEqual('andy');
        expect(items.ElementAt(1).Name).toEqual('test');
    }));
    it(`orderby`, async(() => {
        items = PersonFactory.GeneratePersons();
        items.OrderBy(x => x.Age);

        expect(items.ElementAt(0).Name).toEqual('andy');
        expect(items.ElementAt(1).Name).toEqual('test');
    }));
    it(`orderby descending`, async(() => {
        items = PersonFactory.GeneratePersons();
        items.OrderByDescending(x => x.Age);

        expect(items.ElementAt(0).Name).toEqual('test1');
        expect(items.ElementAt(1).Name).toEqual('test');
    }));
    it(`first or default`, async(() => {
        items = PersonFactory.GeneratePersons();
        let actual = items.FirstOrDefault();

        expect(actual).toBeTruthy();
        expect(actual.Name).toEqual('test');
    }));
    it(`find all`, async(() => {
        items = PersonFactory.GeneratePersons();
        let actual = items.FindAll(x => x.Name.Contains('test'));

        expect(actual).toBeTruthy();
        expect(actual.Count).toEqual(2);
    }));

    it(`IsEmpty`, async(() => {
        expect(items.IsEmpty()).toEqual(true);

        items = PersonFactory.GeneratePersons();

        expect(items.IsEmpty()).toEqual(false);
    }));


    it(`Any`, async(() => {
        expect(items.Any()).toEqual(false);

        items = PersonFactory.GeneratePersons();

        expect(items.Any()).toEqual(true);
        expect(items.Any(x => x.Age === 20)).toEqual(true);
        expect(items.Any(x => x.Age === 21)).toEqual(false);
    }));

    it(`Max`, async(() => {

        items = PersonFactory.GeneratePersons();

        expect(items.Max(x => x.Age)).toEqual(41);
    }));
    it(`Min`, async(() => {

        items = PersonFactory.GeneratePersons();

        expect(items.Min(x => x.Age)).toEqual(20);
    }));
    it(`Where`, async(() => {
        items = PersonFactory.GeneratePersons();

        let actual = items.Where(x => x.Name.Contains('test'));

        expect(actual.Count).toEqual(2);

        actual = items.Where(x => x.Name.Contains('andy'));

        expect(actual.Count).toEqual(1);
    }));
    it(`Select`, async(() => {
        items = PersonFactory.GeneratePersons();

        let actual = items.Select<Person, string>(x => x.Name);

        expect(actual.Count).toEqual(3);
        expect(actual.ElementAt(0)).toEqual('test');
        expect(actual.ElementAt(1)).toEqual('test1');
        expect(actual.ElementAt(2)).toEqual('andy');
    }));
    it(`GroupBy`, async(() => {
        const pets = [
            { type: 'Dog', name: 'Spot' },
            { type: 'Cat', name: 'Tiger' },
            { type: 'Dog', name: 'Rover' },
            { type: 'Cat', name: 'Leo' }
        ];
        let list = new List<{ type: string, name: string }>();
        list.AddRange(pets);

        let actual = list.GroupBy(x => x.type, x => x.name);
        console.log(actual);
        let dogGroup = actual.FirstOrDefault(x => x.Key === 'Dog');
        let catGroup = actual.FirstOrDefault(x => x.Key === 'Cat');

        expect(actual.Count).toEqual(2);
        expect(dogGroup.Count).toEqual(2);
        expect(catGroup.Count).toEqual(2);
    }));

    it(`iterator next`, async(() => {
        const pets = [
            { type: 'Dog', name: 'Spot' },
            { type: 'Cat', name: 'Tiger' },
            { type: 'Dog', name: 'Rover' },
            { type: 'Cat', name: 'Leo' }
        ];
        let list = new List<{ type: string, name: string }>();
        list.AddRange(pets);

        let count = 0;

        for (let item of list) {
            console.log(item);
            count++;
        }
        expect(count).toEqual(4);

        count = 0;
        for (let item of list) {
            count++;
        }
        expect(count).toEqual(4);

        let enumerable: IEnumerable<any> = list;
        for (let item of enumerable) {

        }
    }));
});


