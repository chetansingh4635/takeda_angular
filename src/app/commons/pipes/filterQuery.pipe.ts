import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return (_.filter(array, row => {
                return (row['docName'].search(new RegExp(query, 'i')) !== -1) ||
                    (row['docVersion'].search(new RegExp(query, 'i')) !== -1) ||
                    (row['croName'] ? row['croName'].search(new RegExp(query, 'i')) !== -1 : 0) ||
                    (row['irb_info'].length ? (row['irb_info'][0].irbName.search(new RegExp(query, 'i')) !== -1) : 0) ||
                    (row['croId'] ? row['croId'].search(new RegExp(query, 'i')) !== -1 : 0) ||
                    (row['docType'].search(new RegExp(query, 'i')) !== -1) ||
                    (row['docStatus'].search(new RegExp(query, 'i')) !== -1) ||
                    (row['siteId'] ? row['siteId'].search(new RegExp(query, 'i')) !== -1 : 0) ||
                    (row['siteName'] ? row['siteName'].search(new RegExp(query, 'i')) !== -1 : 0);
            }));
        }
        return array;
    }
}

