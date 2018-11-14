import 'mocha';
import { expect } from 'chai';
import { FileSizeCalculator } from '../imports';

describe('FileSizeCalculator', () => {
    it('', () => {

    });

    it('Calculate', () => {
        let actual = FileSizeCalculator.Calculate(2048);

        expect(actual).equals('2 KB');

        actual = FileSizeCalculator.Calculate(1024);
        expect(actual).equals('1 KB');

        actual = FileSizeCalculator.Calculate(1024,2 );
        expect(actual).equals('1.00 KB');

        actual = FileSizeCalculator.Calculate(1024 * 1024, );
        expect(actual).equals('1 MB');

        actual = FileSizeCalculator.Calculate(1024 * 1024 * 1024, );
        expect(actual).equals('1 GB');

        actual = FileSizeCalculator.Calculate(1024 * 1024 * 1024 * 1024, );
        expect(actual).equals('1 TB');

        actual = FileSizeCalculator.Calculate(1024 * 1024 * 1024 * 1024 * 1024, );
        expect(actual).equals('1 PB');
        
        actual = FileSizeCalculator.Calculate(1024 * 1024 * 1024 * 1024 * 1024 * 1024, );
        expect(actual).equals('1 EB');

        actual = FileSizeCalculator.Calculate(1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024, );
        expect(actual).equals('1 ZB');

        actual = FileSizeCalculator.Calculate(1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024, );
        expect(actual).equals('1 YB');
    });
});