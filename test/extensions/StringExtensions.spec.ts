
import './StringExtensions';
import { TestBed, async } from '@angular/core/testing';

describe('StringExtensions', () => {

    beforeEach(async(() => {

    }));


    it(`ToLower`, async(() => {
        let actual = 'TEST'.ToLower();

        expect(actual).toEqual('test');
    }));

    it(`ToUpper`, async(() => {
        let actual = 'test'.ToUpper();

        expect(actual).toEqual('TEST');
    }));

    it(`IsNullOrEmpty`, async(() => {
        let actual = String.IsNullOrEmpty('TEST');

        expect(actual).toEqual(false);

        actual = String.IsNullOrEmpty('');
        expect(actual).toEqual(true);
    }));
    it('Count words', async(() => {
        let count = 'hello world'.CountWord();

        expect(count).toEqual(2);
    }));
    it(`index of`, () => {
        let value = 'hello world';
        let index = value.IndexOf('world');

        expect(index).toEqual(6);
    });
    it(`substring`, () => {
        let value = 'GPIB2::24::INSTR';
        let index = value.IndexOf('::');
        let actual = value.SubString(0, index);

        expect(actual).toEqual('GPIB2');
    });
});