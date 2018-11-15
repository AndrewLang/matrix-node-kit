


class Person {

    constructor(public Name: string, public Age: number) {

    }
}
describe('ArrayExtensions', () => {

    let array = [];

    beforeEach(async(() => {
        array = [];
    }));

    it('Add', async(() => {
        array.Add('test');
        expect(array.length).toBe(1);
    }));
    it('Where with string', async(() => {
        array.Add('test');
        array.Add('a');
        array.Add('ab');

        let actual = array.Where(x => x.length > 2);

        expect(actual.length).toBe(1);
    }));
    it('Where with object', async(() => {
        array.Add(new Person('andy', 30));
        array.Add(new Person('andrew', 40));
        let actual = array.Where(x => x.Age > 30);
        expect(actual.length).toBe(1);
    }));
    it('Count', async(() => {
        array.Add('test');
        expect(array.Count()).toBe(1);
    }));
    it('ElementAt', async(() => {
        array.Add('test');
        expect(array.ElementAt(0)).toBe('test');
    }));
    it('FirstOrDefault', async(() => {
        array.Add(new Person('andy', 30));
        array.Add(new Person('andrew', 40));
        let actual = array.FirstOrDefault(x => x.Age === 30);
        expect(actual.Name).toBe('andy');

        actual = array.FirstOrDefault(x => x.Age === 50);
        expect(actual).toBeNull();
    }));
    it('Max', async(() => {
        array.Add(20);
        array.Add(210);
        expect(array.Max()).toBe(210);
    }));
    it('Min', async(() => {
        array.Add(20);
        array.Add(210);
        expect(array.Min()).toBe(20);
    }));
    it('OrderBy', async(() => {
        array.Add(new Person('alex', 50));
        array.Add(new Person('andy', 41));
        array.Add(new Person('andrew', 40));
        let actual = array.OrderBy(x => x.Age);
        expect(actual.ElementAt(0).Age).toBe(40);
        expect(actual.ElementAt(1).Age).toBe(41);
        expect(actual.ElementAt(2).Age).toBe(50);
    }));
    it('OrderByDescending', async(() => {
        array.Add(new Person('alex', 40));
        array.Add(new Person('andy', 41));
        array.Add(new Person('andrew', 50));
        let actual = array.OrderByDescending(x => x.Age);
        expect(actual.ElementAt(0).Age).toBe(50);
        expect(actual.ElementAt(1).Age).toBe(41);
        expect(actual.ElementAt(2).Age).toBe(40);
    }));
    it('Select', async(() => {
        array.Add(new Person('alex', 50));
        array.Add(new Person('andy', 41));
        array.Add(new Person('andrew', 40));
        let actual = array.Select(x => x.Age);
        expect(actual.ElementAt(0)).toBe(50);
        expect(actual.ElementAt(1)).toBe(41);
        expect(actual.ElementAt(2)).toBe(40);
    }));
});