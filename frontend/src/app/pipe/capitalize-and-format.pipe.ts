import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeAndFormat',
  standalone: true 
})
export class CapitalizeAndFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    let formatted = value.charAt(0).toUpperCase();

    for (let i = 1; i < value.length; i++) {
      const char = value.charAt(i);

      if (char === char.toUpperCase() && char !== char.toLowerCase()) {
        formatted += ' ' + char.toLowerCase();
      } else {
        formatted += char;
      }
    }

    return formatted;
  }

}
