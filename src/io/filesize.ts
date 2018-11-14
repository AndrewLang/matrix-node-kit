
export class FileSizeCalculator {
    static Units = {
        Bits: ["b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"],
        Bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    };

    static Calculate(size: number, precision = 0, useBit = false): string {
        if (isNaN(parseFloat(String(size))) || !isFinite(size)) {
            return '?';
        }

        let unitIndex = 0;

        while (size >= 1024) {
            size /= 1024;
            unitIndex++;
        }

        let unit = '';
        if (useBit) {
            unit = FileSizeCalculator.Units.Bits[unitIndex];
        } else {
            unit = FileSizeCalculator.Units.Bytes[unitIndex];
        }

        return `${size.toFixed(+ precision)} ${unit}`;        
    }
}