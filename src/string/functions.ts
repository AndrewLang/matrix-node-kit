// import * as moment from 'moment';

export const NormalizeContent = function (content: string): string {
    if (!content) {
        return content;
    }

    return content.replace(/\'/g, `''`);
}
export const DenormalizeContent = function (content: string): string {
    if (!content) {
        return content;
    }

    return content.replace(/\'\'/g, `'`);
}

export const BoolToNumber = function (value: boolean): number {
    return value && value === true ? 1 : 0;
}



export const Slugify = function (value: string): string {
    if (!value || value.length <= 0)
        return value;
    let slug = value.toString()
        .toLowerCase()
        .replace(' ', '_')
        .replace(/\s+/g, '-')           // Replace spaces with -
        //.replace(/[^\w\-]+/g, '')     // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text

    if (!slug || slug.length <= 0)
        slug = value;

    return slug;
}
export const CountHtmlWords = function (content: string): number {
    if (!content)
        return 0;
  
    let striped = content.replace(/<[^>]*>?/g,'').replace(/\s+/g, ' ').replace(/[^\x00-\xff]/g, '中 ').trim();
    let count = striped.split(' ').length;
    // console.log(`striped: count: ${striped.split('').length}, ${striped.split(' ').length}, ${striped}`);
    
    return count;
}
// export const FormatDate = function (date: Date): string {
//     let format = 'YYYY-MM-DDTHH:MM:SS.SSS';
//     if (date)
//         moment(date).utc().format(format);
//     return moment().utc().format(format);
// }
// export const FormatNow = function (): string {
//     return FormatDate(new Date());
// }